import { Injectable } from '@nestjs/common';
import { CreateProductsPriceDto } from './dto/create-products-price.dto';
import { UpdateProductsPriceDto } from './dto/update-products-price.dto';

@Injectable()
export class ProductsPricesService {
  create(createProductsPriceDto: CreateProductsPriceDto) {
    return 'This action adds a new productsPrice';
  }

  findAll() {
    return `This action returns all productsPrices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productsPrice`;
  }

  update(id: number, updateProductsPriceDto: UpdateProductsPriceDto) {
    return `This action updates a #${id} productsPrice`;
  }

  remove(id: number) {
    return `This action removes a #${id} productsPrice`;
  }
}
