import { getConfig } from '../config';

/////////////////////////////////////////////////
// TYPES
/////////////////////////////////////////////////

export type ZodCustomErrorKey =
  | 'invalid_type_error'
  | 'required_error'
  | 'error'
  | 'description';

/////////////////////////////////////////////////
// REGEX
/////////////////////////////////////////////////

export const VALIDATOR_CUSTOM_ERROR_REGEX =
  /(\()(?<object>\{(?<messages>[\w\W\p{Script=Cyrillic}\p{Script=Latin}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}\p{M} ()-.,'ʼ:+\-*#!§$%&/{}[\]=?~><°^|]+)\})(\))/u;

// !!!! non word characters (/W) must not be included in the regex
// since it would break the split into an array !!!!
export const VALIDATOR_CUSTOM_ERROR_MESSAGE_REGEX =
  /[ ]?"[\w\p{Script=Cyrillic}\p{Script=Latin}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}\p{M} ()-.,'ʼ:+\-*#!§$%&/{}[\]=?~><°^|]+"[,]?[ ]?/gu;

export const VALIDATOR_CUSTOM_ERROR_SPLIT_KEYS_REGEX = /[\w]+(?=:)/gu;

/////////////////////////////////////////////////
// CONSTANTS
/////////////////////////////////////////////////

export const ZOD_V4_VALID_ERROR_KEYS: ZodCustomErrorKey[] = ['error'];

export const ZOD_V3_VALID_ERROR_KEYS: ZodCustomErrorKey[] = [
  'invalid_type_error',
  'required_error',
  'description',
];

export const ZOD_VALID_ERROR_KEYS = [
  ...ZOD_V4_VALID_ERROR_KEYS,
  ...ZOD_V3_VALID_ERROR_KEYS,
];

/////////////////////////////////////////////////
// FUNCTIONS
/////////////////////////////////////////////////

/**
 * Validates the custom error string and returns the match object.
 * @param customError
 * @param isInvalidKey callback function to handle invalid keys
 * @returns match object
 */

export const validateCustomError = (
  customError: string,
  errorLocation: string,
) => {
  const { zodVersion } = getConfig();
  const match = customError.match(VALIDATOR_CUSTOM_ERROR_REGEX);
  const messages = match?.groups?.['messages'];
  const object = match?.groups?.['object'];

  if (!messages) return;

  // remove actual error messages and split the keys into an array
  // to check if the keys are valid
  const customErrorKeysArray = messages
    .replace(VALIDATOR_CUSTOM_ERROR_MESSAGE_REGEX, '')
    .match(VALIDATOR_CUSTOM_ERROR_SPLIT_KEYS_REGEX);

  const isValid = customErrorKeysArray?.every((key) => {
    if (zodVersion?.major === 4) {
      if (ZOD_V4_VALID_ERROR_KEYS?.includes(key as ZodCustomErrorKey)) {
        return true;
      }

      if (ZOD_V3_VALID_ERROR_KEYS?.includes(key as ZodCustomErrorKey)) {
        throw new Error(
          `[@zod generator error]: Custom error key '${key}' is not valid for zod v4. Please use error key instead! ${errorLocation}`,
        );
      }
    }

    if (zodVersion?.major === 3) {
      if (ZOD_V3_VALID_ERROR_KEYS?.includes(key as ZodCustomErrorKey)) {
        return true;
      }

      if (ZOD_V4_VALID_ERROR_KEYS?.includes(key as ZodCustomErrorKey)) {
        throw new Error(
          `[@zod generator error]: Custom error key '${key}' is not valid for zod v3. Please upgrade to zod v4! ${errorLocation}`,
        );
      }
    }

    throw new Error(
      `[@zod generator error]: Custom error key '${key}' is not valid. Please check for typos! ${errorLocation}`,
    );
  });

  return isValid ? object : undefined;
};
