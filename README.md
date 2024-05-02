### Backend Starter

**Stack**

- Prisma
- Mailgun

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

Where module is the entry point in ./src/servers

### Entrypoint

Please check main.js
