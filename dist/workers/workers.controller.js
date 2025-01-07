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
exports.WorkersController = void 0;
const common_1 = require("@nestjs/common");
const get_user_decorator_1 = require("../utils/decorators/get-user.decorator");
const ObjectId_pipe_1 = require("../utils/pipes/ObjectId.pipe");
const queryParam_pipe_1 = require("../utils/pipes/queryParam.pipe");
const create_worker_dto_1 = require("./dto/create-worker.dto");
const worker_id_pipe_1 = require("./pipes/worker-id.pipe");
const workers_service_1 = require("./workers.service");
let WorkersController = class WorkersController {
    constructor(workersService) {
        this.workersService = workersService;
    }
    create(user, createWorkerDto) {
        return this.workersService.create(createWorkerDto, user);
    }
    findAll(queryParams, user) {
        return this.workersService.findAll(queryParams, user);
    }
    update(worker, user, updateWorkerDto) {
        return this.workersService.update(worker, updateWorkerDto, user);
    }
    remove(worker) {
        return this.workersService.remove(worker);
    }
};
exports.WorkersController = WorkersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.Redirect)('/workers'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_worker_dto_1.CreateWorkerDto]),
    __metadata("design:returntype", void 0)
], WorkersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('index'),
    __param(0, (0, common_1.Query)(queryParam_pipe_1.QueryParamPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], WorkersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('update/:workerId'),
    (0, common_1.Redirect)('/workers?sort=-updatedAt'),
    __param(0, (0, common_1.Param)('workerId', ObjectId_pipe_1.ObjectIdPipe, worker_id_pipe_1.WorkerIdPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_worker_dto_1.CreateWorkerDto]),
    __metadata("design:returntype", void 0)
], WorkersController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('delete/:workerId'),
    (0, common_1.Redirect)('/workers'),
    __param(0, (0, common_1.Param)('workerId', ObjectId_pipe_1.ObjectIdPipe, worker_id_pipe_1.WorkerIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WorkersController.prototype, "remove", null);
exports.WorkersController = WorkersController = __decorate([
    (0, common_1.Controller)('workers'),
    __metadata("design:paramtypes", [workers_service_1.WorkersService])
], WorkersController);
//# sourceMappingURL=workers.controller.js.map