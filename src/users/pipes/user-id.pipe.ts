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
  
  /**
   * UserId validation by get user from users collection.
   * 
   * @param userId user id
   * @param metadata metadata
   * @returns user document if the user is found
   */
  async transform(userId: string, metadata: ArgumentMetadata) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new NotFoundException('خطأ في معرف المستخدم.');
    return user;
  }
}
