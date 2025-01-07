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
exports.ProductionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const departments_service_1 = require("../departments/departments.service");
const products_service_1 = require("../products/products.service");
const users_service_1 = require("../users/users.service");
const workers_service_1 = require("../workers/workers.service");
const bonus_service_1 = require("../bonus/bonus.service");
const product_price_service_1 = require("../product-price/product-price.service");
const production_entity_1 = require("./entities/production.entity");
const base_service_1 = require("../utils/classes/base.service");
let ProductionService = class ProductionService extends base_service_1.BaseService {
    constructor(productionModel, usersService, productsService, workersService, departmentsService, productPriceService, bonusService) {
        super();
        this.productionModel = productionModel;
        this.usersService = usersService;
        this.productsService = productsService;
        this.workersService = workersService;
        this.departmentsService = departmentsService;
        this.productPriceService = productPriceService;
        this.bonusService = bonusService;
        this.searchableKeys = [
            "arabicDate"
        ];
    }
    getModuleModel() {
        return this.productionModel;
    }
    async getAdditionalRenderVariables() {
        return {
            users: await this.usersService.find(),
            workers: await this.workersService.find(),
            products: await this.productsService.find(),
            departments: await this.departmentsService.find(),
            type: 'production',
            title: 'الإنتاج'
        };
    }
    async create(createProductionDto, user) {
        createProductionDto.worker = new mongoose_2.Types.ObjectId(createProductionDto.worker);
        createProductionDto.product = new mongoose_2.Types.ObjectId(createProductionDto.product);
        createProductionDto.department = new mongoose_2.Types.ObjectId(createProductionDto.department);
        const productPrice = await this.productPriceService.findOne({ product: createProductionDto.product, department: createProductionDto.department });
        if (!productPrice)
            throw new common_1.NotFoundException('يجب تحديد سعر المنتج لهذا القسم');
        const cost = (productPrice.price / 100) * createProductionDto.quantity;
        const inputDate = {
            ...createProductionDto,
            cost,
            createdBy: user._id,
            updatedBy: user._id,
        };
        await this.productionModel.create(inputDate);
    }
    async findAll(queryParams, user) {
        const queryBuilder = this.getQueryBuilder(queryParams);
        const production = await queryBuilder
            .filter()
            .search(this.searchableKeys)
            .sort()
            .paginate()
            .build()
            .populate('worker', 'name')
            .populate('product', 'name')
            .populate('department', 'name')
            .populate('createdBy', 'username')
            .populate('updatedBy', 'username');
        const renderVariables = {
            error: queryParams.error || null,
            data: production,
            user,
            filters: {
                search: queryBuilder.getSearchKey(),
                sort: queryBuilder.getSortKey(),
                pagination: {
                    page: queryBuilder.getPage(),
                    totalPages: await queryBuilder.getTotalPages(),
                    pageSize: queryBuilder.getPageSize()
                },
                ...queryBuilder.getCustomFilters()
            }
        };
        return { ...renderVariables, ...(await this.getAdditionalRenderVariables()) };
    }
    async getSalary(getSalaryDto, queryParams, user) {
        try {
            console.log(1);
            const productions = await this.productionModel.find({
                date: {
                    $gte: getSalaryDto.from,
                    $lte: getSalaryDto.to
                }
            }).populate('worker', 'name')
                .populate('product', 'name')
                .populate('department', 'name');
            const workerSalaries = new Map();
            productions.forEach((production) => {
                const workerId = production.worker._id.toString();
                const cost = production.cost;
                if (!workerSalaries.has(workerId)) {
                    workerSalaries.set(workerId, { name: production.worker.name, salary: 0, bonus: 0, total: 0 });
                }
                const workerData = workerSalaries.get(workerId);
                workerData.salary += cost;
            });
            console.log(3);
            const salaries = Array.from(workerSalaries.values());
            for (const salary of salaries) {
                const bonusPresent = (await this.bonusService.find({
                    from: {
                        $lte: salary.salary
                    },
                    to: {
                        $gte: salary.salary
                    }
                }))[0];
                salary.bonus = bonusPresent ? (bonusPresent.percentage / 100) * salary.salary : 0;
                salary.total = salary.salary + salary.bonus;
            }
            ;
            console.log(4);
            return { data: salaries, user, error: queryParams.error || null };
        }
        catch (error) {
            console.log(error);
        }
    }
    async update(Production, updateProductionDto, user) {
        if (updateProductionDto.worker)
            updateProductionDto.worker = new mongoose_2.Types.ObjectId(updateProductionDto.worker);
        else
            updateProductionDto.worker = Production.worker;
        if (updateProductionDto.product)
            updateProductionDto.product = new mongoose_2.Types.ObjectId(updateProductionDto.product);
        else
            updateProductionDto.product = Production.product;
        if (updateProductionDto.department)
            updateProductionDto.department = new mongoose_2.Types.ObjectId(updateProductionDto.department);
        else
            updateProductionDto.department = Production.department;
        const productPrice = await this.productPriceService.findOne({ product: updateProductionDto.product, department: updateProductionDto.department });
        if (!productPrice)
            throw new common_1.NotFoundException('يجب تحديد سعر المنتج لهذا القسم');
        const cost = (productPrice.price / 100) * updateProductionDto.quantity;
        const inputData = {
            ...updateProductionDto,
            cost,
            updatedBy: user._id
        };
        await Production.set(inputData).save();
    }
};
exports.ProductionService = ProductionService;
exports.ProductionService = ProductionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(production_entity_1.Production.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService,
        products_service_1.ProductsService,
        workers_service_1.WorkersService,
        departments_service_1.DepartmentsService,
        product_price_service_1.ProductPriceService,
        bonus_service_1.BonusService])
], ProductionService);
//# sourceMappingURL=production.service.js.map