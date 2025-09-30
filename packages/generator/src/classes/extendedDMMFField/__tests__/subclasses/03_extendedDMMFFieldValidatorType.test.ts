import type DMMF from '@prisma/dmmf';
import { it, expect, describe, afterAll } from 'vitest';

import { FIELD_BASE } from '../setup';
import { ExtendedDMMFFieldValidatorType } from '../../03_extendedDMMFFieldValidatorType';
import { globalConfig } from '../../../../config';
import { DEFAULT_GENERATOR_CONFIG } from '../../../../__tests__/setup';

/////////////////////////////////////////////
// TEST SUITE
/////////////////////////////////////////////

export function testExtendedDMMFFieldValidatorType<
  T extends ExtendedDMMFFieldValidatorType,
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

  describe(`ExtendedDMMFFieldValidatorType`, () => {
    it(`should load a class without docs`, async () => {
      const field = getField();
      expect(field?.['_validatorMatch']).toBeUndefined();
      expect(field?.['_validatorType']).toBeUndefined();
    });

    it(`should load a class with docs`, async () => {
      const field = getField({ documentation: 'some text in docs' });
      expect(field?.['_validatorMatch']).toBeUndefined();
      expect(field?.['_validatorType']).toBeUndefined();
    });

    it(`should load a class with docs and valid validator string`, async () => {
      const field = getField({
        documentation: 'some text in docs @zod.string.max(4)',
      });
      expect(field?.['_validatorMatch']).toBeDefined();
      expect(field?.['_validatorType']).toBe('string');
    });

    it(`should load a class with docs and valid enum validator string`, async () => {
      const field = getField({
        type: 'MyEnum',
        kind: 'enum',
        isList: true,
        documentation: 'some text in docs @zod.enum.array(.length(2))',
      });
      expect(field?.['_validatorMatch']).toBeDefined();
      expect(field?.['_validatorType']).toBe('enum');
    });

    it(`should load a class with docs and valid object validator string`, async () => {
      const field = getField({
        type: 'MyType',
        kind: 'object',
        isList: true,
        documentation: 'some text in docs @zod.object.array(.length(2))',
      });
      expect(field?.['_validatorMatch']).toBeDefined();
      expect(field?.['_validatorType']).toBe('object');
    });

    it(`should load a class with docs and valid number validator string for Int`, async () => {
      const field = getField({
        type: 'Int',
        kind: 'scalar',
        documentation: 'some text in docs @zod.number.int()',
      });
      expect(field?.['_validatorMatch']).toBeDefined();
      expect(field?.['_validatorType']).toBe('number');
    });

    it(`should load a class with docs and valid number validator string for Float`, async () => {
      const field = getField({
        type: 'Float',
        kind: 'scalar',
        documentation: 'some text in docs @zod.number.positive()',
      });
      expect(field?.['_validatorMatch']).toBeDefined();
      expect(field?.['_validatorType']).toBe('number');
    });

    it(`should load a class with docs and valid bigint validator string`, async () => {
      const field = getField({
        type: 'BigInt',
        kind: 'scalar',
        documentation: 'some text in docs @zod.bigint.positive()',
      });
      expect(field?.['_validatorMatch']).toBeDefined();
      expect(field?.['_validatorType']).toBe('bigint');
    });

    it(`should load a class with docs and valid date validator string`, async () => {
      const field = getField({
        type: 'DateTime',
        kind: 'scalar',
        documentation: 'some text in docs @zod.date.min(new Date())',
      });
      expect(field?.['_validatorMatch']).toBeDefined();
      expect(field?.['_validatorType']).toBe('date');
    });

    it(`should load a class with docs and valid custom validator string for String`, async () => {
      const field = getField({
        type: 'String',
        kind: 'scalar',
        documentation: 'some text in docs @zod.custom.use(z.string().min(1))',
      });
      expect(field?.['_validatorMatch']).toBeDefined();
      expect(field?.['_validatorType']).toBe('custom');
    });

    it(`should load a class with docs and valid custom validator string for Boolean`, async () => {
      const field = getField({
        type: 'Boolean',
        kind: 'scalar',
        documentation: 'some text in docs @zod.custom.use(z.boolean())',
      });
      expect(field?.['_validatorMatch']).toBeDefined();
      expect(field?.['_validatorType']).toBe('custom');
    });

    it(`should load a class with docs and valid custom validator string for Json`, async () => {
      const field = getField({
        type: 'Json',
        kind: 'scalar',
        documentation: 'some text in docs @zod.custom.use(z.object({}))',
      });
      expect(field?.['_validatorMatch']).toBeDefined();
      expect(field?.['_validatorType']).toBe('custom');
    });

    it(`should load a class with docs and valid custom validator string for Bytes`, async () => {
      const field = getField({
        type: 'Bytes',
        kind: 'scalar',
        documentation:
          'some text in docs @zod.custom.use(z.instanceof(Buffer))',
      });
      expect(field?.['_validatorMatch']).toBeDefined();
      expect(field?.['_validatorType']).toBe('custom');
    });

    it(`should load a class with docs and invalid validator string`, async () => {
      expect(() =>
        getField({
          documentation: 'some text in docs @zod.numer.max(4)',
        }),
      ).toThrowError(
        "[@zod generator error]: 'numer' is not a valid validator type. [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });

    it(`should throw error for invalid validator type on wrong field type`, async () => {
      expect(() =>
        getField({
          type: 'String',
          kind: 'scalar',
          documentation: 'some text in docs @zod.number.int()',
        }),
      ).toThrowError(
        "[@zod generator error]: Validator 'number' is not valid for type 'String'. [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });

    it(`should throw error for string validator on Int field`, async () => {
      expect(() =>
        getField({
          type: 'Int',
          kind: 'scalar',
          documentation: 'some text in docs @zod.string.max(10)',
        }),
      ).toThrowError(
        "[@zod generator error]: Validator 'string' is not valid for type 'Int'. [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });

    it(`should throw error for date validator on String field`, async () => {
      expect(() =>
        getField({
          type: 'String',
          kind: 'scalar',
          documentation: 'some text in docs @zod.date.min(new Date())',
        }),
      ).toThrowError(
        "[@zod generator error]: Validator 'date' is not valid for type 'String'. [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });

    it(`should throw error for bigint validator on Float field`, async () => {
      expect(() =>
        getField({
          type: 'Float',
          kind: 'scalar',
          documentation: 'some text in docs @zod.bigint.positive()',
        }),
      ).toThrowError(
        "[@zod generator error]: Validator 'bigint' is not valid for type 'Float'. [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });

    it('should throw an error if lonly import directive is present', async () => {
      expect(() =>
        getField({
          documentation:
            '@zod.import(["import { myFunction } from "../../../../utils/myFunction";", "import validator from "validator";"])',
        }),
      ).toThrowError(
        `[@zod generator error]: Only found 'import([...])' validator on field. Did you forget to add validators where the import is used?'. [Error Location]: Model: 'ModelName', Field: 'test'`,
      );
    });
  });
}

/////////////////////////////////////////////
// TEST EXECUTION
/////////////////////////////////////////////

testExtendedDMMFFieldValidatorType(ExtendedDMMFFieldValidatorType);
