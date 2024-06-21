### Backend Starter

Opinionated Node.js backend starter written in Express and TypeScript.

### Default commands

| Command                                                      | Description                     |
| :----------------------------------------------------------- | :------------------------------ |
| `yarn start <server>:<mode>` <br> e.g `yarn start admin:dev` | Runs given server in given mode |
| Hello                                                        | World                           |

**Included**

### Database

- Prisma
- Stripe-like ID
- Repository pattern

e.g. `user_<NANO_ID>`

### Application

- Global rate limiting
- HTTP handler level rate limiting
- Global slow down
- HTTP handler level slow down
- Custom Response

### Setup dotenv file

`cp .env.example .env`

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
