import { it, expect, describe } from 'vitest';

import { DEFAULT_GENERATOR_CONFIG, FIELD_BASE } from './setup';
import { ExtendedDMMFFieldValidatorMap } from '../extendedDMMFFieldValidatorMap';

/////////////////////////////////////////////
// TEST VALIDATOR MAP
/////////////////////////////////////////////

describe(`ExtendedDMMFFieldValidatorMap test _validatorMap`, () => {
  const field = new ExtendedDMMFFieldValidatorMap(
    { ...FIELD_BASE },
    DEFAULT_GENERATOR_CONFIG,
    'ModelName',
  );

  // LOAD INSTANCE
  // ----------------------------------------------

  it(`should load an instance`, async () => {
    expect(field).toBeDefined();
    expect(field?.['_validatorMatch']).toBeUndefined();
    expect(field?.['_validatorType']).toBeUndefined();
    expect(field?.['_validatorCustomError']).toBeUndefined();
    expect(field?.['_validatorPattern']).toBeUndefined();
    expect(field?.zodCustomErrors).toBeUndefined();
  });

  // STRING
  // ----------------------------------------------

  it(`should pass valid string data to validator map`, async () => {
    const map = field?.['_validatorMap']['string'];
    expect(
      map({
        key: 'min',
        pattern: '.min(2)',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'max',
        pattern: '.max(2)',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'length',
        pattern: '.length(2)',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'email',
        pattern: '.email()',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'url',
        pattern: '.url()',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'uuid',
        pattern: '.uuid()',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'cuid',
        pattern: '.cuid()',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'startsWith',
        pattern: '.startsWith("some")',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'startsWith',
        pattern: '.startsWith("some")',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'trim',
        pattern: '.trim()',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'datetime',
        pattern: '.datetime()',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'noDefault',
        pattern: '.noDefault()',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'array',
        pattern: '.array(.length(2))',
      }),
    ).toBe(true);
  });

  it(`should pass valid string with message data to validator map`, async () => {
    const map = field?.['_validatorMap']['string'];
    expect(
      map({
        key: 'min',
        pattern: '.min(2, { message: "someMessage" })',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'max',
        pattern: '.max(2, { message: "someMessage" })',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'length',
        pattern: '.length(2, { message: "someMessage" })',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'email',
        pattern: '.email({ message: "someMessage" })',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'url',
        pattern: '.url({ message: "someMessage" })',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'uuid',
        pattern: '.uuid({ message: "someMessage" })',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'cuid',
        pattern: '.cuid({ message: "someMessage" })',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'startsWith',
        pattern: '.startsWith("some", { message: "someMessage" })',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'startsWith',
        pattern: '.startsWith("some", { message: "someMessage" })',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'trim',
        pattern: '.trim({ message: "someMessage" })',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'datetime',
        pattern: '.datetime({ message: "someMessage" })',
      }),
    ).toBe(true);
    expect(map({ key: 'noDefault', pattern: '.noDefault()' })).toBe(true);
    expect(map({ key: 'array', pattern: '.array(.length(2))' })).toBe(true);
  });

  it(`should pass ivalid data to to validator map`, async () => {
    const map = field?.['_validatorMap']['string'];

    expect(() =>
      map({
        key: 'array',
        pattern: '.length(2)',
      }),
    ).toThrowError(
      "[@zod generator error]: Could not match validator 'array' with validatorPattern '.length(2)'. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
    );
  });

  it(`should pass ivalid key to to validator map`, async () => {
    const map = field?.['_validatorMap']['string'];

    expect(() =>
      map({
        key: 'wrong',
        pattern: '.length(2)',
      }),
    ).toThrowError(
      "[@zod generator error]: Validator 'wrong' is not valid for type 'String' or for specified '@zod.[key]'. [Error Location]: Model: 'ModelName', Field: 'test'.",
    );
  });

  // NUMBER
  // ----------------------------------------------

  it(`should pass valid number data to validator map`, async () => {
    const map = field?.['_validatorMap']['number'];
    expect(
      map({
        key: 'gt',
        pattern: '.gt(2)',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'gte',
        pattern: '.gte(2)',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'lt',
        pattern: '.lt(2)',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'lte',
        pattern: '.lte(2)',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'multipleOf',
        pattern: '.multipleOf(2)',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'int',
        pattern: '.int()',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'positive',
        pattern: '.positive()',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'nonpositive',
        pattern: '.nonpositive()',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'negative',
        pattern: '.negative()',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'nonnegative',
        pattern: '.nonnegative()',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'finite',
        pattern: '.finite()',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'noDefault',
        pattern: '.noDefault()',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'array',
        pattern: '.array(.length(2))',
      }),
    ).toBe(true);
  });

  it(`should pass valid number with message data to validator map`, async () => {
    const map = field?.['_validatorMap']['number'];
    expect(
      map({
        key: 'gt',
        pattern: '.gt(2, { message: "someMessage" })',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'gte',
        pattern: '.gte(2, { message: "someMessage" })',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'lt',
        pattern: '.lt(2, { message: "someMessage" })',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'lte',
        pattern: '.lte(2, { message: "someMessage" })',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'multipleOf',
        pattern: '.multipleOf(2, { message: "someMessage" })',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'int',
        pattern: '.int({ message: "someMessage" })',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'positive',
        pattern: '.positive({ message: "someMessage" })',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'nonpositive',
        pattern: '.nonpositive({ message: "someMessage" })',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'negative',
        pattern: '.negative({ message: "someMessage" })',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'nonnegative',
        pattern: '.nonnegative({ message: "someMessage" })',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'finite',
        pattern: '.finite({ message: "someMessage" })',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'noDefault',
        pattern: '.noDefault({ message: "someMessage" })',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'array',
        pattern: '.array(.length(2))',
      }),
    ).toBe(true);
  });

  it(`should pass ivalid data to to validator map`, async () => {
    const map = field?.['_validatorMap']['number'];

    expect(() =>
      map({
        key: 'array',
        pattern: '.length(2)',
      }),
    ).toThrowError(
      "[@zod generator error]: Could not match validator 'array' with validatorPattern '.length(2)'. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
    );
  });

  it(`should pass ivalid key to to validator map`, async () => {
    const map = field?.['_validatorMap']['number'];

    expect(() =>
      map({
        key: 'wrong',
        pattern: '.length(2)',
      }),
    ).toThrowError(
      "[@zod generator error]: Validator 'wrong' is not valid for type 'String' or for specified '@zod.[key]'. [Error Location]: Model: 'ModelName', Field: 'test'.",
    );
  });

  // DATE
  // ----------------------------------------------

  it(`should pass valid date data to validator map`, async () => {
    const map = field?.['_validatorMap']['date'];
    expect(
      map({
        key: 'min',
        pattern: '.min(new Date(01-01-2022))',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'max',
        pattern: '.max(new Date(Date.now()))',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'array',
        pattern: '.array(.length(2))',
      }),
    ).toBe(true);
  });

  it(`should pass valid date with message data to validator map`, async () => {
    const map = field?.['_validatorMap']['date'];
    expect(
      map({
        key: 'min',
        pattern: '.min(new Date(01-01-2022), { message: "someMessage" })',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'max',
        pattern: '.max(new Date(Date.now(), { message: "someMessage" }))',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'array',
        pattern: '.array(.length(2))',
      }),
    ).toBe(true);
  });

  it(`should pass ivalid data to to validator map`, async () => {
    const map = field?.['_validatorMap']['date'];

    expect(() =>
      map({
        key: 'array',
        pattern: '.length(2)',
      }),
    ).toThrowError(
      "[@zod generator error]: Could not match validator 'array' with validatorPattern '.length(2)'. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
    );
  });

  it(`should pass ivalid key to to validator map`, async () => {
    const map = field?.['_validatorMap']['date'];

    expect(() =>
      map({
        key: 'wrong',
        pattern: '.length(2)',
      }),
    ).toThrowError(
      "[@zod generator error]: Validator 'wrong' is not valid for type 'String' or for specified '@zod.[key]'. [Error Location]: Model: 'ModelName', Field: 'test'.",
    );
  });

  // BIGINT
  // ----------------------------------------------

  it(`should pass valid bigint data to validator map`, async () => {
    const map = field?.['_validatorMap']['bigint'];
    expect(
      map({
        key: 'array',
        pattern: '.array(.length(2))',
      }),
    ).toBe(true);
  });

  it(`should pass ivalid data to to validator map`, async () => {
    const map = field?.['_validatorMap']['bigint'];

    expect(() =>
      map({
        key: 'array',
        pattern: '.length(2)',
      }),
    ).toThrowError(
      "[@zod generator error]: Could not match validator 'array' with validatorPattern '.length(2)'. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
    );
  });

  it(`should pass ivalid key to to validator map`, async () => {
    const map = field?.['_validatorMap']['bigint'];

    expect(() =>
      map({
        key: 'wrong',
        pattern: '.length(2)',
      }),
    ).toThrowError(
      "[@zod generator error]: Validator 'wrong' is not valid for type 'String' or for specified '@zod.[key]'. [Error Location]: Model: 'ModelName', Field: 'test'.",
    );
  });

  // CUSTOM
  // ----------------------------------------------

  it(`should pass valid custom data to validator map`, async () => {
    const map = field?.['_validatorMap']['custom'];

    expect(
      map({
        key: 'use',
        pattern: '.use(some content)',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'omit',
        pattern: '.omit()',
      }),
    ).toBe(true);
    expect(
      map({
        key: 'array',
        pattern: '.array(.length(2))',
      }),
    ).toBe(true);
  });

  it(`should pass ivalid data to to validator map`, async () => {
    const map = field?.['_validatorMap']['custom'];

    expect(() =>
      map({
        key: 'array',
        pattern: '.length(2)',
      }),
    ).toThrowError(
      "[@zod generator error]: Could not match validator 'array' with validatorPattern '.length(2)'. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
    );
  });

  it(`should pass ivalid key to to validator map`, async () => {
    const map = field?.['_validatorMap']['custom'];

    expect(() =>
      map({
        key: 'wrong',
        pattern: '.length(2)',
      }),
    ).toThrowError(
      "[@zod generator error]: Validator 'wrong' is not valid for type 'String' or for specified '@zod.[key]'. [Error Location]: Model: 'ModelName', Field: 'test'.",
    );
  });
});
