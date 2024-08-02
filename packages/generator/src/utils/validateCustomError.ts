/////////////////////////////////////////////////
// TYPES
/////////////////////////////////////////////////

export type ZodCustomErrorKey =
  | 'invalid_type_error'
  | 'required_error'
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

export const ZOD_VALID_ERROR_KEYS: ZodCustomErrorKey[] = [
  'invalid_type_error',
  'required_error',
  'description',
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
  const match = customError.match(VALIDATOR_CUSTOM_ERROR_REGEX);
  const messages = match?.groups?.['messages'];
  const object = match?.groups?.['object'];

  if (!messages) return;

  const customErrorKeysArray = messages
    .replace(VALIDATOR_CUSTOM_ERROR_MESSAGE_REGEX, '')
    .match(VALIDATOR_CUSTOM_ERROR_SPLIT_KEYS_REGEX);

  const isValid = customErrorKeysArray?.every((key) => {
    if (ZOD_VALID_ERROR_KEYS?.includes(key as ZodCustomErrorKey)) return true;

    throw new Error(
      `[@zod generator error]: Custom error key '${key}' is not valid. Please check for typos! ${errorLocation}`,
    );
  });

  return isValid ? object : undefined;
};
