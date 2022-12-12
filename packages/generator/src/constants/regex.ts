/* eslint-disable no-useless-escape */
/////////////////////////////////////////////
// REGEX
/////////////////////////////////////////////

// VALIDATOR TYPE AND KEY REGEX
// ----------------------------------------

export const VALIDATOR_TYPE_REGEX =
  /@zod\.(?<type>[\w]+){1}(?<customErrors>\({[\w (),'":+\-*#!§$%&\/{}\[\]=?~><°^]+}\))?(?<validatorPattern>[\w (),.'":+\-*#!§$%&\/{}\[\]=?~><°^]+[)])?/;

// export const VALIDATOR_TYPE_REGEX =
//   /@zod\.(?<type>string|number|bigint|date|custom){1}(?<customErrors>\({[\w (),'":+\-*#!§$%&\/{}\[\]=?~><°^]+}\))?(?<validatorPattern>[\w (),.'":+\-*#!§$%&\/{}\[\]=?~><°^]+[)])?/;

export const VALIDATOR_TYPE_IS_VALID_REGEX = /string|number|bigint|date|custom/;

export const SPLIT_VALIDATOR_PATTERN_REGEX =
  /(?<pattern>\.[\w]+[\(]([\w ,.'":+()\-*#!§$%&\/{}\[\]=?~><°^]+)?[\)])/g;

export const VALIDATOR_KEY_REGEX = /(\.(?<validatorKey>[\w]+))/;

export const VALIDATOR_CUSTOM_ERROR_REGEX =
  /(\()(?<object>\{(?<messages>[\w (),'":+\-*#!§$%&\/{}\[\]=?~><°^]+)\})(\))/;

export const VALIDATOR_CUSTOM_ERROR_REGEX_ALT =
  /(?<opening>\(\{)(?<messages>[\w,": ]+)(?<closing>\}\))/;

export const VALIDATOR_CUSTOM_ERROR_KEYS_REGEX =
  /(?<message>invalid_type_error:[ ]?("|')[\w (),':+\-*#!§$%&\/{}\[\]=?~><°^]+("|')|required_error:[ ]?("|')[\w (),':+\-*#!§$%&\/{}\[\]=?~><°^]+("|')|description:[ ]?("|')[\w (),':+\-*#!§$%&\/{}\[\]=?~><°^]+("|'))/g;

// STRING
// ----------------------------------------

export const STRING_VALIDATOR_NUMBER_AND_MESSAGE_REGEX =
  /.(?<validator>min|max|length)(?<number>\([\d]+([,][ ]?)?(?<message>[{][ ]?message:[ ]?['"][\w\W]+['"][ ]?[}])?\))/;

export const STRING_VALIDATOR_MESSAGE_REGEX =
  /(?<validator>email|url|uuid|cuid|trim|datetime)(\((?<message>[{][ ]?message:[ ]?['"][\w\W]+['"][ ]?[}])?\))/;

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

// DATE
// ----------------------------------------

export const CUSTOM_VALIDATOR_MESSAGE_REGEX =
  /(?<validator>use|omit)(\()(?<custom>[\w (),.'":+\-*#!§$%&\/{}\[\]=?~><°^]+)\)/;

// PRISMA FUNCTION TYPES W/ VALIDATORS
// ----------------------------------------

export const PRISMA_FUNCTION_TYPES_WITH_VALIDATORS =
  /CreateInput|CreateMany|UpdateInput|UpdateMany/;
