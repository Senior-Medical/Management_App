import { Model } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { Department, DepartmentDocument } from './entities/department.entity';
import { BaseService } from 'src/utils/classes/base.service';
export declare class DepartmentsService extends BaseService {
    private departmentsModel;
    private readonly usersService;
    searchableKeys: string[];
    constructor(departmentsModel: Model<Department>, usersService: UsersService);
    getModuleModel(): Model<Department, {}, {}, {}, import("mongoose").Document<unknown, {}, Department> & Department & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>;
    getAdditionalRenderVariables(): Promise<{
        users: any[];
        type: string;
        title: string;
    }>;
    create(createDepartmentDto: CreateDepartmentDto, user: UserDocument): Promise<void>;
    update(department: DepartmentDocument, updateDepartmentDto: CreateDepartmentDto, user: UserDocument): Promise<void>;
}
