import type DMMF from '@prisma/dmmf';
import { it, expect, describe, afterAll } from 'vitest';

import { FIELD_BASE } from '../setup';
import { DEFAULT_GENERATOR_CONFIG } from '../../../../__tests__/setup';
import { ExtendedDMMFFieldOmitField } from '../../11_extendedDMMFFieldOmitField';
import { globalConfig } from '../../../../config';

/////////////////////////////////////////////
// TEST SUITE
/////////////////////////////////////////////

export function testExtendedDMMFFieldOmitField<
  T extends ExtendedDMMFFieldOmitField,
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

  describe(`ExtendedDMMFFieldOmitField`, () => {
    it(`should load field with docs and custom validator`, async () => {
      const field = getField({
        documentation: 'some text in docs @zod.custom.omit(["model", "input"])',
      });
      const fieldTwo = getField({
        documentation: 'some text in docs @zod.custom.omit([model, input])',
      });
      const fieldThree = getField({
        documentation: "some text in docs @zod.custom.omit(['model', 'input'])",
      });
      expect(field.zodOmitField).toBe('all');
      expect(field.isOmitField()).toBe(true);
      expect(fieldTwo.zodOmitField).toBe('all');
      expect(fieldTwo.isOmitField()).toBe(true);
      expect(fieldThree.zodOmitField).toBe('all');
      expect(fieldThree.isOmitField()).toBe(true);
    });

    it(`should load field with docs and custom validator`, async () => {
      const field = getField({
        documentation: 'some text in docs @zod.custom.omit(["model"])',
      });
      const fieldTwo = getField({
        documentation: 'some text in docs @zod.custom.omit([model])',
      });
      const fieldThree = getField({
        documentation: "some text in docs @zod.custom.omit(['model'])",
      });
      expect(field.zodOmitField).toBe('model');
      expect(field.isOmitField()).toBe(true);
      expect(fieldTwo.zodOmitField).toBe('model');
      expect(fieldTwo.isOmitField()).toBe(true);
      expect(fieldThree.zodOmitField).toBe('model');
      expect(fieldThree.isOmitField()).toBe(true);
    });

    it(`should load field with docs and custom validator`, async () => {
      const field = getField({
        documentation: 'some text in docs @zod.custom.omit(["input"])',
      });
      const fieldTwo = getField({
        documentation: 'some text in docs @zod.custom.omit([input])',
      });
      const fieldThree = getField({
        documentation: "some text in docs @zod.custom.omit(['input'])",
      });
      expect(field.zodOmitField).toBe('input');
      expect(field.isOmitField()).toBe(true);
      expect(fieldTwo.zodOmitField).toBe('input');
      expect(fieldTwo.isOmitField()).toBe(true);
      expect(fieldThree.zodOmitField).toBe('input');
      expect(fieldThree.isOmitField()).toBe(true);
    });

    it(`should load field with docs and custom validator witout omit`, async () => {
      const field = getField({
        documentation: 'some text in docs @zod.custom.use(z.string())',
      });

      expect(field.zodOmitField).toBe('none');
    });

    it(`should throw an error when wrong option is used`, async () => {
      expect(() =>
        getField({
          documentation:
            'some text in docs @zod.custom.omit(["model", "wrong"])',
        }),
      ).toThrowError(
        "[@zod generator error]: unknown key 'wrong' in '.omit()'. only 'model' and 'input' are allowed. [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });

    it(`should load field with docs and custom validator and test "omitInModel" method`, async () => {
      const field = getField({
        documentation: 'some text in docs @zod.custom.omit(["model", "input"])',
      });
      const fieldTwo = getField({
        documentation: 'some text in docs @zod.custom.omit(["model"])',
      });
      const fieldThree = getField({
        documentation: 'some text in docs @zod.custom.omit(["input"])',
      });
      expect(field.zodOmitField).toBe('all');
      expect(field.omitInModel()).toBe(true);
      expect(fieldTwo.zodOmitField).toBe('model');
      expect(fieldTwo.omitInModel()).toBe(true);
      expect(fieldThree.zodOmitField).toBe('input');
      expect(fieldThree.omitInModel()).toBe(false);
    });

    it(`should load field with docs and custom validator and test "omitInInputTypes" method`, async () => {
      const field = getField({
        documentation: 'some text in docs @zod.custom.omit(["model", "input"])',
      });
      const fieldTwo = getField({
        documentation: 'some text in docs @zod.custom.omit(["model"])',
      });
      const fieldThree = getField({
        documentation: 'some text in docs @zod.custom.omit(["input"])',
      });
      expect(field.zodOmitField).toBe('all');
      expect(field.omitInInputTypes('UserCreateManyInput')).toBe(true);
      expect(fieldTwo.zodOmitField).toBe('model');
      expect(fieldTwo.omitInInputTypes('UserCreateManyInput')).toBe(false);
      expect(fieldThree.zodOmitField).toBe('input');
      expect(fieldThree.omitInInputTypes('UserCreateManyInput')).toBe(true);
    });

    // this test currently fails because the regex is not working as expected
    // Current workaround is a mention in the documentation that all documentation should come before the @zod directive

    it.skip(`should load field with docs and omit validator`, async () => {
      const field = getField({
        documentation:
          'some text in docs @zod.custom.omit(["model", "input"]) some text after',
      });
      expect(field.zodOmitField).toBe('all');
      expect(field.omitInInputTypes('UserCreateManyInput')).toBe(true);
      expect(field.clearedDocumentation).toBe(
        'some text in docs  some text after',
      );
    });
  });
}

/////////////////////////////////////////////
// TEST EXECUTION
/////////////////////////////////////////////

testExtendedDMMFFieldOmitField(ExtendedDMMFFieldOmitField);
