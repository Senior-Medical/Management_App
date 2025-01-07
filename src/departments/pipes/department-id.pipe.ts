import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform
} from '@nestjs/common';
import { DepartmentsService } from '../departments.service';

/**
 * Validates departmentId if exist.
 */
@Injectable()
export class DepartmentIdPipe implements PipeTransform {
  constructor(private readonly departmentsService: DepartmentsService) { }
  
  /**
   * departmentId validation by get department from departments collection.
   * 
   * @param departmentId department id
   * @param metadata metadata
   * @returns department document if the department is found
   */
  async transform(departmentId: string, metadata: ArgumentMetadata) {
    const department = await this.departmentsService.findById(departmentId);
    if (!department) throw new NotFoundException('خطأ في معرف القسم.');
    return department;
  }
}
