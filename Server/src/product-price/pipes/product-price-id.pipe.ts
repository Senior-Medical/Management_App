import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform
} from '@nestjs/common';
import { ProductPriceService } from '../product-price.service';

/**
 * Validates productPriceId if exist.
 */
@Injectable()
export class ProductPriceIdPipe implements PipeTransform {
  constructor(private readonly productPriceService: ProductPriceService) { }
  
  /**
   * ProductPriceId validation by get productPrice from productPrices collection.
   * 
   * @param productPriceId productPrice id
   * @param metadata metadata
   * @returns productPrice document if the productPrice is found
   */
  async transform(productPriceId: string, metadata: ArgumentMetadata) {
    const productPrice = await this.productPriceService.findById(productPriceId);
    if (!productPrice) throw new NotFoundException('خطأ في معرف سعر المنتج.');
    return productPrice;
  }
}
