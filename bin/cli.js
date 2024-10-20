#!/usr/bin/env node
const { execSync } = require('child_process');

const run = (command) => {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed to execute command ${command}`, error);
    return false;
  }
  return true;
};

const repository = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/d30jeff/backend-starter ${repository}`;
const installDependenciesCommand = `cd ${repository} && pnpm install`;

console.info(`Cloning from ${repository}`);
const checkoutCommand = run(gitCheckoutCommand);

if (!checkoutCommand) {
  process.exit(-1);
}

console.info(`Installing dependencies`);
const install = run(installDependenciesCommand);

if (!install) {
  process.exit(-1);
}

console.info('Completed!');
