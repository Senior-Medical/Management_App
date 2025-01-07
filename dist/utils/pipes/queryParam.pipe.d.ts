import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { QueryDto } from "../dtos/query.dto";
export declare class QueryParamPipe implements PipeTransform {
    transform(queryParams: QueryDto, metadata: ArgumentMetadata): Promise<QueryDto>;
}
