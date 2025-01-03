import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty } from "class-validator";

export class GetSalaryDto {
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  from: Date;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  to: Date;
}
