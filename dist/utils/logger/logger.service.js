"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomLoggerService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
let CustomLoggerService = class CustomLoggerService extends common_1.ConsoleLogger {
    constructor() {
        super(...arguments);
        this.logFile = path.join(__dirname, '..', '..', 'logs', 'app.log');
    }
    ensureLogFileExists() {
        if (!fs.existsSync(this.logFile)) {
            fs.mkdirSync(path.dirname(this.logFile), { recursive: true });
            fs.writeFileSync(this.logFile, '');
        }
    }
    clearLogFile() {
        this.ensureLogFileExists();
        fs.writeFileSync(this.logFile, '');
    }
    log(message, context) {
        const formattedMessage = context
            ? `[${context}] ${message}`
            : `${message}`;
        super.log(message, context);
        this.writeToFile(formattedMessage);
    }
    error(message, context, trace) {
        const formattedMessage = context
            ? `[${context}] ${message} ${trace || ''}`
            : `${message} ${trace || ''}`;
        super.error(message, trace, context);
        this.writeToFile(formattedMessage);
    }
    writeToFile(logMessage) {
        this.ensureLogFileExists();
        const timestamp = new Date().toISOString();
        fs.appendFileSync(this.logFile, `[${timestamp}] ${logMessage}\n`);
    }
};
exports.CustomLoggerService = CustomLoggerService;
exports.CustomLoggerService = CustomLoggerService = __decorate([
    (0, common_1.Injectable)()
], CustomLoggerService);
//# sourceMappingURL=logger.service.js.map