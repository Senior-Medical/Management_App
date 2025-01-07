import { Model, Types } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { QueryDto } from 'src/utils/dtos/query.dto';
import { DepartmentsService } from '../departments/departments.service';
import { ProductsService } from '../products/products.service';
import { CreateProductPriceDto } from './dto/create-product-price.dto';
import { UpdateProductPriceDto } from './dto/update-product-price.dto';
import { ProductPrice, ProductPriceDocument } from './entities/product-price.entity';
import { BaseService } from 'src/utils/classes/base.service';
export declare class ProductPriceService extends BaseService {
    private readonly productPriceModel;
    private readonly usersService;
    private readonly productsService;
    private readonly departmentsService;
    searchableKeys: string[];
    constructor(productPriceModel: Model<ProductPrice>, usersService: UsersService, productsService: ProductsService, departmentsService: DepartmentsService);
    getModuleModel(): Model<ProductPrice, {}, {}, {}, import("mongoose").Document<unknown, {}, ProductPrice> & ProductPrice & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, any>;
    getAdditionalRenderVariables(): Promise<{
        users: any[];
        products: any[];
        departments: any[];
        type: string;
        title: string;
    }>;
    create(createProductPriceDto: CreateProductPriceDto, user: UserDocument): Promise<void>;
    findAll(queryParams: QueryDto, user: UserDocument): Promise<{
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
}
