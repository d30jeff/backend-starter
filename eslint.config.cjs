const prettier = require('prettier');
const order = require('eslint-plugin-import');
const typescript = require('@typescript-eslint/eslint-plugin');
const putout = require('putout')

module.exports = [{
  plugins: {
    prettier,
    'import': order,
    '@typescript-eslint': typescript
  },
  'rules': {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/order': [
      'error',
      {
        'groups': [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object'
        ]
      }
    ],
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-return-await': 'error',
    'semi': [2, 'always'],
    'no-tabs': 'error',
    'no-unused-vars': 'warn',
    'no-empty-function': 'warn',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [2, 'always'],
    'key-spacing': [2, { 'afterColon': true }],
    'no-empty': 'warn',
    'newline-per-chained-call': 'off',
    'prefer-destructuring': 'warn',
    'quotes': [
      2,
      'single',
      { 'avoidEscape': true, 'allowTemplateLiterals': true }
    ],
    'no-redeclare': 'off',
    'max-len': [
      'error',
      80,
      2,
      {
        'ignoreComments': true,
        'ignoreUrls': true,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true,
        'ignorePattern': '^import\\s.+\\sfrom\\s.+;$'
      }
    ],
    'no-undef-init': 'error',
    'no-useless-escape': 'warn',
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }]
  }
}];
