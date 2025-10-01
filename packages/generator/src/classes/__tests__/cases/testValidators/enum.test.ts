import { describe, it, expect, afterAll } from 'vitest';

import { ExtendedDMMF } from '../../../extendedDMMF';
import { loadDMMF } from '../../utils/loadDMMF';
import { globalConfig } from '../../../../config';
import { DEFAULT_GENERATOR_CONFIG } from '../../../../__tests__/setup';

describe('test enum validators', async () => {
  if (!globalConfig.isInitialized()) {
    globalConfig.initializeWithConfig(DEFAULT_GENERATOR_CONFIG);
  }

  afterAll(() => {
    if (globalConfig.isInitialized()) {
      globalConfig.reset();
    }
  });

  const dmmf = await loadDMMF(`${__dirname}/enum.prisma`);
  const extendedDMMF = new ExtendedDMMF(dmmf);

  describe('test validators', () => {
    const fields = {
      id: extendedDMMF.datamodel.models[0].fields[0],
      enum: extendedDMMF.datamodel.models[0].fields[1],
    };

    it(`should add describe validator for field "${fields.enum.name}"`, () => {
      expect(fields.enum.zodValidatorString).toBe(".describe('test')");
    });
  });
});
