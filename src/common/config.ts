import dotenv from 'dotenv';
import Joi from 'joi';
import { logger } from './logger';

dotenv.config();

interface Config {
  MODE: 'development' | 'production';
  SERVER_HOST: string;
  SERVER_PORT: string;
  MONGO_URI: string;
  SMTP_HOST?: string;
  SMTP_PORT?: string;
  SMTP_USER?: string;
  SMTP_PASSWORD?: string;
  EMAIL_FROM?: string;
  USER_POOL_ID: string;
  CLIENT_ID: string;
  API_VERSION: string;
  SUPER_ADMIN_INIT_EMAIL: string;
  SUPER_ADMIN_INIT_PASSWORD: string;
  SKEELED_BASE_URL: string;
  SKEELED_MEDIA_TYPE_HEADER: string;
  SENDBIRD_APP_ID: string;
  SENDBIRD_API_TOKEN: string;
}

const schema = Joi.object<Config, true>({
  MODE: Joi.string().valid(...['development', 'production']),
  SERVER_HOST: Joi.string().required(),
  SERVER_PORT: Joi.string().required(),
  MONGO_URI: Joi.string().required(),
  SMTP_HOST: Joi.string().required(),
  SMTP_PORT: Joi.string().required(),
  SMTP_USER: Joi.string().allow('').optional(),
  SMTP_PASSWORD: Joi.string().allow('').optional(),
  EMAIL_FROM: Joi.string().allow('').required(),
  USER_POOL_ID: Joi.string().required(),
  CLIENT_ID: Joi.string().required(),
  API_VERSION: Joi.string().required(),
  SUPER_ADMIN_INIT_EMAIL: Joi.string().required(),
  SUPER_ADMIN_INIT_PASSWORD: Joi.string().required(),
  SKEELED_BASE_URL: Joi.string().required(),
  SKEELED_MEDIA_TYPE_HEADER: Joi.string().required(),
  SENDBIRD_APP_ID: Joi.string().required(),
  SENDBIRD_API_TOKEN: Joi.string().required()
});

const result = schema.validate(process.env, {
  stripUnknown: true
});

if (result.error) {
  logger.error('Environment variables are not valid!');
  throw result.error.message;
}

export const config = result.value;
