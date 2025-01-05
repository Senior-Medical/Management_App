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
import { ProductPriceService } from './product-price.service';
import { CreateProductPriceDto } from './dto/create-product-price.dto';
import { UpdateProductPriceDto } from './dto/update-product-price.dto';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { UserDocument } from 'src/users/entities/user.entity';
import { ObjectIdPipe } from 'src/utils/pipes/ObjectId.pipe';
import { ProductPriceIdPipe } from './pipes/product-price-id.pipe';
import { ProductPriceDocument } from './entities/product-price.entity';
import { QueryParamPipe } from 'src/utils/pipes/queryParam.pipe';

@Controller('productPrice')
export class ProductPriceController {
  constructor(private readonly productPriceService: ProductPriceService) {}

  @Post()
  @Redirect('/productPrice')
  create(
    @Body() createProductPriceDto: CreateProductPriceDto,
    @GetUser() user: UserDocument,
  ) {
    return this.productPriceService.create(createProductPriceDto, user);
  }

  @Get()
  @Render('dashboard')
  findAll(
    @Query(QueryParamPipe) queryParams: any,
    @GetUser() user: UserDocument,
  ) {
    return this.productPriceService.findAll(queryParams, user);
  }

  @Post('update/:productPriceId')
  @Redirect('/productPrice?sort=-updatedAt')
  update(
    @Param('productPriceId', ObjectIdPipe, ProductPriceIdPipe) productPrice: ProductPriceDocument,
    @Body() updateProductPriceDto: UpdateProductPriceDto,
    @GetUser() user: UserDocument,
  ) {
    return this.productPriceService.update(productPrice, updateProductPriceDto, user);
  }

  @Get('delete/:productPriceId')
  @Redirect('/productPrice')
  remove(
    @Param('productPriceId', ObjectIdPipe, ProductPriceIdPipe) productPrice: ProductPriceDocument,
  ) {
    return this.productPriceService.remove(productPrice);
  }
}
