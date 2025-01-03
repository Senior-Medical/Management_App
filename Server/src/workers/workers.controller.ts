import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Redirect,
  Render,
} from '@nestjs/common';
import { WorkersService } from './workers.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { UserDocument } from 'src/users/entities/user.entity';
import { QueryParamPipe } from 'src/utils/pipes/queryParam.pipe';
import { ObjectIdPipe } from 'src/utils/pipes/ObjectId.pipe';
import { WorkerDocument } from './entities/worker.entity';
import { WorkerIdPipe } from './pipes/worker-id.pipe';

@Controller('workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @Post()
  @Redirect('/workers')
  create(
    @GetUser() user: UserDocument,
    @Body() createWorkerDto: CreateWorkerDto
  ) {
    return this.workersService.create(createWorkerDto, user);
  }

  @Get()
  @Render('workers')
  findAll(
    @Query(QueryParamPipe) queryParams: any,
    @GetUser() user: UserDocument,
  ) {
    return this.workersService.findAll(queryParams, user);
  }

  @Post('update/:workerId')
  @Redirect('/workers?sort=-updatedAt')
  update(
    @Param('workerId', ObjectIdPipe, WorkerIdPipe) worker: WorkerDocument,
    @GetUser() user: UserDocument,
    @Body() updateWorkerDto: CreateWorkerDto,

  ) {
    return this.workersService.update(worker, updateWorkerDto, user);
  }

  @Get('delete/:workerId')
  @Redirect('/workers')
  remove(
    @Param('workerId', ObjectIdPipe, WorkerIdPipe) worker: WorkerDocument,
  ) {
    return this.workersService.remove(worker);
  }
}
