import { ArgumentMetadata } from "@nestjs/common";
import { CreateProductPriceDto } from "../dto/create-product-price.dto";
import { ProductsService } from '../../products/products.service';
import { DepartmentsService } from "src/departments/departments.service";
import { ProductPriceService } from "../product-price.service";
export declare class CreateProductPricePipe {
    private readonly productsService;
    private readonly departmentsService;
    private readonly productPriceService;
    constructor(productsService: ProductsService, departmentsService: DepartmentsService, productPriceService: ProductPriceService);
    transform(data: CreateProductPriceDto, metadata: ArgumentMetadata): CreateProductPriceDto;
}
