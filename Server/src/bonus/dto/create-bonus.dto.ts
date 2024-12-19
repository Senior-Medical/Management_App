import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";
import { Transform } from 'class-transformer';

export class CreateBonusDto {
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsNotEmpty()
  from: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsNotEmpty()
  to: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  percentage: number;
}