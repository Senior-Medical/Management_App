import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductDocument } from './entities/product.entity';
import { BaseService } from 'src/utils/classes/base.service';

@Injectable()
export class ProductsService extends BaseService {
  searchableKeys: string[] = [
    "name"
  ];

  constructor(
    @InjectModel(Product.name) private productsModel: Model<Product>,
    private readonly usersService: UsersService
  ) {
    super();
  }

  /**
   * Get the module model.
   * @returns The product model.
   */
  getModuleModel() {
    return this.productsModel;
  }

  /**
   * Get additional render variables for the dashboard.
   * @returns The additional render variables.
   */
  async getAdditionalRenderVariables() {
    return {
      users: await this.usersService.find()
    }
  }

  /**
   * Create a new Products.
   * @param createProductsDto The data for the new Product.
   * @param user The user who is creating the new Product.
   */
  async create(createProductDto: CreateProductDto, user: UserDocument) {
    const { name } = createProductDto;
    const existProducts = await this.findOne({ name });
    if (existProducts) throw new ConflictException('إسم المنتج موجود بالفعل');

    const inputDate: Product = {
      ...createProductDto,
      createdBy: user._id,
      updatedBy: user._id,
    }
    await this.productsModel.create(inputDate);
  }

  /**
   * Update product.
   * @param product The product who is wanted to be updated.
   * @param updateProductDto The data to update the product.
   * @param user The user who is updating the product.
   * @throws ConflictException if the name is already exist.
   */
  async update(product: ProductDocument, updateProductDto: CreateProductDto, user: UserDocument) {
    const existProduct = await this.findOne({ name: updateProductDto.name });
    if (existProduct && existProduct._id.toString() !== product._id.toString()) throw new ConflictException('إسم المنتج موجود بالفعل');
    
    const inputData: Partial<Product> = {
      ...updateProductDto,
      updatedBy: user._id
    }

    await product.set(inputData).save();
  }
}
