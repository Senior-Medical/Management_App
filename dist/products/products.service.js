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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_service_1 = require("../users/users.service");
const product_entity_1 = require("./entities/product.entity");
const base_service_1 = require("../utils/classes/base.service");
let ProductsService = class ProductsService extends base_service_1.BaseService {
    constructor(productsModel, usersService) {
        super();
        this.productsModel = productsModel;
        this.usersService = usersService;
        this.searchableKeys = [
            "name"
        ];
    }
    getModuleModel() {
        return this.productsModel;
    }
    async getAdditionalRenderVariables() {
        return {
            users: await this.usersService.find(),
            type: 'products',
            title: 'المنتجات'
        };
    }
    async create(createProductDto, user) {
        const { name } = createProductDto;
        const existProducts = await this.findOne({ name });
        if (existProducts)
            throw new common_1.ConflictException('إسم المنتج موجود بالفعل');
        const inputDate = {
            ...createProductDto,
            createdBy: user._id,
            updatedBy: user._id,
        };
        await this.productsModel.create(inputDate);
    }
    async update(product, updateProductDto, user) {
        const existProduct = await this.findOne({
            $and: [
                { name: updateProductDto.name },
                { _id: { $ne: product._id } }
            ]
        });
        if (existProduct)
            throw new common_1.ConflictException('إسم المنتج موجود بالفعل');
        const inputData = {
            ...updateProductDto,
            updatedBy: user._id
        };
        await product.set(inputData).save();
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_entity_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService])
], ProductsService);
//# sourceMappingURL=products.service.js.map