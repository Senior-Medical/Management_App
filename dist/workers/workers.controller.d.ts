import { UserDocument } from 'src/users/entities/user.entity';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { WorkerDocument } from './entities/worker.entity';
import { WorkersService } from './workers.service';
export declare class WorkersController {
    private readonly workersService;
    constructor(workersService: WorkersService);
    create(user: UserDocument, createWorkerDto: CreateWorkerDto): Promise<void>;
    findAll(queryParams: any, user: UserDocument): Promise<import("../users/types/base-render-variables.type").BaseRenderVariablesType>;
    update(worker: WorkerDocument, user: UserDocument, updateWorkerDto: CreateWorkerDto): Promise<void>;
    remove(worker: WorkerDocument): Promise<void>;
}
