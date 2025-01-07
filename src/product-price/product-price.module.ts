import { Module } from '@nestjs/common';
import { ProductPriceService } from './product-price.service';
import { ProductPriceController } from './product-price.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductPrice, ProductPriceSchema } from './entities/product-price.entity';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';
import { DepartmentsModule } from 'src/departments/departments.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ProductPrice.name,
        schema: ProductPriceSchema,
      }
    ]),
    UsersModule,
    ProductsModule,
    DepartmentsModule
  ],
  controllers: [ProductPriceController],
  providers: [ProductPriceService],
  exports: [ProductPriceService]
})
export class ProductPriceModule {}
