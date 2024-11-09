const config = require('@deojeff/configs/eslint/eslint.node.cjs')

module.exports = {
  ...config,
  ignores: [
    '**/*.json',
    '**/*.cjs'
  ],
};
