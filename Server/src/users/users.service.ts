import { ConflictException, Injectable, Req, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response } from 'express';
import { Model } from 'mongoose';
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
  private searchableKeys: string[] = ["username"];

  constructor(@InjectModel(User.name) private usersModel: Model<User>) {}

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
   * Get query builder to use it in find method
   * @returns - The query builder instance
   */
  private getQueryBuilder(queryParams: QueryDto) {
    if (!this.queryBuilder) this.queryBuilder = new FindQueryBuilderService(this.usersModel.find(), queryParams);
    else this.queryBuilder.resetParameters(queryParams, this.usersModel.find());
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

    const renderVariables: DashboardRenderVariablesType = {
      title: pagesTitles[PagesTypes.USERS],
      type: PagesTypes.USERS,
      data: users,
      user: req.user as UserDocument,
      filters: {
        search: queryBuilder.getSearchKey(),
        sort: queryBuilder.getSortKey(),
        pagination: {
          page: queryBuilder.getPage(),
          totalPages: await queryBuilder.getTotalPages(),
          pageSize: queryBuilder.getPageSize()
        }
      }
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
    return res.redirect('/users?sort=-updatedAt');
  }

  async remove(user: UserDocument, res: Response) {
    await user.deleteOne();
    return res.redirect('/users');
  }
}
