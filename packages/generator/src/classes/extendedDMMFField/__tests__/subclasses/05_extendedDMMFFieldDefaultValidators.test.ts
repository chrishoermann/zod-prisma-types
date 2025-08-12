import type DMMF from '@prisma/dmmf';
import { it, expect, describe } from 'vitest';

import { DEFAULT_GENERATOR_CONFIG, FIELD_BASE } from '../setup';
import { ExtendedDMMFFieldDefaultValidators } from '../../05_extendedDMMFFieldDefaultValidators';
import { GeneratorConfig } from '../../../../schemas/generatorConfigSchema';

/////////////////////////////////////////////
// TEST SUITE
/////////////////////////////////////////////

export function testExtendedDMMFFieldDefaultValidators<
  T extends ExtendedDMMFFieldDefaultValidators,
>(
  classConstructor: new (
    model: DMMF.Field,
    generatorConfig: GeneratorConfig,
    modelName: string,
  ) => T,
) {
  const getField = (field?: Partial<DMMF.Field>) =>
    new classConstructor(
      { ...FIELD_BASE, ...field },
      DEFAULT_GENERATOR_CONFIG,
      'ModelName',
    );

  describe(`ExtendedDMMFFieldDefaultValidators`, () => {
    it(`should load a class without a default validator`, async () => {
      const field = getField();
      expect(field?.['_defaultValidatorString']).toBe(undefined);
    });

    it(`should load a class with cuid default validator`, async () => {
      const field = getField({ default: { name: 'cuid', args: [] } });
      expect(field?.['_defaultValidatorString']).toBe('.cuid()');
    });

    it(`should load a class with cuid2 default validator`, async () => {
      const field = getField({ default: { name: 'cuid', args: [2] } });
      expect(field?.['_defaultValidatorString']).toBe('.cuid2()');
    });

    it(`should load a class with uuid default validator`, async () => {
      const field = getField({ default: { name: 'uuid', args: [] } });
      expect(field?.['_defaultValidatorString']).toBe('.uuid()');
    });

    it(`should load a class with Int default validator`, async () => {
      const field = getField({ type: 'Int' });
      expect(field?.['_defaultValidatorString']).toBe('.int()');
    });

    it(`should load a class with Int default validator and "noDefault()" annotation`, async () => {
      const field = getField({
        type: 'Int',
        documentation: '@zod.number.noDefault()',
      });
      expect(field?.['_defaultValidatorString']).toBeUndefined();
    });
  });
}

/////////////////////////////////////////////
// TEST EXECUTION
/////////////////////////////////////////////

testExtendedDMMFFieldDefaultValidators(ExtendedDMMFFieldDefaultValidators);
