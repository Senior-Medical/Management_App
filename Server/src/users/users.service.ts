import { ConflictException, Injectable, Req, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response } from 'express';
import { Model, RootFilterQuery } from 'mongoose';
import { pagesTitles, PagesTypes } from 'src/dashboard/enums/pagesTypes.enum';
import { FindQueryBuilderService } from 'src/utils/shared/builders/find-query-builder.service';
import { QueryDto } from 'src/utils/shared/dtos/query.dto';
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
   * @returns The new user.
   */
  async create(user: UserDocument, createUserDto: CreateUserDto, res: Response) {
    const inputData: User = {
      ...createUserDto,
      createdBy: user._id,
      updatedBy: user._id
    }
    await this.usersModel.create(inputData);
    return res.redirect('/users');
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
   * @param req The request.
   * @param res The response.
   * @returns The users.
   */
  async findAll(queryParams: QueryDto, @Req() req: Request, @Res() res: Response) {
    const queryBuilder = this.getQueryBuilder(queryParams);
    const users = await queryBuilder
      .filter()
      .search(this.searchableKeys)
      .sort()
      .paginate()
      .build()
      .populate('createdBy', 'username')
      .populate('updatedBy', 'username');

    const { page, pageSize, sort, search, ...filter } = queryParams;
    const renderVariables: DashboardRenderVariablesType = {
      title: pagesTitles[PagesTypes.USERS],
      type: PagesTypes.USERS,
      data: users,
      user: req.user as UserDocument,
      admins: await this.usersModel.find({ role: 'مدير' }),
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
    console.log(renderVariables.filters);
    return res.render(`dashboard`, renderVariables);
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
  findByUsername(username: string) {
    return this.usersModel.findOne({ username });
  }

  /**
   * Update user.
   * @param user The user who is updating the user.
   * @param wantedUser The user who is wanted to be updated.
   * @param updateUserDto The data to update the user.
   * @param res The response object.
   * @returns The updated user.
   * @throws ConflictException if the username is already exist.
   */
  async update(user: UserDocument, wantedUser: UserDocument, updateUserDto: UpdateUserDto, res: Response) {
    if (updateUserDto.username) {
      const user = await this.findByUsername(updateUserDto.username);
      if (user && user._id.toString() !== wantedUser._id.toString()) throw new ConflictException('Username are already exist.');
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
