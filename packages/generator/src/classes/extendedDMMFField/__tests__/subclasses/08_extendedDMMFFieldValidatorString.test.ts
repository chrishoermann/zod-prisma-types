import type DMMF from '@prisma/dmmf';
import { it, expect, describe, afterAll } from 'vitest';

import { FIELD_BASE } from '../setup';
import { DEFAULT_GENERATOR_CONFIG } from '../../../../__tests__/setup';
import { ExtendedDMMFFieldValidatorString } from '../../08_extendedDMMFFieldValidatorString';
import { globalConfig } from '../../../../config';

/////////////////////////////////////////////
// TEST SUITE
/////////////////////////////////////////////

export function testExtendedDMMFFieldValidatorString<
  T extends ExtendedDMMFFieldValidatorString,
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

  describe(`ExtendedDMMFFieldValidatorString`, () => {
    it(`should load class without docs`, async () => {
      const field = getField();
      expect(field.zodValidatorString).toBeUndefined();
    });

    it(`should load class with docs and validator`, async () => {
      const field = getField({
        documentation:
          'some text in docs @zod.string({ required_error: "error" }).min(2).max(4)',
      });
      expect(field.zodValidatorString).toBe('.min(2).max(4)');
    });

    it(`should load class with docs and validator on field with default validator`, async () => {
      const field = getField({
        type: 'Int',
        isList: true,
        documentation:
          'some text in docs @zod.number({ required_error: "error" }).lt(2).gt(4).array(.length(2))',
      });
      expect(field.zodValidatorString).toBe('.lt(2).gt(4)');
    });

    it(`should load class with docs and NO validator on field with default validator`, async () => {
      const field = getField({
        type: 'Int',
        documentation: 'some text in docs',
      });
      expect(field?.zodValidatorString).toBe('.int()');
    });

    // Complex string validator combinations
    it(`should handle complex string validation chains`, async () => {
      const field = getField({
        type: 'String',
        documentation:
          '@zod.string.min(3, { message: "Too short" }).max(50, { message: "Too long" }).email({ message: "Invalid email" }).toLowerCase().trim()',
      });
      expect(field.zodValidatorString).toBe(
        '.min(3, { message: "Too short" }).max(50, { message: "Too long" }).email({ message: "Invalid email" }).toLowerCase().trim()',
      );
    });

    it(`should handle string format validators with custom messages`, async () => {
      const field = getField({
        type: 'String',
        documentation:
          '@zod.string.uuid({ message: "Invalid UUID" }).startsWith("user-", { message: "Must start with user-" }).endsWith("123", { message: "Must end with 123" })',
      });
      expect(field.zodValidatorString).toBe(
        '.uuid({ message: "Invalid UUID" }).startsWith("user-", { message: "Must start with user-" }).endsWith("123", { message: "Must end with 123" })',
      );
    });

    it(`should handle date/time validators correctly`, async () => {
      const field = getField({
        type: 'String',
        documentation:
          '@zod.string.date({ message: "Invalid date format" }).time({ message: "Invalid time format" }).datetime({ message: "Invalid datetime format" })',
      });
      expect(field.zodValidatorString).toBe(
        '.date({ message: "Invalid date format" }).time({ message: "Invalid time format" }).datetime({ message: "Invalid datetime format" })',
      );
    });

    it(`should handle ISO validators correctly`, async () => {
      const field = getField({
        type: 'String',
        documentation:
          '@zod.string.isoDate({ message: "Invalid ISO date" }).isoTime({ message: "Invalid ISO time" }).isoDatetime({ message: "Invalid ISO datetime" }).isoDuration({ message: "Invalid ISO duration" })',
      });
      expect(field.zodValidatorString).toBe(
        '.isoDate({ message: "Invalid ISO date" }).isoTime({ message: "Invalid ISO time" }).isoDatetime({ message: "Invalid ISO datetime" }).isoDuration({ message: "Invalid ISO duration" })',
      );
    });

    // Complex number validator combinations
    it(`should handle complex number validation chains`, async () => {
      const field = getField({
        type: 'Int',
        documentation:
          '@zod.number.int({ message: "Must be integer" }).positive({ message: "Must be positive" }).multipleOf(5, { message: "Must be multiple of 5" }).step(5, { message: "Must be step of 5" })',
      });
      expect(field.zodValidatorString).toBe(
        '.int({ message: "Must be integer" }).positive({ message: "Must be positive" }).multipleOf(5, { message: "Must be multiple of 5" }).step(5, { message: "Must be step of 5" })',
      );
    });

    it(`should handle number range validators with custom messages`, async () => {
      const field = getField({
        type: 'Float',
        documentation:
          '@zod.number.gt(0, { message: "Greater than 0" }).lt(100, { message: "Less than 100" }).gte(1, { message: "Greater or equal to 1" }).lte(99, { message: "Less or equal to 99" })',
      });
      expect(field.zodValidatorString).toBe(
        '.gt(0, { message: "Greater than 0" }).lt(100, { message: "Less than 100" }).gte(1, { message: "Greater or equal to 1" }).lte(99, { message: "Less or equal to 99" })',
      );
    });

    // Complex BigInt validator combinations
    it(`should handle complex BigInt validation chains`, async () => {
      const field = getField({
        type: 'BigInt',
        documentation:
          '@zod.bigint.positive({ message: "Must be positive" }).negative({ message: "Must be negative" }).nonpositive({ message: "Must be non-positive" }).nonnegative({ message: "Must be non-negative" })',
      });
      expect(field.zodValidatorString).toBe(
        '.positive({ message: "Must be positive" }).negative({ message: "Must be negative" }).nonpositive({ message: "Must be non-positive" }).nonnegative({ message: "Must be non-negative" })',
      );
    });

    it(`should handle BigInt range validators with aliases`, async () => {
      const field = getField({
        type: 'BigInt',
        documentation:
          '@zod.bigint.min(5n, { message: "Min 5" }).max(100n, { message: "Max 100" }).step(5n, { message: "Step 5" })',
      });
      expect(field.zodValidatorString).toBe(
        '.min(5n, { message: "Min 5" }).max(100n, { message: "Max 100" }).step(5n, { message: "Step 5" })',
      );
    });

    // Complex date validator combinations
    it(`should handle complex date validation chains`, async () => {
      const field = getField({
        type: 'DateTime',
        documentation:
          '@zod.date.min(new Date("2020-01-01"), { message: "Too early" }).max(new Date("2030-12-31"), { message: "Too late" })',
      });
      expect(field.zodValidatorString).toBe(
        '.min(new Date("2020-01-01"), { message: "Too early" }).max(new Date("2030-12-31"), { message: "Too late" })',
      );
    });

    // Array validators with complex patterns
    it(`should handle array validators with complex validation`, async () => {
      const field = getField({
        type: 'String',
        isList: true,
        documentation:
          '@zod.string.min(3).max(100).email().array(.min(1, { message: "At least one item" }).max(10, { message: "Max 10 items" }).length(5, { message: "Exactly 5 items" }))',
      });
      expect(field.zodValidatorString).toBe('.min(3).max(100).email()');
    });

    it(`should handle nested array validators`, async () => {
      const field = getField({
        type: 'Int',
        isList: true,
        documentation:
          '@zod.number.int().positive().array(.min(2).max(20).nonempty({ message: "Cannot be empty" }))',
      });
      expect(field.zodValidatorString).toBe('.int().positive()');
    });

    // Edge cases and special scenarios
    it(`should handle validators with complex message objects`, async () => {
      const field = getField({
        type: 'String',
        documentation:
          '@zod.string.min(3, { message: "Min length: 3 chars" }).max(50, { message: "Max length: 50 chars" })',
      });
      expect(field.zodValidatorString).toBe(
        '.min(3, { message: "Min length: 3 chars" }).max(50, { message: "Max length: 50 chars" })',
      );
    });

    it(`should handle validators with regex patterns`, async () => {
      const field = getField({
        type: 'String',
        documentation:
          '@zod.string.regex(/^[A-Z][a-z]+$/, { message: "Must start with uppercase, then lowercase" }).startsWith("User", { message: "Must start with User" })',
      });
      expect(field.zodValidatorString).toBe(
        '.regex(/^[A-Z][a-z]+$/, { message: "Must start with uppercase, then lowercase" }).startsWith("User", { message: "Must start with User" })',
      );
    });

    it(`should handle validators with includes and custom messages`, async () => {
      const field = getField({
        type: 'String',
        documentation:
          '@zod.string.includes("admin", { message: "Must contain admin" }).length(10, { message: "Must be exactly 10 chars" }).uppercase()',
      });
      expect(field.zodValidatorString).toBe(
        '.includes("admin", { message: "Must contain admin" }).length(10, { message: "Must be exactly 10 chars" }).uppercase()',
      );
    });

    // Mixed type scenarios
    it(`should handle mixed validator types correctly`, async () => {
      const field = getField({
        type: 'String',
        documentation: '@zod.string.email().trim().toLowerCase().normalize()',
      });
      expect(field.zodValidatorString).toBe(
        '.email().trim().toLowerCase().normalize()',
      );
    });

    it(`should handle validators with multiple custom error types`, async () => {
      const field = getField({
        type: 'String',
        documentation:
          '@zod.string({ invalid_type_error: "Must be string", required_error: "Required field", description: "User email" }).email({ message: "Invalid email format" }).min(5, { message: "Too short" })',
      });
      expect(field.zodValidatorString).toBe(
        '.email({ message: "Invalid email format" }).min(5, { message: "Too short" })',
      );
    });
  });
}

/////////////////////////////////////////////
// TEST EXECUTION
/////////////////////////////////////////////

testExtendedDMMFFieldValidatorString(ExtendedDMMFFieldValidatorString);
