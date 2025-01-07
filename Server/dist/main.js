"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session = require("express-session");
const passport = require("passport");
const config_1 = require("@nestjs/config");
const logger_service_1 = require("./utils/logger/logger.service");
const common_1 = require("@nestjs/common");
const helmet_1 = require("helmet");
const path = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get("PORT") || 3000;
    const host = configService.get("HOST") || "localhost";
    const baseUrl = `http://${host}:${port}`;
    app.useLogger(app.get(logger_service_1.CustomLoggerService));
    app.use((0, helmet_1.default)());
    app.use(session({
        secret: configService.get('SESSION_SECRET'),
        resave: Boolean(configService.get('SESSION_RESAVE')),
        saveUninitialized: Boolean(configService.get('SESSION_SAVE_UNINITIALIZED')),
        cookie: { maxAge: +configService.get('SESSION_MAX_AGE') }
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.setViewEngine('ejs');
    app.setBaseViewsDir(path.join(__dirname, '..', 'views'));
    app.useStaticAssets(path.join(__dirname, '..', 'public'));
    await app.listen(port, () => {
        common_1.Logger.log(`Server listen on URL: ${baseUrl}`, 'Bootstrap');
    });
}
bootstrap();
//# sourceMappingURL=main.js.map