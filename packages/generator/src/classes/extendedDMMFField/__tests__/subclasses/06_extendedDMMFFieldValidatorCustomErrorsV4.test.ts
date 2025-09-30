import type DMMF from '@prisma/dmmf';
import { it, expect, describe, afterAll } from 'vitest';

import { FIELD_BASE } from '../setup';
import { DEFAULT_GENERATOR_CONFIG } from '../../../../__tests__/setup';
import { ExtendedDMMFFieldValidatorCustomErrors } from '../../06_extendedDMMFFieldValidatorCustomErrors';
import { globalConfig } from '../../../../config';

/////////////////////////////////////////////
// TEST SUITE
///////////////////////////////////////////////

export function testExtendedDMMFFieldValidatorCustomErrorsV4<
  T extends ExtendedDMMFFieldValidatorCustomErrors,
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

  describe(`ExtendedDMMFFieldValidatorCustomErrors`, () => {
    // Zod v4 new error paradigm tests
    it(`should load a class with the new 'error' key`, async () => {
      const field = getField({
        documentation: '@zod.string({ error: "Generic error message"})',
      });
      expect(field?.['_validatorCustomError']).toBe(
        '({ error: "Generic error message"})',
      );
      expect(field?.zodCustomErrors).toBe('{ error: "Generic error message"}');
    });

    it(`should load a class with function-based error customization`, async () => {
      const field = getField({
        documentation:
          '@zod.string({ error: (issue) => issue.input === undefined ? "This field is required" : "Not a string" })',
      });
      expect(field?.['_validatorCustomError']).toBe(
        '({ error: (issue) => issue.input === undefined ? "This field is required" : "Not a string" })',
      );
      expect(field?.zodCustomErrors).toBe(
        '{ error: (issue) => issue.input === undefined ? "This field is required" : "Not a string" }',
      );
    });

    it(`should load a class with complex function-based error logic`, async () => {
      const field = getField({
        documentation:
          '@zod.string({ error: (issue) => { if (issue.code === "invalid_type") return "Invalid type"; if (issue.code === "too_small") return "Too short"; return undefined; } })',
      });
      expect(field?.['_validatorCustomError']).toBe(
        '({ error: (issue) => { if (issue.code === "invalid_type") return "Invalid type"; if (issue.code === "too_small") return "Too short"; return undefined; } })',
      );
      expect(field?.zodCustomErrors).toBe(
        '{ error: (issue) => { if (issue.code === "invalid_type") return "Invalid type"; if (issue.code === "too_small") return "Too short"; return undefined; } }',
      );
    });

    it(`should load a class with mixed error types`, async () => {
      const field = getField({
        documentation: '@zod.string({ error: "Default error"})',
      });
      expect(field?.['_validatorCustomError']).toBe(
        '({ error: "Default error"})',
      );
      expect(field?.zodCustomErrors).toBe('{ error: "Default error"}');
    });

    it(`should load a class with function-based error and validator-specific errors`, async () => {
      const field = getField({
        documentation:
          '@zod.string({ error: (issue) => "Generic error" }).min(5, { error: "Value must be at least 5 characters" })',
      });
      expect(field?.['_validatorCustomError']).toBe(
        '({ error: (issue) => "Generic error" })',
      );
      expect(field?.zodCustomErrors).toBe(
        '{ error: (issue) => "Generic error" }',
      );
    });

    it(`should load a class with template literal in function-based error`, async () => {
      const field = getField({
        documentation:
          '@zod.string({ error: (issue) => `Field validation ${issue.code}` })',
      });
      expect(field?.['_validatorCustomError']).toBe(
        '({ error: (issue) => `Field validation ${issue.code}` })',
      );
      expect(field?.zodCustomErrors).toBe(
        '{ error: (issue) => `Field validation ${issue.code}` }',
      );
    });

    it(`should load a class with conditional error logic`, async () => {
      const field = getField({
        type: 'Int',
        documentation:
          '@zod.number({ error: (issue) => issue.input === undefined ? "This field is required" : "Must be a number" }).gt(0, { error: "Value must be greater than 0" })',
      });
      expect(field?.['_validatorCustomError']).toBe(
        '({ error: (issue) => issue.input === undefined ? "This field is required" : "Must be a number" })',
      );
      expect(field?.zodCustomErrors).toBe(
        '{ error: (issue) => issue.input === undefined ? "This field is required" : "Must be a number" }',
      );
    });

    it(`should load a class with date validation and function-based errors`, async () => {
      const field = getField({
        type: 'DateTime',
        documentation:
          '@zod.date({ error: (issue) => issue.input === undefined ? "Date is required" : "Invalid date format" }).min(new Date("2020-01-01"), { error: "Date must be after 2020-01-01" })',
      });
      expect(field?.['_validatorCustomError']).toBe(
        '({ error: (issue) => issue.input === undefined ? "Date is required" : "Invalid date format" })',
      );
      expect(field?.zodCustomErrors).toBe(
        '{ error: (issue) => issue.input === undefined ? "Date is required" : "Invalid date format" }',
      );
    });

    it(`should handle special characters in function-based errors`, async () => {
      const field = getField({
        documentation:
          '@zod.string({ error: (issue) => `Error with special chars ${issue.code}` })',
      });
      expect(field?.['_validatorCustomError']).toBe(
        '({ error: (issue) => `Error with special chars ${issue.code}` })',
      );
      expect(field?.zodCustomErrors).toBe(
        '{ error: (issue) => `Error with special chars ${issue.code}` }',
      );
    });

    it(`should handle multiline function-based errors`, async () => {
      const field = getField({
        documentation:
          '@zod.string({ error: (issue) => { const msg = "Complex error logic"; return msg + " with " + issue.code; } })',
      });
      expect(field?.['_validatorCustomError']).toBe(
        '({ error: (issue) => { const msg = "Complex error logic"; return msg + " with " + issue.code; } })',
      );
      expect(field?.zodCustomErrors).toBe(
        '{ error: (issue) => { const msg = "Complex error logic"; return msg + " with " + issue.code; } }',
      );
    });

    // Error case tests
    it(`should throw error for invalid key with new error paradigm`, async () => {
      expect(() =>
        getField({
          documentation:
            '@zod.string({ error: "Valid error", invalid_key: "Invalid key" })',
        }),
      ).toThrowError(
        "[@zod generator error]: Custom error key 'invalid_key' is not valid. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });

    it(`should throw error for typo in error key`, async () => {
      expect(() =>
        getField({
          documentation:
            '@zod.string({ erro: (issue) => "Function with typo in key" })',
        }),
      ).toThrowError(
        "[@zod generator error]: Custom error key 'erro' is not valid. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });

    it(`should throw error for invalid_type_erro typo`, async () => {
      expect(() =>
        getField({
          documentation:
            '@zod.string({ invalid_type_erro: "Typo in standard key" })',
        }),
      ).toThrowError(
        "[@zod generator error]: Custom error key 'invalid_type_erro' is not valid. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });

    it(`should throw error for required_erro typo`, async () => {
      expect(() =>
        getField({
          documentation: '@zod.string({ required_erro: "Another typo" })',
        }),
      ).toThrowError(
        "[@zod generator error]: Custom error key 'required_erro' is not valid. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });

    it(`should throw error for descriptio typo`, async () => {
      expect(() =>
        getField({
          documentation:
            '@zod.string({ descriptio: "Typo in description key" })',
        }),
      ).toThrowError(
        "[@zod generator error]: Custom error key 'descriptio' is not valid. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });

    it(`should throw error for multiple invalid keys`, async () => {
      expect(() =>
        getField({
          documentation:
            '@zod.string({ error: "Valid", invalid_one: "First invalid", invalid_two: "Second invalid" })',
        }),
      ).toThrowError(
        "[@zod generator error]: Custom error key 'invalid_one' is not valid. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });

    it(`should throw error for unknown key mixed with valid function-based error`, async () => {
      expect(() =>
        getField({
          documentation:
            '@zod.string({ error: (issue) => "Valid function", unknown_key: "Invalid key" })',
        }),
      ).toThrowError(
        "[@zod generator error]: Custom error key 'unknown_key' is not valid. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });

    it(`should throw error for camelCase variation of valid key`, async () => {
      expect(() =>
        getField({
          documentation:
            '@zod.string({ invalidTypeError: "camelCase version" })',
        }),
      ).toThrowError(
        "[@zod generator error]: Custom error key 'invalidTypeError' is not valid. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });

    it(`should throw error for snake_case variation with extra underscore`, async () => {
      expect(() =>
        getField({
          documentation:
            '@zod.string({ invalid__type_error: "Double underscore" })',
        }),
      ).toThrowError(
        "[@zod generator error]: Custom error key 'invalid__type_error' is not valid. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });

    it(`should throw error for completely wrong key name`, async () => {
      expect(() =>
        getField({
          documentation:
            '@zod.string({ wrong_key: "Completely wrong key name" })',
        }),
      ).toThrowError(
        "[@zod generator error]: Custom error key 'wrong_key' is not valid. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });
  });
}

/////////////////////////////////////////////
// TEST EXECUTION
///////////////////////////////////////////////

testExtendedDMMFFieldValidatorCustomErrorsV4(
  ExtendedDMMFFieldValidatorCustomErrors,
);
