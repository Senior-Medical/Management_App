import { Transform } from "class-transformer";
import { IsDate, IsInt, IsMongoId, IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class CreateProductionDto {
  @Transform(({ value }) => {
    const date = new Date(value);
    date.setTime(new Date().getTime())
    return date;
  })
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
