import { IsEnum, IsString, Matches } from "class-validator";
import { Role } from "../enums/roles.enum";

export class CreateUserDto {
  @IsString()
  @Matches(/^[a-zA-Z0-9_]{3,16}$/, {
    message: "Username can contain letters, numbers, and underscores only, and must be between 3 and 16 characters long."
  })
  username: string;

  @IsString()
  @Matches(/^[a-zA-Z0-9_]{6,18}$/, {
    message: "Password can contain letters, numbers, and underscores only, and must be between 6 and 18 characters long."
  })
  password: string;

  @IsString()
  @IsEnum(Role)
  role: Role;
}
