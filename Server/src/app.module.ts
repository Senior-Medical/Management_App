import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WorkersModule } from './workers/workers.module';
import { ProductsModule } from './products/products.module';
import { DepartmentsModule } from './departments/departments.module';
import { ProductsPricesModule } from './products-prices/products-prices.module';
import { ProductionsModule } from './productions/productions.module';

@Module({
  imports: [UsersModule, WorkersModule, ProductsModule, DepartmentsModule, ProductsPricesModule, ProductionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
