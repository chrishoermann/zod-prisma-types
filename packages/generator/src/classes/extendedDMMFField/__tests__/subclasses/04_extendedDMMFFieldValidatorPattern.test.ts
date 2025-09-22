import type DMMF from '@prisma/dmmf';
import { it, expect, describe, afterAll } from 'vitest';

import { FIELD_BASE } from '../setup';
import { DEFAULT_GENERATOR_CONFIG } from '../../../../__tests__/setup';
import { ExtendedDMMFFieldValidatorPattern } from '../../04_extendedDMMFFieldValidatorPattern';
import { globalConfig } from '../../../../config';

/////////////////////////////////////////////
// TEST SUITE
/////////////////////////////////////////////

export function testExtendedDMMFFieldValidatorPattern<
  T extends ExtendedDMMFFieldValidatorPattern,
>(classConstructor: new (model: DMMF.Field, modelName: string) => T) {
  const getField = (field?: Partial<DMMF.Field>) =>
    new classConstructor({ ...FIELD_BASE, ...field }, 'ModelName');

  if (!globalConfig.isInitialized()) {
    globalConfig.initialize(DEFAULT_GENERATOR_CONFIG);
  }

  afterAll(() => {
    if (globalConfig.isInitialized()) {
      globalConfig.reset();
    }
  });

  describe(`ExtendedDMMFFieldValidatorPattern`, () => {
    it(`should load class without docs`, async () => {
      const field = getField();
      expect(field?.['_validatorPattern']).toBeUndefined();
    });

    it(`should load with docs and string validator`, async () => {
      const field = getField({
        documentation: 'some text in docs @zod.string.min(2).max(4)',
      });
      expect(field?.['_validatorPattern']).toBe('.min(2).max(4)');
      expect(field?.['_validatorList']).toEqual(['.min(2)', '.max(4)']);
    });

    it(`should load with docs and number validator`, async () => {
      const field = getField({
        type: 'Int',
        documentation: 'some text in docs @zod.number.lt(2).gt(4)',
      });
      expect(field?.['_validatorPattern']).toBe('.lt(2).gt(4)');
      expect(field?.['_validatorList']).toEqual(['.lt(2)', '.gt(4)']);
    });

    it(`should load with docs and custom validator`, async () => {
      const field = getField({
        type: 'Int',
        isList: true,
        documentation:
          'some text in docs @zod.custom.use(z.string().min(2).max()).array(.length(2))',
      });
      expect(field?.['_validatorPattern']).toBe(
        '.use(z.string().min(2).max()).array(.length(2))',
      );
      expect(field?.['_validatorList']).toEqual([
        '.use(z.string().min(2).max())',
        '.array(.length(2))',
      ]);
      expect(field?.['_getZodValidatorListWithoutArray']()).toEqual([
        '.use(z.string().min(2).max())',
      ]);
      expect(field?.['_getZodValidatorListArray']()).toEqual([
        '.array(.length(2))',
      ]);
    });

    it(`should load with docs and custom validator`, async () => {
      const field = getField({
        type: 'MyEnum',
        kind: 'enum',
        isList: true,
        documentation: 'some text in docs @zod.enum.array(.length(2))',
      });
      expect(field?.['_validatorPattern']).toBe('.array(.length(2))');
      expect(field?.['_validatorList']).toEqual(['.array(.length(2))']);
    });

    it(`should load with docs and custom validator`, async () => {
      const field = getField({
        type: 'MyObject',
        kind: 'object',
        isList: true,
        documentation: 'some text in docs @zod.object.array(.length(2))',
      });
      expect(field?.['_validatorPattern']).toBe('.array(.length(2))');
      expect(field?.['_validatorList']).toEqual(['.array(.length(2))']);
    });
  });
}

/////////////////////////////////////////////
// TEST EXECUTION
/////////////////////////////////////////////

testExtendedDMMFFieldValidatorPattern(ExtendedDMMFFieldValidatorPattern);
