import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { ObjectIdPipe } from 'src/utils/pipes/ObjectId.pipe';
import { QueryParamPipe } from 'src/utils/pipes/queryParam.pipe';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDocument } from './entities/user.entity';
import { Role } from './enums/roles.enum';
import { UserIdPipe } from './pipes/user-id.pipe';
import { UsersService } from './users.service';

@Controller('users')
@Roles(Role.ADMIN)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Res() res: Response,
    @GetUser() user: UserDocument,
    @Body() createUserDto: CreateUserDto
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

  @Post('update/:userId')
  update(
    @Res() res: Response,
    @GetUser() user: UserDocument,
    @Param('userId', ObjectIdPipe, UserIdPipe) wantedUser: UserDocument,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(user, wantedUser, updateUserDto, res);
  }

  @Get('delete/:userId')
  remove(
    @Res() res: Response,
    @Param('userId', ObjectIdPipe, UserIdPipe) user: UserDocument
  ) {
    return this.usersService.remove(user, res);
  }
}
