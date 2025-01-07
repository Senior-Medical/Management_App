import { ExceptionFilter, ArgumentsHost, UnauthorizedException } from "@nestjs/common";
export declare class UnauthorizedFilter implements ExceptionFilter {
    catch(exception: UnauthorizedException, host: ArgumentsHost): void;
}
