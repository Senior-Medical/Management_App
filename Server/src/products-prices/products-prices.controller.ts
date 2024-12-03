import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsPricesService } from './products-prices.service';
import { CreateProductsPriceDto } from './dto/create-products-price.dto';
import { UpdateProductsPriceDto } from './dto/update-products-price.dto';

@Controller('products-prices')
export class ProductsPricesController {
  constructor(private readonly productsPricesService: ProductsPricesService) {}

  @Post()
  create(@Body() createProductsPriceDto: CreateProductsPriceDto) {
    return this.productsPricesService.create(createProductsPriceDto);
  }

  @Get()
  findAll() {
    return this.productsPricesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsPricesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductsPriceDto: UpdateProductsPriceDto) {
    return this.productsPricesService.update(+id, updateProductsPriceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsPricesService.remove(+id);
  }
}
