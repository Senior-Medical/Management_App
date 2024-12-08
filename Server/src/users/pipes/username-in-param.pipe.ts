import {
  ArgumentMetadata,
  ConflictException,
  Injectable,
  NotFoundException,
  PipeTransform
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dtos/create-user.dto';

/**
 * Validates username if exist.
 */
@Injectable()
export class UsernameInParamPipe implements PipeTransform {
  constructor(private readonly usersService: UsersService) { }
  
  async transform(username: string, metadata: ArgumentMetadata) {
    const user = await this.usersService.findOne(username);
    if (!user) throw new NotFoundException('Invalid username.');
    return user;
  }
}
