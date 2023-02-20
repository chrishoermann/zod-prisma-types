import { it, expect, describe } from 'vitest';

import { DEFAULT_GENERATOR_CONFIG, FIELD_BASE } from './setup';
import { ExtendedDMMFFieldValidatorString } from '../extendedDMMFFieldValidatorString';

it(`should load a scalar DMMF.field ExtendedDMMFFieldValidatorString class without docs`, async () => {
  const field = new ExtendedDMMFFieldValidatorString(
    { ...FIELD_BASE },
    DEFAULT_GENERATOR_CONFIG,
    'ModelName',
  );

  expect(field).toBeDefined();
  expect(field?.['_validatorMatch']).toBeUndefined();
  expect(field?.['_validatorType']).toBeUndefined();
  expect(field?.['_validatorCustomError']).toBeUndefined();
  expect(field?.['_validatorPattern']).toBeUndefined();
  expect(field?.zodCustomErrors).toBeUndefined();
});

it(`should load a scalar DMMF.field ExtendedDMMFFieldValidatorString class with docs and validator`, async () => {
  const field = new ExtendedDMMFFieldValidatorString(
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
  expect(field?.['_validatorCustomError']).toBe(
    '({ required_error: "error" })',
  );
  expect(field?.['_validatorPattern']).toBe('.min(2).max(4)');
  expect(field?.zodCustomErrors).toBe('{ required_error: "error" }');
  expect(field?.clearedDocumentation).toBe('some text in docs');
  expect(field.documentation).toBe(
    'some text in docs @zod.string({ required_error: "error" }).min(2).max(4)',
  );
});

it(`should load a scalar DMMF.field ExtendedDMMFFieldValidatorString class with docs and validator on field with default validator`, async () => {
  const field = new ExtendedDMMFFieldValidatorString(
    {
      ...FIELD_BASE,
      type: 'Int',
      documentation:
        'some text in docs @zod.number({ required_error: "error" }).lt(2).gt(4).array(.length(2))',
    },
    DEFAULT_GENERATOR_CONFIG,
    'ModelName',
  );

  expect(field).toBeDefined();
  expect(field?.['_validatorMatch']).toBeDefined();
  expect(field?.['_validatorType']).toBe('number');
  expect(field?.['_validatorCustomError']).toBe(
    '({ required_error: "error" })',
  );
  expect(field?.['_validatorPattern']).toBe('.lt(2).gt(4).array(.length(2))');
  expect(field?.zodCustomErrors).toBe('{ required_error: "error" }');
  expect(field?.zodValidatorString).toBe('.lt(2).gt(4)');
  expect(field?.clearedDocumentation).toBe('some text in docs');
  expect(field.documentation).toBe(
    'some text in docs @zod.number({ required_error: "error" }).lt(2).gt(4).array(.length(2))',
  );
});

it(`should load a scalar DMMF.field ExtendedDMMFFieldValidatorString class with docs and NO validator on field with default validator`, async () => {
  const field = new ExtendedDMMFFieldValidatorString(
    {
      ...FIELD_BASE,
      type: 'Int',
      documentation: 'some text in docs',
    },
    DEFAULT_GENERATOR_CONFIG,
    'ModelName',
  );

  expect(field).toBeDefined();
  expect(field?.['_validatorMatch']).toBeUndefined();
  expect(field?.['_validatorType']).toBeUndefined();
  expect(field?.['_validatorCustomError']).toBeUndefined();
  expect(field?.['_validatorPattern']).toBeUndefined();
  expect(field?.zodCustomErrors).toBeUndefined();
  expect(field?.zodValidatorString).toBe('.int()');
  expect(field?.clearedDocumentation).toBe('some text in docs');
  expect(field.documentation).toBe('some text in docs');
});

/////////////////////////////////////////////
// CUSTOM VALIDATOR STRING
/////////////////////////////////////////////

describe('ExtendedDMMFFieldValidatorString custom validator string', () => {
  it(`should load field with docs and custom validator`, async () => {
    const field = new ExtendedDMMFFieldValidatorString(
      {
        ...FIELD_BASE,
        documentation:
          'some text in docs @zod.custom.use(z.string().min(2).max(4)).array(.length(2))',
      },
      DEFAULT_GENERATOR_CONFIG,
      'ModelName',
    );

    expect(field).toBeDefined();
    expect(field?.['_validatorMatch']).toBeDefined();
    expect(field?.['_validatorType']).toBe('custom');
    expect(field?.['_validatorCustomError']).toBeUndefined();
    expect(field?.['_validatorPattern']).toBe(
      '.use(z.string().min(2).max(4)).array(.length(2))',
    );
    expect(field?.zodCustomErrors).toBeUndefined();
    expect(field?.clearedDocumentation).toBe('some text in docs');
    expect(field.documentation).toBe(
      'some text in docs @zod.custom.use(z.string().min(2).max(4)).array(.length(2))',
    );
    expect(field.zodCustomValidatorString).toBe('z.string().min(2).max(4)');
    expect(field.zodArrayValidatorString).toBe('.length(2)');
  });

  it(`should load field with docs and custom omit validator`, async () => {
    const field = new ExtendedDMMFFieldValidatorString(
      {
        ...FIELD_BASE,
        documentation: 'some text in docs @zod.custom.omit()',
      },
      DEFAULT_GENERATOR_CONFIG,
      'ModelName',
    );

    expect(field).toBeDefined();
    expect(field?.['_validatorMatch']).toBeDefined();
    expect(field?.['_validatorType']).toBe('custom');
    expect(field?.['_validatorCustomError']).toBeUndefined();
    expect(field?.['_validatorPattern']).toBe('.omit()');
    expect(field?.zodCustomErrors).toBeUndefined();
    expect(field?.clearedDocumentation).toBe('some text in docs');
    expect(field.documentation).toBe('some text in docs @zod.custom.omit()');
    expect(field.zodCustomValidatorString).toBeUndefined();
  });

  it(`should load a scalar DMMF.field ExtendedDMMFFieldValidatorString class with docs and invalid validator for type`, async () => {
    expect(
      () =>
        new ExtendedDMMFFieldValidatorString(
          {
            ...FIELD_BASE,
            documentation:
              'some text in docs @zod.custom.use(z.string().min(2).max(4)).array(length(2)).wrong()',
          },
          DEFAULT_GENERATOR_CONFIG,
          'ModelName',
        ),
    ).toThrowError(
      "[@zod generator error]: Validator 'wrong' is not valid for type 'String' or for specified '@zod.[key]'. [Error Location]: Model: 'ModelName', Field: 'test'.",
    );
  });
});
