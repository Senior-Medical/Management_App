import { Injectable } from "@nestjs/common";
import { Query, Types } from "mongoose";
import { QueryDto } from "../dtos/query.dto";

/**
 * Query builder for find operations.
 * Used to build a Mongoose query object based on query string parameters.
 */
@Injectable()
export class FindQueryBuilderService {
  private static defaultPageSize: number = 3;
  private static defaultSortKey: string = '-createdAt';
  private static defaultSearchKey: string = "";
  private static defaultPage: number = 1;

  private query: Query<any, any>;
  private queryParams: QueryDto;
  private page: number = FindQueryBuilderService.defaultPage;
  private pageSize: number = FindQueryBuilderService.defaultPageSize;
  private sortKey: string = FindQueryBuilderService.defaultSortKey;
  private searchKey: string = FindQueryBuilderService.defaultSearchKey;

  constructor(query: Query<any, any>, queryParams: QueryDto) {
    this.query = query;
    this.queryParams = queryParams;
  }

  /**
   * Reset the instance parameters.
   * Used to reset the instance parameters when chaining multiple query methods.
   *
   * @param queryParams - The new query parameters object.
   * @param query - The new Mongoose query object.
   */
  resetParameters(queryParams: QueryDto, query: Query<any, any>) {
    this.page = FindQueryBuilderService.defaultPage;
    this.pageSize = FindQueryBuilderService.defaultPageSize;
    this.sortKey = FindQueryBuilderService.defaultSortKey;
    this.searchKey = FindQueryBuilderService.defaultSearchKey;
    this.query = query;
    this.queryParams = queryParams;
  }

  /**
   * Applies filtering to the query based on query string parameters.
   * 
   * @returns The query builder instance.
   */
  filter() {
    const filterObj = { ...this.queryParams };
    delete filterObj.page;
    delete filterObj.pageSize;
    delete filterObj.sort;
    delete filterObj.fields;
    delete filterObj.search;

    for (const e of Object.entries(filterObj)) {
      if (e[1].startsWith("objectid:")) e[1] = new Types.ObjectId(e[1].replace("objectid:", "") as string);
      else if (e[1].startsWith("gt:")) e[1] = { $gt: e[1].replace("gt:", "") };
      else if(e[1].startsWith("gte:")) e[1] = { $gte: e[1].replace("gte:", "") };
      else if(e[1].startsWith("lt:")) e[1] = { $lt: e[1].replace("lt:", "") };
      else if(e[1].startsWith("lte:")) e[1] = { $lte: e[1].replace("lte:", "") };
      else if(e[1].startsWith("in:")) e[1] = { $in: e[1].replace("in:", "").split(",") };
      filterObj[e[0]] = e[1];
    }
    this.query = this.query.find(filterObj);
    return this;
  }
  
  /**
   * Applies pagination to the query.
   * Defaults to page 1 and page size 10.
   * 
   * @returns The query builder instance.
   */
  paginate() {
    if (this.queryParams.page) this.page = this.queryParams.page;
    if (this.queryParams.pageSize) this.pageSize = this.queryParams.pageSize;
    const skip = (this.page - 1) * this.pageSize;
    this.query = this.query.skip(skip).limit(this.pageSize);
    return this;
  }

  /**
   * Applies sorting to the query.
   * Defaults to sorting by creation date in descending order.
   * 
   * @returns The query builder instance.
   */
  sort() {
    if (this.queryParams.sort) this.sortKey = this.queryParams.sort;
    this.query = this.query.sort(this.sortKey);
    return this;
  }

  /**
   * Selects specific fields in the query results.
   * Defaults to selecting all fields.
   * 
   * @returns The query builder instance.
   */
  selectFields() {
    if(this.queryParams.fields) this.query = this.query.select(this.queryParams.fields);
    return this;
  }

  /**
   * Performs a search operation on specified fields.
   * Defaults to not performing a search.
   * 
   * @param searchableFields - Array of fields to perform the search on.
   * @returns The query builder instance.
   */
  search(searchableFields: string[]) {
    if (this.queryParams.search) {
      this.searchKey = this.queryParams.search;
      const searchRegex = new RegExp(this.searchKey, 'i');
      let searchObject = searchableFields.map(field => ({ [field]: searchRegex }));
      this.query = this.query.find({ $or: searchObject });
    }
    return this;
  }

  /**
   * Returns the built query.
   */
  build() {
    return this.query;
  }

  /**
   * Returns the total pages.
   */
  async getTotalPages() {
    const totalCount = await this.query.model.countDocuments(this.query.getFilter());
    return Math.ceil(totalCount / this.pageSize);
  }

  /**
   * Returns the current page number.
   */
  getPage() {
    return this.page;
  }

  /**
   * Returns the current page size.
   */
  getPageSize() {
    return this.pageSize;
  }

  /**
   * Returns the current sort key.
   */
  getSortKey() {
    return this.sortKey;
  }
  
  /**
   * Returns the current search key.
   */
  getSearchKey() {
    return this.searchKey;
  }
}