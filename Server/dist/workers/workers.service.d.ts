import { Model } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { Worker, WorkerDocument } from './entities/worker.entity';
import { BaseService } from 'src/utils/classes/base.service';
export declare class WorkersService extends BaseService {
    private workersModel;
    private readonly usersService;
    searchableKeys: string[];
    constructor(workersModel: Model<Worker>, usersService: UsersService);
    getModuleModel(): Model<Worker, {}, {}, {}, import("mongoose").Document<unknown, {}, Worker> & Worker & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>;
    getAdditionalRenderVariables(): Promise<{
        users: any[];
        type: string;
        title: string;
    }>;
    create(createWorkerDto: CreateWorkerDto, user: UserDocument): Promise<void>;
    update(worker: WorkerDocument, updateWorkerDto: CreateWorkerDto, user: UserDocument): Promise<void>;
}
