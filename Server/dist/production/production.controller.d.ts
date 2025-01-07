import { UserDocument } from 'src/users/entities/user.entity';
import { CreateProductionDto } from './dto/create-production.dto';
import { GetSalaryDto } from './dto/get-salary.dto';
import { UpdateProductionDto } from './dto/update-production.dto';
import { ProductionDocument } from './entities/production.entity';
import { ProductionService } from './production.service';
export declare class ProductionController {
    private readonly productionService;
    constructor(productionService: ProductionService);
    create(createProductionDto: CreateProductionDto, user: UserDocument): Promise<void>;
    findAll(queryParams: any, user: UserDocument): Promise<{
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
    getSalary(queryParams: any, getSalaryDto: GetSalaryDto, user: UserDocument): Promise<{
        data: any[];
        user: UserDocument;
        error: any;
    }>;
    update(production: ProductionDocument, updateProductionDto: UpdateProductionDto, user: UserDocument): Promise<void>;
    remove(production: ProductionDocument): Promise<void>;
}
