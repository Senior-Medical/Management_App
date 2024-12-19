import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { CustomLoggerService } from '../logger.service';

/**
 * - A custom exception filter that catches errors and logs them using the CustomLoggerService.
 * - Logs the error message, request method, URL, status code, and duration of the request.
 */
@Injectable()
@Catch()
export class LoggerExceptionFilter extends BaseExceptionFilter implements ExceptionFilter {
  constructor(private readonly customLoggerService: CustomLoggerService) {
    super();
  }

  /**
   * catch - Catches an exception, logs the error, and passes it to the default exception filter.
   * @param exception - The caught exception.
   * @param host - The context of the exception.
   */
  catch(exception: HttpException & { contextName: string }, host: ArgumentsHost) {
    const statusCode = exception instanceof HttpException ? exception.getStatus() : 500;
    const errorMessage = exception.message || "Internal server error";
    const contextName = exception.contextName || 'Unknown';
    
    const request = host.switchToHttp().getRequest();
    const { method, url } = request;
    const duration = Date.now() - (request.startTime || Date.now());

    this.customLoggerService.error(
      `${method} ${url} [${statusCode}] Duration: ${duration}ms Error: ${errorMessage}`,
      contextName
    );

    const response = host.switchToHttp().getResponse();
    if(url.startsWith("/auth")) response.redirect(`/auth/login?error=${errorMessage}`);
    else if (url.startsWith("/users")) response.redirect(`/users?error=${errorMessage}`);
    else if (url.startsWith("/workers")) response.redirect(`/workers?error=${errorMessage}`);
    else if (url.startsWith("/products")) response.redirect(`/products?error=${errorMessage}`);
    else if (url.startsWith("/departments")) response.redirect(`/departments?error=${errorMessage}`);
    else if (url.startsWith("/bonus")) response.redirect(`/bonus?error=${errorMessage}`);
    // else response.redirect(`/dashboard?error=${errorMessage}`);
  }
}