const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
    useESM: true,
  }),
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.[tj]s?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  collectCoverageFrom: ['./src/**'],
  testPathIgnorePatterns: [
    'node_modules',
    'dist',
    '<rootDir>/src/utils/testing',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/(/.*)*/*.interface.ts',
    '<rootDir>/src/types',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/utils/testing/singleton.ts'],
};
