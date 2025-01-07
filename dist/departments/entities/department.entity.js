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
exports.DepartmentSchema = exports.Department = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const arabic_date_formatter_1 = require("../../utils/arabic-date-formatter");
let Department = class Department {
};
exports.Department = Department;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: true
    }),
    __metadata("design:type", String)
], Department.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Department.prototype, "createdAtArabic", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Department.prototype, "updatedAtArabic", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        ref: 'User'
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Department.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        ref: 'User'
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Department.prototype, "updatedBy", void 0);
exports.Department = Department = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Department);
const DepartmentSchema = mongoose_1.SchemaFactory.createForClass(Department);
exports.DepartmentSchema = DepartmentSchema;
DepartmentSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.createdAtArabic = arabic_date_formatter_1.arabicDateFormatter.format(new Date());
        this.updatedAtArabic = arabic_date_formatter_1.arabicDateFormatter.format(new Date());
    }
    else if (this.isModified()) {
        this.updatedAtArabic = arabic_date_formatter_1.arabicDateFormatter.format(new Date());
    }
    next();
});
//# sourceMappingURL=department.entity.js.map