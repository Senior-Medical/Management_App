import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { Department, DepartmentDocument } from './entities/department.entity';
import { BaseService } from 'src/utils/classes/base.service';

@Injectable()
export class DepartmentsService extends BaseService {
  searchableKeys: string[] = [
    "name"
  ];

  constructor(
    @InjectModel(Department.name) private departmentsModel: Model<Department>,
    private readonly usersService: UsersService
  ) {
    super();
  }

  /**
   * Get the module model.
   * @returns The department model.
   */
  getModuleModel() {
    return this.departmentsModel;
  }

  /**
   * Get additional render variables for the dashboard.
   * @returns The additional render variables.
   */
  async getAdditionalRenderVariables() {
    return {
      users: await this.usersService.find(),
      type: 'departments',
      title: 'الأقسام'
    }
  }

  /**
   * Create a new department.
   * @param createDepartmentDto The data for the new department.
   * @param user The user who is creating the new department.
   */
  async create(createDepartmentDto: CreateDepartmentDto, user: UserDocument) {
    const { name } = createDepartmentDto;
    const existDepartments = await this.findOne({ name });
    if (existDepartments) throw new ConflictException('إسم القسم موجود بالفعل');

    const inputDate: Department = {
      ...createDepartmentDto,
      createdBy: user._id,
      updatedBy: user._id,
    }
    await this.departmentsModel.create(inputDate);
  }

  /**
   * Update department.
   * @param department The department who is wanted to be updated.
   * @param updateDepartmentDto The data to update the department.
   * @param user The user who is updating the department.
   * @throws ConflictException if the name is already exist.
   */
  async update(department: DepartmentDocument, updateDepartmentDto: CreateDepartmentDto, user: UserDocument) {
    const existDepartment = await this.findOne({
      $and: [
        { name: updateDepartmentDto.name },
        { _id: { $ne: department._id } }
      ]
    });
    if (existDepartment) throw new ConflictException('إسم القسم موجود بالفعل');
    
    const inputData: Partial<Department> = {
      ...updateDepartmentDto,
      updatedBy: user._id
    }

    await department.set(inputData).save();
  }
}
