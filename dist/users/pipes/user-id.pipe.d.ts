import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { UsersService } from '../users.service';
export declare class UserIdPipe implements PipeTransform {
    private readonly usersService;
    constructor(usersService: UsersService);
    transform(userId: string, metadata: ArgumentMetadata): Promise<any>;
}
