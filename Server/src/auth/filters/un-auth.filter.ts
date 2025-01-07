import { ExceptionFilter, Catch, ArgumentsHost, UnauthorizedException } from "@nestjs/common";

@Catch(UnauthorizedException)
export class UnauthorizedFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    host.switchToHttp().getResponse().redirect('/auth/login');
  }
}
