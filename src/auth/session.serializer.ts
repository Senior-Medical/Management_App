import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: any, done: (err: Error | null, id?: any) => void): void {
    done(null, user._id);
  }

  async deserializeUser(userId: string, done: (err: Error | null, user?: any) => void) {
    const user = await this.usersService.findById(userId);
    done(null, user);
  }
}
