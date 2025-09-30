import { it, expect, afterAll } from 'vitest';

import { ExtendedDMMF } from '../../../extendedDMMF';
import { loadDMMF } from '../../utils/loadDMMF';
import { globalConfig } from '../../../../config';
import { DEFAULT_GENERATOR_CONFIG } from '../../../../__tests__/setup';

it('should throw if an invalid key is used', async () => {
  if (!globalConfig.isInitialized()) {
    globalConfig.initializeWithConfig(DEFAULT_GENERATOR_CONFIG);
  }

  afterAll(() => {
    if (globalConfig.isInitialized()) {
      globalConfig.reset();
    }
  });

  const dmmf = await loadDMMF(`${__dirname}/invalidType.prisma`);
  expect(() => new ExtendedDMMF(dmmf)).toThrowError(
    "[@zod generator error]: 'asdf' is not a valid validator type. [Error Location]: Model: 'MyModel', Field: 'custom'.",
  );
});
