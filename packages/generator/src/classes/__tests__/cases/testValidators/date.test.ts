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

  const dmmf = await loadDMMF(`${__dirname}/date.prisma`);
  const extendedDMMF = new ExtendedDMMF(dmmf);

  describe('test validators', () => {
    const fields = {
      id: extendedDMMF.datamodel.models[0].fields[0],
      min: extendedDMMF.datamodel.models[0].fields[1],
      max: extendedDMMF.datamodel.models[0].fields[2],
      chained: extendedDMMF.datamodel.models[0].fields[3],
    };

    it(`should add min validator to field "${fields.min.name}"`, () => {
      expect(fields.min.zodValidatorString).toBe(
        '.min(new Date("1900-01-01"))',
      );
    });

    it(`should add max validator to field "${fields.max.name}"`, () => {
      expect(fields.max.zodValidatorString).toBe('.max(new Date())');
    });

    it(`should add chained validators to field "${fields.chained.name}"`, () => {
      expect(fields.chained.zodValidatorString).toBe(
        '.min(new Date("1900-01-01")).max(new Date())',
      );
    });
  });

  describe('test validators with custom error messages', () => {
    const fields = {
      id: extendedDMMF.datamodel.models[1].fields[0],
      min: extendedDMMF.datamodel.models[1].fields[1],
      max: extendedDMMF.datamodel.models[1].fields[2],
      chained: extendedDMMF.datamodel.models[1].fields[3],
    };

    it(`should add min validator to field "${fields.min.name}"`, () => {
      expect(fields.min.zodValidatorString).toBe(
        '.min(new Date("1900-01-01"), { message: "Too old" })',
      );
    });

    it(`should add max validator to field "${fields.max.name}"`, () => {
      expect(fields.max.zodValidatorString).toBe(
        '.max(new Date(), { message: "Too young!" })',
      );
    });

    it(`should add chained validators to field "${fields.chained.name}"`, () => {
      expect(fields.chained.zodValidatorString).toBe(
        '.min(new Date("1900-01-01"), { message: "Too old" }).max(new Date(), { message: "Too young!" })',
      );
    });
  });
});
