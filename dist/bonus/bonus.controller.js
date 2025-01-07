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
exports.BonusController = void 0;
const common_1 = require("@nestjs/common");
const get_user_decorator_1 = require("../utils/decorators/get-user.decorator");
const ObjectId_pipe_1 = require("../utils/pipes/ObjectId.pipe");
const queryParam_pipe_1 = require("../utils/pipes/queryParam.pipe");
const bonus_service_1 = require("./bonus.service");
const create_bonus_dto_1 = require("./dto/create-bonus.dto");
const update_bonus_dto_1 = require("./dto/update-bonus.dto");
const bonus_id_pipe_1 = require("./pipes/bonus-id.pipe");
let BonusController = class BonusController {
    constructor(bonusService) {
        this.bonusService = bonusService;
    }
    create(createBonusDto, user) {
        return this.bonusService.create(createBonusDto, user);
    }
    findAll(queryParams, user) {
        return this.bonusService.findAll(queryParams, user);
    }
    update(bonus, updateBonusDto, user) {
        return this.bonusService.update(bonus, updateBonusDto, user);
    }
    remove(bonus) {
        return this.bonusService.remove(bonus);
    }
};
exports.BonusController = BonusController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.Redirect)('/bonus'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bonus_dto_1.CreateBonusDto, Object]),
    __metadata("design:returntype", void 0)
], BonusController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('index'),
    __param(0, (0, common_1.Query)(queryParam_pipe_1.QueryParamPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BonusController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('update/:bonusId'),
    (0, common_1.Redirect)('/bonus?sort=-updatedAt'),
    __param(0, (0, common_1.Param)('bonusId', ObjectId_pipe_1.ObjectIdPipe, bonus_id_pipe_1.BonusIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_bonus_dto_1.UpdateBonusDto, Object]),
    __metadata("design:returntype", void 0)
], BonusController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('delete/:bonusId'),
    (0, common_1.Redirect)('/bonus'),
    __param(0, (0, common_1.Param)('bonusId', ObjectId_pipe_1.ObjectIdPipe, bonus_id_pipe_1.BonusIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BonusController.prototype, "remove", null);
exports.BonusController = BonusController = __decorate([
    (0, common_1.Controller)('bonus'),
    __metadata("design:paramtypes", [bonus_service_1.BonusService])
], BonusController);
//# sourceMappingURL=bonus.controller.js.map