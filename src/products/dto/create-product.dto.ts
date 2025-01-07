import { IsString, Matches } from "class-validator";

export class CreateProductDto {
  @IsString()
  @Matches(/^[\s\S]{3,}$/, { message: 'الإسم يجب أن يكون 3 أحرف على الأقل' })
  name: string;
}
