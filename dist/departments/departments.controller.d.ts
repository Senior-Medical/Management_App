import { UserDocument } from 'src/users/entities/user.entity';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { DepartmentDocument } from './entities/department.entity';
export declare class DepartmentsController {
    private readonly departmentsService;
    constructor(departmentsService: DepartmentsService);
    create(user: UserDocument, createDepartmentDto: CreateDepartmentDto): Promise<void>;
    findAll(queryParams: any, user: UserDocument): Promise<import("../users/types/base-render-variables.type").BaseRenderVariablesType>;
    update(department: DepartmentDocument, updateDepartmentDto: CreateDepartmentDto, user: UserDocument): Promise<void>;
    remove(department: DepartmentDocument): Promise<void>;
}
