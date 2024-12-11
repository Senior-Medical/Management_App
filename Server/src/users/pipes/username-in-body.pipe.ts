import {
  ArgumentMetadata,
  ConflictException,
  Injectable,
  PipeTransform
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dtos/create-user.dto';

/**
 * Validates user data to ensure uniqueness for username.
 */
@Injectable()
export class UsernameInBodyPipe implements PipeTransform {
  constructor(private readonly usersService: UsersService) { }
  
  async transform(body: CreateUserDto, metadata: ArgumentMetadata) {
    let { username } = body;
    const user = await this.usersService.findByUsername(username);
    if (user) throw new ConflictException('Username are already exist.');
    return body;
  }
}
