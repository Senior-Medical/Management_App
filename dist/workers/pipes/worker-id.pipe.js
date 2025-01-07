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
exports.WorkerIdPipe = void 0;
const common_1 = require("@nestjs/common");
const workers_service_1 = require("../workers.service");
let WorkerIdPipe = class WorkerIdPipe {
    constructor(workersService) {
        this.workersService = workersService;
    }
    async transform(workerId, metadata) {
        const worker = await this.workersService.findById(workerId);
        if (!worker)
            throw new common_1.NotFoundException('خطأ في معرف العامل.');
        return worker;
    }
};
exports.WorkerIdPipe = WorkerIdPipe;
exports.WorkerIdPipe = WorkerIdPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [workers_service_1.WorkersService])
], WorkerIdPipe);
//# sourceMappingURL=worker-id.pipe.js.map