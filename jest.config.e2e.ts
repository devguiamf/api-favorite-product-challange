import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';
import type { Config } from 'jest';


const config: Config = {
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/',
  }),
  modulePaths: ['<rootDir>/src'],
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.e2e-spec.ts'],
  globalSetup: '<rootDir>/test/global-setup.e2e.ts',
  globalTeardown: '<rootDir>/test/teardown-setup.e2e.ts'
};

export default config