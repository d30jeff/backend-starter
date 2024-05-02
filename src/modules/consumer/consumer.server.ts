import { controllers } from '@modules/consumer/consumer.controllers';
import { createApplication } from '@providers/application.provider';
import { config } from '@providers/config.provider';

async function main() {
  const { app, logger } = await createApplication({
    name: 'Consumer',
    controllers,
    origin: [config.CONSUMER_FRONTEND_HOSTNAME],
    staticPaths: [
      {
        prefix: '/',
        path: 'docs/consumer',
        enabled: config.IS_PRODUCTION === false,
      },
    ],
  });

  app.listen(config.CONSUMER_PORT, async () => {
    logger.success(`Consumer is running on port ${config.CONSUMER_PORT} 🚀`, {
      ...config,
    });
  });
}

main();
