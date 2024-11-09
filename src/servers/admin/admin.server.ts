import { createApplication } from '@/providers/application.provider.js';
import { config } from '@/providers/config.provider.js';
import { controllers } from '@/servers/admin/admin.controllers.js';

async function main() {
  const { app, logger } = await createApplication({
    controllers,
    name: 'Admin',

    origin: [config.ADMIN_FRONTEND_HOSTNAME],
    staticPaths: [
      {
        enabled: config.isProduction === false,
        path: 'docs/admin',
        prefix: '/',
      },
    ],
  });

  app.listen(config.ADMIN_PORT, async () => {
    logger.success(
      `Admin API is running on port ${config.ADMIN_PORT} 🚀`,
      config
    );
  });
}

main();
