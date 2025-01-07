import { Connection, Model } from 'mongoose';
import { BaseService } from 'src/utils/classes/base.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
export declare class UsersService extends BaseService {
    private usersModel;
    private readonly connection;
    searchableKeys: string[];
    constructor(usersModel: Model<User>, connection: Connection);
    getModuleModel(): Model<User, {}, {}, {}, import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>;
    getAdditionalRenderVariables(): Promise<{
        users: (import("mongoose").Document<unknown, {}, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        type: string;
        title: string;
    }>;
    create(createDto: CreateUserDto, user: UserDocument): Promise<void>;
    update(wantedUser: UserDocument, updateDto: UpdateUserDto, user: UserDocument): Promise<void>;
}
