import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";

/**
 * Verifies if the user is authenticated.
 */
@Injectable()
export class AuthenticatedGuard implements CanActivate {
  /**
   * Checks if the user is authenticated.
   * 
   * @param context - ExecutionContext
   * @returns - `true` if the user is authenticated, `false` otherwise.
   */
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    if (request.isAuthenticated()) return true;
    else {
      throw new UnauthorizedException();
    };
  }
}