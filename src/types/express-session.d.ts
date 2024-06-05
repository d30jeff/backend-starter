import { Account } from '@/modules/consumer/consumer/account.interface';
import { Admin } from '@/servers/admin/admin/admin.interface';

declare module 'express-session' {
  interface SessionData {
    consumer: Account.Response;
    admin: Admin.Response;
  }
}
