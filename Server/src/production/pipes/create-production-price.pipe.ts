import { ArgumentMetadata, ConflictException, Injectable, NotAcceptableException } from "@nestjs/common";
import { DepartmentsService } from "src/departments/departments.service";
import { ProductsService } from '../../products/products.service';
import { CreateProductionDto } from "../dto/create-production.dto";
import { ProductionService } from "../production.service";
import { WorkersService } from '../../workers/workers.service';

/**
 * Create production pipe.
 */
@Injectable()
export class CreateProductionPipe {
  constructor(
    private readonly productionService: ProductionService,
    private readonly productsService: ProductsService,
    private readonly workersService: WorkersService,
    private readonly departmentsService: DepartmentsService,
  ) { }
  /**
   * Transform production data to save it in the database.
   * 
   * @param data production  data
   * @param metadata metadata
   * @returns transformed production  data
   */
  transform(data: CreateProductionDto, metadata: ArgumentMetadata) {
    
    const { product, department, worker } = data;

    const productExists = this.productsService.findById(product.toString());
    if (!productExists) throw new NotAcceptableException('خطأ في معرف المنتج.');

    const departmentExists = this.departmentsService.findById(department.toString());
    if (!departmentExists) throw new NotAcceptableException('خطأ في معرف القسم.');

    const workerExists = this.workersService.findById(worker.toString());
    if (!workerExists) throw new NotAcceptableException('خطأ في معرف العامل.');

    return data;
  }
}