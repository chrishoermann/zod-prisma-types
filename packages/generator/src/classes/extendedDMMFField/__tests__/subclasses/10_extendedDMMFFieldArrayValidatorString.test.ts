import type DMMF from '@prisma/dmmf';
import { it, expect, describe, afterAll } from 'vitest';

import { FIELD_BASE } from '../setup';
import { DEFAULT_GENERATOR_CONFIG } from '../../../../__tests__/setup';
import {
  ARRAY_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
  ARRAY_VALIDATOR_NUMBER_OR_STRING_AND_MESSAGE_REGEX,
  ARRAY_VALIDATOR_WITH_MESSAGE_REGEX,
  ExtendedDMMFFieldArrayValidatorString,
} from '../../10_extendedDMMFFieldArrayValidatorString';
import { globalConfig } from '../../../../config';

/////////////////////////////////////////////
// TEST SUITE
/////////////////////////////////////////////

export function testExtendedDMMFFieldArrayValidatorString<
  T extends ExtendedDMMFFieldArrayValidatorString,
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

  describe("ExtendedDMMFFieldValidatorMap's regex", () => {
    it(`array validator number should return match for regex with japanese chars`, async () => {
      const result = ARRAY_VALIDATOR_NUMBER_AND_MESSAGE_REGEX.exec(
        ".min(5, {message: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。'})",
      );
      expect(result?.groups?.validator).toBe('min');
      expect(result?.groups?.number).toBe('5');
      expect(result?.groups?.message).toBe(
        "{message: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。'}",
      );
    });

    it(`array validator number or string should return match for regex with japanese chars`, async () => {
      const resultOne = ARRAY_VALIDATOR_NUMBER_OR_STRING_AND_MESSAGE_REGEX.exec(
        ".min(5, {message: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。'})",
      );
      expect(resultOne?.groups?.validator).toBe('min');
      expect(resultOne?.groups?.number).toBe('5');
      expect(resultOne?.groups?.message).toBe(
        "{message: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。'}",
      );

      const resultTwo = ARRAY_VALIDATOR_NUMBER_OR_STRING_AND_MESSAGE_REGEX.exec(
        ".min(string, {message: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。'})",
      );
      expect(resultTwo?.groups?.validator).toBe('min');
      expect(resultTwo?.groups?.number).toBe('string');
      expect(resultTwo?.groups?.message).toBe(
        "{message: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。'}",
      );
    });

    it(`array validator message should return match for regex with japanese chars`, async () => {
      const result = ARRAY_VALIDATOR_WITH_MESSAGE_REGEX.exec(
        ".nonempty({message: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。'})",
      );
      expect(result?.groups?.validator).toBe('nonempty');
      expect(result?.groups?.message).toBe(
        "{message: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。'}",
      );
    });
  });

  describe(`ExtendedDMMFFieldArrayValidatorString`, () => {
    it(`should load field with docs and array validator on string list`, async () => {
      const field = getField({
        documentation: 'some text in docs @zod.string.min(4).array(.length(2))',
        isList: true,
      });
      expect(field.zodArrayValidatorString).toBe('.length(2)');
      expect(field.zodValidatorString).toBe('.min(4)');
    });

    it(`should load field with docs and array validator on Int list`, async () => {
      const field = getField({
        type: 'Int',
        isList: true,
        documentation: 'some text in docs @zod.number.lt(4).array(.length(2))',
      });
      expect(field.zodArrayValidatorString).toBe('.length(2)');
      expect(field.zodValidatorString).toBe('.lt(4)');
    });

    it(`should load field with docs and array validator on custom int list`, async () => {
      const field = getField({
        type: 'Int',
        isList: true,
        documentation:
          'some text in docs @zod.custom.use(z.string.min(4)).array(.length(2))',
      });

      expect(field.zodArrayValidatorString).toBe('.length(2)');
      expect(field.zodCustomValidatorString).toBe('z.string.min(4)');
    });

    it(`should load field with docs and array validator on enum list`, async () => {
      const field = getField({
        type: 'MyEnum',
        kind: 'enum',
        isList: true,
        documentation: 'some text in docs @zod.enum.array(.length(2))',
      });

      expect(field.zodArrayValidatorString).toBe('.length(2)');
    });

    it(`should load field with docs and array validator on object list`, async () => {
      const field = getField({
        type: 'MyType',
        kind: 'object',
        isList: true,
        documentation: 'some text in docs @zod.object.array(.length(2))',
      });

      expect(field.zodArrayValidatorString).toBe('.length(2)');
    });

    it(`should NOT load field with docs and array validator on a single string`, async () => {
      expect(() =>
        getField({
          documentation:
            'some text in docs @zod.string.min(4).array(.length(2))',
          isList: false,
        }),
      ).toThrowError(
        "[@zod generator error]: '.array' validator is only allowed on lists. [Error Location]: Model: 'ModelName', Field: 'test'",
      );
    });

    it(`should NOT load field with docs and array validator on a single string if no pattern is present`, async () => {
      const field = getField({
        isList: false,
        documentation: 'some text in docs @zod.string.min(3)',
      });

      expect(field.zodArrayValidatorString).toBeUndefined();
    });

    it(`should load field with docs and array validator list on string`, async () => {
      const field = getField({
        documentation:
          'some text in docs @zod.string.min(4).array(.length(2).min(3).max(4).nonempty())',
        isList: true,
      });
      expect(field.zodArrayValidatorString).toBe(
        '.length(2).min(3).max(4).nonempty()',
      );
    });

    it(`should load field with docs and array validator list on string with message`, async () => {
      const field = getField({
        documentation:
          'some text in docs @zod.string.min(4).array(.length(2, { message: "my message" }).min(3, { message: "my message" }).max(4, { message: "my message" }).nonempty({ message: "my message" }))',
        isList: true,
      });
      expect(field.zodArrayValidatorString).toBe(
        '.length(2, { message: "my message" }).min(3, { message: "my message" }).max(4, { message: "my message" }).nonempty({ message: "my message" })',
      );
    });

    it(`should NOT load field with docs and array validator on a single string with wrong error message key`, async () => {
      expect(() =>
        getField({
          documentation:
            'some text in docs @zod.string.min(4).array(.length(2, { mussage: "my message" })',
          isList: true,
        }),
      ).toThrowError(
        "[@zod generator error]: Could not match validator 'length' with validatorPattern '.length(2, { mussage: \"my message\" }'. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'",
      );
    });

    it(`should NOT load field with docs and array validator on a single string wiht wrong validator`, async () => {
      expect(() =>
        getField({
          documentation:
            'some text in docs @zod.string.min(4).array(.lt(2, { mussage: "my message" })',
          isList: true,
        }),
      ).toThrowError(
        "[@zod generator error]: Validator 'lt' is not valid for type 'String', for specified '@zod.[key] or for 'z.array.[key]'. [Error Location]: Model: 'ModelName', Field: 'test'",
      );
    });

    it(`should load field with docs and array validator containing a string`, async () => {
      const field = getField({
        documentation:
          'some text in docs @zod.string.min(4).array(.length(2).min(myfunction.some).max(myfunction.some).nonempty())',
        isList: true,
      });
      expect(field.zodArrayValidatorString).toBe(
        '.length(2).min(myfunction.some).max(myfunction.some).nonempty()',
      );
    });

    it(`should load field with docs and array validator containing a string on an enum`, async () => {
      const field = getField({
        type: 'MyEnum',
        kind: 'enum',
        documentation:
          'some text in docs @zod.enum.array(.length(myfunction.some, { message: "error" }).min(1).max(myfunction.some).nonempty({ message: "error" }))',
        isList: true,
      });
      expect(field.zodArrayValidatorString).toBe(
        '.length(myfunction.some, { message: "error" }).min(1).max(myfunction.some).nonempty({ message: "error" })',
      );
    });

    it(`should load field with custom validator string with nested .array() and top level .array()`, async () => {
      const field = getField({
        type: 'Json',
        isList: true,
        documentation:
          'some text in docs @zod.custom.use(z.object({contents: z.array(z.object({locale: z.string(), content: z.string()}))})).array(.length(2))',
      });

      expect(field.zodCustomValidatorString).toBe(
        'z.object({contents: z.array(z.object({locale: z.string(), content: z.string()}))})',
      );
      expect(field.zodArrayValidatorString).toBe('.length(2)');
    });

    // Additional error case tests
    describe('Error Cases and Edge Cases', () => {
      it(`should throw error for invalid array validator 'invalid'`, async () => {
        expect(() =>
          getField({
            documentation:
              'some text in docs @zod.string.min(4).array(.invalid())',
            isList: true,
          }),
        ).toThrowError(
          "[@zod generator error]: Validator 'invalid' is not valid for type 'String', for specified '@zod.[key] or for 'z.array.[key]'. [Error Location]: Model: 'ModelName', Field: 'test'.",
        );
      });

      it(`should throw error for malformed array validator pattern`, async () => {
        expect(() =>
          getField({
            documentation:
              'some text in docs @zod.string.min(4).array(.length(2, { message: "test" }',
            isList: true,
          }),
        ).toThrowError(
          "[@zod generator error]: Could not match validator 'array' with validatorPattern '.array(.length(2, { message: \"test\" }'. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
        );
      });

      it(`should throw error for array validator with invalid message format`, async () => {
        expect(() =>
          getField({
            documentation:
              'some text in docs @zod.string.min(4).array(.length(2, { invalid_key: "test" })',
            isList: true,
          }),
        ).toThrowError(
          "[@zod generator error]: Could not match validator 'length' with validatorPattern '.length(2, { invalid_key: \"test\" }'. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
        );
      });

      it(`should throw error for array validator with missing opening parenthesis`, async () => {
        expect(() =>
          getField({
            documentation:
              'some text in docs @zod.string.min(4).array(.length 2)',
            isList: true,
          }),
        ).toThrowError(
          "[@zod generator error]: Could not match validator 'length' with validatorPattern '.length 2'. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
        );
      });

      it(`should throw error for array validator with missing closing parenthesis`, async () => {
        expect(() =>
          getField({
            documentation:
              'some text in docs @zod.string.min(4).array(.length(2',
            isList: true,
          }),
        ).toThrowError(
          "[@zod generator error]: Could not match validator 'array' with validatorPattern '.array(.length(2'. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
        );
      });

      it(`should throw error for array validator with empty parentheses`, async () => {
        expect(() =>
          getField({
            documentation:
              'some text in docs @zod.string.min(4).array(.length())',
            isList: true,
          }),
        ).toThrowError(
          "[@zod generator error]: Could not match validator 'length' with validatorPattern '.length()'. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
        );
      });

      it(`should throw error for array validator with invalid validator name`, async () => {
        expect(() =>
          getField({
            documentation:
              'some text in docs @zod.string.min(4).array(.invalidValidator(2))',
            isList: true,
          }),
        ).toThrowError(
          "[@zod generator error]: Validator 'invalidValidator' is not valid for type 'String', for specified '@zod.[key] or for 'z.array.[key]'. [Error Location]: Model: 'ModelName', Field: 'test'.",
        );
      });

      it(`should throw error for array validator with wrong field type`, async () => {
        expect(() =>
          getField({
            type: 'Float',
            isList: true,
            documentation:
              'some text in docs @zod.string.min(4).array(.length(2))',
          }),
        ).toThrowError(
          "[@zod generator error]: Validator 'string' is not valid for type 'Float'. [Error Location]: Model: 'ModelName', Field: 'test'.",
        );
      });

      it(`should throw error for array validator with complex invalid pattern`, async () => {
        expect(() =>
          getField({
            documentation:
              'some text in docs @zod.string.min(4).array(.length(2, { message: "test", extra: "value" })',
            isList: true,
          }),
        ).toThrowError(
          "[@zod generator error]: Could not match validator 'length' with validatorPattern '.length(2, { message: \"test\", extra: \"value\" }'. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
        );
      });

      it(`should throw error for array validator with invalid array syntax`, async () => {
        expect(() =>
          getField({
            documentation:
              'some text in docs @zod.string.min(4).array(.length(2, message: "test"))',
            isList: true,
          }),
        ).toThrowError(
          "[@zod generator error]: Could not match validator 'length' with validatorPattern '.length(2, message: \"test\")'. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
        );
      });

      it(`should throw error for array validator with wrong message key`, async () => {
        expect(() =>
          getField({
            documentation:
              'some text in docs @zod.string.min(4).array(.length(2, { msg: "test" }))',
            isList: true,
          }),
        ).toThrowError(
          "[@zod generator error]: Could not match validator 'length' with validatorPattern '.length(2, { msg: \"test\" })'. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
        );
      });

      it(`should throw error for array validator with invalid function call`, async () => {
        expect(() =>
          getField({
            documentation:
              'some text in docs @zod.string.min(4).array(.length(myFunction()))',
            isList: true,
          }),
        ).toThrowError(
          "[@zod generator error]: Could not match validator 'length' with validatorPattern '.length(myFunction())'. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
        );
      });

      it(`should throw error for array validator with nested invalid validators`, async () => {
        expect(() =>
          getField({
            documentation:
              'some text in docs @zod.string.min(4).array(.length(2).invalid().max(5))',
            isList: true,
          }),
        ).toThrowError(
          "[@zod generator error]: Validator 'invalid' is not valid for type 'String', for specified '@zod.[key] or for 'z.array.[key]'. [Error Location]: Model: 'ModelName', Field: 'test'.",
        );
      });
    });
  });
}

/////////////////////////////////////////////
// TEST EXECUTION
/////////////////////////////////////////////

testExtendedDMMFFieldArrayValidatorString(
  ExtendedDMMFFieldArrayValidatorString,
);
