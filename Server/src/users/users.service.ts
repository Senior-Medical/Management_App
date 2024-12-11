import { ConflictException, Injectable, Req, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { Request, Response } from 'express';
import { FindQueryBuilder } from 'src/utils/shared/builders/findQuery.builder';
import { DashboardRenderVariablesType } from './types/render-variables.type';
import { pagesTitles, PagesTypes } from 'src/dashboard/enums/pagesTypes.enum';

/**
 * Service for user operations.
 */
@Injectable()
export class UsersService {
  private queryBuilder: FindQueryBuilder | null = null;
  private searchableKeys: string[] = ["username"];

  constructor(@InjectModel(User.name) private usersModel: Model<User>) {}

  /**
   * Get query builder to use it in find method
   * @returns - The query builder instance
   */
  private getQueryBuilder() {
    if (!this.queryBuilder) this.queryBuilder = new FindQueryBuilder(this.usersModel.find());
    else this.queryBuilder.setQuery(this.usersModel.find());
    return this.queryBuilder;
  }

  /**
   * Creates a new user.
   * @param user The user who is creating the new user.
   * @param createUserDto The data for the new user.
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
   * Find all users.
   * @param queryParams The query parameters.
   * @param req The request.
   * @param res The response.
   * @returns The users.
   */
  async findAll(queryParams: any, @Req() req: Request, @Res() res: Response) {
    const queryBuilder = this.getQueryBuilder();
    const filters = { page: queryParams.page || 1 };
    queryBuilder.filter(queryParams);
    queryBuilder.paginate(queryParams.page, queryParams.pageSize);
    if (queryParams.fields) queryBuilder.selectFields(queryParams.fields);
    if (queryParams.sort) {
      queryBuilder.sort(queryParams.sort);
      filters['sort'] = queryParams.sort;
    }
    else {
      queryBuilder.sort('-createdAt');
      filters['sort'] = '-createdAt';
    }
    if (queryParams.search) {
      queryBuilder.search(this.searchableKeys, queryParams.search);
      filters['search'] = queryParams.search;
    }
    
    const users = await queryBuilder.build().populate('createdBy', 'username').populate('updatedBy', 'username');

    const renderVariables: DashboardRenderVariablesType = {
      title: pagesTitles[PagesTypes.USERS],
      type: PagesTypes.USERS,
      data: users,
      user: req.user as UserDocument,
      filters: filters
    };
    return res.render(`dashboard`, renderVariables);
  }

  findById(id: string) {
    return this.usersModel.findById(id);
  }

  findByUsername(username: string) {
    return this.usersModel.findOne({ username });
  }

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
    return res.redirect('/users');
  }

  async remove(user: UserDocument, res: Response) {
    await user.deleteOne();
    return res.redirect('/users');
  }
}
