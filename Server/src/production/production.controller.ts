import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Redirect,
  Render
} from '@nestjs/common';
import { ProductionService } from './production.service';
import { CreateProductionDto } from './dto/create-production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';
import { UserDocument } from 'src/users/entities/user.entity';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { QueryParamPipe } from 'src/utils/pipes/queryParam.pipe';
import { ObjectIdPipe } from 'src/utils/pipes/ObjectId.pipe';
import { ProductionDocument } from './entities/production.entity';
import { ProductionIdPipe } from './pipes/production-id.pipe';
import { CreateProductionPipe } from './pipes/create-production-price.pipe';
import { GetSalaryDto } from './dto/get-salary.dto';

@Controller('production')
export class ProductionController {
  constructor(private readonly productionService: ProductionService) {}

  @Post()
  @Redirect('/production')
  create(
    @Body(CreateProductionPipe) createProductionDto: CreateProductionDto,
    @GetUser() user: UserDocument,
  ) {
    return this.productionService.create(createProductionDto, user);
  }

  @Get()
  @Render('production')
  findAll(
    @Query(QueryParamPipe) queryParams: any,
    @GetUser() user: UserDocument,
  ) {
    return this.productionService.findAll(queryParams, user);
  }

  @Post('get-salary')
  @Render('salary')
  getSalary(
    @Query(QueryParamPipe) queryParams: any,
    @Body() getSalaryDto: GetSalaryDto,
    @GetUser() user: UserDocument,
  ) {
    return this.productionService.getSalary(getSalaryDto, queryParams, user);
  }

  @Post('update/:productionId')
  @Redirect('/production')
  update(
    @Param('productionId', ObjectIdPipe, ProductionIdPipe) production: ProductionDocument,
    @Body() updateProductionDto: UpdateProductionDto,
    @GetUser() user: UserDocument,
  ) {
    return this.productionService.update(production, updateProductionDto, user);
  }

  @Get('delete/:productionId')
  @Redirect('/production')
  remove(
    @Param('productionId', ObjectIdPipe, ProductionIdPipe) production: ProductionDocument
  ) {
    return this.productionService.remove(production);
  }
}
