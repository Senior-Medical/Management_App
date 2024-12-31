import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model, RootFilterQuery } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';
import { DashboardRenderVariablesType } from 'src/users/types/render-variables.type';
import { UsersService } from 'src/users/users.service';
import { FindQueryBuilderService } from 'src/utils/classes/find-query-builder.service';
import { QueryDto } from 'src/utils/dtos/query.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private queryBuilder: FindQueryBuilderService | null = null;
  private searchableKeys: string[] = [
    "name",
    "createdAtArabic",
    "updatedAtArabic"
  ];

  constructor(
    @InjectModel(Product.name) private productsModel: Model<Product>,
    private readonly usersService: UsersService
  ) { }

  /**
   * Create a new Products.
   * @param user The user who is creating the new Product.
   * @param createProductsDto The data for the new Product.
   * @param res The response object.
   * @redirect The Products page.
   */
  async create(user: UserDocument, createProductDto: CreateProductDto, res: Response) {
    const { name } = createProductDto;
    const existProducts = await this.findByName(name);
    if (existProducts) throw new ConflictException('إسم المنتج موجود بالفعل');

    const inputDate: Product = {
      ...createProductDto,
      createdBy: user._id,
      updatedBy: user._id,
    }
    await this.productsModel.create(inputDate);
    return res.redirect('/products');
  }

  /**
   * Get query builder to use it in find method
   * @returns - The query builder instance
   */
  private getQueryBuilder(queryParams: QueryDto, filter: RootFilterQuery<Product> = {}) {
    const query = this.productsModel.find(filter);
    if (!this.queryBuilder) this.queryBuilder = new FindQueryBuilderService(query, queryParams);
    else this.queryBuilder.resetParameters(query, queryParams);
    return this.queryBuilder;
  }

  /**
   * Find all products.
   * @param queryParams The query parameters.
   * @param user The user who is get products.
   * @param res The response.
   * @render The products page.
   */
  async findAll(queryParams: QueryDto, user: UserDocument, res: Response) {
    const queryBuilder = this.getQueryBuilder(queryParams);
    const products = await queryBuilder
      .filter()
      .search(this.searchableKeys)
      .sort()
      .paginate()
      .build()
      .populate('createdBy', 'username')
      .populate('updatedBy', 'username');

    const { page, pageSize, sort, search, error, ...filter } = queryParams;
    const renderVariables: DashboardRenderVariablesType = {
      error: queryParams.error || null,
      data: products,
      user,
      users: await this.usersService.find(),
      filters: {
        search: queryBuilder.getSearchKey(),
        sort: queryBuilder.getSortKey(),
        pagination: {
          page: queryBuilder.getPage(),
          totalPages: await queryBuilder.getTotalPages(),
          pageSize: queryBuilder.getPageSize()
        },
        filter: Object.entries(filter).map(([key, value]) => ({ key, value }))
      }
    };
    return res.render(`products`, renderVariables);
  }

  /**
   * Find all products depend on some filters.
   * @param filters The filters to find the products.
   * @returns All products.
   */
  find(filters: RootFilterQuery<Product> = {}) {
    return this.productsModel.find(filters);
  }

  /**
   * Find product by id.
   * @param id The product id.
   * @returns The product.
   */
  findById(id: string) {
    return this.productsModel.findById(id);
  }

  /**
   * Find product by name.
   * @param name The product name.
   * @returns The product.
   */
  findByName(name: string) {
    return this.productsModel.findOne({ name });
  }

  /**
   * Update product.
   * @param user The user who is updating the product.
   * @param product The product who is wanted to be updated.
   * @param updateProductDto The data to update the product.
   * @param res The response object.
   * @redirect To the products page.
   * @throws ConflictException if the name is already exist.
   */
  async update(user: UserDocument, product: ProductDocument, updateProductDto: CreateProductDto, res: Response) {
    const existProduct = await this.findByName(updateProductDto.name);
    if (existProduct && existProduct._id.toString() !== product._id.toString()) throw new ConflictException('إسم المنتج موجود بالفعل');
    
    const inputData: Partial<Product> = {
      ...updateProductDto,
      updatedBy: user._id
    }

    await product.set(inputData).save();
    return res.redirect('/products?sort=-updatedAt');
  }

  /**
   * Remove product.
   * @param user The user who is removing the product.
   * @param res The response object.
   * @redirect To the products page.
   */
  async remove(product: ProductDocument, res: Response) {
    await product.deleteOne();
    return res.redirect('/products');
  }
}
