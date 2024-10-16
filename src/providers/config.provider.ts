import { cleanEnv, host, port, str } from 'envalid';
import dotenv from 'dotenv';

dotenv.config();

export const config = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ['development', 'testing', 'staging', 'production'],
  }),
  ADMIN_PORT: port(),
  ADMIN_FRONTEND_HOSTNAME: host({}),
  SESSION_SECRET: str(),
  DATABASE_URL: str(),
  DATABASE_READ_REPLICA_URL: str(),
  REDIS_URL: str(),
  SMTP_HOST_NAME: host(),
  SMTP_PORT: port(),
  SMTP_USERNAME: str(),
  SMTP_PASSWORD: str(),
  TESTING_PORT: port(),
});
