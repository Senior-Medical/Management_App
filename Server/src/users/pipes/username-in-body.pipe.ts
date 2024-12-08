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
    if (username) {
      const user = await this.usersService.findOne(username);
      if (user) throw new ConflictException('Email, phone or username are already exist.');
    }
    return body;
  }
}
