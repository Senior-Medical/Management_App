import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model, RootFilterQuery } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';
import { DashboardRenderVariablesType } from 'src/users/types/render-variables.type';
import { UsersService } from 'src/users/users.service';
import { FindQueryBuilderService } from 'src/utils/builders/find-query-builder.service';
import { QueryDto } from 'src/utils/dtos/query.dto';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { Department, DepartmentDocument } from './entities/department.entity';

@Injectable()
export class DepartmentsService {
  private queryBuilder: FindQueryBuilderService | null = null;
  private searchableKeys: string[] = [
    "name",
    "createdAtArabic",
    "updatedAtArabic"
  ];

  constructor(
    @InjectModel(Department.name) private departmentsModel: Model<Department>,
    private readonly usersService: UsersService
  ) { }

  /**
   * Create a new department.
   * @param user The user who is creating the new department.
   * @param createDepartmentDto The data for the new department.
   * @param res The response object.
   * @redirect The departments page.
   */
  async create(user: UserDocument, createDepartmentDto: CreateDepartmentDto, res: Response) {
    const { name } = createDepartmentDto;
    const existDepartments = await this.findByName(name);
    if (existDepartments) throw new ConflictException('إسم القسم موجود بالفعل');

    const inputDate: Department = {
      ...createDepartmentDto,
      createdBy: user._id,
      updatedBy: user._id,
    }
    await this.departmentsModel.create(inputDate);
    return res.redirect('/departments');
  }

  /**
   * Get query builder to use it in find method
   * @returns - The query builder instance
   */
  private getQueryBuilder(queryParams: QueryDto, filter: RootFilterQuery<Department> = {}) {
    const query = this.departmentsModel.find(filter);
    if (!this.queryBuilder) this.queryBuilder = new FindQueryBuilderService(query, queryParams);
    else this.queryBuilder.resetParameters(query, queryParams);
    return this.queryBuilder;
  }

  /**
   * Find all departments.
   * @param queryParams The query parameters.
   * @param user The user who is get departments.
   * @param res The response.
   * @render The departments page.
   */
  async findAll(queryParams: QueryDto, user: UserDocument, res: Response) {
    const queryBuilder = this.getQueryBuilder(queryParams);
    const departments = await queryBuilder
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
      data: departments,
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
    return res.render(`departments`, renderVariables);
  }

  /**
   * Find all departments depend on some filters.
   * @param filters The filters to find the departments.
   * @returns All departments.
   */
  find(filters: RootFilterQuery<Department> = {}) {
    return this.departmentsModel.find(filters);
  }

  /**
   * Find department by id.
   * @param id The department id.
   * @returns The department.
   */
  findById(id: string) {
    return this.departmentsModel.findById(id);
  }

  /**
   * Find department by name.
   * @param name The department name.
   * @returns The department.
   */
  findByName(name: string) {
    return this.departmentsModel.findOne({ name });
  }

  /**
   * Update department.
   * @param user The user who is updating the department.
   * @param department The department who is wanted to be updated.
   * @param updateDepartmentDto The data to update the department.
   * @param res The response object.
   * @redirect To the departments page.
   * @throws ConflictException if the name is already exist.
   */
  async update(user: UserDocument, department: DepartmentDocument, updateDepartmentDto: CreateDepartmentDto, res: Response) {
    const existDepartment = await this.findByName(updateDepartmentDto.name);
    if (existDepartment && existDepartment._id.toString() !== department._id.toString()) throw new ConflictException('إسم القسم موجود بالفعل');
    
    const inputData: Partial<Department> = {
      ...updateDepartmentDto,
      updatedBy: user._id
    }

    await department.set(inputData).save();
    return res.redirect('/departments?sort=-updatedAt');
  }

  /**
   * Remove department.
   * @param user The user who is removing the department.
   * @param res The response object.
   * @redirect To the departments page.
   */
  async remove(department: DepartmentDocument, res: Response) {
    await department.deleteOne();
    return res.redirect('/departments');
  }
}
