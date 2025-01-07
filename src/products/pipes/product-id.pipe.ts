import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform
} from '@nestjs/common';
import { ProductsService } from '../products.service';

/**
 * Validates productId if exist.
 */
@Injectable()
export class ProductIdPipe implements PipeTransform {
  constructor(private readonly productsService: ProductsService) { }
  
  /**
   * ProductId validation by get product from products collection.
   * 
   * @param productId product id
   * @param metadata metadata
   * @returns product document if the product is found
   */
  async transform(productId: string, metadata: ArgumentMetadata) {
    const product = await this.productsService.findById(productId);
    if (!product) throw new NotFoundException('خطأ في معرف المنتج.');
    return product;
  }
}
