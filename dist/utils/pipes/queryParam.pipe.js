"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryParamPipe = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const query_dto_1 = require("../dtos/query.dto");
let QueryParamPipe = class QueryParamPipe {
    async transform(queryParams, metadata) {
        const query = (0, class_transformer_1.plainToInstance)(query_dto_1.QueryDto, queryParams);
        const errors = await (0, class_validator_1.validate)(query);
        if (errors.length > 0) {
            const errorsMessages = [];
            errors.forEach((error) => {
                const x = Object.values(error.constraints);
                errorsMessages.push(...x);
            });
            throw new common_1.NotAcceptableException(errorsMessages.join(", "));
        }
        return query;
    }
};
exports.QueryParamPipe = QueryParamPipe;
exports.QueryParamPipe = QueryParamPipe = __decorate([
    (0, common_1.Injectable)()
], QueryParamPipe);
//# sourceMappingURL=queryParam.pipe.js.map