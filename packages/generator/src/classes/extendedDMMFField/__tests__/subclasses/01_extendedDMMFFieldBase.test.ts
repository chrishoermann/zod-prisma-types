import type DMMF from '@prisma/dmmf';
import { it, expect, describe, afterAll } from 'vitest';

import { FIELD_BASE } from '../setup';
import { DEFAULT_GENERATOR_CONFIG } from '../../../../__tests__/setup';
import { ExtendedDMMFFieldBase } from '../../01_extendedDMMFFieldBase';
import { globalConfig } from '../../../../config';

/////////////////////////////////////////////
// TEST SUITE
/////////////////////////////////////////////

export function testExtendedDMMFFieldBase<T extends ExtendedDMMFFieldBase>(
  classConstructor: new (model: DMMF.Field, modelName: string) => T,
) {
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

  describe(`ExtendedDMMFFieldBase`, () => {
    it(`should load class with all its features`, async () => {
      const field = getField();

      expect(field?.['_modelName']).toEqual('ModelName');
      expect(field).toBeDefined();
      expect(field.isNullable).toBe(false);
      expect(field.isJsonType).toBe(false);
      expect(field.isBytesType).toBe(false);
      expect(field.isDecimalType).toBe(false);
    });

    it(`should load a class of that is nullable `, async () => {
      const field = getField({ isRequired: false });
      expect(field.isNullable).toBe(true);
    });

    it(`should load a class of type json `, async () => {
      const field = getField({ type: 'Json' });
      expect(field.isJsonType).toBe(true);
    });

    it(`should load a class of type bytes `, async () => {
      const field = getField({ type: 'Bytes' });
      expect(field.isBytesType).toBe(true);
    });

    it(`should load a class of type decimal `, async () => {
      const field = getField({ type: 'Decimal' });
      expect(field.isDecimalType).toBe(true);
    });
  });
}

/////////////////////////////////////////////
// TEST EXECUTION
/////////////////////////////////////////////

testExtendedDMMFFieldBase(ExtendedDMMFFieldBase);
