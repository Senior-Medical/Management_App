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
exports.ProductPriceIdPipe = void 0;
const common_1 = require("@nestjs/common");
const product_price_service_1 = require("../product-price.service");
let ProductPriceIdPipe = class ProductPriceIdPipe {
    constructor(productPriceService) {
        this.productPriceService = productPriceService;
    }
    async transform(productPriceId, metadata) {
        const productPrice = await this.productPriceService.findById(productPriceId);
        if (!productPrice)
            throw new common_1.NotFoundException('خطأ في معرف سعر المنتج.');
        return productPrice;
    }
};
exports.ProductPriceIdPipe = ProductPriceIdPipe;
exports.ProductPriceIdPipe = ProductPriceIdPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_price_service_1.ProductPriceService])
], ProductPriceIdPipe);
//# sourceMappingURL=product-price-id.pipe.js.map