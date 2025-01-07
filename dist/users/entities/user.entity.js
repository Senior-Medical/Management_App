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
exports.createUserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const arabic_date_formatter_1 = require("../../utils/arabic-date-formatter");
const roles_enum_1 = require("../enums/roles.enum");
let User = class User {
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: true,
        index: true
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: roles_enum_1.Role,
        default: roles_enum_1.Role.STAFF
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "createdAtArabic", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "updatedAtArabic", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        ref: 'User'
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], User.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        ref: 'User'
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], User.prototype, "updatedBy", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], User);
const createUserSchema = (encryptionService) => {
    const UserSchema = mongoose_1.SchemaFactory.createForClass(User);
    UserSchema.pre('save', async function (next) {
        if (this.isNew) {
            this.createdAtArabic = arabic_date_formatter_1.arabicDateFormatter.format(new Date());
            this.updatedAtArabic = arabic_date_formatter_1.arabicDateFormatter.format(new Date());
        }
        else if (this.isModified()) {
            this.updatedAtArabic = arabic_date_formatter_1.arabicDateFormatter.format(new Date());
        }
        if (this.isModified('password')) {
            this.password = await encryptionService.bcryptHash(this.password);
            next();
        }
    });
    return UserSchema;
};
exports.createUserSchema = createUserSchema;
//# sourceMappingURL=user.entity.js.map