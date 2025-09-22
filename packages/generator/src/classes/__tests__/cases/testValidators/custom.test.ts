import { describe, it, expect, afterAll } from 'vitest';

import { ExtendedDMMF } from '../../../extendedDMMF';
import { loadDMMF } from '../../utils/loadDMMF';
import { globalConfig } from '../../../../config';
import { DEFAULT_GENERATOR_CONFIG } from '../../../../__tests__/setup';

describe('test date validators', async () => {
  if (!globalConfig.isInitialized()) {
    globalConfig.initialize(DEFAULT_GENERATOR_CONFIG);
  }

  afterAll(() => {
    if (globalConfig.isInitialized()) {
      globalConfig.reset();
    }
  });

  const dmmf = await loadDMMF(`${__dirname}/custom.prisma`);
  const extendedDMMF = new ExtendedDMMF(dmmf);

  describe('test validators', () => {
    const fields = {
      id: extendedDMMF.datamodel.models[0].fields[0],
      custom: extendedDMMF.datamodel.models[0].fields[1],
    };

    it(`should add custom validator to field "${fields.custom.name}"`, () => {
      expect(fields.custom.zodCustomValidatorString).toBe(
        'z.string((value) => value.length > 5, { message: "Must be longer than 5 characters." })',
      );
    });
  });
});
