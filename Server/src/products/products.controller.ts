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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { UserDocument } from 'src/users/entities/user.entity';
import { QueryParamPipe } from 'src/utils/pipes/queryParam.pipe';
import { ProductDocument } from './entities/product.entity';
import { ObjectIdPipe } from 'src/utils/pipes/ObjectId.pipe';
import { ProductIdPipe } from './pipes/product-id.pipe';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Redirect('/products')
  create(
    @GetUser() user: UserDocument,
    @Body() createProductDto: CreateProductDto
  ) {
    return this.productsService.create(createProductDto, user);
  }

  @Get()
  @Render('dashboard')
  findAll(
    @Query(QueryParamPipe) queryParams: any,
    @GetUser() user: UserDocument,
  ) {
    return this.productsService.findAll(queryParams, user);
  }

  @Post('update/:productId')
  @Redirect('/products?sort=-updatedAt')
  update(
    @Param('productId', ObjectIdPipe, ProductIdPipe) product: ProductDocument,
    @Body() updateProductDto: CreateProductDto,
    @GetUser() user: UserDocument,
  ) {
    return this.productsService.update(product, updateProductDto, user);
  }

  @Get('delete/:productId')
  @Redirect('/products')
  remove(
    @Param('productId', ObjectIdPipe, ProductIdPipe) product: ProductDocument,
  ) {
    return this.productsService.remove(product);
  }
}
