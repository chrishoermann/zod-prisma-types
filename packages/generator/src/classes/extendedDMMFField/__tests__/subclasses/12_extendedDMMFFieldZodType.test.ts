import type DMMF from '@prisma/dmmf';
import { it, expect, describe, afterAll } from 'vitest';

import { FIELD_BASE } from '../setup';
import { DEFAULT_GENERATOR_CONFIG } from '../../../../__tests__/setup';
import { ExtendedDMMFFieldZodType } from '../../12_extendedDMMFFieldZodType';
import { globalConfig } from '../../../../config';

/////////////////////////////////////////////
// TEST SUITE
/////////////////////////////////////////////

export function testExtendedDMMFFieldZodType<
  T extends ExtendedDMMFFieldZodType,
>(classConstructor: new (model: DMMF.Field, modelName: string) => T) {
  const getField = (field?: Partial<DMMF.Field>) =>
    new classConstructor({ ...FIELD_BASE, ...field }, 'ModelName');

  if (!globalConfig.isInitialized()) {
    globalConfig.initializeWithConfig(DEFAULT_GENERATOR_CONFIG);
  }

  afterAll(() => {
    if (globalConfig.isInitialized()) {
      globalConfig.reset();
    }
  });

  describe(`ExtendedDMMFFieldZodType`, () => {
    it(`should load a class of type String`, async () => {
      const field = getField({ type: 'String' });
      expect(field.zodType).toBe('string');
    });

    it(`should load a class of type Boolean`, async () => {
      const field = getField({ type: 'Boolean' });
      expect(field.zodType).toBe('boolean');
    });

    it(`should load a class of type DateTime`, async () => {
      const field = getField({ type: 'DateTime' });
      expect(field.zodType).toBe('date');
    });

    it(`should load a class of type Int`, async () => {
      const field = getField({ type: 'Int' });
      expect(field.zodType).toBe('number');
    });

    it(`should load a class of type BigInt`, async () => {
      const field = getField({ type: 'BigInt' });
      expect(field.zodType).toBe('bigint');
    });

    it(`should load a class of type Float`, async () => {
      const field = getField({ type: 'Float' });
      expect(field.zodType).toBe('number');
    });
  });
}

/////////////////////////////////////////////
// TEST EXECUTION
/////////////////////////////////////////////

testExtendedDMMFFieldZodType(ExtendedDMMFFieldZodType);
