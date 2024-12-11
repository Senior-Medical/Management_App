import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform
} from '@nestjs/common';
import { UsersService } from '../users.service';

/**
 * Validates userId if exist.
 */
@Injectable()
export class UserIdPipe implements PipeTransform {
  constructor(private readonly usersService: UsersService) { }
  
  async transform(userId: string, metadata: ArgumentMetadata) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new NotFoundException('Invalid Id.');
    return user;
  }
}
