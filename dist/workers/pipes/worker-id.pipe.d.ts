import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { WorkersService } from '../workers.service';
export declare class WorkerIdPipe implements PipeTransform {
    private readonly workersService;
    constructor(workersService: WorkersService);
    transform(workerId: string, metadata: ArgumentMetadata): Promise<any>;
}
