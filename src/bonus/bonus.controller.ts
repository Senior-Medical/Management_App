import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    Redirect,
    Render
} from '@nestjs/common';
import { UserDocument } from 'src/users/entities/user.entity';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { ObjectIdPipe } from 'src/utils/pipes/ObjectId.pipe';
import { QueryParamPipe } from 'src/utils/pipes/queryParam.pipe';
import { BonusService } from './bonus.service';
import { CreateBonusDto } from './dto/create-bonus.dto';
import { UpdateBonusDto } from './dto/update-bonus.dto';
import { BonusDocument } from './entities/bonus.entity';
import { BonusIdPipe } from './pipes/bonus-id.pipe';

@Controller('bonus')
export class BonusController {
  constructor(private readonly bonusService: BonusService) {}

  @Post()
  @Redirect('/bonus')
  create(
    @Body() createBonusDto: CreateBonusDto,
    @GetUser() user: UserDocument
  ) {
    return this.bonusService.create(createBonusDto, user);
  }

  @Get()
  @Render('index')
  findAll(
    @Query(QueryParamPipe) queryParams: any,
    @GetUser() user: UserDocument,
  ) {
    return this.bonusService.findAll(queryParams, user);
  }

  @Post('update/:bonusId')
  @Redirect('/bonus?sort=-updatedAt')
  update(
    @Param('bonusId', ObjectIdPipe, BonusIdPipe) bonus: BonusDocument,
    @Body() updateBonusDto: UpdateBonusDto,
    @GetUser() user: UserDocument,
  ) {
    return this.bonusService.update(bonus, updateBonusDto, user);
  }

  @Get('delete/:bonusId')
  @Redirect('/bonus')
  remove(
    @Param('bonusId', ObjectIdPipe, BonusIdPipe) bonus: BonusDocument,
  ) {
    return this.bonusService.remove(bonus);
  }
}
