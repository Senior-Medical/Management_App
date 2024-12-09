import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res
} from '@nestjs/common';
import { GetObjectFromRequestDecorator } from 'src/utils/shared/decorators/getObjectFromRequest.decorator';
import { Roles } from 'src/utils/shared/decorators/roles.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDocument } from './entities/user.entity';
import { Role } from './enums/roles.enum';
import { UsersService } from './users.service';
import { UsernameInBodyPipe } from './pipes/username-in-body.pipe';
import { UsernameInParamPipe } from './pipes/username-in-param.pipe';
import { Request, Response } from 'express';

@Controller('users')
@Roles(Role.ADMIN)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Res() res: Response,
    @GetObjectFromRequestDecorator('user') user: UserDocument,
    @Body(UsernameInBodyPipe) createUserDto: CreateUserDto
  ) {
    await this.usersService.create(user, createUserDto);
    return res.redirect('/users');
  }

  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    const users = await this.usersService.findAll();
    return res.render('dashboard', {
      title: 'المشرفين',
      type: 'users',
      user: req.user,
      data: users,
    });
  }

  @Get(':username')
  findOne(@Param('username', UsernameInParamPipe) user: UserDocument) {
    return user;
  }

  @Patch(':username')
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Param('username', UsernameInParamPipe) user: UserDocument,
    @Body(UsernameInBodyPipe) updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(user, updateUserDto);
  }

  @Delete(':username')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('username', UsernameInParamPipe) user: UserDocument) {
    return this.usersService.remove(user);
  }
}
