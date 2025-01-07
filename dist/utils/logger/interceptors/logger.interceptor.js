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
exports.LoggerInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const logger_service_1 = require("../logger.service");
let LoggerInterceptor = class LoggerInterceptor {
    constructor(customLoggerService) {
        this.customLoggerService = customLoggerService;
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const { method, url } = request;
        const { statusCode } = response;
        const startTime = Date.now();
        const controllerName = context.getClass().name;
        const handlerName = context.getHandler().name;
        const contextName = `${controllerName}.${handlerName}`;
        return next.handle().pipe((0, operators_1.tap)(() => {
            const duration = Date.now() - startTime;
            this.customLoggerService.log(`${method} ${url} [${statusCode}] Duration: ${duration}ms`, contextName);
        }), (0, operators_1.catchError)((error) => {
            error.contextName = contextName;
            throw error;
        }));
    }
};
exports.LoggerInterceptor = LoggerInterceptor;
exports.LoggerInterceptor = LoggerInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_service_1.CustomLoggerService])
], LoggerInterceptor);
//# sourceMappingURL=logger.interceptor.js.map