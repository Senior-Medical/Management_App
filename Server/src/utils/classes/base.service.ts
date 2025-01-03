import { Document, Model, RootFilterQuery } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';
import { BaseRenderVariablesType } from 'src/users/types/base-render-variables.type';
import { QueryDto } from '../dtos/query.dto';
import { FindQueryBuilderService } from './find-query-builder.service';

export abstract class BaseService {
  private queryBuilder: FindQueryBuilderService | null = null;
  
  getQueryBuilder(queryParams: QueryDto, filter: RootFilterQuery<any> = {}) { 
    const query = this.getModuleModel().find(filter);
    if (!this.queryBuilder) this.queryBuilder = new FindQueryBuilderService(query, queryParams);
    else this.queryBuilder.resetParameters(query, queryParams);
    return this.queryBuilder;
  }
  
  find(filter: RootFilterQuery<any> = {}): Promise<any[]> {
    return this.getModuleModel().find(filter);
  };

  async findAll(queryParams: QueryDto, user: UserDocument): Promise<BaseRenderVariablesType> {
    const queryBuilder = this.getQueryBuilder(queryParams);
    const data = await queryBuilder
      .filter()
      .search(this.searchableKeys)
      .sort()
      .paginate()
      .build()
      .populate('createdBy', 'username')
      .populate('updatedBy', 'username');

    const { page, pageSize, sort, search, error, ...filter } = queryParams;
    const baseRenderVariables: BaseRenderVariablesType = {
      error: queryParams.error || null,
      data,
      user,
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
    return { ...baseRenderVariables, ...(await this.getAdditionalRenderVariables()) };
  }

  findById(id: string): Promise<any> {
    return this.getModuleModel().findById(id);
  };

  findOne(filter: RootFilterQuery<any>): Promise<any> {
    return this.getModuleModel().findOne(filter);
  };
  
  updateMany(filter: RootFilterQuery<any>, updateDto: any): Promise<any> {
    return this.getModuleModel().updateMany(filter, updateDto);
  }
  
  removeMany(filter: RootFilterQuery<any>): Promise<any> {
    return this.getModuleModel().deleteMany(filter);
  }

  async remove(entity: Document): Promise<void> {
    await this.getModuleModel().findByIdAndDelete(entity._id);
  }
  
  abstract searchableKeys: string[];
  abstract getModuleModel(): Model<any>;
  abstract getAdditionalRenderVariables(): Promise<object>;
  abstract create(createDto: any, userDocument: UserDocument): Promise<void>;
  abstract update(entity: Document, updateDto: any, userDocument: UserDocument): Promise<void>;
}