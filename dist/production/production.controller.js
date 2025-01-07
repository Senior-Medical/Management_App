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
exports.ProductionController = void 0;
const common_1 = require("@nestjs/common");
const get_user_decorator_1 = require("../utils/decorators/get-user.decorator");
const ObjectId_pipe_1 = require("../utils/pipes/ObjectId.pipe");
const queryParam_pipe_1 = require("../utils/pipes/queryParam.pipe");
const create_production_dto_1 = require("./dto/create-production.dto");
const get_salary_dto_1 = require("./dto/get-salary.dto");
const update_production_dto_1 = require("./dto/update-production.dto");
const create_production_price_pipe_1 = require("./pipes/create-production-price.pipe");
const production_id_pipe_1 = require("./pipes/production-id.pipe");
const production_service_1 = require("./production.service");
let ProductionController = class ProductionController {
    constructor(productionService) {
        this.productionService = productionService;
    }
    create(createProductionDto, user) {
        return this.productionService.create(createProductionDto, user);
    }
    findAll(queryParams, user) {
        return this.productionService.findAll(queryParams, user);
    }
    getSalary(queryParams, getSalaryDto, user) {
        return this.productionService.getSalary(getSalaryDto, queryParams, user);
    }
    update(production, updateProductionDto, user) {
        return this.productionService.update(production, updateProductionDto, user);
    }
    remove(production) {
        return this.productionService.remove(production);
    }
};
exports.ProductionController = ProductionController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.Redirect)('/production'),
    __param(0, (0, common_1.Body)(create_production_price_pipe_1.CreateProductionPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_production_dto_1.CreateProductionDto, Object]),
    __metadata("design:returntype", void 0)
], ProductionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('index'),
    __param(0, (0, common_1.Query)(queryParam_pipe_1.QueryParamPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('get-salary'),
    (0, common_1.Render)('salary'),
    __param(0, (0, common_1.Query)(queryParam_pipe_1.QueryParamPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, get_salary_dto_1.GetSalaryDto, Object]),
    __metadata("design:returntype", void 0)
], ProductionController.prototype, "getSalary", null);
__decorate([
    (0, common_1.Post)('update/:productionId'),
    (0, common_1.Redirect)('/production'),
    __param(0, (0, common_1.Param)('productionId', ObjectId_pipe_1.ObjectIdPipe, production_id_pipe_1.ProductionIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_production_dto_1.UpdateProductionDto, Object]),
    __metadata("design:returntype", void 0)
], ProductionController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('delete/:productionId'),
    (0, common_1.Redirect)('/production'),
    __param(0, (0, common_1.Param)('productionId', ObjectId_pipe_1.ObjectIdPipe, production_id_pipe_1.ProductionIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductionController.prototype, "remove", null);
exports.ProductionController = ProductionController = __decorate([
    (0, common_1.Controller)('production'),
    __metadata("design:paramtypes", [production_service_1.ProductionService])
], ProductionController);
//# sourceMappingURL=production.controller.js.map