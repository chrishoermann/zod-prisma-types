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

export const VALIDATOR_CUSTOM_ERROR_SPLIT_KEYS_REGEX =
  /([a-zA-Z_][a-zA-Z0-9_]*)(?=\s*:)/gu;

/////////////////////////////////////////////////
// CONSTANTS
/////////////////////////////////////////////////

export const ZOD_VALID_ERROR_KEYS: ZodCustomErrorKey[] = [
  'invalid_type_error', // deprecated in zod v4
  'required_error', // deprecated in zod v4
  'error', // new in zod v4
  'description', // new in zod v4
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

  // Extract only the top-level keys by looking for patterns like "key: value"
  // This regex looks for word characters followed by optional whitespace and a colon
  const customErrorKeysArray =
    messages
      .match(VALIDATOR_CUSTOM_ERROR_SPLIT_KEYS_REGEX)
      ?.map((key) => key.replace(/\s*:$/, '')) || [];

  const isValid = customErrorKeysArray?.every((key) => {
    if (ZOD_VALID_ERROR_KEYS?.includes(key as ZodCustomErrorKey)) return true;

    throw new Error(
      `[@zod generator error]: Custom error key '${key}' is not valid. Please check for typos! ${errorLocation}`,
    );
  });

  return isValid ? object : undefined;
};
