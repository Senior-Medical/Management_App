import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
export declare class SessionSerializer extends PassportSerializer {
    private readonly usersService;
    constructor(usersService: UsersService);
    serializeUser(user: any, done: (err: Error | null, id?: any) => void): void;
    deserializeUser(userId: string, done: (err: Error | null, user?: any) => void): Promise<void>;
}
