import { ConflictException, Injectable } from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UserDocument } from 'src/users/entities/user.entity';
import { Response } from 'express';
import { Worker, WorkerDocument } from './entities/worker.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, RootFilterQuery } from 'mongoose';
import { FindQueryBuilderService } from 'src/utils/builders/find-query-builder.service';
import { QueryDto } from 'src/utils/dtos/query.dto';
import { DashboardRenderVariablesType } from 'src/users/types/render-variables.type';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class WorkersService {
  private queryBuilder: FindQueryBuilderService | null = null;
  private searchableKeys: string[] = [
    "name",
    "createdAtArabic",
    "updatedAtArabic"
  ];

  constructor(
    @InjectModel(Worker.name) private workersModel: Model<Worker>,
    private readonly usersService: UsersService
  ) { }

  /**
   * Create a new worker.
   * @param user The user who is creating the new worker.
   * @param createWorkerDto The data for the new worker.
   * @param res The response object.
   * @redirect The workers page.
   */
  async create(user: UserDocument, createWorkerDto: CreateWorkerDto, res: Response) {
    const { name } = createWorkerDto;
    const existWorker = await this.findByName(name);
    if (existWorker) throw new ConflictException('إسم العامل موجود بالفعل');

    const inputDate: Worker = {
      ...createWorkerDto,
      createdBy: user._id,
      updatedBy: user._id,
    }
    await this.workersModel.create(inputDate);
    return res.redirect('/workers');
  }

  /**
   * Get query builder to use it in find method
   * @returns - The query builder instance
   */
  private getQueryBuilder(queryParams: QueryDto, filter: RootFilterQuery<Worker> = {}) {
    const query = this.workersModel.find(filter);
    if (!this.queryBuilder) this.queryBuilder = new FindQueryBuilderService(query, queryParams);
    else this.queryBuilder.resetParameters(query, queryParams);
    return this.queryBuilder;
  }

  /**
   * Find all workers.
   * @param queryParams The query parameters.
   * @param user The user who is get workers.
   * @param res The response.
   * @render The workers page.
   */
  async findAll(queryParams: QueryDto, user: UserDocument, res: Response) {
    const queryBuilder = this.getQueryBuilder(queryParams);
    const workers = await queryBuilder
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
      data: workers,
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
    return res.render(`workers`, renderVariables);
  }

  /**
   * Find worker by id.
   * @param id The worker id.
   * @returns The worker.
   */
  findById(id: string) {
    return this.workersModel.findById(id);
  }

  /**
   * Find worker by name.
   * @param name The worker name.
   * @returns The worker.
   */
  findByName(name: string) {
    return this.workersModel.findOne({ name });
  }

  /**
   * Update worker.
   * @param user The user who is updating the worker.
   * @param worker The worker who is wanted to be updated.
   * @param updateWorkerDto The data to update the worker.
   * @param res The response object.
   * @redirect To the workers page.
   * @throws ConflictException if the name is already exist.
   */
  async update(user: UserDocument, worker: WorkerDocument, updateWorkerDto: CreateWorkerDto, res: Response) {
    const existWorker = await this.findByName(updateWorkerDto.name);
    if (existWorker && existWorker._id.toString() !== worker._id.toString()) throw new ConflictException('إسم العامل موجود بالفعل');
    
    const inputData: Partial<Worker> = {
      ...updateWorkerDto,
      updatedBy: user._id
    }

    await worker.set(inputData).save();
    return res.redirect('/workers?sort=-updatedAt');
  }

  /**
   * Remove worker.
   * @param user The user who is removing the worker.
   * @param res The response object.
   * @redirect To the workers page.
   */
  async remove(worker: WorkerDocument, res: Response) {
    await worker.deleteOne();
    return res.redirect('/workers');
  }
}
