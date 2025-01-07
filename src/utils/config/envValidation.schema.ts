import * as Joi from 'joi';

/**
 * envVariablesValidationSchema
 * 
 * A Joi schema used to validate environment variables, ensuring required configuration values are provided and meet certain constraints. 
 * It covers various categories such as server settings, JWT configuration, encryption keys, file upload settings, Twilio & SendGrid credentials, throttling limits, and CSRF protection.
 * 
 * - Server: Defines basic configurations like server port, database URI, and global prefix.
 * - JWT: Validates JWT secrets and expiration times for access and refresh tokens.
 * - Encryption: Ensures the presence and proper length of encryption-related settings.
 * - Multer: Configures file upload size limits and upload folder paths.
 * - Twilio: Requires Twilio account SID, authentication token, and phone number in E.164 format.
 * - SendGrid: Ensures API key and sender email are correctly set.
 * - Throttler: Validates rate limiting settings.
 * - CSRF: Ensures the CSRF secret is properly configured for protection against cross-site request forgery.
 */
export const envVariablesValidationSchema = Joi.object({
  // Server
  NODE_ENV: Joi.string().default("development").required(),
  PORT: Joi.number().default(3000).required(),
  DB_URI: Joi.string().uri().required(),
  HOST: Joi.string().required(),
  
  // Session
  SESSION_SECRET: Joi.string().min(32).required(),
  
  // Encryption
  BCRYPT_GENERATION_SALT_NUMBER: Joi.number().integer().min(1).required(),
  ENCRYPTION_KEY: Joi.string().length(32).required(),
  ENCRYPTION_IV: Joi.string().length(16).required(),
  ENCRYPTION_ALGORITHM: Joi.string().default('aes-256-cbc').required(),

  // Throttler
  THROTTLE_TTL: Joi.number().integer().positive().default(60).required(),
  THROTTLE_LIMIT: Joi.number().integer().positive().default(10).required(),
});
