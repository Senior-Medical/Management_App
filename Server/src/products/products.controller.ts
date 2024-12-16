import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  Query
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { UserDocument } from 'src/users/entities/user.entity';
import { QueryParamPipe } from 'src/utils/pipes/queryParam.pipe';
import { ProductDocument } from './entities/product.entity';
import { ObjectIdPipe } from 'src/utils/pipes/ObjectId.pipe';
import { ProductIdPipe } from './pipes/product-id.pipe';
import { Response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(
    @Res() res: Response,
    @GetUser() user: UserDocument,
    @Body() createProductDto: CreateProductDto
  ) {
    return this.productsService.create(user, createProductDto, res);
  }

  @Get()
  findAll(
    @Query(QueryParamPipe) queryParams: any,
    @Res() res: Response,
    @GetUser() user: UserDocument,
  ) {
    return this.productsService.findAll(queryParams, user, res);
  }

  @Post('update/:productId')
  update(
    @Param('productId', ObjectIdPipe, ProductIdPipe) product: ProductDocument,
    @Body() updateProductDto: CreateProductDto,
    @GetUser() user: UserDocument,
    @Res() res: Response,
  ) {
    return this.productsService.update(user, product, updateProductDto, res);
  }

  @Get('delete/:productId')
  remove(
    @Param('productId', ObjectIdPipe, ProductIdPipe) product: ProductDocument,
    @Res() res: Response
  ) {
    return this.productsService.remove(product, res);
  }
}
