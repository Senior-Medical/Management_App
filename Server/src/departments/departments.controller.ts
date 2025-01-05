import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Redirect,
  Render,
} from '@nestjs/common';
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
  @Redirect('/departments')
  create(
    @GetUser() user: UserDocument,
    @Body() createDepartmentDto: CreateDepartmentDto
  ) {
    return this.departmentsService.create(createDepartmentDto, user);
  }

  @Get()
  @Render('dashboard')
  findAll(
    @Query(QueryParamPipe) queryParams: any,
    @GetUser() user: UserDocument,
  ) {
    return this.departmentsService.findAll(queryParams, user);
  }

  @Post('update/:departmentId')
  @Redirect('/departments?sort=-updatedAt')
  update(
    @Param('departmentId', ObjectIdPipe, DepartmentIdPipe) department: DepartmentDocument,
    @Body() updateDepartmentDto: CreateDepartmentDto,
    @GetUser() user: UserDocument,
  ) {
    return this.departmentsService.update(department, updateDepartmentDto, user);
  }

  @Get('delete/:departmentId')
  @Redirect('/departments')
  remove(
    @Param('departmentId', ObjectIdPipe, DepartmentIdPipe) department: DepartmentDocument,
  ) {
    return this.departmentsService.remove(department);
  }
}
