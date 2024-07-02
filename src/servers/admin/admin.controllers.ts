import { CatController } from '@/servers/admin/cat/cat.controller.js';
import { HealthcheckController } from '@/servers/admin/healthcheck/healthcheck.controller.js';

export const controllers = [HealthcheckController, CatController];
