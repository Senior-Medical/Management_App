import { Injectable } from '@nestjs/common';
import { CreateProductPriceDto } from './dto/create-product-price.dto';
import { UpdateProductPriceDto } from './dto/update-product-price.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ProductPrice, ProductPriceDocument } from './entities/product-price.entity';
import { Model, RootFilterQuery, Types } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';
import { Response } from 'express';
import { FindQueryBuilderService } from 'src/utils/builders/find-query-builder.service';
import { QueryDto } from 'src/utils/dtos/query.dto';
import { DashboardRenderVariablesType } from 'src/users/types/render-variables.type';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from '../products/products.service';
import { DepartmentsService } from '../departments/departments.service';
import { ProductDocument } from 'src/products/entities/product.entity';
import { DepartmentDocument } from 'src/departments/entities/department.entity';

@Injectable()
export class ProductPriceService {
  private queryBuilder: FindQueryBuilderService | null = null;
  private searchableKeys: string[] = [
    "price",
    "createdAtArabic",
    "updatedAtArabic"
  ];
  
  constructor(
    @InjectModel(ProductPrice.name) private readonly productPriceModel: Model<ProductPrice>,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly departmentsService: DepartmentsService
  ) { }

  /**
   * Create a new productPrice.
   * 
   * @param createProductPriceDto the data for the new productPrice
   * @param user the user who is creating the new productPrice
   * @param res the response object
   * @returns redirect to the productPrice page
   */
  async create(createProductPriceDto: CreateProductPriceDto, user: UserDocument, res: Response) {
    const inputData: ProductPrice = {
      ...createProductPriceDto,
      createdBy: user._id,
      updatedBy: user._id,
    };
    const productPrice = await this.productPriceModel.create(inputData);
    console.log('ProductPrice created successfully');
    return res.redirect('/productPrice');
  }

  /**
   * Get query builder to use it in find method
   * @returns - The query builder instance
   */
  private getQueryBuilder(queryParams: QueryDto, filter: RootFilterQuery<ProductPrice> = {}) {
    const query = this.productPriceModel.find(filter);
    if (!this.queryBuilder) this.queryBuilder = new FindQueryBuilderService(query, queryParams);
    else this.queryBuilder.resetParameters(query, queryParams);
    return this.queryBuilder;
  }

  /**
   * Find all productsPrices.
   * @param queryParams The query parameters.
   * @param user The user who is get productsPrices.
   * @param res The response.
   * @render The productsPrices page.
   */
  async findAll(queryParams: QueryDto, user: UserDocument, res: Response) {
    const queryBuilder = this.getQueryBuilder(queryParams);
    const productsPrices = await queryBuilder
      .filter()
      .search(this.searchableKeys)
      .sort()
      .paginate()
      .build()
      .populate('createdBy', 'username')
      .populate('updatedBy', 'username')
      .populate('department', 'name')
      .populate('product', 'name');

    const { page, pageSize, sort, search, error, ...filter } = queryParams;
    const renderVariables: DashboardRenderVariablesType & {products: ProductDocument[], departments: DepartmentDocument[]} = {
      error: queryParams.error || null,
      data: productsPrices,
      user,
      users: await this.usersService.find(),
      products: await this.productsService.find(),
      departments: await this.departmentsService.find(),
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
    return res.render(`product-price`, renderVariables);
  }

  /**
   * Find productPrice by id.
   * @param id The productPrice id.
   * @returns The productPrice.
   */
  findById(id: string) {
    return this.productPriceModel.findById(id);
  }

  /**
   * Find productPrice by productId and departmentId.
   * @param product The product id.
   * @param department The department id.
   * @returns The productPrice.
   */
  findByProductAndDepartment(product: Types.ObjectId, department: Types.ObjectId) {
    return this.productPriceModel.findOne({ product, department });
  }

  /**
   * Update productPrice.
   * @param user The user who is updating the productPrice.
   * @param productPrice The productPrice who is wanted to be updated.
   * @param updateProductPriceDto The data to update the productPrice.
   * @param res The response object.
   * @redirect To the product-price page.
   */
  async update(user: UserDocument, productPrice: ProductPriceDocument, updateProductPriceDto: UpdateProductPriceDto, res: Response) {
    const inputData: Partial<ProductPrice> = {
      ...updateProductPriceDto,
      updatedBy: user._id
    }

    await productPrice.set(inputData).save();
    console.log('ProductPrice updated successfully');
    return res.redirect('/productPrice?sort=-updatedAt');
  }

  /**
   * Remove productPrice.
   * @param user The user who is removing the productPrice.
   * @param res The response object.
   * @redirect To the product-price page.
   */
  async remove(productPrice: ProductPriceDocument, res: Response) {
    await productPrice.deleteOne();
    console.log('ProductPrice removed successfully');
    return res.redirect('/productPrice');
  }
}
