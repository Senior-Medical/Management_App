import { Model } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateBonusDto } from './dto/create-bonus.dto';
import { UpdateBonusDto } from './dto/update-bonus.dto';
import { Bonus, BonusDocument } from './entities/bonus.entity';
import { BaseService } from 'src/utils/classes/base.service';
export declare class BonusService extends BaseService {
    private bonusModel;
    private readonly usersService;
    searchableKeys: string[];
    constructor(bonusModel: Model<Bonus>, usersService: UsersService);
    getModuleModel(): Model<Bonus, {}, {}, {}, import("mongoose").Document<unknown, {}, Bonus> & Bonus & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>;
    getAdditionalRenderVariables(): Promise<{
        users: any[];
        type: string;
        title: string;
    }>;
    create(createBonusDto: CreateBonusDto, user: UserDocument): Promise<void>;
    update(bonus: BonusDocument, updateBonusDto: UpdateBonusDto, user: UserDocument): Promise<void>;
}
