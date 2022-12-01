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

// PRISMA FUNCTION TYPES W/ VALIDATORS
// ----------------------------------------

export const PRISMA_FUNCTION_TYPES_WITH_VALIDATORS =
  /CreateInput|CreateMany|UpdateInput|UpdateMany/;
