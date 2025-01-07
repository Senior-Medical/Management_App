import { Model, Types } from 'mongoose';
import { DepartmentsService } from 'src/departments/departments.service';
import { ProductsService } from 'src/products/products.service';
import { UserDocument } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { QueryDto } from 'src/utils/dtos/query.dto';
import { WorkersService } from 'src/workers/workers.service';
import { BonusService } from '../bonus/bonus.service';
import { ProductPriceService } from '../product-price/product-price.service';
import { CreateProductionDto } from './dto/create-production.dto';
import { GetSalaryDto } from './dto/get-salary.dto';
import { UpdateProductionDto } from './dto/update-production.dto';
import { Production, ProductionDocument } from './entities/production.entity';
import { BaseService } from 'src/utils/classes/base.service';
export declare class ProductionService extends BaseService {
    private productionModel;
    private readonly usersService;
    private readonly productsService;
    private readonly workersService;
    private readonly departmentsService;
    private readonly productPriceService;
    private readonly bonusService;
    searchableKeys: string[];
    constructor(productionModel: Model<Production>, usersService: UsersService, productsService: ProductsService, workersService: WorkersService, departmentsService: DepartmentsService, productPriceService: ProductPriceService, bonusService: BonusService);
    getModuleModel(): Model<Production, {}, {}, {}, import("mongoose").Document<unknown, {}, Production> & Production & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, any>;
    getAdditionalRenderVariables(): Promise<{
        users: any[];
        workers: any[];
        products: any[];
        departments: any[];
        type: string;
        title: string;
    }>;
    create(createProductionDto: CreateProductionDto, user: UserDocument): Promise<void>;
    findAll(queryParams: QueryDto, user: UserDocument): Promise<{
        users: any[];
        workers: any[];
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
    getSalary(getSalaryDto: GetSalaryDto, queryParams: QueryDto, user: UserDocument): Promise<{
        data: any[];
        user: UserDocument;
        error: any;
    }>;
    update(Production: ProductionDocument, updateProductionDto: UpdateProductionDto, user: UserDocument): Promise<void>;
}
