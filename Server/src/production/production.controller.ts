import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { ProductionService } from './production.service';
import { CreateProductionDto } from './dto/create-production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';
import { UserDocument } from 'src/users/entities/user.entity';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { Response } from 'express';
import { QueryParamPipe } from 'src/utils/pipes/queryParam.pipe';
import { ObjectIdPipe } from 'src/utils/pipes/ObjectId.pipe';
import { ProductionDocument } from './entities/production.entity';
import { ProductionIdPipe } from './pipes/production-id.pipe';
import { CreateProductionPipe } from './pipes/create-production-price.pipe';

@Controller('production')
export class ProductionController {
  constructor(private readonly productionService: ProductionService) {}

  @Post()
  create(
    @Body(CreateProductionPipe) createProductionDto: CreateProductionDto,
    @GetUser() user: UserDocument,
    @Res() res: Response
  ) {
    return this.productionService.create(user, createProductionDto, res);
  }

  @Get()
  findAll(
    @Query(QueryParamPipe) queryParams: any,
    @Res() res: Response,
    @GetUser() user: UserDocument,
  ) {
    return this.productionService.findAll(queryParams, user, res);
  }

  @Post('update/:productionId')
  update(
    @Param('productionId', ObjectIdPipe, ProductionIdPipe) production: ProductionDocument,
    @Body() updateProductionDto: UpdateProductionDto,
    @GetUser() user: UserDocument,
    @Res() res: Response,
  ) {
    return this.productionService.update(user, production, updateProductionDto, res);
  }

  @Get('delete/:productionId')
  remove(
    @Param('productionId', ObjectIdPipe, ProductionIdPipe) production: ProductionDocument,
    @Res() res: Response
  ) {
    return this.productionService.remove(production, res);
  }
}
