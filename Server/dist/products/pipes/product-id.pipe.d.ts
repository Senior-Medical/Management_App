import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { ProductsService } from '../products.service';
export declare class ProductIdPipe implements PipeTransform {
    private readonly productsService;
    constructor(productsService: ProductsService);
    transform(productId: string, metadata: ArgumentMetadata): Promise<any>;
}
