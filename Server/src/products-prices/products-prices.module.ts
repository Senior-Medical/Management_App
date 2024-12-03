import { Module } from '@nestjs/common';
import { ProductsPricesService } from './products-prices.service';
import { ProductsPricesController } from './products-prices.controller';

@Module({
  controllers: [ProductsPricesController],
  providers: [ProductsPricesService],
})
export class ProductsPricesModule {}
