import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { BonusService } from '../bonus.service';
export declare class BonusIdPipe implements PipeTransform {
    private readonly bonusService;
    constructor(bonusService: BonusService);
    transform(bonusId: string, metadata: ArgumentMetadata): Promise<any>;
}
