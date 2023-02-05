import { it, expect } from 'vitest';

import { DEFAULT_GENERATOR_CONFIG, FIELD_BASE } from './setup';
import { ExtendedDMMFFieldValidatorType } from '../extendedDMMFFieldValidatorType';

it(`should load a scalar DMMF.field ExtendedDMMFFieldValidatorType class without docs`, async () => {
  const field = new ExtendedDMMFFieldValidatorType(
    { ...FIELD_BASE },
    DEFAULT_GENERATOR_CONFIG,
    'ModelName',
  );

  expect(field).toBeDefined();
  expect(field?.['validatorMatch']).toBeUndefined();
  expect(field?.['validatorType']).toBeUndefined();
  expect(field?.clearedDocumentation).toBeUndefined();
});

it(`should load a scalar DMMF.field ExtendedDMMFFieldValidatorType class with docs`, async () => {
  const field = new ExtendedDMMFFieldValidatorType(
    { ...FIELD_BASE, documentation: 'some text in docs' },
    DEFAULT_GENERATOR_CONFIG,
    'ModelName',
  );

  expect(field).toBeDefined();
  expect(field?.['validatorMatch']).toBeUndefined();
  expect(field?.['validatorType']).toBeUndefined();
  expect(field?.clearedDocumentation).toBe('some text in docs');
});

it(`should load a scalar DMMF.field ExtendedDMMFFieldValidatorType class with docs and valid validator string`, async () => {
  const field = new ExtendedDMMFFieldValidatorType(
    { ...FIELD_BASE, documentation: 'some text in docs @zod.string.max(4)' },
    DEFAULT_GENERATOR_CONFIG,
    'ModelName',
  );

  expect(field).toBeDefined();
  expect(field?.['validatorMatch']).toBeDefined();
  expect(field?.['validatorType']).toBe('string');
  expect(field?.clearedDocumentation).toBe('some text in docs');
});

it(`should load a scalar DMMF.field ExtendedDMMFFieldValidatorType class with docs and valid enum validator string`, async () => {
  const field = new ExtendedDMMFFieldValidatorType(
    {
      ...FIELD_BASE,
      type: 'MyEnum',
      kind: 'enum',
      isList: true,
      documentation: 'some text in docs @zod.custom.array(".length(2)")',
    },
    DEFAULT_GENERATOR_CONFIG,
    'ModelName',
  );

  expect(field).toBeDefined();
  expect(field?.['validatorMatch']).toBeDefined();
  expect(field?.['validatorType']).toBe('custom');
  expect(field?.clearedDocumentation).toBe('some text in docs');
  expect(field.documentation).toBe(
    'some text in docs @zod.custom.array(".length(2)")',
  );
});

it(`should load a scalar DMMF.field ExtendedDMMFFieldValidatorType class with docs and invalid validator string`, async () => {
  expect(
    () =>
      new ExtendedDMMFFieldValidatorType(
        { ...FIELD_BASE, documentation: 'some text in docs @zod.numer.max(4)' },
        DEFAULT_GENERATOR_CONFIG,
        'ModelName',
      ),
  ).toThrowError(
    "[@zod generator error]: 'numer' is not a valid validator type. [Error Location]: Model: 'ModelName', Field: 'test'.",
  );
});
