import { it, expect, describe } from 'vitest';

import { DEFAULT_GENERATOR_CONFIG, FIELD_BASE } from './setup';
import { ExtendedDMMFFieldValidatorPattern } from '../extendedDMMFFieldValidatorPattern';

it(`should load a scalar DMMF.field ExtendedDMMFFieldValidatorCustomErrors class without docs`, async () => {
  const field = new ExtendedDMMFFieldValidatorPattern(
    { ...FIELD_BASE },
    DEFAULT_GENERATOR_CONFIG,
    'ModelName',
  );

  expect(field).toBeDefined();
  expect(field?.['_validatorMatch']).toBeUndefined();
  expect(field?.['_validatorType']).toBeUndefined();
  expect(field?.['_validatorPattern']).toBeUndefined();
});

it(`should load a scalar DMMF.field ExtendedDMMFFieldValidatorMatch class with docs and validator`, async () => {
  const field = new ExtendedDMMFFieldValidatorPattern(
    {
      ...FIELD_BASE,
      documentation:
        'some text in docs @zod.string({ required_error: "error" }).min(2).max(4)',
    },
    DEFAULT_GENERATOR_CONFIG,
    'ModelName',
  );

  expect(field).toBeDefined();
  expect(field?.['_validatorMatch']).toBeDefined();
  expect(field?.['_validatorType']).toBe('string');
  expect(field?.['_validatorPattern']).toBe('.min(2).max(4)');
  expect(field?.['_validatorList']).toEqual(['.min(2)', '.max(4)']);
  expect(field?.clearedDocumentation).toBe('some text in docs');
  expect(field.documentation).toBe(
    'some text in docs @zod.string({ required_error: "error" }).min(2).max(4)',
  );
});

describe('ExtendedDMMFFieldValidatorPattern validatorList', () => {
  const field = new ExtendedDMMFFieldValidatorPattern(
    { ...FIELD_BASE },
    DEFAULT_GENERATOR_CONFIG,
    'ModelName',
  );

  it(`should load a scalar DMMF.field ExtendedDMMFFieldValidatorMatch class with docs and validator`, async () => {
    field['_validatorPattern'] = '.min(2).max(4)';

    expect(field?.['_getValidatorList']()).toEqual(['.min(2)', '.max(4)']);
  });

  it(`should load a scalar DMMF.field ExtendedDMMFFieldValidatorMatch class with docs and validator`, async () => {
    field['_validatorPattern'] =
      '.use(z.string().min(2).max()).array(.length())';

    expect(field?.['_getValidatorList']()).toEqual([
      '.use(z.string().min(2).max())',
      '.array(.length())',
    ]);
  });
});
