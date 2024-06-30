import { AdminController } from '@/servers/admin/admin/admin.controller.js';
import { CountryController } from '@/servers/admin/country/country.controller.js';
import { HealthcheckController } from '@/servers/admin/healthcheck/healthcheck.controller.js';

export const controllers = [
  AdminController,
  CountryController,
  HealthcheckController,
];
