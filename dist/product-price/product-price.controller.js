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
exports.ProductPriceController = void 0;
const common_1 = require("@nestjs/common");
const get_user_decorator_1 = require("../utils/decorators/get-user.decorator");
const ObjectId_pipe_1 = require("../utils/pipes/ObjectId.pipe");
const queryParam_pipe_1 = require("../utils/pipes/queryParam.pipe");
const create_product_price_dto_1 = require("./dto/create-product-price.dto");
const update_product_price_dto_1 = require("./dto/update-product-price.dto");
const product_price_id_pipe_1 = require("./pipes/product-price-id.pipe");
const product_price_service_1 = require("./product-price.service");
let ProductPriceController = class ProductPriceController {
    constructor(productPriceService) {
        this.productPriceService = productPriceService;
    }
    create(createProductPriceDto, user) {
        return this.productPriceService.create(createProductPriceDto, user);
    }
    findAll(queryParams, user) {
        return this.productPriceService.findAll(queryParams, user);
    }
    update(productPrice, updateProductPriceDto, user) {
        return this.productPriceService.update(productPrice, updateProductPriceDto, user);
    }
    remove(productPrice) {
        return this.productPriceService.remove(productPrice);
    }
};
exports.ProductPriceController = ProductPriceController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.Redirect)('/productPrice'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_price_dto_1.CreateProductPriceDto, Object]),
    __metadata("design:returntype", void 0)
], ProductPriceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('index'),
    __param(0, (0, common_1.Query)(queryParam_pipe_1.QueryParamPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductPriceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('update/:productPriceId'),
    (0, common_1.Redirect)('/productPrice?sort=-updatedAt'),
    __param(0, (0, common_1.Param)('productPriceId', ObjectId_pipe_1.ObjectIdPipe, product_price_id_pipe_1.ProductPriceIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_product_price_dto_1.UpdateProductPriceDto, Object]),
    __metadata("design:returntype", void 0)
], ProductPriceController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('delete/:productPriceId'),
    (0, common_1.Redirect)('/productPrice'),
    __param(0, (0, common_1.Param)('productPriceId', ObjectId_pipe_1.ObjectIdPipe, product_price_id_pipe_1.ProductPriceIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductPriceController.prototype, "remove", null);
exports.ProductPriceController = ProductPriceController = __decorate([
    (0, common_1.Controller)('productPrice'),
    __metadata("design:paramtypes", [product_price_service_1.ProductPriceService])
], ProductPriceController);
//# sourceMappingURL=product-price.controller.js.map