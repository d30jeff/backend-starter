const { spawn } = require('child_process');
const fs = require('fs');
const { join } = require('path');
const { Signale } = require('signale');

const args = process.argv.slice(2).toString();

const MODULES = fs.readdirSync(join(__dirname, './src/modules'));

const [server, env = 'dev'] = args.split(':');

const ENVIRONMENTS = [
  {
    name: 'Development',
    alias: ['dev', 'development'],
  },
  {
    name: 'Testing',
    alias: ['test', 'testing'],
  },
  {
    name: 'Staging',
    alias: ['staging'],
  },
  {
    name: 'Production',
    alias: ['prod', 'production'],
  },
];

const isValidModule = MODULES.includes(server);

if (!isValidModule) {
  console.info('Invalid Server', MODULES);
  process.exit();
}

const environment = ENVIRONMENTS.find((e) => {
  return e.alias.includes(env);
});

const logger = new Signale({
  scope: `${env.toUpperCase()} ${server}`,
  disabled: ['test', 'testing'].includes(env),
  config: {
    displayTimestamp: true,
    displayBadge: true,
  },
});

if (!environment) {
  logger.info('Invalid environment. Valid options are: ', ENVIRONMENTS);
  process.exit();
}

if (environment.name.toLowerCase() === 'development') {
  logger.info('Development environment found, preparing');
  prepare(() => main());
} else {
  copyTemplateFiles();
  main();
}

async function copyTemplateFiles() {
  const prepare = spawn('cp -r ./src/templates/* dist/templates/', {
    shell: true,
  });

  prepare.stdout.on('data', (data) => {
    logger.info(data);
  });

  prepare.stderr.on('data', (data) => {
    logger.fatal(data);
  });

  prepare.on('close', (code) => {
    if (code === 0) {
      logger.info('Done copying template files...');
    }
  });
}

async function prepare(cb) {
  const prepare = spawn('rimraf dist && tsc', { shell: true });

  prepare.stdout.on('data', (data) => {
    console.log(`${data}`);
  });

  prepare.stderr.on('data', (data) => {
    console.error(`${data}`);
  });

  prepare.on('close', (code) => {
    if (code === 0) {
      copyTemplateFiles();
      cb();
    } else {
      console.error('Yarn install failed');
    }
  });
}

async function main() {
  let child;

  const envArgs = {
    env: {
      ...process.env,
      NODE_ENV: environment.name.toUpperCase(),
    },
  };

  if (['development', 'dev'].includes(env)) {
    logger.log(`Running ${server} in development mode`);
    child = spawn(
      `tsc-watch --noClear --onSuccess "node -r module-alias/register -r source-map-support/register ./dist/modules/${server}/${server}.server.js"`,
      {
        shell: true,
        stdio: 'inherit',
      },
      envArgs
    );
  } else {
    child = spawn(
      'node',
      [
        '-r',
        'module-alias/register',
        '-r',
        'source-map-support/register',
        `./dist/modules/${server}/${server}.server.js`,
      ],
      {
        stdio: 'inherit',
      },
      envArgs
    );
  }

  child.on('close', (code) => {
    logger.fatal(`${server} process exited with code ${code}`);
  });
}
