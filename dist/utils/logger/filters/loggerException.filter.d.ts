import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { CustomLoggerService } from '../logger.service';
export declare class LoggerExceptionFilter extends BaseExceptionFilter implements ExceptionFilter {
    private readonly customLoggerService;
    constructor(customLoggerService: CustomLoggerService);
    catch(exception: HttpException & {
        contextName: string;
    }, host: ArgumentsHost): void;
}
