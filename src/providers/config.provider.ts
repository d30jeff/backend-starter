import { cleanEnv, host, port, str } from 'envalid';
import dotenv from 'dotenv';
const environment = process.env.NODE_ENV || 'development';

dotenv.config();

export const config = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ['development', 'testing', 'staging', 'production'],
  }),
  ADMIN_PORT: port(),
  ADMIN_FRONTEND_HOSTNAME: host({}),
  DATABASE_URL: str(),
  DATABASE_READ_REPLICA_URL: str(),
  REDIS_URL: str(),
  SMTP_HOST_NAME: host(),
  SMTP_PORT: port(),
  SMTP_USERNAME: str(),
  SMTP_PASSWORD: str(),
});

// export const config = {
//   NODE_ENV: process.env.NODE_ENV,
//   IS_DEVELOPMENT: environment.toLowerCase() === 'development',
//   IS_TESTING: environment.toLowerCase() === 'testing',
//   IS_STAGING: environment.toLowerCase() === 'staging',
//   IS_PRODUCTION: environment.toLowerCase() === 'production',
//   ADMIN_PORT: Number(process.env.ADMIN_PORT),
//   ADMIN_FRONTEND_HOSTNAME: process.env.ADMIN_FRONTEND_HOSTNAME,

//   SENDER_EMAIL: process.env.SENDER_EMAIL,

//   DATABASE_URL: process.env.DATABASE_URL,
//   DATABASE_READ_REPLICA_URL: process.env.DATABASE_READ_REPLICA_URL,

//   REDIS_URL: process.env.REDIS_URL,

//   STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
//   STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,

//   S3_BUCKET: process.env.S3_BUCKET,
//   S3_REGION: process.env.S3_REGION,
//   S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
//   S3_SECRET_KEY: process.env.S3_SECRET_KEY,

//   SMTP_HOST_NAME: process.env.SMTP_HOST_NAME,
//   SMTP_PORT: process.env.SMTP_PORT,
//   SMTP_USERNAME: process.env.SMTP_USERNAME,
//   SMTP_PASSWORD: process.env.SMTP_PASSWORD,
// };
