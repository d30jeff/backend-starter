import { controllers } from '@modules/admin/admin.controllers';
import { Prisma } from '@prisma/client';
import { createApplication } from '@providers/application.provider';
import { config } from '@providers/config.provider';
import { database } from '@providers/database.provider';

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

  const coords = `ST_POINT(5.938507386268658, 116.07715095739208)`;
  const home = '5.960648489641588, 116.05952776507462';

  const result = await database.write.$queryRaw(
    Prisma.sql([
      `SELECT "ID", ST_Distance(coords::geography, 'POINT(5.960648489641588 116.05952776507462)') as distance_in_meters FROM "Organization"
      WHERE ST_DWithin(coords::geography, 'POINT(5.960648489641588 116.05952776507462)', 3000)`,
    ])
  );

  app.listen(config.ADMIN_PORT, async () => {
    logger.success(`Admin API is running on port ${config.ADMIN_PORT} 🚀`, config);
  });
}

main();
