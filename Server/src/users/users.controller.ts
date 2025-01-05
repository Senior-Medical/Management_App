import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Redirect,
  Render,
} from '@nestjs/common';
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
  @Redirect('/users')
  create(
    @GetUser() user: UserDocument,
    @Body() createUserDto: CreateUserDto
  ) {
    return this.usersService.create(createUserDto, user);
  }

  @Get()
  @Render('dashboard')
  findAll(
    @Query(QueryParamPipe) queryParams: any,
    @GetUser() user: UserDocument,
  ) {
    return this.usersService.findAll(queryParams, user);
  }

  @Post('update/:userId')
  @Redirect('/users?sort=-updatedAt')
  update(
    @GetUser() user: UserDocument,
    @Param('userId', ObjectIdPipe, UserIdPipe) wantedUser: UserDocument,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(wantedUser, updateUserDto, user);
  }

  @Get('delete/:userId')
  @Redirect('/users')
  remove(
    @Param('userId', ObjectIdPipe, UserIdPipe) user: UserDocument
  ) {
    return this.usersService.remove(user);
  }
}
