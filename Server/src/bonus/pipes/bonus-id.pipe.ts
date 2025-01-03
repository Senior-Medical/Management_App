import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform
} from '@nestjs/common';
import { BonusService } from '../bonus.service';

/**
 * Validates bonusId if exist.
 */
@Injectable()
export class BonusIdPipe implements PipeTransform {
  constructor(private readonly bonusService: BonusService) { }
  
  /**
   * bonusId validation by get bonus from bonus collection.
   * 
   * @param bonusId bonus id
   * @param metadata metadata
   * @returns bonus document if the bonus is found
   */
  async transform(bonusId: string, metadata: ArgumentMetadata) {
    const bonus = await this.bonusService.findById(bonusId);
    if (!bonus) throw new NotFoundException('خطأ في معرف الحافز.');
    return bonus;
  }
}
