import { ConfigService } from '@nestjs/config';
export declare class EncryptionService {
    private readonly configService;
    constructor(configService: ConfigService);
    private readonly algorithm;
    private readonly key;
    private readonly iv;
    private readonly saltNumber;
    encrypt(data: string): string;
    decrypt(data: string): string;
    bcryptHash(data: string): Promise<string>;
    bcryptCompare(password: string, hashedPassword: string): Promise<boolean>;
}
