import { Document, Model, RootFilterQuery } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';
import { BaseRenderVariablesType } from 'src/users/types/base-render-variables.type';
import { QueryDto } from '../dtos/query.dto';
import { FindQueryBuilderService } from './find-query-builder.service';
export declare abstract class BaseService {
    private queryBuilder;
    getQueryBuilder(queryParams: QueryDto, filter?: RootFilterQuery<any>): FindQueryBuilderService;
    find(filter?: RootFilterQuery<any>): Promise<any[]>;
    findAll(queryParams: QueryDto, user: UserDocument): Promise<BaseRenderVariablesType>;
    findById(id: string): Promise<any>;
    findOne(filter: RootFilterQuery<any>): Promise<any>;
    updateMany(filter: RootFilterQuery<any>, updateDto: any): Promise<any>;
    removeMany(filter: RootFilterQuery<any>): Promise<any>;
    remove(entity: Document): Promise<void>;
    abstract searchableKeys: string[];
    abstract getModuleModel(): Model<any>;
    abstract getAdditionalRenderVariables(): Promise<object>;
    abstract create(createDto: any, userDocument: UserDocument): Promise<void>;
    abstract update(entity: Document, updateDto: any, userDocument: UserDocument): Promise<void>;
}
