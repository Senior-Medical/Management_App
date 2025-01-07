import { UserDocument } from 'src/users/entities/user.entity';
import { BonusService } from './bonus.service';
import { CreateBonusDto } from './dto/create-bonus.dto';
import { UpdateBonusDto } from './dto/update-bonus.dto';
import { BonusDocument } from './entities/bonus.entity';
export declare class BonusController {
    private readonly bonusService;
    constructor(bonusService: BonusService);
    create(createBonusDto: CreateBonusDto, user: UserDocument): Promise<void>;
    findAll(queryParams: any, user: UserDocument): Promise<import("../users/types/base-render-variables.type").BaseRenderVariablesType>;
    update(bonus: BonusDocument, updateBonusDto: UpdateBonusDto, user: UserDocument): Promise<void>;
    remove(bonus: BonusDocument): Promise<void>;
}
