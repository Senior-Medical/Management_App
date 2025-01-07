import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDocument } from './entities/user.entity';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(user: UserDocument, createUserDto: CreateUserDto): Promise<void>;
    findAll(queryParams: any, user: UserDocument): Promise<import("./types/base-render-variables.type").BaseRenderVariablesType>;
    update(user: UserDocument, wantedUser: UserDocument, updateUserDto: UpdateUserDto): Promise<void>;
    remove(user: UserDocument): Promise<void>;
}
