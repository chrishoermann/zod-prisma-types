import { it, expect } from 'vitest';

import { DEFAULT_GENERATOR_CONFIG, FIELD_BASE } from './setup';
import { ExtendedDMMFFieldValidatorCustomErrors } from '../extendedDMMFFieldValidatorCustomErrors';

it(`should load a scalar DMMF.field ExtendedDMMFFieldValidatorCustomErrors class without docs`, async () => {
  const field = new ExtendedDMMFFieldValidatorCustomErrors(
    { ...FIELD_BASE },
    DEFAULT_GENERATOR_CONFIG,
    'ModelName',
  );

  expect(field).toBeDefined();
  expect(field?.['_validatorMatch']).toBeUndefined();
  expect(field?.['_validatorType']).toBeUndefined();
  expect(field?.['_validatorCustomError']).toBeUndefined();
  expect(field?.zodCustomErrors).toBeUndefined();
});

it(`should load a scalar DMMF.field ExtendedDMMFFieldValidatorCustomErrors class with valid custom error messages`, async () => {
  const field = new ExtendedDMMFFieldValidatorCustomErrors(
    {
      ...FIELD_BASE,
      documentation:
        '@zod.string({ required_error: "error", invalid_type_error: "error" , description: "error"})',
    },
    DEFAULT_GENERATOR_CONFIG,
    'ModelName',
  );

  expect(field).toBeDefined();
  expect(field?.['_validatorMatch']).toBeDefined();
  expect(field?.['_validatorType']).toBe('string');
  expect(field?.['_validatorCustomError']).toBe(
    '({ required_error: "error", invalid_type_error: "error" , description: "error"})',
  );
  expect(field?.zodCustomErrors).toBe(
    '{ required_error: "error", invalid_type_error: "error" , description: "error"}',
  );
});

it(`should load a scalar DMMF.field ExtendedDMMFFieldValidatorCustomErrors class with docs and invalid validator string`, async () => {
  expect(
    () =>
      new ExtendedDMMFFieldValidatorCustomErrors(
        {
          ...FIELD_BASE,
          documentation:
            '@zod.string({ required_error: "error", invalid_type_errrror: "error"})',
        },
        DEFAULT_GENERATOR_CONFIG,
        'ModelName',
      ),
  ).toThrowError(
    "[@zod generator error]: Custom error key 'invalid_type_errrror' is not valid. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
  );
});
