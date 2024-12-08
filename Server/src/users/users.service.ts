import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

/**
 * Service for user operations.
 */
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private usersModel: Model<User>) {}

  /**
   * Creates a new user.
   * @param user The user who is creating the new user.
   * @param createUserDto The data for the new user.
   * @returns The new user.
   */
  create(user: UserDocument, createUserDto: CreateUserDto) {
    const inputData: User = {
      ...createUserDto,
      createdBy: user._id,
      updatedBy: user._id
    }
    return this.usersModel.create(inputData);
  }

  findAll() {
    return this.usersModel.find();
  }

  findOne(username: string) {
    return this.usersModel.findOne({ username });
  }

  update(user: UserDocument, updateUserDto: UpdateUserDto) {
    const inputData: Partial<User> = {
      ...updateUserDto,
      updatedBy: user._id
    }
    return user.updateOne(inputData);
  }

  remove(user: UserDocument) {
    return user.deleteOne();
  }
}
