import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  Query,
} from '@nestjs/common';
import { WorkersService } from './workers.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { UserDocument } from 'src/users/entities/user.entity';
import { Response } from 'express';
import { QueryParamPipe } from 'src/utils/pipes/queryParam.pipe';
import { ObjectIdPipe } from 'src/utils/pipes/ObjectId.pipe';
import { WorkerDocument } from './entities/worker.entity';
import { WorkerIdPipe } from './pipes/worker-id.pipe';

@Controller('workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @Post()
  create(
    @Res() res: Response,
    @GetUser() user: UserDocument,
    @Body() createWorkerDto: CreateWorkerDto
  ) {
    return this.workersService.create(user, createWorkerDto, res);
  }

  @Get()
  findAll(
    @Query(QueryParamPipe) queryParams: any,
    @Res() res: Response,
    @GetUser() user: UserDocument,
  ) {
    return this.workersService.findAll(queryParams, user, res);
  }

  @Post('update/:workerId')
  update(
    @Param('workerId', ObjectIdPipe, WorkerIdPipe) worker: WorkerDocument,
    @GetUser() user: UserDocument,
    @Body() updateWorkerDto: CreateWorkerDto,
    @Res() res: Response,

  ) {
    return this.workersService.update(user, worker, updateWorkerDto, res);
  }

  @Get('delete/:workerId')
  remove(
    @Param('workerId', ObjectIdPipe, WorkerIdPipe) worker: WorkerDocument,
    @Res() res: Response
  ) {
    return this.workersService.remove(worker, res);
  }
}
