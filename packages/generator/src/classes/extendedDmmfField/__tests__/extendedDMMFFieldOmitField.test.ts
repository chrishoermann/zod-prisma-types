import { DMMF } from '@prisma/generator-helper';
import { it, expect, describe } from 'vitest';

import { DEFAULT_GENERATOR_CONFIG, FIELD_BASE } from './setup';
import { ExtendedDMMFFieldOmitField } from '../extendedDMMFFieldOmitField';

const getField = (field?: Partial<DMMF.Field>) =>
  new ExtendedDMMFFieldOmitField(
    { ...FIELD_BASE, ...field },
    DEFAULT_GENERATOR_CONFIG,
    'ModelName',
  );

describe(`ExtendedDMMFFieldOmitField`, () => {
  it(`should load field with docs and array validator on string list`, async () => {
    const field = getField({
      documentation: 'some text in docs @zod.custom.omit(["model", "field"])',
      isList: true,
    });
    expect(field.zodOmitField).toBe('none');
  });

  // it(`should NOT load field with docs and array validator on a single string`, async () => {
  //   expect(() =>
  //     getField({
  //       documentation: 'some text in docs @zod.string.min(4).array(.length(2))',
  //       isList: false,
  //     }),
  //   ).toThrowError(
  //     "[@zod generator error]: '.array' validator is only allowed on lists. [Error Location]: Model: 'ModelName', Field: 'test'",
  //   );
  // });
});
