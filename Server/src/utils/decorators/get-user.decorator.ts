import {
  createParamDecorator,
  ExecutionContext,
} from "@nestjs/common";

/**
  * Retrieves a user document from the request.
  * - Simplifies access to the user in controllers.
  * @returns The user from the request.
 */
export const GetUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const response = ctx.switchToHttp().getResponse();
  const user = request.user;
  if (!user) response.redirect('/auth/login');
  return user;
});