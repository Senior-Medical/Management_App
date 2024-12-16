import {
  CanActivate,
  ExecutionContext,
  Injectable
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
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    if (!request.isAuthenticated()) return response.redirect('/auth/login');
    return request.isAuthenticated();
  }
}