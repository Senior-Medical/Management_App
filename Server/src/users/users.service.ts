import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private usersModel: Model<User>) {}

  create(createUserDto: CreateUserDto) {
    return this.usersModel.create(createUserDto);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(username: string) {
    return this.usersModel.findOne({ username });
  }

  update(username: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${username} user`;
  }

  remove(username: string) {
    return `This action removes a #${username} user`;
  }
}
