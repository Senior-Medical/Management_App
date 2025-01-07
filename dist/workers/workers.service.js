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
exports.WorkersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_service_1 = require("../users/users.service");
const worker_entity_1 = require("./entities/worker.entity");
const base_service_1 = require("../utils/classes/base.service");
let WorkersService = class WorkersService extends base_service_1.BaseService {
    constructor(workersModel, usersService) {
        super();
        this.workersModel = workersModel;
        this.usersService = usersService;
        this.searchableKeys = [
            "name"
        ];
    }
    getModuleModel() {
        return this.workersModel;
    }
    async getAdditionalRenderVariables() {
        return {
            users: await this.usersService.find(),
            type: 'workers',
            title: 'العمال'
        };
    }
    async create(createWorkerDto, user) {
        const { name } = createWorkerDto;
        const existWorker = await this.findOne({ name });
        if (existWorker)
            throw new common_1.ConflictException('إسم العامل موجود بالفعل');
        const inputDate = {
            ...createWorkerDto,
            createdBy: user._id,
            updatedBy: user._id,
        };
        await this.workersModel.create(inputDate);
    }
    async update(worker, updateWorkerDto, user) {
        const existWorker = await this.findOne({
            $and: [
                { name: updateWorkerDto.name },
                { _id: { $ne: worker._id } }
            ]
        });
        if (existWorker)
            throw new common_1.ConflictException('إسم العامل موجود بالفعل');
        const inputData = {
            ...updateWorkerDto,
            updatedBy: user._id
        };
        await worker.set(inputData).save();
    }
};
exports.WorkersService = WorkersService;
exports.WorkersService = WorkersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(worker_entity_1.Worker.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService])
], WorkersService);
//# sourceMappingURL=workers.service.js.map