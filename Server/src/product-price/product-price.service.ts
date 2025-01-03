import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import e, { Response } from 'express';
import { Model, RootFilterQuery, Types } from 'mongoose';
import { DepartmentDocument } from 'src/departments/entities/department.entity';
import { ProductDocument } from 'src/products/entities/product.entity';
import { UserDocument } from 'src/users/entities/user.entity';
import { BaseRenderVariablesType } from 'src/users/types/base-render-variables.type';
import { UsersService } from 'src/users/users.service';
import { FindQueryBuilderService } from 'src/utils/classes/find-query-builder.service';
import { QueryDto } from 'src/utils/dtos/query.dto';
import { DepartmentsService } from '../departments/departments.service';
import { ProductsService } from '../products/products.service';
import { CreateProductPriceDto } from './dto/create-product-price.dto';
import { UpdateProductPriceDto } from './dto/update-product-price.dto';
import { ProductPrice, ProductPriceDocument } from './entities/product-price.entity';
import { BaseService } from 'src/utils/classes/base.service';

@Injectable()
export class ProductPriceService extends BaseService {
  searchableKeys: string[] = [];
  
  constructor(
    @InjectModel(ProductPrice.name) private readonly productPriceModel: Model<ProductPrice>,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly departmentsService: DepartmentsService
  ) {
    super();
  }

  /**
   * Get the productPrice model.
   * @returns The productPrice model.
   */
  getModuleModel() {
    return this.productPriceModel;
  }

  /**
   * Get additional render variables.
   * @returns The additional render variables.
   */
  async getAdditionalRenderVariables() {
    return {
      users: await this.usersService.find(),
      products: await this.productsService.find(),
      departments: await this.departmentsService.find()
    };
  }

  /**
   * Create a new productPrice.
   * 
   * @param createProductPriceDto the data for the new productPrice
   * @param user the user who is creating the new productPrice
   */
  async create(createProductPriceDto: CreateProductPriceDto, user: UserDocument) {
    createProductPriceDto.product = new Types.ObjectId(createProductPriceDto.product);
    createProductPriceDto.department = new Types.ObjectId(createProductPriceDto.department);

    const existPrice = await this.productPriceModel.findOne({ department: createProductPriceDto.department, product: createProductPriceDto.product });
    if (existPrice) throw new ConflictException('سعر المنتج في هذا القسم موجود بالفعل');
    
    const inputData: ProductPrice = {
      ...createProductPriceDto,
      createdBy: user._id,
      updatedBy: user._id,
    };
    await this.productPriceModel.create(inputData);
  }

  /**
   * Find all productsPrices.
   * @param queryParams The query parameters.
   * @param user The user who is get productsPrices.
   */
  async findAll(queryParams: QueryDto, user: UserDocument) {
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
    const renderVariables: BaseRenderVariablesType = {
      error: queryParams.error || null,
      data: productsPrices,
      user,
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
    return { ...renderVariables, ...(await this.getAdditionalRenderVariables()) };
  }

  /**
   * Update productPrice.
   * @param productPrice The productPrice who is wanted to be updated.
   * @param updateProductPriceDto The data to update the productPrice.
   * @param user The user who is updating the productPrice.
   */
  async update(productPrice: ProductPriceDocument, updateProductPriceDto: UpdateProductPriceDto, user: UserDocument) {
    if (updateProductPriceDto.product) updateProductPriceDto.product = new Types.ObjectId(updateProductPriceDto.product);
    else updateProductPriceDto.product = productPrice.product;
    if (updateProductPriceDto.department) updateProductPriceDto.department = new Types.ObjectId(updateProductPriceDto.department);
    else updateProductPriceDto.department = productPrice.department;
    const existPrice = await this.productPriceModel.findOne({ department: updateProductPriceDto.department, product: updateProductPriceDto.product });
    if (existPrice && existPrice._id.toString() !== productPrice._id.toString()) throw new ConflictException('سعر المنتج في هذا القسم موجود بالفعل');

    const inputData: Partial<ProductPrice> = {
      ...updateProductPriceDto,
      updatedBy: user._id
    }

    await productPrice.set(inputData).save();
  }
}
