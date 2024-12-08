import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { DashboardService } from './dashboard.service';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { pagesTitles, PagesTypes } from './enums/pagesTypes.enum';

@Controller('dashboard')
@UseGuards(AuthenticatedGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }
  
  @Get()
  main(@Req() req: Request, @Res() res: Response) {
    return res.render(`dashboard`, {
      title: pagesTitles[PagesTypes.MAIN],
      type: PagesTypes.MAIN,
      user: req.user
    });
  }

  @Get(PagesTypes.WORKERS)
  workersPage(@Req() req: Request, @Res() res: Response) {
    return res.render(`dashboard/${PagesTypes.WORKERS}`, {
      title: pagesTitles[PagesTypes.WORKERS],
      type: PagesTypes.WORKERS,
      user: req.user
    });
  }

  @Get(PagesTypes.PRODUCTS)
  productsPage(@Req() req: Request, @Res() res: Response) {
    return res.render(`dashboard/${PagesTypes.PRODUCTS}`, {
      title: pagesTitles[PagesTypes.PRODUCTS],
      type: PagesTypes.PRODUCTS,
      user: req.user
    });
  }

  @Get(PagesTypes.DEPARTMENTS)
  departmentsPage(@Req() req: Request, @Res() res: Response) {
    return res.render(`dashboard/${PagesTypes.DEPARTMENTS}`, {
      title: pagesTitles[PagesTypes.DEPARTMENTS],
      type: PagesTypes.DEPARTMENTS,
      user: req.user
    });
  }

  @Get(PagesTypes.BONUS)
  bonusPage(@Req() req: Request, @Res() res: Response) {
    return res.render(`dashboard/${PagesTypes.BONUS}`, {
      title: pagesTitles[PagesTypes.BONUS],
      type: PagesTypes.BONUS,
      user: req.user
    });
  }

  @Get(PagesTypes.PRODUCTION)
  productionPage(@Req() req: Request, @Res() res: Response) {
    return res.render(`dashboard/${PagesTypes.PRODUCTION}`, {
      title: pagesTitles[PagesTypes.PRODUCTION],
      type: PagesTypes.PRODUCTION,
      user: req.user
    });
  }
}
