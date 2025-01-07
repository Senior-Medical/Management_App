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
exports.ProductPriceSchema = exports.ProductPrice = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const arabic_date_formatter_1 = require("../../utils/arabic-date-formatter");
let ProductPrice = class ProductPrice {
};
exports.ProductPrice = ProductPrice;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    __metadata("design:type", Number)
], ProductPrice.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        ref: 'Product',
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ProductPrice.prototype, "product", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        ref: 'Department',
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ProductPrice.prototype, "department", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ProductPrice.prototype, "createdAtArabic", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ProductPrice.prototype, "updatedAtArabic", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        ref: 'User',
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ProductPrice.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        ref: 'User',
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ProductPrice.prototype, "updatedBy", void 0);
exports.ProductPrice = ProductPrice = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ProductPrice);
const ProductPriceSchema = mongoose_1.SchemaFactory.createForClass(ProductPrice);
exports.ProductPriceSchema = ProductPriceSchema;
ProductPriceSchema.index({ product: 1, department: 1 }, { unique: true });
ProductPriceSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.createdAtArabic = arabic_date_formatter_1.arabicDateFormatter.format(new Date());
        this.updatedAtArabic = arabic_date_formatter_1.arabicDateFormatter.format(new Date());
    }
    else if (this.isModified()) {
        this.updatedAtArabic = arabic_date_formatter_1.arabicDateFormatter.format(new Date());
    }
    next();
});
//# sourceMappingURL=product-price.entity.js.map