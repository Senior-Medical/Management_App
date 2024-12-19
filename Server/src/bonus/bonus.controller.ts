import { Controller, Get, Post, Body, Param, Res, Query } from '@nestjs/common';
import { BonusService } from './bonus.service';
import { CreateBonusDto } from './dto/create-bonus.dto';
import { UpdateBonusDto } from './dto/update-bonus.dto';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { UserDocument } from 'src/users/entities/user.entity';
import { Response } from 'express';
import { QueryParamPipe } from 'src/utils/pipes/queryParam.pipe';
import { ObjectIdPipe } from 'src/utils/pipes/ObjectId.pipe';
import { BonusIdPipe } from './pipes/department-id.pipe';
import { BonusDocument } from './entities/bonus.entity';

@Controller('bonus')
export class BonusController {
  constructor(private readonly bonusService: BonusService) {}

  @Post()
  create(
    @Res() res: Response,
    @Body() createBonusDto: CreateBonusDto,
    @GetUser() user: UserDocument
  ) {
    return this.bonusService.create(user, createBonusDto, res);
  }

  @Get()
  findAll(
    @Query(QueryParamPipe) queryParams: any,
    @Res() res: Response,
    @GetUser() user: UserDocument,
  ) {
    return this.bonusService.findAll(queryParams, user, res);
  }

  @Post('update/:bonusId')
  update(
    @Param('bonusId', ObjectIdPipe, BonusIdPipe) bonus: BonusDocument,
    @Body() updateBonusDto: UpdateBonusDto,
    @GetUser() user: UserDocument,
    @Res() res: Response
  ) {
    return this.bonusService.update(user, bonus, updateBonusDto, res);
  }

  @Get('delete/:bonusId')
  remove(
    @Param('bonusId', ObjectIdPipe, BonusIdPipe) bonus: BonusDocument,
    @Res() res: Response
  ) {
    return this.bonusService.remove(bonus, res);
  }
}
