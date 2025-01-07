import { IsString, Matches } from "class-validator";

export class CreateUserDto {
  @IsString()
  @Matches(/^[\s\S]{3,}$/, {
    message: "اسم المستخدم يجب أن يحتوي على 3 أحرف على الأقل"
  })
  username: string;

  @IsString()
  @Matches(/^(?=.*[ء-يa-z])(?=.*\d)[ء-يa-z\d]{6,}$/, {
    message: "كلمة المرور يجب أن تحتوي على حرف عربي أو حرف إنجليزي صغير، وأرقام، وأن تكون مكونة من 6 أحرف على الأقل"
  })
  password: string;
}
