import {
  KeyValueMap,
  ZodStringValidatorKeys,
  ZodNumberValidatorKeys,
  ZodDateValidatorKeys,
} from 'src/types';

/////////////////////////////////////////////
// REGEX
/////////////////////////////////////////////

// VALIDATOR TYPE AND KEY REGEX
// ----------------------------------------

export const VALIDATOR_TYPE_REGEX =
  /@zod\.(?<type>string|number|bigint|date){1}(?<customErrors>\({[\w"': ,%&/()=?$§!,_#@><°^+*~-]+}\))?(?<validatorPattern>.*)?/;

export const SPLIT_VALIDATOR_PATTERN_REGEX =
  /(\.[\w"': ,%&/()=?$§!,_#@><°^+*~{}-]+)/g;

export const VALIDATOR_KEY_REGEX = /(\.(?<validatorKey>[\w]+))/;

export const VALIDATOR_CUSTOM_ERROR_REGEX =
  /(?<opening>\(\{)(?<messages>[\w,": ]+)(?<closing>\}\))/;

// TODO: Refine this regex to match the following:
// - validate the possible error messages "invalid_type_error", "required_error" and "decription"

// STRING
// ----------------------------------------

export const STRING_VALIDATOR_NUMBER_AND_MESSAGE_REGEX =
  /.(?<validator>min|max|length)(?<number>\([\d]+([,][ ]?)?(?<message>[{][ ]?message:[ ]?['"][\w\W]+['"][ ]?[}])?\))/;

export const STRING_VALIDATOR_MESSAGE_REGEX =
  /.(?<validator>email|url|uuid|cuid|trim|datetime)(\((?<message>[{][ ]?message:[ ]?['"][\w\W]+['"][ ]?[}])?\))/;

export const STRING_VALIDATOR_REGEX = /.(regex)(\((?<message>.*)\))/;

export const STRING_VALIDATOR_STRING_AND_MESSAGE_REGEX =
  /.(?<validator>startsWith|endsWith)\((?<string>['"][\w\W]+['"])([,][ ]?)?(?<message>[{][ ]?message:[ ]?['"][\w\W]+['"][ ]?[}])?\)/;

// NUMBER
// ----------------------------------------

export const NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX =
  /.(?<validator>gt|gte|lt|lte|multipleOf)(?<number>\([\d]+([,][ ]?)?(?<message>[{][ ]?message:[ ]?['"][\w\W]+['"][ ]?[}])?\))/;

export const NUMBER_VALIDATOR_MESSAGE_REGEX =
  /.(?<validator>int|positive|nonnegative|negative|nonpositive|finite)(\((?<message>[{][ ]?message:[ ]?['"][\w\W]+['"][ ]?[}])?\))/;

// DATE
// ----------------------------------------

export const DATE_VALIDATOR_NUMBER_AND_MESSAGE_REGEX =
  /.(?<validator>min|max)(\()(?<date>(new Date\((['"\d-]+)?\)))([,][ ]?)?(?<message>[{][ ]?message:[ ]?['"][\w\W]+['"][ ]?[}])?\)/;

/////////////////////////////////////////////
// REGEX MAOS
/////////////////////////////////////////////

export type RegexMap<TKeys extends string> = KeyValueMap<TKeys, RegExp>;

export const STRING_VALIDATOR_REGEX_MAP: RegexMap<ZodStringValidatorKeys> = {
  min: STRING_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
  max: STRING_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
  length: STRING_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
  email: STRING_VALIDATOR_MESSAGE_REGEX,
  url: STRING_VALIDATOR_MESSAGE_REGEX,
  uuid: STRING_VALIDATOR_MESSAGE_REGEX,
  cuid: STRING_VALIDATOR_MESSAGE_REGEX,
  trim: STRING_VALIDATOR_MESSAGE_REGEX,
  datetime: STRING_VALIDATOR_MESSAGE_REGEX,
  regex: STRING_VALIDATOR_REGEX,
  startsWith: STRING_VALIDATOR_STRING_AND_MESSAGE_REGEX,
  endsWith: STRING_VALIDATOR_STRING_AND_MESSAGE_REGEX,
};

export const NUMBER_VALIDATOR_REGEX_MAP: RegexMap<ZodNumberValidatorKeys> = {
  gt: NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
  gte: NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
  lt: NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
  lte: NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
  multipleOf: NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
  int: NUMBER_VALIDATOR_MESSAGE_REGEX,
  positive: NUMBER_VALIDATOR_MESSAGE_REGEX,
  nonpositive: NUMBER_VALIDATOR_MESSAGE_REGEX,
  negative: NUMBER_VALIDATOR_MESSAGE_REGEX,
  nonnegative: NUMBER_VALIDATOR_MESSAGE_REGEX,
  finite: NUMBER_VALIDATOR_MESSAGE_REGEX,
};

export const DATE_VALIDATOR_REGEX_MAP: RegexMap<ZodDateValidatorKeys> = {
  min: DATE_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
  max: DATE_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
};
