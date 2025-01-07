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
exports.ProductionSchema = exports.Production = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const arabic_date_formatter_1 = require("../../utils/arabic-date-formatter");
let Production = class Production {
};
exports.Production = Production;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Production.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Production.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Production.prototype, "cost", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        ref: 'Product'
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Production.prototype, "product", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        ref: 'Worker'
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Production.prototype, "worker", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        ref: 'Department'
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Production.prototype, "department", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Production.prototype, "createdAtArabic", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Production.prototype, "updatedAtArabic", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Production.prototype, "arabicDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        ref: 'User'
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Production.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        ref: 'User'
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Production.prototype, "updatedBy", void 0);
exports.Production = Production = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Production);
const ProductionSchema = mongoose_1.SchemaFactory.createForClass(Production);
exports.ProductionSchema = ProductionSchema;
ProductionSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.createdAtArabic = arabic_date_formatter_1.arabicDateFormatter.format(new Date());
        this.updatedAtArabic = arabic_date_formatter_1.arabicDateFormatter.format(new Date());
    }
    else if (this.isModified()) {
        this.updatedAtArabic = arabic_date_formatter_1.arabicDateFormatter.format(new Date());
    }
    if (this.isModified('date')) {
        this.arabicDate = arabic_date_formatter_1.arabicDateFormatter.format(this.date);
    }
    next();
});
//# sourceMappingURL=production.entity.js.map