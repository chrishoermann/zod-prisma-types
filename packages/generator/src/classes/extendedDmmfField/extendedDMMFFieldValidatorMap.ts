import { ExtendedDMMFFieldValidatorCustomErrors } from './extendedDMMFFieldValidatorCustomErrors';
import { ZodValidatorType } from './extendedDMMFFieldValidatorType';
import {
  ZodBigIntValidatorKeys,
  ZodCustomValidatorKeys,
  ZodDateValidatorKeys,
  ZodNumberValidatorKeys,
  ZodStringValidatorKeys,
} from '../../types';

/////////////////////////////////////////////////
// TYPES
/////////////////////////////////////////////////

export interface ScalarValidatorFnOpts {
  key: string;
  pattern: string;
}

export type ValidatorFn = (opts: ScalarValidatorFnOpts) => boolean;

export type ValidatorFunctionMap = Record<ZodValidatorType, ValidatorFn>;

export type ValidatorMap<TKeys extends string> = Record<TKeys, RegExp>;

/////////////////////////////////////////////////
// REGEX
/////////////////////////////////////////////////

export const VALIDATOR_KEY_REGEX = /(\.(?<validatorKey>[\w]+))/;

// STRING
// ----------------------------------------

export const STRING_VALIDATOR_NUMBER_AND_MESSAGE_REGEX =
  /.(?<validator>min|max|length)(?<number>\([\d]+([,][ ]?)?(?<message>[{][ ]?message:[ ]?['"][\w\W]+['"][ ]?[}])?\))/;

export const STRING_VALIDATOR_MESSAGE_REGEX =
  /(?<validator>email|url|uuid|cuid|trim|datetime|noDefault)(\((?<message>[{][ ]?message:[ ]?['"][\w\W]+['"][ ]?[}])?\))/;

export const STRING_VALIDATOR_REGEX = /.(regex)(\((?<message>.*)\))/;

export const STRING_VALIDATOR_STRING_AND_MESSAGE_REGEX =
  /.(?<validator>startsWith|endsWith)\((?<string>['"][\w\W]+['"])([,][ ]?)?(?<message>[{][ ]?message:[ ]?['"][\w\W]+['"][ ]?[}])?\)/;

// NUMBER
// ----------------------------------------

export const NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX =
  /.(?<validator>gt|gte|lt|lte|multipleOf)(?<number>\([\d]+([,][ ]?)?(?<message>[{][ ]?message:[ ]?['"][\w\W]+['"][ ]?[}])?\))/;

export const NUMBER_VALIDATOR_MESSAGE_REGEX =
  /.(?<validator>int|positive|nonnegative|negative|nonpositive|finite|noDefault)(\((?<message>[{][ ]?message:[ ]?['"][\w\W]+['"][ ]?[}])?\))/;

// DATE
// ----------------------------------------

export const DATE_VALIDATOR_NUMBER_AND_MESSAGE_REGEX =
  /.(?<validator>min|max)(\()(?<date>(new Date\((['"\d-]+)?\)))([,][ ]?)?(?<message>[{][ ]?message:[ ]?['"][\w\W]+['"][ ]?[}])?\)/;

// BIGINT
// ----------------------------------------

export const BIGINT_VALIDATOR_MESSAGE_REGEX =
  /(?<validator>array)(\((?<message>[{][ ]?message:[ ]?['"][\w\W]+['"][ ]?[}])?\))/;

// CUSTOM
// ----------------------------------------

export const CUSTOM_VALIDATOR_MESSAGE_REGEX =
  /(?<validator>use|omit|array)(\()(?<custom>[\w (),.'":+\-*#!§$%&\/{}\[\]=?~><°^]+)\)/;

/////////////////////////////////////////////
// REGEX MAPS
/////////////////////////////////////////////

/**
 * Maps the right regex to the right validator key.
 *
 * Used to determine if a validator key is valid for a `string` type.
 * @example myPrismaField: String ///@zod.string.max(10) -> valid
 * @example myPrismaField: String ///@zod.string.positive() -> invalid throws error during generation
 */
export const STRING_VALIDATOR_REGEX_MAP: ValidatorMap<ZodStringValidatorKeys> =
  {
    min: STRING_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    max: STRING_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    length: STRING_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    email: STRING_VALIDATOR_MESSAGE_REGEX,
    url: STRING_VALIDATOR_MESSAGE_REGEX,
    uuid: STRING_VALIDATOR_MESSAGE_REGEX,
    cuid: STRING_VALIDATOR_MESSAGE_REGEX,
    regex: STRING_VALIDATOR_REGEX,
    startsWith: STRING_VALIDATOR_STRING_AND_MESSAGE_REGEX,
    endsWith: STRING_VALIDATOR_STRING_AND_MESSAGE_REGEX,
    trim: STRING_VALIDATOR_MESSAGE_REGEX,
    datetime: STRING_VALIDATOR_MESSAGE_REGEX,
    noDefault: STRING_VALIDATOR_MESSAGE_REGEX,
  };

/**
 * Maps the right regex to the right validator key.
 *
 * Used to determine if a validator key is valid for a `number` type.
 * @example myPrismaField: Int ///@zod.number.gte(10) -> valid
 * @example myPrismaField: Int ///@zod.number.email() -> invalid throws error during generation
 */
export const NUMBER_VALIDATOR_REGEX_MAP: ValidatorMap<ZodNumberValidatorKeys> =
  {
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
    noDefault: NUMBER_VALIDATOR_MESSAGE_REGEX,
  };

/**
 * Maps the right regex to the right validator key.
 *
 * Used to determine if a validator key is valid for a `date` type.
 * @example myPrismaField: Date ///@zod.date.min(new Date("1900-01-01") -> valid
 * @example myPrismaField: Date ///@zod.date.email() -> invalid throws error during generation
 */
export const DATE_VALIDATOR_REGEX_MAP: ValidatorMap<ZodDateValidatorKeys> = {
  min: DATE_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
  max: DATE_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
};

/**
 * Maps the right regex to the right validator key.
 * Used to determine if a validator key is valid for a `bigint` type.
 * @example myPrismaField: BigInt ///@zod.bigint.array() -> valid
 * @example myPrismaField: BigInt ///@zod.bigint.email() -> invalid throws error during generation
 */

export const BIGINT_VALIDATOR_REGEX_MAP: ValidatorMap<ZodBigIntValidatorKeys> =
  {
    array: BIGINT_VALIDATOR_MESSAGE_REGEX,
  };

export const CUSTOM_VALIDATOR_REGEX_MAP: ValidatorMap<ZodCustomValidatorKeys> =
  {
    use: CUSTOM_VALIDATOR_MESSAGE_REGEX,
    omit: CUSTOM_VALIDATOR_MESSAGE_REGEX,
    import: CUSTOM_VALIDATOR_MESSAGE_REGEX,
    array: CUSTOM_VALIDATOR_MESSAGE_REGEX,
  };

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFFieldValidatorMap extends ExtendedDMMFFieldValidatorCustomErrors {
  readonly validatorMap: ValidatorFunctionMap = {
    string: (options) =>
      this._validateRegexInMap(STRING_VALIDATOR_REGEX_MAP, options),
    number: (options) =>
      this._validateRegexInMap(NUMBER_VALIDATOR_REGEX_MAP, options),
    date: (options) =>
      this._validateRegexInMap(DATE_VALIDATOR_REGEX_MAP, options),
    custom: (options) =>
      this._validateRegexInMap(CUSTOM_VALIDATOR_REGEX_MAP, options),
    bigint: (options) =>
      this._validateRegexInMap(BIGINT_VALIDATOR_REGEX_MAP, options),
  };

  //  VALIDATE REGEX IN MAP
  // ----------------------------------------------

  private _validateRegexInMap = <TKeys extends string>(
    validationMap: ValidatorMap<TKeys>,
    { pattern, key }: ScalarValidatorFnOpts,
  ): boolean => {
    const validate = validationMap[key as keyof ValidatorMap<TKeys>];

    if (!validate) {
      throw new Error(
        `[@zod generator error]: Validator '${key}' is not valid for type '${this.type}' or for specified '@zod.[key]'. ${this.errorLocation}`,
      );
    }

    const match = validate.test(pattern);

    if (!match) {
      throw new Error(
        `[@zod generator error]: Could not match validator '${key}' with validatorPattern '${pattern}'. Please check for typos! ${this.errorLocation}`,
      );
    }

    return match;
  };
}
