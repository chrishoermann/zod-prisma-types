import { describe, it, expect } from 'vitest';

import { ExtendedDMMF } from '../../../extendedDMMF';
import { loadDMMF } from '../../utils/loadDMMF';
describe('test number validators', async () => {
  const dmmf = await loadDMMF(`${__dirname}/enum.prisma`);
  const extendedDMMF = new ExtendedDMMF(dmmf, {});

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
