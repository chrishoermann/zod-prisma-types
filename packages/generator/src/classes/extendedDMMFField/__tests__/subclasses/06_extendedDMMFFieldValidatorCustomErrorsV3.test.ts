import type DMMF from '@prisma/dmmf';
import { it, expect, describe, afterAll } from 'vitest';

import { FIELD_BASE } from '../setup';
import { DEFAULT_GENERATOR_CONFIG } from '../../../../__tests__/setup';
import { ExtendedDMMFFieldValidatorCustomErrors } from '../../06_extendedDMMFFieldValidatorCustomErrors';
import { globalConfig } from '../../../../config';

/////////////////////////////////////////////
// TEST SUITE
///////////////////////////////////////////////

export function testExtendedDMMFFieldValidatorCustomErrorsV3<
  T extends ExtendedDMMFFieldValidatorCustomErrors,
>(classConstructor: new (model: DMMF.Field, modelName: string) => T) {
  const getField = (field?: Partial<DMMF.Field>) =>
    new classConstructor({ ...FIELD_BASE, ...field }, 'ModelName');

  if (!globalConfig.isInitialized()) {
    globalConfig.initializeWithConfig({
      ...DEFAULT_GENERATOR_CONFIG,
      zodVersion: {
        major: 3,
        minor: 0,
        patch: 0,
      },
    });
  }

  afterAll(() => {
    if (globalConfig.isInitialized()) {
      globalConfig.reset();
    }
  });

  describe(`ExtendedDMMFFieldValidatorCustomErrors`, () => {
    it(`should load a class without docs`, async () => {
      const field = getField();
      expect(field?.['_validatorCustomError']).toBeUndefined();
      expect(field?.zodCustomErrors).toBeUndefined();
    });

    it(`should load a class with valid custom error messages`, async () => {
      const field = getField({
        documentation: `@zod.string({ required_error: "error", invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]|" , description: "error"})`,
      });
      expect(field?.['_validatorCustomError']).toBe(
        `({ required_error: "error", invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]|" , description: "error"})`,
      );
      expect(field?.zodCustomErrors).toBe(
        `{ required_error: "error", invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]|" , description: "error"}`,
      );
    });

    it(`should load a class with valid custom error messages`, async () => {
      const field = getField({
        documentation:
          '@zod.string({ required_error: "error", invalid_type_error: "error" , description: "error"})',
      });
      expect(field?.['_validatorCustomError']).toBe(
        '({ required_error: "error", invalid_type_error: "error" , description: "error"})',
      );
      expect(field?.zodCustomErrors).toBe(
        '{ required_error: "error", invalid_type_error: "error" , description: "error"}',
      );
    });

    it(`should load a class with docs and invalid validator string`, async () => {
      expect(() =>
        getField({
          documentation:
            '@zod.string({ required_error: "error", invalid_type_errrror: "error"})',
        }),
      ).toThrowError(
        "[@zod generator error]: Custom error key 'invalid_type_errrror' is not valid. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });
  });
}

/////////////////////////////////////////////
// TEST EXECUTION
///////////////////////////////////////////////

testExtendedDMMFFieldValidatorCustomErrorsV3(
  ExtendedDMMFFieldValidatorCustomErrors,
);
