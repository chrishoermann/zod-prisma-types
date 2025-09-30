import { it, expect, afterAll } from 'vitest';

import { ExtendedDMMF } from '../../../extendedDMMF';
import { loadDMMF } from '../../utils/loadDMMF';
import { globalConfig } from '../../../../config';
import { DEFAULT_GENERATOR_CONFIG } from '../../../../__tests__/setup';

it('should throw if a validator text is used', async () => {
  if (!globalConfig.isInitialized()) {
    globalConfig.initializeWithConfig(DEFAULT_GENERATOR_CONFIG);
  }

  afterAll(() => {
    if (globalConfig.isInitialized()) {
      globalConfig.reset();
    }
  });

  const dmmf = await loadDMMF(`${__dirname}/invalidValidatorText.prisma`);
  expect(() => new ExtendedDMMF(dmmf)).toThrowError(
    "[@zod generator error]: Could not match validator 'max' with validatorPattern '.max(5, { muasssage: \"Custom message.\"})'. Please check for typos! [Error Location]: Model: 'MyModel', Field: 'date'.",
  );
});
