import { ArgumentMetadata, ConflictException, Injectable, NotAcceptableException } from "@nestjs/common";
import { CreateProductPriceDto } from "../dto/create-product-price.dto";
import { ProductsService } from '../../products/products.service';
import { DepartmentsService } from "src/departments/departments.service";
import { ProductPriceService } from "../product-price.service";

/**
 * Create product price pipe.
 */
@Injectable()
export class CreateProductPricePipe {
  constructor(
    private readonly productsService: ProductsService,
    private readonly departmentsService: DepartmentsService,
    private readonly productPriceService: ProductPriceService,
  ) { }
  /**
   * Transform product price data to save it in the database.
   * 
   * @param data product price data
   * @param metadata metadata
   * @returns transformed product price data
   */
  transform(data: CreateProductPriceDto, metadata: ArgumentMetadata) {
    const { product, department } = data;

    const productExists = this.productsService.findById(product.toString());
    if (!productExists) throw new NotAcceptableException('خطأ في معرف المنتج.');

    const departmentExists = this.departmentsService.findById(department.toString());
    if (!departmentExists) throw new NotAcceptableException('خطأ في معرف القسم.');

    const productPriceExists = this.productPriceService.findByProductAndDepartment(product, department);
    if (productPriceExists) throw new ConflictException('سعر المنتج موجود بالفعل.');

    return data;
  }
}