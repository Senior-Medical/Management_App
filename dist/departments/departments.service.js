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
exports.DepartmentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_service_1 = require("../users/users.service");
const department_entity_1 = require("./entities/department.entity");
const base_service_1 = require("../utils/classes/base.service");
let DepartmentsService = class DepartmentsService extends base_service_1.BaseService {
    constructor(departmentsModel, usersService) {
        super();
        this.departmentsModel = departmentsModel;
        this.usersService = usersService;
        this.searchableKeys = [
            "name"
        ];
    }
    getModuleModel() {
        return this.departmentsModel;
    }
    async getAdditionalRenderVariables() {
        return {
            users: await this.usersService.find(),
            type: 'departments',
            title: 'الأقسام'
        };
    }
    async create(createDepartmentDto, user) {
        const { name } = createDepartmentDto;
        const existDepartments = await this.findOne({ name });
        if (existDepartments)
            throw new common_1.ConflictException('إسم القسم موجود بالفعل');
        const inputDate = {
            ...createDepartmentDto,
            createdBy: user._id,
            updatedBy: user._id,
        };
        await this.departmentsModel.create(inputDate);
    }
    async update(department, updateDepartmentDto, user) {
        const existDepartment = await this.findOne({
            $and: [
                { name: updateDepartmentDto.name },
                { _id: { $ne: department._id } }
            ]
        });
        if (existDepartment)
            throw new common_1.ConflictException('إسم القسم موجود بالفعل');
        const inputData = {
            ...updateDepartmentDto,
            updatedBy: user._id
        };
        await department.set(inputData).save();
    }
};
exports.DepartmentsService = DepartmentsService;
exports.DepartmentsService = DepartmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(department_entity_1.Department.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService])
], DepartmentsService);
//# sourceMappingURL=departments.service.js.map