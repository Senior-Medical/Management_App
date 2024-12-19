import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res
} from '@nestjs/common';
import { Response } from 'express';
import { UserDocument } from 'src/users/entities/user.entity';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { ObjectIdPipe } from 'src/utils/pipes/ObjectId.pipe';
import { QueryParamPipe } from 'src/utils/pipes/queryParam.pipe';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { DepartmentDocument } from './entities/department.entity';
import { DepartmentIdPipe } from './pipes/department-id.pipe';
import { DepartmentsService } from './departments.service';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  create(
    @Res() res: Response,
    @GetUser() user: UserDocument,
    @Body() createDepartmentDto: CreateDepartmentDto
  ) {
    return this.departmentsService.create(user, createDepartmentDto, res);
  }

  @Get()
  findAll(
    @Query(QueryParamPipe) queryParams: any,
    @Res() res: Response,
    @GetUser() user: UserDocument,
  ) {
    return this.departmentsService.findAll(queryParams, user, res);
  }

  @Post('update/:departmentId')
  update(
    @Param('departmentId', ObjectIdPipe, DepartmentIdPipe) department: DepartmentDocument,
    @Body() updateDepartmentDto: CreateDepartmentDto,
    @GetUser() user: UserDocument,
    @Res() res: Response,
  ) {
    return this.departmentsService.update(user, department, updateDepartmentDto, res);
  }

  @Get('delete/:departmentId')
  remove(
    @Param('departmentId', ObjectIdPipe, DepartmentIdPipe) department: DepartmentDocument,
    @Res() res: Response
  ) {
    return this.departmentsService.remove(department, res);
  }
}
