import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  roots: ['<rootDir>/src'],
  verbose: true,
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};

export default config;
