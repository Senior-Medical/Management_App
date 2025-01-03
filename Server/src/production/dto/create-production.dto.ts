import { Transform } from "class-transformer";
import { IsDate, IsInt, IsMongoId, IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class CreateProductionDto {
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  quantity: number;

  @IsNotEmpty()
  @IsMongoId()
  product: Types.ObjectId;
  
  @IsNotEmpty()
  @IsMongoId()
  worker: Types.ObjectId;
  
  @IsNotEmpty()
  @IsMongoId()
  department: Types.ObjectId;
}
