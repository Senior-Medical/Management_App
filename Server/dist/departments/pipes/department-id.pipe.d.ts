import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { DepartmentsService } from '../departments.service';
export declare class DepartmentIdPipe implements PipeTransform {
    private readonly departmentsService;
    constructor(departmentsService: DepartmentsService);
    transform(departmentId: string, metadata: ArgumentMetadata): Promise<any>;
}
