### Backend Starter
Backend Starter in TypeScript, Express, DI, Prisma, Docker

**Stack**

### Setup dotenv file

`cp .env.example .env`

### Building required Docker containers

`docker compose up -d`

### Install Dependencies

`yarn`

### Executing initial database migration

`yarn prisma db push`

### Running

`yarn start <module>:<mode>`

Where module is the entrypoint point in ./src/servers

e.g.

`yarn start admin:dev`

### Entrypoint
Please check main.js
