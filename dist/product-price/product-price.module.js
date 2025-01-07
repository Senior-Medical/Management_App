"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductPriceModule = void 0;
const common_1 = require("@nestjs/common");
const product_price_service_1 = require("./product-price.service");
const product_price_controller_1 = require("./product-price.controller");
const mongoose_1 = require("@nestjs/mongoose");
const product_price_entity_1 = require("./entities/product-price.entity");
const users_module_1 = require("../users/users.module");
const products_module_1 = require("../products/products.module");
const departments_module_1 = require("../departments/departments.module");
let ProductPriceModule = class ProductPriceModule {
};
exports.ProductPriceModule = ProductPriceModule;
exports.ProductPriceModule = ProductPriceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: product_price_entity_1.ProductPrice.name,
                    schema: product_price_entity_1.ProductPriceSchema,
                }
            ]),
            users_module_1.UsersModule,
            products_module_1.ProductsModule,
            departments_module_1.DepartmentsModule
        ],
        controllers: [product_price_controller_1.ProductPriceController],
        providers: [product_price_service_1.ProductPriceService],
        exports: [product_price_service_1.ProductPriceService]
    })
], ProductPriceModule);
//# sourceMappingURL=product-price.module.js.map