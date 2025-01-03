import { ConflictException, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { BaseService } from 'src/utils/classes/base.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

/**
 * Service for user operations.
 */
@Injectable()
export class UsersService extends BaseService {
  searchableKeys: string[] = [
    "username",
    "role"
  ];

  constructor(
    @InjectModel(User.name) private usersModel: Model<User>,
    @InjectConnection() private readonly connection: Connection,
  ) {
    super();
  }

  /**
   * Get the module model.
   * @returns The user model.
   */
  getModuleModel() {
    return this.usersModel;
  }

  /**
   * Get additional render variables for the dashboard.
   * @returns The additional render variables.
   */
  async getAdditionalRenderVariables() {
    return {
      users: await this.usersModel.find({ role: 'مدير' })
    }
  }

  /**
   * Creates a new user.
   * @param createUserDto The data for the new user.
   * @param user The user who is creating the new user.
   */
  async create(createDto: CreateUserDto, user: UserDocument) {
    let { username } = createDto;
    const existUser = await this.findOne({ username });
    if (existUser) throw new ConflictException('إسم المستخدم موجود بالفعل');

    const inputData: User = {
      ...createDto,
      createdBy: user._id,
      updatedBy: user._id
    };
    await this.usersModel.create(inputData);
  }

  /**
   * Update user.
   * @param wantedUser The user who is wanted to be updated.
   * @param updateUserDto The data to update the user.
   * @param user The user who is updating the user.
   * @throws ConflictException if the username is already exist.
   */
  async update(wantedUser: UserDocument, updateDto: UpdateUserDto, user: UserDocument) {
    if (updateDto.username) {
      const existUser = await this.findOne({ username: updateDto.username });
      if (existUser && existUser._id.toString() !== wantedUser._id.toString()) throw new ConflictException('إسم المستخدم موجود بالفعل');
    } else delete updateDto.username;
    if (!updateDto.password) delete updateDto.password;
    const inputData: Partial<User> = {
      ...updateDto,
      updatedBy: user._id
    }

    await wantedUser.set(inputData).save();
  }
}
