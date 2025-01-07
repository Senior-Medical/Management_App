import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform
} from '@nestjs/common';
import { WorkersService } from '../workers.service';

/**
 * Validates workerId if exist.
 */
@Injectable()
export class WorkerIdPipe implements PipeTransform {
  constructor(private readonly workersService: WorkersService) { }
  
  /**
   * WorkerId validation by get worker from workers collection.
   * 
   * @param workerId worker id
   * @param metadata metadata
   * @returns worker document if the worker is found
   */
  async transform(workerId: string, metadata: ArgumentMetadata) {
    const worker = await this.workersService.findById(workerId);
    if (!worker) throw new NotFoundException('خطأ في معرف العامل.');
    return worker;
  }
}
