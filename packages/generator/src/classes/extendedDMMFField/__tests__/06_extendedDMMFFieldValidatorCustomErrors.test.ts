import { DMMF } from '@prisma/generator-helper';
import { it, expect, describe } from 'vitest';

import { DEFAULT_GENERATOR_CONFIG, FIELD_BASE } from './setup';
import {
  ExtendedDMMFFieldValidatorCustomErrors,
  VALIDATOR_CUSTOM_ERROR_MESSAGE_REGEX,
  VALIDATOR_CUSTOM_ERROR_REGEX,
  VALIDATOR_CUSTOM_ERROR_SPLIT_KEYS_REGEX,
} from '../06_extendedDMMFFieldValidatorCustomErrors';

const getField = (field?: Partial<DMMF.Field>) =>
  new ExtendedDMMFFieldValidatorCustomErrors(
    { ...FIELD_BASE, ...field },
    DEFAULT_GENERATOR_CONFIG,
    'ModelName',
  );

describe(`ExtendedDMMFFieldValidatorCustomErrors`, () => {
  it(`array validator number should return match for regex with japanese chars`, async () => {
    const result = VALIDATOR_CUSTOM_ERROR_REGEX.exec(
      "({ invalid_type_error: 'カタカナ漢字ひらがな', required_error: 'カタカナ漢字ひらがな', description: 'カタカナ漢字ひらがな' })",
    );
    expect(result?.groups?.object).toBe(
      "{ invalid_type_error: 'カタカナ漢字ひらがな', required_error: 'カタカナ漢字ひらがな', description: 'カタカナ漢字ひらがな' }",
    );
    expect(result?.groups?.messages).toBe(
      " invalid_type_error: 'カタカナ漢字ひらがな', required_error: 'カタカナ漢字ひらがな', description: 'カタカナ漢字ひらがな' ",
    );
  });
  it(`array validator number should return match for regex with japanese chars`, async () => {
    const messageArray =
      " invalid_type_error: 'カタカナ漢字ひらがな', required_error: 'カタカナ漢字ひらがな', description: 'カタカナ漢字ひらがな' "
        .replace(VALIDATOR_CUSTOM_ERROR_MESSAGE_REGEX, '')
        .match(VALIDATOR_CUSTOM_ERROR_SPLIT_KEYS_REGEX);

    expect(messageArray).toEqual([
      'invalid_type_error',
      'required_error',
      'description',
    ]);
  });
});

describe(`ExtendedDMMFFieldValidatorCustomErrors`, () => {
  it(`should load a class without docs`, async () => {
    const field = getField();
    expect(field?.['_validatorCustomError']).toBeUndefined();
    expect(field?.zodCustomErrors).toBeUndefined();
  });

  it(`should load a class with valid custom error messages`, async () => {
    const field = getField({
      documentation:
        '@zod.string({ required_error: "error", invalid_type_error: "error" , description: "error"})',
    });
    expect(field?.['_validatorCustomError']).toBe(
      '({ required_error: "error", invalid_type_error: "error" , description: "error"})',
    );
    expect(field?.zodCustomErrors).toBe(
      '{ required_error: "error", invalid_type_error: "error" , description: "error"}',
    );
  });

  it(`should load a class with docs and invalid validator string`, async () => {
    expect(() =>
      getField({
        documentation:
          '@zod.string({ required_error: "error", invalid_type_errrror: "error"})',
      }),
    ).toThrowError(
      "[@zod generator error]: Custom error key 'invalid_type_errrror' is not valid. Please check for typos! [Error Location]: Model: 'ModelName', Field: 'test'.",
    );
  });
});
