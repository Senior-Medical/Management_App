import { UserDocument } from 'src/users/entities/user.entity';
import { CreateProductPriceDto } from './dto/create-product-price.dto';
import { UpdateProductPriceDto } from './dto/update-product-price.dto';
import { ProductPriceDocument } from './entities/product-price.entity';
import { ProductPriceService } from './product-price.service';
export declare class ProductPriceController {
    private readonly productPriceService;
    constructor(productPriceService: ProductPriceService);
    create(createProductPriceDto: CreateProductPriceDto, user: UserDocument): Promise<void>;
    findAll(queryParams: any, user: UserDocument): Promise<{
        users: any[];
        products: any[];
        departments: any[];
        type: string;
        title: string;
        error: string | null;
        data: Array<any> | null;
        user: UserDocument;
        filters: {
            [key: string]: any;
            search: string;
            sort: string;
            pagination: {
                page: number;
                pageSize: number;
                totalPages: number;
            };
        };
    }>;
    update(productPrice: ProductPriceDocument, updateProductPriceDto: UpdateProductPriceDto, user: UserDocument): Promise<void>;
    remove(productPrice: ProductPriceDocument): Promise<void>;
}
