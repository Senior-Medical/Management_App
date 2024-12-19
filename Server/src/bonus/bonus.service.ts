import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model, RootFilterQuery } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';
import { DashboardRenderVariablesType } from 'src/users/types/render-variables.type';
import { UsersService } from 'src/users/users.service';
import { FindQueryBuilderService } from 'src/utils/builders/find-query-builder.service';
import { QueryDto } from 'src/utils/dtos/query.dto';
import { Bonus, BonusDocument } from './entities/bonus.entity';
import { CreateBonusDto } from './dto/create-bonus.dto';
import { UpdateBonusDto } from './dto/update-bonus.dto';


@Injectable()
export class BonusService {
  private queryBuilder: FindQueryBuilderService | null = null;
  private searchableKeys: string[] = [
    "from",
    "to",
    "percentage",
    "createdAtArabic",
    "updatedAtArabic"
  ];

  constructor(
    @InjectModel(Bonus.name) private BonusModel: Model<Bonus>,
    private readonly usersService: UsersService
  ) { }

  /**
   * Create a new bonus.
   * @param user The user who is creating the new bonus.
   * @param createBonusDto The data for the new bonus.
   * @param res The response object.
   * @redirect The bonus page.
   */
  async create(user: UserDocument, createBonusDto: CreateBonusDto, res: Response) {
    const inputDate: Bonus = {
      from: createBonusDto.from.toString(),
      to: createBonusDto.to.toString(),
      percentage: createBonusDto.percentage.toString(),
      createdBy: user._id,
      updatedBy: user._id,
    }
    await this.BonusModel.create(inputDate);
    return res.redirect('/bonus');
  }

  /**
   * Get query builder to use it in find method
   * @returns - The query builder instance
   */
  private getQueryBuilder(queryParams: QueryDto, filter: RootFilterQuery<Bonus> = {}) {
    const query = this.BonusModel.find(filter);
    if (!this.queryBuilder) this.queryBuilder = new FindQueryBuilderService(query, queryParams);
    else this.queryBuilder.resetParameters(query, queryParams);
    return this.queryBuilder;
  }

  /**
   * Find all Bonus.
   * @param queryParams The query parameters.
   * @param user The user who is get Bonus.
   * @param res The response.
   * @render The Bonus page.
   */
  async findAll(queryParams: QueryDto, user: UserDocument, res: Response) {
    const queryBuilder = this.getQueryBuilder(queryParams);
    const Bonus = await queryBuilder
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
      data: Bonus,
      user,
      users: await this.usersService.find(),
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
    return res.render(`bonus`, renderVariables);
  }

  /**
   * Find Bonus by id.
   * @param id The Bonus id.
   * @returns The Bonus.
   */
  findById(id: string) {
    return this.BonusModel.findById(id);
  }

  /**
   * Update Bonus.
   * @param user The user who is updating the Bonus.
   * @param Bonus The Bonus who is wanted to be updated.
   * @param updateBonusDto The data to update the Bonus.
   * @param res The response object.
   * @redirect To the Bonus page.
   * @throws ConflictException if the name is already exist.
   */
  async update(user: UserDocument, bonus: BonusDocument, updateBonusDto: UpdateBonusDto, res: Response) {
    const inputData: Partial<Bonus> = {
      from: updateBonusDto.from.toString() || bonus.from,
      to: updateBonusDto.to.toString() || bonus.to,
      percentage: updateBonusDto.percentage.toString() || bonus.percentage,
      updatedBy: user._id
    }

    await bonus.set(inputData).save();
    return res.redirect('/bonus?sort=-updatedAt');
  }

  /**
   * Remove Bonus.
   * @param user The user who is removing the Bonus.
   * @param res The response object.
   * @redirect To the Bonus page.
   */
  async remove(Bonus: BonusDocument, res: Response) {
    await Bonus.deleteOne();
    return res.redirect('/bonus');
  }
}
