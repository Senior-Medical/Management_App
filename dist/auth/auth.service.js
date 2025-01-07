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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const encryption_service_1 = require("../utils/encryption/encryption.service");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService, encryptionService) {
        this.usersService = usersService;
        this.encryptionService = encryptionService;
    }
    async validateUser(username, password) {
        const user = await this.usersService.findOne({ username });
        if (!user)
            return null;
        const match = await this.encryptionService.bcryptCompare(password, user.password);
        if (!match)
            return null;
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        encryption_service_1.EncryptionService])
], AuthService);
//# sourceMappingURL=auth.service.js.map