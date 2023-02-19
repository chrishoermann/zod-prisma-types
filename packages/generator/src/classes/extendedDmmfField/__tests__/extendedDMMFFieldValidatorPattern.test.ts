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
  expect(field?.['validatorMatch']).toBeUndefined();
  expect(field?.['validatorType']).toBeUndefined();
  expect(field?.['validatorPattern']).toBeUndefined();
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
  expect(field?.['validatorMatch']).toBeDefined();
  expect(field?.['validatorType']).toBe('string');
  expect(field?.['validatorPattern']).toBe('.min(2).max(4)');
  expect(field?.['validatorList']).toEqual(['.min(2)', '.max(4)']);
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
    field['validatorPattern'] = '.min(2).max(4)';
    expect(field?.['_getValidatorList']()).toEqual(['.min(2)', '.max(4)']);
  });

  it(`should load a scalar DMMF.field ExtendedDMMFFieldValidatorMatch class with docs and validator`, async () => {
    field['validatorPattern'] = '.use(z.string().min(2).max())';
    expect(field?.['_getValidatorList']()).toEqual([
      '.use(z.string().min(2).max())',
    ]);
  });
});
