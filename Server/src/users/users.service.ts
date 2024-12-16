import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model, RootFilterQuery } from 'mongoose';
import { FindQueryBuilderService } from 'src/utils/builders/find-query-builder.service';
import { QueryDto } from 'src/utils/dtos/query.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { DashboardRenderVariablesType } from './types/render-variables.type';

/**
 * Service for user operations.
 */
@Injectable()
export class UsersService {
  private queryBuilder: FindQueryBuilderService | null = null;
  private searchableKeys: string[] = [
    "username",
    "role",
    "createdAtArabic",
    "updatedAtArabic"
  ];

  constructor(@InjectModel(User.name) private usersModel: Model<User>) {}

  /**
   * Creates a new user.
   * @param user The user who is creating the new user.
   * @param createUserDto The data for the new user.
   * @param res The response object.
   * @redirect To the users page.
   */
  async create(user: UserDocument, createUserDto: CreateUserDto, res: Response) {
    let { username } = createUserDto;
    const existUser = await this.findByName(username);
    if (existUser) throw new ConflictException('إسم المستخدم موجود بالفعل');

    const inputData: User = {
      ...createUserDto,
      createdBy: user._id,
      updatedBy: user._id
    };
    await this.usersModel.create(inputData);
    return res.redirect('/users');
  }

  /**
   * Find all users depend on some filters.
   * @param filters The filters to find the users.
   * @returns The users.
   */
  find(filters: RootFilterQuery<User> = {}) {
    return this.usersModel.find(filters);
  }

  /**
   * Get query builder to use it in find method
   * @returns - The query builder instance
   */
  private getQueryBuilder(queryParams: QueryDto, filter: RootFilterQuery<User> = {}) {
    const query = this.usersModel.find(filter);
    if (!this.queryBuilder) this.queryBuilder = new FindQueryBuilderService(query, queryParams);
    else this.queryBuilder.resetParameters(query, queryParams);
    return this.queryBuilder;
  }

  /**
   * Find all users.
   * @param queryParams The query parameters.
   * @param user The user who is get users.
   * @param res The response.
   * @render The users page.
   */
  async findAll(queryParams: QueryDto, user: UserDocument, res: Response) {
    const queryBuilder = this.getQueryBuilder(queryParams);
    const users = await queryBuilder
      .filter()
      .search(this.searchableKeys)
      .sort()
      .paginate()
      .build()
      .populate('createdBy', 'username')
      .populate('updatedBy', 'username');

    const { page, pageSize, sort, search, error, ...filter } = queryParams;
    const renderVariables: DashboardRenderVariablesType = {
      error: queryParams.error || null,
      data: users,
      user,
      users: await this.usersModel.find({ role: 'مدير' }),
      filters: {
        search: queryBuilder.getSearchKey(),
        sort: queryBuilder.getSortKey(),
        pagination: {
          page: queryBuilder.getPage(),
          totalPages: await queryBuilder.getTotalPages(),
          pageSize: queryBuilder.getPageSize()
        },
        filter: Object.entries(filter).map(([key, value]) => ({ key, value }))
      }
    };
    return res.render(`users`, renderVariables);
  }

  /**
   * Find user by id.
   * @param id The user id.
   * @returns The user.
   */
  findById(id: string) {
    return this.usersModel.findById(id);
  }

  /**
   * Find user by username.
   * @param username The username.
   * @returns The user.
   */
  findByName(username: string) {
    return this.usersModel.findOne({ username });
  }

  /**
   * Update user.
   * @param user The user who is updating the user.
   * @param wantedUser The user who is wanted to be updated.
   * @param updateUserDto The data to update the user.
   * @param res The response object.
   * @redirect To the users page.
   * @throws ConflictException if the username is already exist.
   */
  async update(user: UserDocument, wantedUser: UserDocument, updateUserDto: UpdateUserDto, res: Response) {
    if (updateUserDto.username) {
      const existUser = await this.findByName(updateUserDto.username);
      if (existUser && existUser._id.toString() !== wantedUser._id.toString()) throw new ConflictException('إسم المستخدم موجود بالفعل');
    } else delete updateUserDto.username;
    if (!updateUserDto.password) delete updateUserDto.password;
    const inputData: Partial<User> = {
      ...updateUserDto,
      updatedBy: user._id
    }

    await wantedUser.set(inputData).save();
    return res.redirect('/users?sort=-updatedAt');
  }

  /**
   * Remove user.
   * @param user The user who is removing the user.
   * @param res The response object.
   * @returns The removed user.
   */
  async remove(user: UserDocument, res: Response) {
    await user.deleteOne();
    return res.redirect('/users');
  }
}
