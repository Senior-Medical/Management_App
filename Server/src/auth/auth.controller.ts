import {
  Controller,
  Post,
  UseGuards,
  Req,
  Res,
  Get,
} from "@nestjs/common";
import { LocalAuthGuard } from "./guards/localAuth.guard";
import { Request, Response } from "express";
import { CustomLoggerService } from "src/utils/logger/logger.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly loggerService: CustomLoggerService) { }

  /**
   * Renders the login page.
   * @param res - Response object.
   * @returns - The login page.
   */
  @Get('login')
  loginPage(@Res() res: Response) {
    res.render('login');
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
      if (err) {
        this.loggerService.error(err, "Login");
        res.redirect('/auth/login');
      } else {
        res.redirect('/dashboard');
      }
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