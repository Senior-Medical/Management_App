import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: any, done: (err: Error | null, id?: any) => void): void {
    done(null, user.username);
  }

  async deserializeUser(username: string, done: (err: Error | null, user?: any) => void) {
    const user = await this.usersService.findOne(username);
    done(null, user);
  }
}
