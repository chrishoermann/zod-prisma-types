import { ExtendedDMMFFieldClass } from '..';
import * as TESTS from './subclasses';
import { globalConfig } from '../../../config';
import { afterAll } from 'vitest';
import { DEFAULT_GENERATOR_CONFIG } from '../../../__tests__/setup';

// Run all the subclass test suites with the final instance of the class
// to make sure that the class is working as expected an no subclass is
// breaking the functionality

Object.keys(TESTS).forEach((key) => {
  const test = TESTS[key];

  if (!globalConfig.isInitialized()) {
    globalConfig.initialize(DEFAULT_GENERATOR_CONFIG);
  }

  afterAll(() => {
    if (globalConfig.isInitialized()) {
      globalConfig.reset();
    }
  });

  test(ExtendedDMMFFieldClass);
});
