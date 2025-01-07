import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CustomLoggerService } from '../logger.service';
export declare class LoggerInterceptor implements NestInterceptor {
    private readonly customLoggerService;
    constructor(customLoggerService: CustomLoggerService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
