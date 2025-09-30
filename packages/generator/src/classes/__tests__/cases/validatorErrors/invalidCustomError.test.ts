import { it, expect, afterAll } from 'vitest';

import { ExtendedDMMF } from '../../../extendedDMMF';
import { loadDMMF } from '../../utils/loadDMMF';
import { globalConfig } from '../../../../config';
import { DEFAULT_GENERATOR_CONFIG } from '../../../../__tests__/setup';

it('should throw a custom error key is not valid', async () => {
  if (!globalConfig.isInitialized()) {
    globalConfig.initializeWithConfig({
      ...DEFAULT_GENERATOR_CONFIG,
      zodVersion: {
        major: 3,
        minor: 0,
        patch: 0,
      },
    });
  }

  afterAll(() => {
    if (globalConfig.isInitialized()) {
      globalConfig.reset();
    }
  });

  const dmmf = await loadDMMF(`${__dirname}/invalidCustomError.prisma`);
  expect(() => new ExtendedDMMF(dmmf)).toThrowError(
    "[@zod generator error]: Custom error key 'invalid_type_errrror' is not valid. Please check for typos! [Error Location]: Model: 'MyModel', Field: 'string'.",
  );
});
