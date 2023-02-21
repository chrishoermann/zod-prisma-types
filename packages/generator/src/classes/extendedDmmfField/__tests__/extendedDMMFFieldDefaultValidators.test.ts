import { DMMF } from '@prisma/generator-helper';
import { it, expect, describe } from 'vitest';

import { DEFAULT_GENERATOR_CONFIG, FIELD_BASE } from './setup';
import { ExtendedDMMFFieldDefaultValidators } from '../extendedDMMFFieldDefaultValidators';

const getField = (field?: Partial<DMMF.Field>) =>
  new ExtendedDMMFFieldDefaultValidators(
    { ...FIELD_BASE, ...field },
    DEFAULT_GENERATOR_CONFIG,
    'ModelName',
  );

describe(`ExtendedDMMFFieldDefaultValidators`, () => {
  it(`should load a class without a default validator`, async () => {
    const field = getField();
    expect(field.zodValidatorString).toBe(undefined);
  });

  it(`should load a class with cuid default validator`, async () => {
    const field = getField({ default: { name: 'cuid', args: [] } });
    expect(field.zodValidatorString).toBe('.cuid()');
  });

  it(`should load a class with uuid default validator`, async () => {
    const field = getField({ default: { name: 'uuid', args: [] } });
    expect(field.zodValidatorString).toBe('.uuid()');
  });

  it(`should load a class with Int default validator`, async () => {
    const field = getField({ type: 'Int' });
    expect(field.zodValidatorString).toBe('.int()');
  });

  it(`should load a class with Int default validator and "noDefault()" annotation`, async () => {
    const field = getField({
      type: 'Int',
      documentation: '@zod.number.noDefault()',
    });
    expect(field.zodValidatorString).toBeUndefined();
  });
});
