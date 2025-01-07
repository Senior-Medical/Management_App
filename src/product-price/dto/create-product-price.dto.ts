import { Transform } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsNumber } from "class-validator";
import { Types } from "mongoose";

export class CreateProductPriceDto {
  @Transform(({value}) => parseInt(value))
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsMongoId()
  product: Types.ObjectId;
  
  @IsNotEmpty()
  @IsMongoId()
  department: Types.ObjectId;
}
