import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { DashboardService } from './dashboard.service';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { UserDocument } from 'src/users/entities/user.entity';

@Controller('dashboard')
@UseGuards(AuthenticatedGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }
  
  @Get()
  main(
    @GetUser() user: UserDocument, @Res() res: Response) {
    // return res.redirect('/users');
    return res.render('main', {user});
  }
}
