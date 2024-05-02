import { Admin } from '@servers/admin/admin/admin.interface';
import { Account } from '@modules/consumer/consumer/account.interface';

declare module 'express-session' {
  interface SessionData {
    consumer: Account.Response;
    admin: Admin.Response;
  }
}
