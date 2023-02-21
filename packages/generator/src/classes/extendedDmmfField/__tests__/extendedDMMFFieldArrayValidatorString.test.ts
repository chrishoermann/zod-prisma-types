import { DMMF } from '@prisma/generator-helper';
import { it, expect, describe } from 'vitest';

import { DEFAULT_GENERATOR_CONFIG, FIELD_BASE } from './setup';
import { ExtendedDMMFFieldArrayValidatorString } from '../extendedDMMFFieldArrayValidatorString';

const getField = (field?: Partial<DMMF.Field>) =>
  new ExtendedDMMFFieldArrayValidatorString(
    { ...FIELD_BASE, ...field },
    DEFAULT_GENERATOR_CONFIG,
    'ModelName',
  );
describe(`ExtendedDMMFFieldArrayValidatorString`, () => {
  it(`should load field with docs and array validator on string list`, async () => {
    const field = getField({
      documentation: 'some text in docs @zod.string.min(4).array(.length(2))',
      isList: true,
    });
    expect(field.zodArrayValidatorString).toBe('.length(2)');
    expect(field.zodValidatorString).toBe('.min(4)');
  });

  it(`should load field with docs and array validator on Int list`, async () => {
    const field = getField({
      type: 'Int',
      isList: true,
      documentation: 'some text in docs @zod.number.lt(4).array(.length(2))',
    });
    expect(field.zodArrayValidatorString).toBe('.length(2)');
    expect(field.zodValidatorString).toBe('.lt(4)');
  });

  it(`should load field with docs and array validator on custom int list`, async () => {
    const field = getField({
      type: 'Int',
      isList: true,
      documentation:
        'some text in docs @zod.custom.use(z.string.min(4)).array(.length(2))',
    });

    expect(field.zodArrayValidatorString).toBe('.length(2)');
    expect(field.zodCustomValidatorString).toBe('z.string.min(4)');
  });

  it(`should load field with docs and array validator on enum list`, async () => {
    const field = getField({
      type: 'MyEnum',
      kind: 'enum',
      isList: true,
      documentation: 'some text in docs @zod.enum.array(.length(2))',
    });

    expect(field.zodArrayValidatorString).toBe('.length(2)');
  });

  it(`should load field with docs and array validator on object list`, async () => {
    const field = getField({
      type: 'MyType',
      kind: 'object',
      isList: true,
      documentation: 'some text in docs @zod.object.array(.length(2))',
    });

    expect(field.zodArrayValidatorString).toBe('.length(2)');
  });

  it(`should NOT load field with docs and array validator on a single string`, async () => {
    expect(() =>
      getField({
        documentation: 'some text in docs @zod.string.min(4).array(.length(2))',
        isList: false,
      }),
    ).toThrowError(
      "[@zod generator error]: '.array' validator is only allowed on lists. [Error Location]: Model: 'ModelName', Field: 'test'",
    );
  });
});
