const { join } = require('path');
const fs = require('fs');

module.exports = function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  const servers = fs.readdirSync(join(__dirname, './src/servers'));
  plop.load('plop-pack-json-modify');

  plop.setGenerator('Generator', {
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: 'What would you like to create?',
        choices: ['module', 'server'],
      },
      {
        type: 'input',
        name: 'server',
        message: 'What should we call the server?',
        when(answers) {
          return answers.type === 'server';
        },
      },
      {
        type: 'input',
        name: 'port',
        message: 'Which port should the server be running on?',
        when(answers) {
          return answers.type === 'server';
        },
      },
      {
        type: 'list',
        choices: servers,
        name: 'server',
        message: 'Which server should the module be created in?',
        when(answers) {
          return answers.type === 'module';
        },
      },
      {
        type: 'input',
        name: 'name',
        message: 'What module should we create',
        validate: (answer) => {
          return Boolean(answer);
        },
        when(answers) {
          return answers.type === 'module';
        },
      },
    ],
    actions: (data) => {
      const items = [];
      if (data?.type === 'server') {
        createServer(data, items);
      } else if (data?.type === 'module') {
        createModule(data, items);
      }

      return items;
    },
  });
};

const createServer = (data, items) => {
  const port = Number(data?.port);

  items.push(
    {
      type: 'add',
      path: 'src/servers/{{kebabCase server}}/{{kebabCase server}}.server.ts',
      templateFile: 'templates/servers/server.ts.hbs',
    },
    {
      type: 'add',
      path: 'src/servers/{{kebabCase server}}/{{kebabCase server}}.controllers.ts',
      templateFile: 'templates/servers/controllers.ts.hbs',
    },
    {
      type: 'add',
      path: 'src/servers/{{kebabCase server}}/healthcheck/healthcheck.controller.ts',
      templateFile:
        'templates/servers/healthcheck/healthcheck.controller.ts.hbs',
    },
    {
      // Modify .env file
      type: 'append',
      path: '.env',
      template: `{{constantCase server}}_PORT=${port}`,
    },
    {
      // Modify config.provider file
      type: 'modify',
      path: 'src/providers/config.provider.ts',
      pattern: '});',
      template: `  {{constantCase server}}_PORT: port(),\n});`,
    }
  );

  // Docs
  items.push(
    {
      type: 'add',
      path: 'docs/{{kebabCase server}}/index.html',
      templateFile: 'templates/docs/index.html.hbs',
    },
    {
      type: 'add',
      path: 'docs/{{kebabCase server}}/swagger.yml',
      templateFile: 'templates/docs/swagger.yml.hbs',
    }
  );
};

const createModule = (data, items) => {
  items.push(
    {
      type: 'add',
      path: 'src/servers/{{kebabCase server}}/{{kebabCase name}}/{{kebabCase name}}.middleware.ts',
      templateFile: 'templates/module/middleware.ts.hbs',
    },
    {
      type: 'modify',
      pattern: ".controller.js';",
      template: `.controller.js';\nimport { {{pascalCase name}}Controller } from '@/servers/{{kebabCase server}}/{{kebabCase name}}/{{kebabCase name}}.controller.js';`,
      path: 'src/servers/{{kebabCase server}}/{{kebabCase server}}.controllers.ts',
    },
    {
      type: 'modify',
      pattern: 'export const controllers = [',
      template: `export const controllers = [\n  {{pascalCase name}}Controller,`,
      path: 'src/servers/{{kebabCase server}}/{{kebabCase server}}.controllers.ts',
    },
    {
      type: 'add',
      path: 'src/servers/{{kebabCase server}}/{{kebabCase name}}/{{kebabCase name}}.interface.ts',
      templateFile: 'templates/module/interface.ts.hbs',
    },
    {
      type: 'add',
      path: 'src/servers/{{kebabCase server}}/{{kebabCase name}}/{{kebabCase name}}.controller.ts',
      templateFile: 'templates/module/controller.ts.hbs',
    },
    {
      type: 'add',
      path: 'src/servers/{{kebabCase server}}/{{kebabCase name}}/{{kebabCase name}}.service.ts',
      templateFile: 'templates/module/service.ts.hbs',
    }
  );
};
