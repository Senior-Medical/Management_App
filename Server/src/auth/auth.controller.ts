import {
  Controller,
  Post,
  UseGuards,
  Req,
  Res,
  Get,
  Query,
  UseFilters,
} from "@nestjs/common";
import { LocalAuthGuard } from "./guards/localAuth.guard";
import { Request, Response } from "express";

@Controller("auth")
export class AuthController {
  /**
   * Renders the login page.
   * @param res - Response object.
   * @returns - The login page.
   */
  @Get('login')
  loginPage(@Query('error') error: string, @Res() res: Response) {
    if (error) return res.render('login', { error });
    return res.render('login', { error: null });
  }

  /**
   * Handles user login by validating credentials and returning tokens.
   * 
   * @param user - user document.
   * @returns - An object containing access and refresh tokens, along with user data.
   */
  @Post("login")
  @UseGuards(LocalAuthGuard)
  login(@Req() req: Request, @Res() res: Response) {
    req.login(req.user, (err) => {
      if (err) res.redirect('/auth/login?error=خطأ في تسجيل الدخول');
      else res.redirect('/dashboard');
    });
  }

  /**
   * Logs the user out by clearing the session.
   * @param req - Request object.
   * @param res - Response object.
   * @returns - Redirects to the login page.
   */
  @Get("logout")
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout(() => res.redirect('/auth/login'));
  }
}