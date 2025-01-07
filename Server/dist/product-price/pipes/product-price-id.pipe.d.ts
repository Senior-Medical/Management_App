import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { ProductPriceService } from '../product-price.service';
export declare class ProductPriceIdPipe implements PipeTransform {
    private readonly productPriceService;
    constructor(productPriceService: ProductPriceService);
    transform(productPriceId: string, metadata: ArgumentMetadata): Promise<any>;
}
