import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { ProductionService } from '../production.service';
export declare class ProductionIdPipe implements PipeTransform {
    private readonly productionService;
    constructor(productionService: ProductionService);
    transform(productionId: string, metadata: ArgumentMetadata): Promise<any>;
}
