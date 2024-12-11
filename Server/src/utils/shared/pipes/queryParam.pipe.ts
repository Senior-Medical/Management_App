import {
  ArgumentMetadata,
  Injectable,
  NotAcceptableException,
  PipeTransform
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { QueryDto } from "../dtos/query.dto";

@Injectable()
export class QueryParamPipe implements PipeTransform {
  async transform(queryParams: QueryDto, metadata: ArgumentMetadata) {
    const query = plainToInstance(QueryDto, queryParams);

    const errors = await validate(query);
    if (errors.length > 0) {
      const errorsMessages = [];
      errors.forEach((error) => {
        const x = Object.values(error.constraints);
        errorsMessages.push(...x);
      });
      throw new NotAcceptableException(errorsMessages);
    }
    return query;
  }
}