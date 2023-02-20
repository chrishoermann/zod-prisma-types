import { it, expect } from 'vitest';

import { DEFAULT_GENERATOR_CONFIG, FIELD_BASE } from './setup';
import { ExtendedDMMFFieldValidatorMatch } from '../extendedDMMFFieldValidatorMatch';

it(`should load a scalar DMMF.field ExtendedDMMFFieldValidatorMatch class without docs`, async () => {
  const field = new ExtendedDMMFFieldValidatorMatch(
    { ...FIELD_BASE },
    DEFAULT_GENERATOR_CONFIG,
    'ModelName',
  );

  expect(field).toBeDefined();
  expect(field?.['_validatorMatch']).toBe(undefined);
  expect(field?.clearedDocumentation).toBe(undefined);
});

it(`should load a scalar DMMF.field ExtendedDMMFFieldValidatorMatch class with docs`, async () => {
  const field = new ExtendedDMMFFieldValidatorMatch(
    { ...FIELD_BASE, documentation: 'some text in docs' },
    DEFAULT_GENERATOR_CONFIG,
    'ModelName',
  );

  expect(field).toBeDefined();
  expect(field?.['_validatorMatch']).toBeUndefined();
  expect(field?.clearedDocumentation).toBe('some text in docs');
  expect(field.documentation).toBe('some text in docs');
});

it(`should load a scalar DMMF.field ExtendedDMMFFieldValidatorMatch class with docs and validator`, async () => {
  const field = new ExtendedDMMFFieldValidatorMatch(
    { ...FIELD_BASE, documentation: 'some text in docs @zod.string.max(4)' },
    DEFAULT_GENERATOR_CONFIG,
    'ModelName',
  );

  expect(field).toBeDefined();
  expect(field?.['_validatorMatch']).toBeDefined();
  expect(field?.clearedDocumentation).toBe('some text in docs');
  expect(field.documentation).toBe('some text in docs @zod.string.max(4)');
});
