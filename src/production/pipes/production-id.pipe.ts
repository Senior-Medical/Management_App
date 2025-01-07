import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform
} from '@nestjs/common';
import { ProductionService } from '../production.service';

/**
 * Validates productionId if exist.
 */
@Injectable()
export class ProductionIdPipe implements PipeTransform {
  constructor(private readonly productionService: ProductionService) { }
  
  /**
   * productionId validation by get production from productions collection.
   * 
   * @param productionId production id
   * @param metadata metadata
   * @returns production document if the production is found
   */
  async transform(productionId: string, metadata: ArgumentMetadata) {
    const production = await this.productionService.findById(productionId);
    if (!production) throw new NotFoundException('خطأ في معرف الإنتاج.');
    return production;
  }
}
