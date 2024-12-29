import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductionDto } from './dto/create-production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';
import { Production, ProductionDocument } from './entities/production.entity';
import { Model, RootFilterQuery, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FindQueryBuilderService } from 'src/utils/builders/find-query-builder.service';
import { UsersService } from 'src/users/users.service';
import { UserDocument } from 'src/users/entities/user.entity';
import { Response } from 'express';
import { ProductPriceService } from '../product-price/product-price.service';
import { QueryDto } from 'src/utils/dtos/query.dto';
import { DashboardRenderVariablesType } from 'src/users/types/render-variables.type';
import { ProductsService } from 'src/products/products.service';
import { DepartmentsService } from 'src/departments/departments.service';
import { WorkersService } from 'src/workers/workers.service';
import { WorkerDocument } from 'src/workers/entities/worker.entity';
import { ProductDocument } from 'src/products/entities/product.entity';
import { DepartmentDocument } from 'src/departments/entities/department.entity';
import { GetSalaryDto } from './dto/get-salary.dto';
import { BonusService } from '../bonus/bonus.service';

@Injectable()
export class ProductionService {
  private queryBuilder: FindQueryBuilderService | null = null;
  private searchableKeys: string[] = [
    "arabicDate",
    "createdAtArabic",
    "updatedAtArabic"
  ];

  constructor(
    @InjectModel(Production.name) private productionModel: Model<Production>,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly workersService: WorkersService,
    private readonly departmentsService: DepartmentsService,
    private readonly productPriceService: ProductPriceService,
    private readonly bonusService: BonusService
  ) { }

  /**
   * Create a new Production.
   * @param user The user who is creating the new Production.
   * @param createProductionDto The data for the new Production.
   * @param res The response object.
   * @redirect The production page.
   */
  async create(user: UserDocument, createProductionDto: CreateProductionDto, res: Response) {
    const productPrice = await this.productPriceService.findByProductAndDepartment(createProductionDto.product, createProductionDto.department);
    if (!productPrice) throw new NotFoundException('يجب تحديد سعر المنتج لهذا القسم');
    const cost = (productPrice.price / 100) * createProductionDto.quantity;
    
    const inputDate: Production = {
      ...createProductionDto,
      worker: new Types.ObjectId(createProductionDto.worker),
      department: new Types.ObjectId(createProductionDto.department),
      product: new Types.ObjectId(createProductionDto.product),
      cost,
      createdBy: user._id,
      updatedBy: user._id,
    }
    await this.productionModel.create(inputDate);
    return res.redirect('/production');
  }

  /**
   * Get query builder to use it in find method
   * @returns - The query builder instance
   */
  private getQueryBuilder(queryParams: QueryDto, filter: RootFilterQuery<Production> = {}) {
    const query = this.productionModel.find(filter);
    if (!this.queryBuilder) this.queryBuilder = new FindQueryBuilderService(query, queryParams);
    else this.queryBuilder.resetParameters(query, queryParams);
    return this.queryBuilder;
  }

  /**
   * Find all production.
   * @param queryParams The query parameters.
   * @param user The user who is get production.
   * @param res The response.
   * @render The production page.
   */
  async findAll(queryParams: QueryDto, user: UserDocument, res: Response) {
    const queryBuilder = this.getQueryBuilder(queryParams);
    const production = await queryBuilder
      .filter()
      .search(this.searchableKeys)
      .sort()
      .paginate()
      .build()
      .populate('worker', 'name')
      .populate('product', 'name')
      .populate('department', 'name')
      .populate('createdBy', 'username')
      .populate('updatedBy', 'username');

    const { page, pageSize, sort, search, error, ...filter } = queryParams;
    const renderVariables: DashboardRenderVariablesType & { workers: WorkerDocument[], products: ProductDocument[], departments: DepartmentDocument[] } = {
      error: queryParams.error || null,
      data: production,
      user,
      users: await this.usersService.find(),
      workers: await this.workersService.find(),
      products: await this.productsService.find(),
      departments: await this.departmentsService.find(),
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
    return res.render(`production`, renderVariables);
  }

  /**
   * Get salary for all workers.
   * 
   */
  async getSalary(getSalaryDto: GetSalaryDto, queryParams: QueryDto, user: UserDocument, res: Response) {
    const productions = await this.productionModel.find({
      date: {
        $gte: getSalaryDto.from,
        $lte: getSalaryDto.to
      }
    }).populate('worker', 'name')
      .populate('product', 'name')
      .populate('department', 'name');
    
    const workerSalaries = new Map();

    productions.forEach((production) => {
      const workerId = production.worker._id.toString();
      const cost = production.cost;

      if (!workerSalaries.has(workerId)) {
        workerSalaries.set(workerId, { name: (production.worker as any).name, salary: 0 });
      }

      const workerData = workerSalaries.get(workerId);
      workerData.salary += cost;
    });
    const salaries = Array.from(workerSalaries.values())

    if(getSalaryDto.withBonus) {
      salaries.forEach(async (salary) => {
        const bonusPresent = await this.bonusService.find({
          from: {
            $lte: salary.salary
          },
          to: {
            $gte: salary.salary
          }
        })[0];
        salary.salary += bonusPresent ? (bonusPresent.percentage / 100) * salary.salary : 0;
      });
    }
    return res.render('salary', { data: salaries, user, error: queryParams.error || null });
  }

  /**
   * Find all production depend on some filters.
   * @param filters The filters to find the production.
   * @returns All production.
   */
  find(filters: RootFilterQuery<Production> = {}) {
    return this.productionModel.find(filters);
  }

  /**
   * Find Production by id.
   * @param id The Production id.
   * @returns The Production.
   */
  findById(id: string) {
    return this.productionModel.findById(id);
  }

  /**
   * Update Production.
   * @param user The user who is updating the Production.
   * @param Production The Production who is wanted to be updated.
   * @param updateProductionDto The data to update the Production.
   * @param res The response object.
   * @redirect To the production page.
   */
  async update(user: UserDocument, Production: ProductionDocument, updateProductionDto: UpdateProductionDto, res: Response) {
    const productPrice = await this.productPriceService.findByProductAndDepartment(updateProductionDto.product, updateProductionDto.department);
    if (!productPrice) throw new NotFoundException('يجب تحديد سعر المنتج لهذا القسم');
    const cost = (productPrice.price / 100) * updateProductionDto.quantity;
    
    const inputData: Partial<Production> = {
      ...updateProductionDto,
      worker: new Types.ObjectId(updateProductionDto.worker) || Production.worker,
      department: new Types.ObjectId(updateProductionDto.department) || Production.department,
      product: new Types.ObjectId(updateProductionDto.product) || Production.product,
      cost,
      updatedBy: user._id
    }

    await Production.set(inputData).save();
    return res.redirect('/production?sort=-updatedAt');
  }

  /**
   * Remove Production.
   * @param user The user who is removing the Production.
   * @param res The response object.
   * @redirect To the production page.
   */
  async remove(Production: ProductionDocument, res: Response) {
    await Production.deleteOne();
    return res.redirect('/production');
  }
}
