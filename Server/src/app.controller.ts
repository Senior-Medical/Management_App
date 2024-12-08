import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticatedGuard } from './auth/guards/authenticated.guard';

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
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
      return res.redirect('/dashboard');
    } else {
      return res.redirect('/auth/login');
    }
  }

  /**
   * Renders the dashboard page.
   * @param res - Response object.
   * @returns - The dashboard page.
   */
  @Get('dashboard')
  @UseGuards(AuthenticatedGuard)
  dashboard(@Req() req: Request, @Res() res: Response) {
    res.render('dashboard', {user: req.user});
  }
}
