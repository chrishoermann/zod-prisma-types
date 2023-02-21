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
  it(`should load field with docs and custom validator`, async () => {
    const field = getField({
      documentation: 'some text in docs @zod.custom.omit(["model", "input"])',
    });
    const fieldTwo = getField({
      documentation: 'some text in docs @zod.custom.omit([model, input])',
    });
    const fieldThree = getField({
      documentation: "some text in docs @zod.custom.omit(['model', 'input'])",
    });
    expect(field.zodOmitField).toBe('all');
    expect(fieldTwo.zodOmitField).toBe('all');
    expect(fieldThree.zodOmitField).toBe('all');
  });

  it(`should load field with docs and custom validator`, async () => {
    const field = getField({
      documentation: 'some text in docs @zod.custom.omit(["model"])',
    });
    const fieldTwo = getField({
      documentation: 'some text in docs @zod.custom.omit([model])',
    });
    const fieldThree = getField({
      documentation: "some text in docs @zod.custom.omit(['model'])",
    });
    expect(field.zodOmitField).toBe('model');
    expect(fieldTwo.zodOmitField).toBe('model');
    expect(fieldThree.zodOmitField).toBe('model');
  });

  it(`should load field with docs and custom validator`, async () => {
    const field = getField({
      documentation: 'some text in docs @zod.custom.omit(["input"])',
    });
    const fieldTwo = getField({
      documentation: 'some text in docs @zod.custom.omit([input])',
    });
    const fieldThree = getField({
      documentation: "some text in docs @zod.custom.omit(['input'])",
    });
    expect(field.zodOmitField).toBe('input');
    expect(fieldTwo.zodOmitField).toBe('input');
    expect(fieldThree.zodOmitField).toBe('input');
  });

  it(`should load field with docs and custom validator witout omit`, async () => {
    const field = getField({
      documentation: 'some text in docs @zod.custom.use(z.string())',
    });

    expect(field.zodOmitField).toBe('none');
  });

  it(`should throw an error when wrong option is used`, async () => {
    expect(() =>
      getField({
        documentation: 'some text in docs @zod.custom.omit(["model", "wrong"])',
      }),
    ).toThrowError(
      "[@zod generator error]: unknown key 'wrong' in '.omit()'. only 'model' and 'input' are allowed. [Error Location]: Model: 'ModelName', Field: 'test'.",
    );
  });
});
