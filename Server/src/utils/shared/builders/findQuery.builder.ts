import { Query, Types } from "mongoose";
import { QueryDto } from "../dtos/query.dto";

/**
 * Query builder for find operations.
 * Used to build a Mongoose query object based on query string parameters.
 */
export class FindQueryBuilder {
  private query: Query<any, any>;

  constructor(query: Query<any, any>) {
    this.query = query;
  }

  /**
   * Set the query object.
   * Used to set the query object when chaining multiple query methods.
   * Used for avoiding the need to pass the query object to each method.
   * @param query - The Mongoose query object.
   */
  setQuery(query: Query<any, any>) {
    this.query = query;
  }

  /**
   * Applies filtering to the query based on query string parameters.
   * 
   * @param queryParam - Parsed query string object.
   * @returns The modified Mongoose query.
   */
  filter(queryParam: QueryDto) {
    const filterObj = { ...queryParam };
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
   * 
   * @param page - The page number to retrieve.
   * @param pageSize - The number of items per page.
   * @returns The modified Mongoose query.
   */
  paginate(page: number, pageSize: number) {
    page = page ? page : 1;
    pageSize = pageSize ? pageSize : 10;
    const skip = (page - 1) * pageSize;
    this.query = this.query.skip(skip).limit(pageSize);
    return this;
  }

  /**
   * Applies sorting to the query.
   * 
   * @param sort - Space-separated field names with optional "-" for descending sort.
   * @returns The modified Mongoose query.
   */
  sort(sort: string) {
    this.query = this.query.sort(sort);
    return this;
  }

  /**
   * Selects specific fields in the query results.
   * 
   * @param fields - Space-separated field names.
   * @returns The modified Mongoose query.
   */
  selectFields(fields: string) {
    this.query = this.query.select(fields);
    return this;
  }

  /**
   * Performs a search operation on specified fields.
   * 
   * @param searchableFields - Array of fields to perform the search on.
   * @param search - The search string.
   * @returns The modified Mongoose query.
   */
  search(searchableFields: string[], search: string) {
    const searchRegex = new RegExp(search, 'i');
    let searchObject = searchableFields.map(field => ({ [field]: searchRegex }));
    this.query = this.query.find({ $or: searchObject });
    return this;
  }

  /**
   * Returns the built query.
   */
  build() {
    return this.query;
  }
}