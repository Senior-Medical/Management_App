import { Module } from '@nestjs/common';
import { ProductionService } from './production.service';
import { ProductionController } from './production.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Production, ProductionSchema } from './entities/production.entity';
import { UsersModule } from 'src/users/users.module';
import { ProductPriceModule } from 'src/product-price/product-price.module';
import { ProductsModule } from 'src/products/products.module';
import { WorkersModule } from 'src/workers/workers.module';
import { DepartmentsModule } from 'src/departments/departments.module';
import { BonusModule } from 'src/bonus/bonus.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Production.name,
        schema: ProductionSchema,
      },
    ]),
    UsersModule,
    ProductPriceModule,
    ProductsModule,
    WorkersModule,
    DepartmentsModule,
    BonusModule
  ],
  controllers: [ProductionController],
  providers: [ProductionService],
})
export class ProductionModule {}
