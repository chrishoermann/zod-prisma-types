import { it, expect } from 'vitest';

import { DEFAULT_GENERATOR_CONFIG, FIELD_BASE } from './setup';
import { ExtendedDMMFFieldDefaultValidators } from '../extendedDMMFFieldDefaultValidators';

it(`should load a scalar DMMF.field ExtendedDMMFFieldDefaultValidator class without a default validator`, async () => {
  const field = new ExtendedDMMFFieldDefaultValidators(
    { ...FIELD_BASE },
    DEFAULT_GENERATOR_CONFIG,
    'Test',
  );

  expect(field).toBeDefined();
  expect(field.zodValidatorString).toBe(undefined);
});

it(`should load a scalar DMMF.field ExtendedDMMFFieldDefaultValidator class with cuid default validator`, async () => {
  const field = new ExtendedDMMFFieldDefaultValidators(
    {
      ...FIELD_BASE,
      default: { name: 'cuid', args: [] },
    },
    DEFAULT_GENERATOR_CONFIG,
    'Test',
  );

  expect(field).toBeDefined();
  expect(field.zodValidatorString).toBe('.cuid()');
});

it(`should load a scalar DMMF.field ExtendedDMMFFieldDefaultValidator class with uuid default validator`, async () => {
  const field = new ExtendedDMMFFieldDefaultValidators(
    {
      ...FIELD_BASE,
      default: { name: 'uuid', args: [] },
    },
    DEFAULT_GENERATOR_CONFIG,
    'Test',
  );

  expect(field).toBeDefined();
  expect(field.zodValidatorString).toBe('.uuid()');
});

it(`should load a scalar DMMF.field ExtendedDMMFFieldDefaultValidator class with Int default validator`, async () => {
  const field = new ExtendedDMMFFieldDefaultValidators(
    {
      ...FIELD_BASE,
      type: 'Int',
    },
    DEFAULT_GENERATOR_CONFIG,
    'Test',
  );

  expect(field).toBeDefined();
  expect(field.zodValidatorString).toBe('.int()');
});

it(`should load a scalar DMMF.field ExtendedDMMFFieldDefaultValidator class with Int default validator`, async () => {
  const field = new ExtendedDMMFFieldDefaultValidators(
    {
      ...FIELD_BASE,
      type: 'Int',
      documentation: '@zod.number.noDefault()',
    },
    DEFAULT_GENERATOR_CONFIG,
    'Test',
  );

  expect(field).toBeDefined();
  expect(field.zodValidatorString).toBeUndefined();
});
