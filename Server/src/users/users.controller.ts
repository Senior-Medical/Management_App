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
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { GetObjectFromRequestDecorator } from 'src/utils/shared/decorators/getObjectFromRequest.decorator';
import { Roles } from 'src/utils/shared/decorators/roles.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDocument } from './entities/user.entity';
import { Role } from './enums/roles.enum';
import { UsersService } from './users.service';
import { UsernameInBodyPipe } from './pipes/username-in-body.pipe';
import { UserIdPipe } from './pipes/user-id.pipe';
import { Request, Response } from 'express';
import { ObjectIdPipe } from 'src/utils/shared/pipes/ObjectId.pipe';
import { QueryParamPipe } from 'src/utils/shared/pipes/queryParam.pipe';

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
    return this.usersService.create(user, createUserDto, res);
  }

  @Get()
  async findAll(
    @Query(QueryParamPipe) queryParams: any,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    return this.usersService.findAll(queryParams, req, res);
  }

  @Get(':userId')
  findOne(@Param('userId', ObjectIdPipe, UserIdPipe) user: UserDocument) {
    return user;
  }

  @Post('/update/:userId')
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Res() res: Response,
    @GetObjectFromRequestDecorator('user') user: UserDocument,
    @Param('userId', ObjectIdPipe, UserIdPipe) wantedUser: UserDocument,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(user, wantedUser, updateUserDto, res);
  }

  @Get('/delete/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Res() res: Response,
    @Param('userId', ObjectIdPipe, UserIdPipe) user: UserDocument
  ) {
    return this.usersService.remove(user, res);
  }
}
