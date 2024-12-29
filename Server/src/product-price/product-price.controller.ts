import { Controller, Get, Post, Body, Param, Res, Query } from '@nestjs/common';
import { ProductPriceService } from './product-price.service';
import { CreateProductPriceDto } from './dto/create-product-price.dto';
import { UpdateProductPriceDto } from './dto/update-product-price.dto';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { UserDocument } from 'src/users/entities/user.entity';
import { Response } from 'express';
import { ObjectIdPipe } from 'src/utils/pipes/ObjectId.pipe';
import { ProductPriceIdPipe } from './pipes/product-price-id.pipe';
import { ProductPriceDocument } from './entities/product-price.entity';
import { QueryParamPipe } from 'src/utils/pipes/queryParam.pipe';

@Controller('productPrice')
export class ProductPriceController {
  constructor(private readonly productPriceService: ProductPriceService) {}

  @Post()
  create(
    @Body() createProductPriceDto: CreateProductPriceDto,
    @GetUser() user: UserDocument,
    @Res() res: Response
  ) {
    return this.productPriceService.create(createProductPriceDto, user, res);
  }

  @Get()
  findAll(
    @Query(QueryParamPipe) queryParams: any,
    @GetUser() user: UserDocument,
    @Res() res: Response
  ) {
    return this.productPriceService.findAll(queryParams, user, res);
  }

  @Post('update/:productPriceId')
  update(
    @Param('productPriceId', ObjectIdPipe, ProductPriceIdPipe) productPrice: ProductPriceDocument,
    @Body() updateProductPriceDto: UpdateProductPriceDto,
    @GetUser() user: UserDocument,
    @Res() res: Response
  ) {
    return this.productPriceService.update(user, productPrice, updateProductPriceDto, res);
  }

  @Get('delete/:productPriceId')
  remove(
    @Param('productPriceId', ObjectIdPipe, ProductPriceIdPipe) productPrice: ProductPriceDocument,
    @Res() res: Response
  ) {
    return this.productPriceService.remove(productPrice, res);
  }
}
