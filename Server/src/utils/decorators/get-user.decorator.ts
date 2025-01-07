import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";

/**
  * Retrieves a user document from the request.
  * - Simplifies access to the user in controllers.
  * @returns The user from the request.
 */
export const GetUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;
  if (!user) throw new UnauthorizedException();
  return user;
});