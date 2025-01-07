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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BonusService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_service_1 = require("../users/users.service");
const bonus_entity_1 = require("./entities/bonus.entity");
const base_service_1 = require("../utils/classes/base.service");
let BonusService = class BonusService extends base_service_1.BaseService {
    constructor(bonusModel, usersService) {
        super();
        this.bonusModel = bonusModel;
        this.usersService = usersService;
        this.searchableKeys = [];
    }
    getModuleModel() {
        return this.bonusModel;
    }
    async getAdditionalRenderVariables() {
        return {
            users: await this.usersService.find(),
            type: 'bonus',
            title: 'الحوافز'
        };
    }
    async create(createBonusDto, user) {
        createBonusDto.to = (createBonusDto.to === 0) ? Infinity : createBonusDto.to;
        if (createBonusDto.from >= createBonusDto.to)
            throw new common_1.NotAcceptableException('الحد الأدنى يجب أن يكون أقل من الحد الأعلى');
        const existBonus = await this.bonusModel.findOne({
            $or: [
                { from: createBonusDto.from },
                { to: createBonusDto.to }
            ]
        });
        if (existBonus)
            throw new common_1.ConflictException('أحد أطراف الحافز مكرر');
        const inputDate = {
            from: createBonusDto.from,
            to: createBonusDto.to,
            percentage: createBonusDto.percentage,
            createdBy: user._id,
            updatedBy: user._id,
        };
        await this.bonusModel.create(inputDate);
    }
    async update(bonus, updateBonusDto, user) {
        updateBonusDto.to = (updateBonusDto.to === 0) ? Infinity : (updateBonusDto.to || bonus.to);
        if (updateBonusDto.from >= updateBonusDto.to)
            throw new common_1.NotAcceptableException('الحد الأدنى يجب أن يكون أقل من الحد الأعلى');
        const existBonus = await this.bonusModel.findOne({
            $and: [
                { _id: { $ne: bonus._id } },
                {
                    $or: [
                        { from: updateBonusDto.from },
                        { to: updateBonusDto.to }
                    ]
                }
            ]
        });
        if (existBonus)
            throw new common_1.ConflictException('أحد أطراف الحافز مكرر');
        const inputData = {
            from: updateBonusDto.from || bonus.from,
            to: updateBonusDto.to || bonus.to,
            percentage: updateBonusDto.percentage || bonus.percentage,
            updatedBy: user._id
        };
        await bonus.set(inputData).save();
    }
};
exports.BonusService = BonusService;
exports.BonusService = BonusService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bonus_entity_1.Bonus.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService])
], BonusService);
//# sourceMappingURL=bonus.service.js.map