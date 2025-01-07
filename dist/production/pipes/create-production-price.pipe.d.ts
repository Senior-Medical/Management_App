import { ArgumentMetadata } from "@nestjs/common";
import { DepartmentsService } from "src/departments/departments.service";
import { ProductsService } from '../../products/products.service';
import { CreateProductionDto } from "../dto/create-production.dto";
import { ProductionService } from "../production.service";
import { WorkersService } from '../../workers/workers.service';
export declare class CreateProductionPipe {
    private readonly productionService;
    private readonly productsService;
    private readonly workersService;
    private readonly departmentsService;
    constructor(productionService: ProductionService, productsService: ProductsService, workersService: WorkersService, departmentsService: DepartmentsService);
    transform(data: CreateProductionDto, metadata: ArgumentMetadata): CreateProductionDto;
}
