"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const crypto_1 = require("crypto");
const bcrypt = require("bcrypt");
let EncryptionService = class EncryptionService {
    constructor(configService) {
        this.configService = configService;
        this.algorithm = this.configService.get("ENCRYPTION_ALGORITHM");
        this.key = this.configService.get("ENCRYPTION_KEY");
        this.iv = this.configService.get("ENCRYPTION_IV");
        this.saltNumber = this.configService.get('BCRYPT_SALT_ROUNDS') || 10;
    }
    encrypt(data) {
        const cipher = (0, crypto_1.createCipheriv)(this.algorithm, this.key, this.iv);
        let encryptedData = cipher.update(data, "utf-8", "hex");
        encryptedData += cipher.final("hex");
        return encryptedData;
    }
    decrypt(data) {
        const decipher = (0, crypto_1.createDecipheriv)(this.algorithm, this.key, this.iv);
        let decryptedData = decipher.update(data, "hex", "utf-8");
        decryptedData += decipher.final("utf-8");
        return decryptedData;
    }
    async bcryptHash(data) {
        const salt = await bcrypt.genSalt(this.saltNumber);
        return bcrypt.hash(data, salt);
    }
    bcryptCompare(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }
};
exports.EncryptionService = EncryptionService;
exports.EncryptionService = EncryptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EncryptionService);
//# sourceMappingURL=encryption.service.js.map