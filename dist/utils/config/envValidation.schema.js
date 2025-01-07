"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVariablesValidationSchema = void 0;
const Joi = require("joi");
exports.envVariablesValidationSchema = Joi.object({
    NODE_ENV: Joi.string().default("development").required(),
    PORT: Joi.number().default(3000).required(),
    DB_URI: Joi.string().uri().required(),
    HOST: Joi.string().required(),
    SESSION_SECRET: Joi.string().min(32).required(),
    BCRYPT_GENERATION_SALT_NUMBER: Joi.number().integer().min(1).required(),
    ENCRYPTION_KEY: Joi.string().length(32).required(),
    ENCRYPTION_IV: Joi.string().length(16).required(),
    ENCRYPTION_ALGORITHM: Joi.string().default('aes-256-cbc').required(),
    THROTTLE_TTL: Joi.number().integer().positive().default(60).required(),
    THROTTLE_LIMIT: Joi.number().integer().positive().default(10).required(),
});
//# sourceMappingURL=envValidation.schema.js.map