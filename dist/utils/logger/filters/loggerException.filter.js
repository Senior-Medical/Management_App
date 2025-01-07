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
exports.LoggerExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const logger_service_1 = require("../logger.service");
let LoggerExceptionFilter = class LoggerExceptionFilter extends core_1.BaseExceptionFilter {
    constructor(customLoggerService) {
        super();
        this.customLoggerService = customLoggerService;
    }
    catch(exception, host) {
        const statusCode = exception instanceof common_1.HttpException ? exception.getStatus() : 500;
        const errorMessage = exception.message || "Internal server error";
        const contextName = exception.contextName || 'Unknown';
        const request = host.switchToHttp().getRequest();
        const { method, url } = request;
        const duration = Date.now() - (request.startTime || Date.now());
        this.customLoggerService.error(`${method} ${url} [${statusCode}] Duration: ${duration}ms Error: ${errorMessage}`, contextName);
        const response = host.switchToHttp().getResponse();
        if (url.startsWith("/users"))
            response.redirect(`/users?error=${errorMessage}`);
        else if (url.startsWith("/workers"))
            response.redirect(`/workers?error=${errorMessage}`);
        else if (url.startsWith("/products"))
            response.redirect(`/products?error=${errorMessage}`);
        else if (url.startsWith("/departments"))
            response.redirect(`/departments?error=${errorMessage}`);
        else if (url.startsWith("/bonus"))
            response.redirect(`/bonus?error=${errorMessage}`);
        else if (url.startsWith("/productPrice"))
            response.redirect(`/productPrice?error=${errorMessage}`);
        else if (url.startsWith("/production"))
            response.redirect(`/production?error=${errorMessage}`);
    }
};
exports.LoggerExceptionFilter = LoggerExceptionFilter;
exports.LoggerExceptionFilter = LoggerExceptionFilter = __decorate([
    (0, common_1.Injectable)(),
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [logger_service_1.CustomLoggerService])
], LoggerExceptionFilter);
//# sourceMappingURL=loggerException.filter.js.map