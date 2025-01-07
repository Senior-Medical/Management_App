import { UserDocument } from 'src/users/entities/user.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDocument } from './entities/product.entity';
import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(user: UserDocument, createProductDto: CreateProductDto): Promise<void>;
    findAll(queryParams: any, user: UserDocument): Promise<import("../users/types/base-render-variables.type").BaseRenderVariablesType>;
    update(product: ProductDocument, updateProductDto: CreateProductDto, user: UserDocument): Promise<void>;
    remove(product: ProductDocument): Promise<void>;
}
