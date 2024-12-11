import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { DashboardService } from './dashboard.service';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { pagesTitles, PagesTypes } from './enums/pagesTypes.enum';
import { DashboardRenderVariablesType } from 'src/users/types/render-variables.type';
import { UserDocument } from 'src/users/entities/user.entity';

@Controller('dashboard')
@UseGuards(AuthenticatedGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }
  
  @Get()
  main(@Req() req: Request, @Res() res: Response) {
    return res.redirect('/users');
  }
}
