import { ForbiddenException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from './auth.service';

/**
 * Local Strategy for Passport.
 * 
 * Validates user login credentials (email and password).
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  /**
   * Verifies the user's username and password.
   * Throws `ForbiddenException` if the user is not found.
   * 
   * @param username user's username
   * @param password user's password
   * @returns user document if the user is found
   */
  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);
    if (!user) throw new ForbiddenException("خطأ في إسم المستخدم أو كلمة المرور");
    return user;
  }
}