import { Controller, Get, Redirect } from "@nestjs/common";

@Controller()
export class FallBackController {
  @Get('*')
  @Redirect('/auth/login')
  fallBack() {}
}