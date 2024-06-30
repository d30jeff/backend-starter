import { AdminService } from '@/servers/admin/admin/admin.service.js';
import { Container } from 'typedi';
import { config } from '@/providers/config.provider.js';
import { controllers } from '@/servers/admin/admin.controllers.js';
import { createApplication } from '@/providers/application.provider.js';

async function main() {
  const { app, logger } = await createApplication({
    name: 'Admin',
    controllers,
    origin: [config.ADMIN_FRONTEND_HOSTNAME],
    staticPaths: [
      {
        prefix: '/',
        path: 'docs/admin',
        enabled: config.IS_PRODUCTION === false,
      },
    ],
  });

  app.listen(config.ADMIN_PORT, async () => {
    const adminService = Container.get(AdminService);
    await adminService.initialize();

    logger.success(
      `Admin API is running on port ${config.ADMIN_PORT} 🚀`,
      config
    );
  });
}

main();
