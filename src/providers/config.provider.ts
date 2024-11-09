import dotenv from 'dotenv';
import { cleanEnv, port, str } from 'envalid';

dotenv.config();

export const config = cleanEnv(process.env, {
  ADMIN_FRONTEND_HOSTNAME: str(),
  ADMIN_PORT: port(),
  DATABASE_READ_REPLICA_URL: str(),
  DATABASE_URL: str(),
  NODE_ENV: str({
    choices: ['development', 'testing', 'staging', 'production'],
  }),
  REDIS_URL: str(),
  SESSION_SECRET: str(),
  SMTP_HOST_NAME: str(),
  SMTP_PASSWORD: str(),
  SMTP_PORT: port(),
  SMTP_USERNAME: str(),
});
