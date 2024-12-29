import { Transform } from "class-transformer";
import { IsBoolean, IsDate, IsNotEmpty, IsOptional } from "class-validator";

export class GetSalaryDto {
  @Transform(({ value }) => {
    const date = new Date(value);
    return date;
  })
  @IsDate()
  @IsNotEmpty()
  from: Date;

  @Transform(({ value }) => {
    const date = new Date(value);
    return date;
  })
  @IsDate()
  @IsNotEmpty()
  to: Date;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  withBonus?: boolean;
}
