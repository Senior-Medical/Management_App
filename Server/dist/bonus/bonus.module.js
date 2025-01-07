"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BonusModule = void 0;
const common_1 = require("@nestjs/common");
const bonus_service_1 = require("./bonus.service");
const bonus_controller_1 = require("./bonus.controller");
const mongoose_1 = require("@nestjs/mongoose");
const bonus_entity_1 = require("./entities/bonus.entity");
const users_module_1 = require("../users/users.module");
let BonusModule = class BonusModule {
};
exports.BonusModule = BonusModule;
exports.BonusModule = BonusModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: bonus_entity_1.Bonus.name,
                    schema: bonus_entity_1.BonusSchema
                }
            ]),
            users_module_1.UsersModule
        ],
        controllers: [bonus_controller_1.BonusController],
        providers: [bonus_service_1.BonusService],
        exports: [bonus_service_1.BonusService]
    })
], BonusModule);
//# sourceMappingURL=bonus.module.js.map