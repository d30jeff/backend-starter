### Backend Starter

Opinionated Node.js (ESM) backend starter written in Express and TypeScript.

# Features / Table of content

- [Application instance](#application-instance)
- Plop JS (for servers and modules)
- Dotenv and configuration provider + run time validation
- Dependency injection
- API documentation with OpenAPI + Redoc
- Prisma
- Stripe-like model object ID
- Unit testing with Jest
- Integration testing with Supertest
- HTTP request logger with Morgan
- Helmet middleware
- Cors middleware
- Logging with Signale
- Repository pattern
- Rate limiting
- [Slow down requests](#slow-down-requests)
- [Controller based route handler](#controller-based-route-handler)

<h2 id="application-instance">Application instance</h2>
Express app wrapper to initialize your application based on the given params:

```
export type CreateApplicationParams = {
  // Name of your server. e.g Admin
  name: string;
  // An array of your controller classes
  controllers: any[];
  // Allowed origin
  origin: string[];
  // Static paths. e.g. OpenAPI docs.
  // staticPaths: [
  //    {
  //      prefix: '/',
  //      path: 'docs/admin',
  //      enabled: config.IS_PRODUCTION === false,
  //    },
  //  ],
  staticPaths?: Array<{ prefix: string; path: string; enabled: boolean }>;
};
```

### Usage

`consumer.server.ts`

```
import { createApplication } from '@/providers/application.provider.js';

async function main() {
  const { app, logger } = await createApplication({
    name: 'Consumer',
    controllers,
    origin: [config.CONSUMER_FRONTEND_HOSTNAME],

  app.listen(config.CONSUMER_PORT, async () => {
    logger.info('Consumer is running on port: ', config.CONSUMER_PORT);
  });
}

main();
```

`$ yarn start consumer:dev`

<h2 id="slow-down-requests">Slow down requests</h2>
Delays the response for requests based on configuration.

Example: Within a 10 minute window, delay the response by **request_count \* 250ms** (and for a maximum delay of 3 seconds) after 5 requests.

```
export const globalSlowDown = (options: Pick<Options, 'delayAfter'>) => {
  const { delayAfter = 5 } = options;

  return slowDown({
    windowMs: dayjs.duration(10, 'minutes').asMilliseconds(),
    delayAfter,
    delayMs: (hits) => hits * 250,
    maxDelayMs: dayjs.duration(3, 'seconds').asMilliseconds(),
    store: new RateLimitRedis({
      sendCommand: (...args: string[]) => (redis as any).call(...args),
      prefix: 'GlobalSlowDown',
    }),
  });
};
```

<h2 id="controller-based-route-handler">Controller based route handler</h2>

```
@Controller('/healthcheck')
export class HealthcheckController {
  @Logger()
  private readonly logger: CustomLogger;

  @Get('/')
  async list(
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNextFunction
  ) {
    try {
      return response.status(HttpStatus.Ok).json({
        status: '🚀 Service is up and running',
        service: 'Admin API',
      });
    } catch (error) {
      this.logger.fatal(error);
      next(error);
    }
  }
}
```

### Database

- Prisma
- Stripe-like ID

e.g. `user_<NANO_ID>`

### Application

- Global rate limiting
- HTTP method-level rate limiting
- Global slow down
- HTTP method-level slow down
- Custom Response

### Setup dotenv file based on provided example file

`cp .env.example .env`

### Create docker-compose.yml file based on the provided example file

`cp docker-compose.yml.example docker-compose.yml`

### Building required Docker containers

`docker compose up -d`

### Install Dependencies

`yarn`

### Executing initial database migration

`yarn prisma db push`

### Running

`yarn start <server>:<mode>`

Where server is the entrypoint point in ./src/servers

e.g.
`yarn start admin:dev`

### Entrypoint

Please check main.js
