import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { Worker, WorkerDocument } from './entities/worker.entity';
import { BaseService } from 'src/utils/classes/base.service';

@Injectable()
export class WorkersService extends BaseService {
  searchableKeys: string[] = [
    "name"
  ];

  constructor(
    @InjectModel(Worker.name) private workersModel: Model<Worker>,
    private readonly usersService: UsersService
  ) {
    super();
  }

  /**
   * Get the module model.
   * @returns The worker model.
   */
  getModuleModel() {
    return this.workersModel;
  }

    /**
   * Get additional render variables for the dashboard.
   * @returns The additional render variables.
   */
  async getAdditionalRenderVariables() {
    return {
      users: await this.usersService.find()
    }
  }

  /**
   * Create a new worker.
   * @param createWorkerDto The data for the new worker.
   * @param user The user who is creating the new worker.
   */
  async create(createWorkerDto: CreateWorkerDto, user: UserDocument) {
    const { name } = createWorkerDto;
    const existWorker = await this.findOne({ name });
    if (existWorker) throw new ConflictException('إسم العامل موجود بالفعل');

    const inputDate: Worker = {
      ...createWorkerDto,
      createdBy: user._id,
      updatedBy: user._id,
    }
    await this.workersModel.create(inputDate);
  }

  /**
   * Update worker.
   * @param worker The worker who is wanted to be updated.
   * @param updateWorkerDto The data to update the worker.
   * @param user The user who is updating the worker.
   * @throws ConflictException if the name is already exist.
   */
  async update(worker: WorkerDocument, updateWorkerDto: CreateWorkerDto, user: UserDocument) {
    const existWorker = await this.findOne({ name: updateWorkerDto.name });
    if (existWorker && existWorker._id.toString() !== worker._id.toString()) throw new ConflictException('إسم العامل موجود بالفعل');
    
    const inputData: Partial<Worker> = {
      ...updateWorkerDto,
      updatedBy: user._id
    }

    await worker.set(inputData).save();
  }
}