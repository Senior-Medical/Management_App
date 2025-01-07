import { Controller, Get, Req, Res, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  /**
   * Redirects the user to the dashboard if they are authenticated.
   * @param req - Request object.
   * @param res - Response object.
   * @returns - Redirects to the dashboard if authenticated, otherwise redirects to the login page.
   */
  @Get()
  root(@Req() req: Request, @Res() res: Response) {
    if (req.isAuthenticated()) return res.redirect('/production');
    else throw new UnauthorizedException();
  }
}
