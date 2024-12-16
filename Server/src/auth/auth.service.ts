import { Injectable } from "@nestjs/common";
import { EncryptionService } from "src/utils/encryption/encryption.service";
import { UsersService } from '../users/users.service';

/**
 * AuthService handles the authentication logic for user login.
 */
@Injectable()
export class AuthService{
  constructor(
    private readonly usersService: UsersService,
    private readonly encryptionService: EncryptionService,
  ) { }

  /**
   * Validates the user's username and password, ensuring the user exists, 
   * and the password matches the stored hashed value.
   * 
   * @param username - The username used for login.
   * @param password - The plain-text password to compare.
   * @returns - The user object if validation is successful.
   */
  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) return null;
    const match = await this.encryptionService.bcryptCompare(password, user.password);
    if (!match) return null;
    return user;
  }
}