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
exports.CreateProductionPipe = void 0;
const common_1 = require("@nestjs/common");
const departments_service_1 = require("../../departments/departments.service");
const products_service_1 = require("../../products/products.service");
const production_service_1 = require("../production.service");
const workers_service_1 = require("../../workers/workers.service");
let CreateProductionPipe = class CreateProductionPipe {
    constructor(productionService, productsService, workersService, departmentsService) {
        this.productionService = productionService;
        this.productsService = productsService;
        this.workersService = workersService;
        this.departmentsService = departmentsService;
    }
    transform(data, metadata) {
        const { product, department, worker } = data;
        const productExists = this.productsService.findById(product.toString());
        if (!productExists)
            throw new common_1.NotAcceptableException('خطأ في معرف المنتج.');
        const departmentExists = this.departmentsService.findById(department.toString());
        if (!departmentExists)
            throw new common_1.NotAcceptableException('خطأ في معرف القسم.');
        const workerExists = this.workersService.findById(worker.toString());
        if (!workerExists)
            throw new common_1.NotAcceptableException('خطأ في معرف العامل.');
        return data;
    }
};
exports.CreateProductionPipe = CreateProductionPipe;
exports.CreateProductionPipe = CreateProductionPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [production_service_1.ProductionService,
        products_service_1.ProductsService,
        workers_service_1.WorkersService,
        departments_service_1.DepartmentsService])
], CreateProductionPipe);
//# sourceMappingURL=create-production-price.pipe.js.map