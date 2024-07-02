### Backend Starter

Opinionated Express backend starter in TypeScript and ESM.

For more information please go to the [features](#features) section.

## Getting started

### Setup dotenv file based on provided example file

`cp .env.example .env`

### Create docker-compose.yml file based on the provided example file

`cp docker-compose.yml.example docker-compose.yml`

### Building required Docker containers

`docker compose up -d` or `docker-compose up -d`

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

<h1 id="features">Features / Table of content</h1>

- [Directory structure](#directory-structure)
- [Application instance](#application-instance)
- [Plop JS for servers and modules](#plopjs)
- [TypeScript path alias](#typescript-path-alias)
- [Nested namespace](#nested-namespace)
- [Docker compose](#docker-compose)
- [Dotenv and config provider](#dotenv)
- [Dependency injection](#dependency-injection)
- [API documentation](#api-documentation)
- [Prisma](#prisma)
- [Stripe-like ID](#stripe-like-ID)
- [Jest](#jest)
- [Supertest](#supertest)
- [Standardized response](#standardized-response)
- [Request ID](#request-id)
- [HTTP request logger with Morgan](#http-request-logger-with-morgan)
- [Logging with Signale](#logging-with-signale)
- [Repository pattern](#repository-pattern)
- [Rate limit](#rate-limit)
- [Slow down](#slow-down)
- [Controller based route handler](#controller-based-route-handler)

<h2 id="directory-structure">Directory structure</h2>

```
├── secrets
├── src
│   ├── datasource
│   ├── enums
│   ├── exceptions
│   ├── interfaces
│   ├── middlewares
│   ├── providers
│   ├── queues
│   ├── repositories
│   ├── responses
│   ├── servers
│   ├── services
│   ├── templates
│   ├── types
│   └── utils
├── templates
│   ├── docs
│   ├── module
│   ├── repository.ts.hbs
│   └── servers
├── templates
```

**secrets**

Secret files such as certificate keys, service keys, etc.

**src/datasource**

Default or migration data.

A ts file that exports a list of countries, or excel files for example.

**src/enums**

Global enums such as HttpStatus codes

**src/exceptions**

Global exceptions

**src/middlewares**

Global middlewares such as rate-limit, slow-down, validation error format

**src/providers**

This is where instances that require configuration are initialized. Such as

```
export const stripe = new Stripe(config.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
  typescript: true,
});
```

**src/queues**

This is where entrypoints for queues should be placed in.

**src/repositories**

Contains Repository classes

**src/responses**

Currently holds `common.response.ts` which provides inheritance from other module-specific response that initializes common properties coming from module-specific repositories such as

- ID
- createdAt
- updatedAt

Example:

```
interface Cat {
  export class Response extends CommonResponse {
    constructor(params: CatWithPublicFields) {
      super();
      this.name = params.name;
    }
  }
}

const data = await this.catService.find();
const response = new Cat.Response(data);

// response
{
  ID: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

```

**src/servers**

Primary entrypoint for a server. Every interface and services within a server is to be treated as part of their respective parent server.

i.e Account module in admin should represent accounts related module for Admins.

**src/services**

Standalone service classes that do not directly belong to a specific server.

Example: Email, S3

**src/templates**

Any template files such as hbs for email.
Not to be mistaken with `./templates` which contains PlopJS templates.

**types**

Typings directory for type augmentations.

**utils**

Utility libraries

**templates**

PlopJS templates

<hr>

<h2 id="application-instance">Application instance</h2>
This is a factory function that create your express instance, hooks up all the default middlewares, attach all the controllers.

The function accepts the following type:

**name** - Name of your server / entrypoint.

**controllers** - An array of @Controller decorated classes.

**origin** - An array of allowed origins

**staticPaths**
An array of object(s) of the following type for static content:

```
  prefix: '/',
  path: 'docs/admin',
  enabled: config.IS_PRODUCTION === false,
```

For more information please check out `src/providers/application.provider.ts`

### Example

`consumer.server.ts`

```
import { createApplication } from '@/providers/application.provider.js';
import { controllers } from '@/servers/admin/admin.controllers.js';

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

<h2 id="plopjs">PlopJS</h2>

[Plopjs](https://plopjs.com/) allows you to generate files and code.

There are two commands available in this repository:

Running `yarn plop`
![yarn plop output](https://i.ibb.co/HXtxfCB/Screenshot-2024-07-01-at-08-03-13.png)

### Generating server

![server](https://i.ibb.co/KjCTwxx/Screenshot-2024-07-01-at-08-09-26.png)

### Generating module

![module](https://i.ibb.co/bJ7zC4q/Screenshot-2024-07-01-at-08-11-16.png)

For customization,
please look into `plopfile.cjs` and `./templates`

<h2 id="typescript-path-alias">TypeScript path alias</h2>

Due to some issues in the past where we couldn't distinguish between internal and external lib with `@` prefix.

e.g. `import { something } from '@utils/something.util.js'`

We have decided to modify the path alias mapping format to:

```
"paths": {
  "@/*": ["src/*"]
}
```

So the example import above would be written as

`import { something } from '@/utils/something.util.js'`

\*Note the `/` in `@/...`

<hr>

<h2 id="nested-namespace">Nested namespace</h2>

_This section is opinionated, biased, and is based on the author's knowledge and experience at the time of writing. Please take it with a grain of salt.._

In order to avoid long naming for a type or interface.

e.g.

`export type CreateCatParams`

and to avoid collisions with other modules.

e.g.

`export type CreateParams`

may already exists in other modules.

Namespace allows us to 'scope' our typings to a module-level, and nesting the namespace allows us to scope it down to the service method level.

e.g.

```
export namespace Cat {
  export namespace Create {
    export type Params = {...}
  }
}
```

This maps well to the HTTP handler, since we can clearly define the payload, query params, and response for a particular resource.

The following namespace for example,

```
export namespace Cat {
  export namespace Create {
    export class Dto {...}
    export type Params = {...}
    export class Response extends CommonResponse {...}
  }
}
```

In the controller level, when doing validation.

`const body = await validate<Cat.Create.Dto>(Cat.Create.Dto, request.body)`,

In the service level, when defining the signature for our method.

```
@Service()
export class CatService {

  async create(params: Cat.Create.Params) {
    const {...} = params;
  }
}
```

<h2 id="docker-compose">Docker compose</h2>

Contains Postgres and Redis containers for local development.

<h2 id="dotenv">Dotenv and configuration provider</h2>

By default it reads from `.env` and nothing else.

For different environments, please create a `.env` in their respective machines.

`src/providers/config.provider.ts`

This file contains the single export of the environment variables mapping.

Currently contains the definition of a simple truthy check for all the keys in the `requiredConfig` variables with some variables being excluded.

```
validateEnvironmentVariables();

function validateEnvironmentVariables() {
  const {
    IS_DEVELOPMENT,
    IS_STAGING,
    IS_TESTING,
    IS_PRODUCTION,
    ...requiredConfig
  } = config;

  for (const [key, value] of Object.entries(requiredConfig)) {
    if (!value) {
      throw new Error(`${key} is not set`);
    }
  }
}
```

<h2 id="dependency-injection">Dependency injection</h2>

Uses [@decorators/di](https://www.npmjs.com/package/@decorators/di) to decorate injectable classes.

<h2 id="api-documentation">API Documentation</h2>

![API docs sample](https://i.ibb.co/LkFZg6F/Screenshot-2024-07-01-at-09-45-40.png)

Following a module-scoped directory structure this is how the structure of the docs for admin server.

```
docs
└── admin
    ├── cat
    │   ├── cat.doc.yml
    │   ├── cat.error.yml
    │   ├── cat.payload.yml
    │   ├── cat.response.yml
    │   └── cat.schema.yml
    ├── error.schema.yml
    ├── index.html
    ├── metadata.schema.yml
    ├── pagination.schema.yml
    └── swagger.yml
```

> While the sample API doc is written in YAML, it can also be written in JSON

For more information please visit [OpenAPI Specification](https://swagger.io/specification/)

<h2 id="prisma">Prisma</h2>

Next-generation Node.js and TypeScript ORM.

For more information please visit their [official website](https://www.prisma.io/orm)

<h2 id="stripe-like-ID">Stripe-like ID</h2>

If you worked with Stripe before, you'd notice that their object IDs are structured in a way that the prefix provides hint to the object.

e.g. **Payment Intent** - `pi_uiwoei182`

This provides a good developer experience for the following reasons:

1. Better readability over UUID
2. Non predicatable sequence over incremental ID

**Our implementation**

Currently the implementation uses the whole Prisma model name (converted into snake_case) as prefix and append 10-digit length nanoid.

```
for (const d of data) {
  if (params.model && !d.ID) {
    d.ID = generateID(StringUtil.SnakeCase(params.model));
  }
}
```

<h2 id="jest">Jest</h2>

![Jest](https://i.ibb.co/DKtgYK8/Screenshot-2024-07-01-at-15-02-26.png)

<h2 id="supertest">Supertest</h2>

TODO

<h2 id="standardized-response">Standardized response</h2>

### Metadata

All responses will contain the "metadata" property

```
type Metadata = {
  statusCode: number;
  resource: string;
  timestamp: string;
  requestID: string;
}
```

**statusCode** (Number) - The HTTP status code.

**resource** (String) - The current resource name.

**timestamp** (String) - The current date and time in UTC+00:00 expressed in ISO 8601.

**requestID** (UUIDv4) - The ID of the current request

For example

**GET /v1/cats**

```
{
  data: {
    name: string;
  },
  metadata: {
    statusCode: 200,
    resource: '/v1/cats',
    timestamp: '2024-07-01T20:05:50',
    requestID: 'a985facb-7f33-471b-8925-84bed103b254'
  }
}
```

By default all response are enveloped in 'data' property.

The major difference is unlike Shopify's or Google's envelope,
where the envelop is named respective to the endpoints

e.g.

Shopify

https://shopify.dev/docs/api/admin-rest/2024-04/resources/location

```
HTTP/1.1 200 OK
{
  "locations": [
    {...}
  ]
```

the `data` property is consistent across all resources, even for endpoints that return a paginated list.

Which brings us to the response shape of paginated resources.

```
{
  "data": {
    items: Cat[];
    pagination: {
      page: number;
      limit: number;
      totalPages: number;
      totalResults: number;
    };
  },
  "metadata": Metadata;
}
```

### Error response

Error responses are enveloped with the `error` property that sits on the same level as `metadata`

For all non 400 errors, there'll be code and message.

**code** by default would use the `message` casted into PascalCase.

`this.code = StringUtil.PascalCase(message);`

```
type Error = {
  code: string;
  message: string;
}

{
  error: Error;
  metadata: Metadata;
}
```

**400** errors will contain validation information.

For example in this 400 error for `GET /v1/cats`

```
{
  "error": {
    "code": "ValidationError",
    "errors": [
      {
        "name": {
          "isDefined": "name is required",
          "maxLength": "name cannot be more than 10 characters"
        }
      }
    ],
    "message": "Validation Error"
  },
  "metadata": {
    "requestID": "cac393ad-6240-4880-a9c3-e8a63bbd2791",
    "resource": "/v1/cats",
    "statusCode": 400,
    "timestamp": "2024-07-02T05:44:01Z"
  }
}
```

<h2 id="request-id">Request ID</h2>

By default all requests are tagged with an ID based on UUIDv4.

_Note: By default it would also set the response header `X-Request-ID` property with the corresponding request ID value._

<h2 id="http-request-logger-with-morgan">HTTP Request logger with Morgan</h2>

TODO

<h2 id="logging-with-signale">Logging with Signale</h2>

Signale logger can be initialized in two ways:

1. By importing the `SignaleLogger` from `src/providers/logger.provider.ts`

And initializing your logger like so

`const logger = SignaleLogger('<Context>')`

2. Used in a class(controller or service) as a decorated private property.

```
export class MyClass {
  @Logger()
  private readonly logger: CustomLogger;

  async doSomething() {
    this.logger.info('Doing something');
  }
}
```

When used in a class, the default context will be the class's name. e.g. `MyClass`

_Note: By default the logger is suppressed when NODE_ENV='testing' to reduce noise during testing_

For more information, please check out `src/providers/logger.provider.ts`

<h2 id="repository-pattern">Repository pattern</h2>

Repositories are located in `src/repositories`

Since the ID is generated in the Prisma middleware, the **Create** and **Create Many** methods are typed to treat `ID` property as optional

```
createMany<T extends Prisma.AdminSelect>(
  params: Omit<Prisma.AdminCreateManyArgs, 'data'> & {
    data?: Array<Omit<Prisma.AdminCreateManyInput, 'ID'> & { ID?: string }>;
  },
  connection: Prisma.TransactionClient = database.write
): Promise<Array<CustomReturnType<T>>> {
  return connection.admin.createMany(
    params as Prisma.AdminCreateManyArgs
  ) as unknown as Promise<Array<CustomReturnType<T>>>;
}
```

The second `connection` parameter defaults to the current database connection.

i.e. Create / update methods are using the write connection, while find, and findMany are using the read connection.

The purpose for this is so that you're free to pass in the client during a transaction.

Example

```
await database.write.$transaction(async (tx) => {
  await this.accountRepository.create({}, tx);

  await this.profileRepository.create({}, tx)
})
```

<h2 id="rate-limit">Rate Limit</h2>

Rate limiting rule is broken down into two levels:

1. Global rate limit
2. Controller-level rate limiting

For more information please check out
`src/middlewares/global-rate-limit.middleware.ts` and
`src/middleware/controller-rate-limit.middleware.ts` respectively.

<h2 id="slow-down-requests">Slow down requests</h2>

Similar to [Rate Limit](#rate-limit),
Slow down contains global and controller-scoped implementations.

Please check out `src/middlewares/global-slow-down.middleware.ts` and
`src/middlewares/controller-slow-down.middleware.ts`

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
