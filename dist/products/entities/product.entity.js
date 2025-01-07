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
exports.ProductSchema = exports.Product = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_price_entity_1 = require("../../product-price/entities/product-price.entity");
const arabic_date_formatter_1 = require("../../utils/arabic-date-formatter");
let Product = class Product {
};
exports.Product = Product;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: true
    }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "createdAtArabic", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "updatedAtArabic", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        ref: 'User'
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Product.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        ref: 'User'
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Product.prototype, "updatedBy", void 0);
exports.Product = Product = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Product);
const ProductSchema = mongoose_1.SchemaFactory.createForClass(Product);
exports.ProductSchema = ProductSchema;
ProductSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.createdAtArabic = arabic_date_formatter_1.arabicDateFormatter.format(new Date());
        this.updatedAtArabic = arabic_date_formatter_1.arabicDateFormatter.format(new Date());
    }
    else if (this.isModified()) {
        this.updatedAtArabic = arabic_date_formatter_1.arabicDateFormatter.format(new Date());
    }
    next();
});
ProductSchema.post('findOneAndDelete', async function (doc, next) {
    if (doc) {
        await doc.model(product_price_entity_1.ProductPrice.name).deleteMany({ product: doc._id });
    }
    next();
});
//# sourceMappingURL=product.entity.js.map