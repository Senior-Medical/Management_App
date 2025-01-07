import { EncryptionService } from "src/utils/encryption/encryption.service";
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private readonly usersService;
    private readonly encryptionService;
    constructor(usersService: UsersService, encryptionService: EncryptionService);
    validateUser(username: string, password: string): Promise<any>;
}
