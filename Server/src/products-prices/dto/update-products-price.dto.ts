import { PartialType } from '@nestjs/mapped-types';
import { CreateProductsPriceDto } from './create-products-price.dto';

export class UpdateProductsPriceDto extends PartialType(CreateProductsPriceDto) {}
