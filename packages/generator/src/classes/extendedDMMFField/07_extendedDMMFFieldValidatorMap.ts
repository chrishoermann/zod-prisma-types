import { ExtendedDMMFFieldValidatorCustomErrors } from './06_extendedDMMFFieldValidatorCustomErrors';
import { ZodValidatorType } from './03_extendedDMMFFieldValidatorType';

/////////////////////////////////////////////////
// TYPES
/////////////////////////////////////////////////

export type ZodSharedValidatorKeys = 'array';
export type ZodDescribedValidatorKeys = 'describe';

// these validators are moved to top level in zod v4
// so we create a separate type and object to handle them
export type ZodSharedStringFormatValidators =
  | 'email'
  | 'uuid'
  | 'url'
  | 'httpUrl'
  | 'hostname'
  | 'emoji'
  | 'base64'
  | 'base64url'
  | 'hex'
  | 'jwt'
  | 'nanoid'
  | 'cuid'
  | 'cuid2'
  | 'ulid'
  | 'ipv4'
  | 'ipv6'
  | 'cidrv4'
  | 'cidrv6'
  | 'hash'
  | 'guid';

export type ZodSharedStringFormatValidatorsIso =
  // ISO validators (aliases)
  // Date/Time validators (keeping existing ones)
  | 'date'
  | 'time'
  | 'duration'
  | 'datetime'
  | 'isoDate'
  | 'isoTime'
  | 'isoDatetime'
  | 'isoDuration';

export type ZodStringValidatorKeys =
  | ZodSharedValidatorKeys
  | ZodDescribedValidatorKeys
  | ZodSharedStringFormatValidators
  | ZodSharedStringFormatValidatorsIso
  | 'max'
  | 'min'
  | 'length'
  | 'regex'
  | 'startsWith'
  | 'endsWith'
  | 'includes'

  // transforms
  | 'trim'
  | 'toLowerCase'
  | 'toUpperCase'
  | 'uppercase'
  | 'lowercase'
  | 'normalize'

  // base
  | 'noDefault';

export type ZodNumberValidatorKeys =
  | ZodSharedValidatorKeys
  | ZodDescribedValidatorKeys
  | 'min'
  | 'max'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'int'
  | 'positive'
  | 'nonpositive'
  | 'negative'
  | 'nonnegative'
  | 'multipleOf'
  | 'step'
  | 'finite'
  | 'noDefault'

  // Zod v4 new number validators
  | 'int32';

export type ZodDateValidatorKeys =
  | ZodSharedValidatorKeys
  | ZodDescribedValidatorKeys
  | 'min'
  | 'max';

export type ZodBigIntValidatorKeys =
  | ZodSharedValidatorKeys
  | ZodDescribedValidatorKeys
  | 'gt'
  | 'gte'
  | 'min' // alias for gte
  | 'lt'
  | 'lte'
  | 'max' // alias for lte
  | 'positive'
  | 'nonpositive'
  | 'negative'
  | 'nonnegative'
  | 'multipleOf'
  | 'step'; // alias for multipleOf

export type ZodCustomValidatorKeys = ZodSharedValidatorKeys | 'use' | 'omit';

export type ZodEnumValidatorKeys = ZodSharedValidatorKeys | 'describe';

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
  /.(?<validator>min|max|length)\((?<number>\d+)([,]\s*)?(?<message>\{\s*(?:message|error):\s*['"][^'"]*['"]\s*\})?\)/u;

export const STRING_VALIDATOR_MESSAGE_REGEX =
  /.(?<validator>email|uuid|url|httpUrl|hostname|emoji|base64|base64url|hex|jwt|nanoid|cuid|cuid2|ulid|ipv4|ipv6|cidrv4|cidrv6|hash|guid|date|time|duration|datetime|isoDate|isoTime|isoDatetime|isoDuration|toLowerCase|toUpperCase|trim|uppercase|lowercase|normalize|noDefault)(\((?<message>\{\s*(?:message|error):\s*['"][^'"]*['"]\s*\})?\))/u;

export const STRING_FORMAT_VALIDATOR_MESSAGE_REGEX =
  /.(?<validator>email|uuid|url|httpUrl|hostname|emoji|base64|base64url|hex|jwt|nanoid|cuid|cuid2|ulid|ipv4|ipv6|cidrv4|cidrv6|hash|guid|date|time|duration|datetime|isoDate|isoTime|isoDatetime|isoDuration)(\((?<message>\{\s*(?:message|error):\s*['"][^'"]*['"]\s*\})?\))/u;

export const STRING_FORMAT_VALIDATOR_ISO_MESSAGE_REGEX =
  /.(?<validator>isoDate|isoTime|isoDatetime|isoDuration|date|time|datetime|duration)(\((?<message>\{\s*(?:message|error):\s*['"][^'"]*['"]\s*\})?\))/u;

export const STRING_VALIDATOR_REGEX = /.(regex)(\((?<message>.*)\))/;

export const STRING_VALIDATOR_DESCRIBE_REGEX =
  /.(describe)(\((?<message>.*)\))/;

export const STRING_VALIDATOR_STRING_AND_MESSAGE_REGEX =
  /.(?<validator>startsWith|endsWith|includes)\((?<string>['"][^'"]*['"])([,]\s*)?(?<message>\{\s*(?:message|error):\s*['"][^'"]*['"]\s*\})?\)/u;

export const STRING_VALIDATOR_DATETIME_REGEX =
  /.(?<validator>datetime)(\((?<message>\{\s*message:\s*['"][^'"]*['"])?(?<offset>[,]?\s*offset:\s*(true|false))?(?<local>[,]?\s*local:\s*(true|false))?(?<precision>[,]?\s*precision:\s*\d+)?\s*\}?\))/u;

// NUMBER
// ----------------------------------------
export const NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX =
  /.(?<validator>min|max|gt|gte|lt|lte|multipleOf|step)\((?<number>[-\d.]+)([,]\s*)?(?<message>\{\s*(?:message|error):\s*['"][^'"]*['"]\s*\})?\)/u;

export const NUMBER_VALIDATOR_MESSAGE_REGEX =
  /.(?<validator>int|int32|positive|nonnegative|negative|nonpositive|finite|noDefault)(\((?<message>\{\s*(?:message|error):\s*['"][^'"]*['"]\s*\})?\))/u;

// DATE
// ----------------------------------------
export const DATE_VALIDATOR_NUMBER_AND_MESSAGE_REGEX =
  /.(?<validator>min|max)\((?<date>new Date\([^)]*\))([,]\s*)?(?<message>\{\s*(?:message|error):\s*['"][^'"]*['"]\s*\})?\)/u;

// BIGINT
// ----------------------------------------
export const BIGINT_VALIDATOR_NUMBER_AND_MESSAGE_REGEX =
  /.(?<validator>gt|gte|min|lt|lte|max|multipleOf|step)\((?<number>\w+)([,]\s*)?(?<message>\{\s*(?:message|error):\s*['"][^'"]*['"]\s*\})?\)/u;

export const BIGINT_VALIDATOR_MESSAGE_REGEX =
  /.(?<validator>positive|nonnegative|negative|nonpositive|array)(\((?<message>\{\s*(?:message|error):\s*['"][^'"]*['"]\s*\})?\))/u;

// CUSTOM
// ----------------------------------------
export const CUSTOM_VALIDATOR_MESSAGE_REGEX =
  /.(?<validator>use|array|omit)\((?<pattern>.*)\)/u;

// export const CUSTOM_VALIDATOR_MESSAGE_REGEX =
//   /(?<validator>use|array|omit)(\()(?<pattern>[\w\p{Script=Cyrillic}\p{Script=Latin}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}\p{M}ʼ (),.'"。、:+\-*#!§$%&/{}[\]=?~><°^|]+)\)/u;

export const CUSTOM_OMIT_VALIDATOR_MESSAGE_REGEX =
  /.(?<validator>omit)\((?<pattern>\[[^\]]+\])\)/;

// ARRAY
// ----------------------------------------
export const ARRAY_VALIDATOR_MESSAGE_REGEX =
  /.(?<validator>array)\((?<pattern>.*)\)/u;

/////////////////////////////////////////////
// REGEX MAPS
/////////////////////////////////////////////

/**
 * This is used to validate the string format validators.
 * it is extracted to a separate object in case we need to use it
 * to determine if a validator can be moved to the top level.
 * see: https://zod.dev/v4/changelog?id=zstring-updates
 */
export const STRING_FORMAT_VALIDATOR_REGEX_MAP: ValidatorMap<ZodSharedStringFormatValidators> =
  {
    email: STRING_FORMAT_VALIDATOR_MESSAGE_REGEX,
    uuid: STRING_FORMAT_VALIDATOR_MESSAGE_REGEX,
    url: STRING_FORMAT_VALIDATOR_MESSAGE_REGEX,
    httpUrl: STRING_FORMAT_VALIDATOR_MESSAGE_REGEX,
    hostname: STRING_FORMAT_VALIDATOR_MESSAGE_REGEX,
    emoji: STRING_FORMAT_VALIDATOR_MESSAGE_REGEX,
    base64: STRING_FORMAT_VALIDATOR_MESSAGE_REGEX,
    base64url: STRING_FORMAT_VALIDATOR_MESSAGE_REGEX,
    hex: STRING_FORMAT_VALIDATOR_MESSAGE_REGEX,
    jwt: STRING_FORMAT_VALIDATOR_MESSAGE_REGEX,
    nanoid: STRING_FORMAT_VALIDATOR_MESSAGE_REGEX,
    cuid: STRING_FORMAT_VALIDATOR_MESSAGE_REGEX,
    cuid2: STRING_FORMAT_VALIDATOR_MESSAGE_REGEX,
    ulid: STRING_FORMAT_VALIDATOR_MESSAGE_REGEX,
    ipv4: STRING_FORMAT_VALIDATOR_MESSAGE_REGEX,
    ipv6: STRING_FORMAT_VALIDATOR_MESSAGE_REGEX,
    cidrv4: STRING_FORMAT_VALIDATOR_MESSAGE_REGEX,
    cidrv6: STRING_FORMAT_VALIDATOR_MESSAGE_REGEX,
    hash: STRING_FORMAT_VALIDATOR_MESSAGE_REGEX,
    guid: STRING_FORMAT_VALIDATOR_MESSAGE_REGEX,
  };

export const STRING_FORMAT_VALIDATOR_REGEX_MAP_KEYS = Object.keys(
  STRING_FORMAT_VALIDATOR_REGEX_MAP,
);

/**
 * This is used to validate the string format validators.
 * it is extracted to a separate object to transform the ISO validators to the correct format.
 * see: https://zod.dev/v4/changelog?id=zstring-updates
 */
export const STRING_FORMAT_VALIDATOR_ISO_REGEX_MAP: ValidatorMap<ZodSharedStringFormatValidatorsIso> =
  {
    isoDate: STRING_FORMAT_VALIDATOR_MESSAGE_REGEX,
    isoTime: STRING_FORMAT_VALIDATOR_MESSAGE_REGEX,
    isoDatetime: STRING_FORMAT_VALIDATOR_MESSAGE_REGEX,
    isoDuration: STRING_FORMAT_VALIDATOR_MESSAGE_REGEX,
    date: STRING_FORMAT_VALIDATOR_MESSAGE_REGEX,
    time: STRING_FORMAT_VALIDATOR_MESSAGE_REGEX,
    datetime: STRING_FORMAT_VALIDATOR_MESSAGE_REGEX,
    duration: STRING_FORMAT_VALIDATOR_MESSAGE_REGEX,
  };

export const STRING_FORMAT_VALIDATOR_ISO_REGEX_MAP_KEYS = Object.keys(
  STRING_FORMAT_VALIDATOR_ISO_REGEX_MAP,
);

/**
 * Maps the right regex to the right validator key.
 *
 * Used to determine if a validator key is valid for a `string` type.
 * @example myPrismaField: String ///@zod.string.max(10) -> valid
 * @example myPrismaField: String ///@zod.string.positive() -> invalid throws error during generation
 */
export const STRING_VALIDATOR_REGEX_MAP: ValidatorMap<ZodStringValidatorKeys> =
  {
    // string format validators
    ...STRING_FORMAT_VALIDATOR_REGEX_MAP,
    ...STRING_FORMAT_VALIDATOR_ISO_REGEX_MAP,
    // string validators
    max: STRING_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    min: STRING_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    length: STRING_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    regex: STRING_VALIDATOR_REGEX,
    includes: STRING_VALIDATOR_STRING_AND_MESSAGE_REGEX,
    startsWith: STRING_VALIDATOR_STRING_AND_MESSAGE_REGEX,
    endsWith: STRING_VALIDATOR_STRING_AND_MESSAGE_REGEX,

    // transforms
    trim: STRING_VALIDATOR_MESSAGE_REGEX,
    toLowerCase: STRING_VALIDATOR_MESSAGE_REGEX,
    toUpperCase: STRING_VALIDATOR_MESSAGE_REGEX,
    uppercase: STRING_VALIDATOR_MESSAGE_REGEX,
    lowercase: STRING_VALIDATOR_MESSAGE_REGEX,
    normalize: STRING_VALIDATOR_MESSAGE_REGEX,

    noDefault: STRING_VALIDATOR_MESSAGE_REGEX,

    //shared
    array: ARRAY_VALIDATOR_MESSAGE_REGEX,
    describe: STRING_VALIDATOR_DESCRIBE_REGEX,
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
    min: NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    gte: NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    max: NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    lt: NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    lte: NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    multipleOf: NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    step: NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    int: NUMBER_VALIDATOR_MESSAGE_REGEX,
    positive: NUMBER_VALIDATOR_MESSAGE_REGEX,
    nonpositive: NUMBER_VALIDATOR_MESSAGE_REGEX,
    negative: NUMBER_VALIDATOR_MESSAGE_REGEX,
    nonnegative: NUMBER_VALIDATOR_MESSAGE_REGEX,
    finite: NUMBER_VALIDATOR_MESSAGE_REGEX,
    noDefault: NUMBER_VALIDATOR_MESSAGE_REGEX,

    // Zod v4 new number validators
    int32: NUMBER_VALIDATOR_MESSAGE_REGEX,

    array: ARRAY_VALIDATOR_MESSAGE_REGEX,
    describe: STRING_VALIDATOR_DESCRIBE_REGEX,
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
  array: ARRAY_VALIDATOR_MESSAGE_REGEX,
  describe: STRING_VALIDATOR_DESCRIBE_REGEX,
};

/**
 * Maps the right regex to the right validator key.
 * Used to determine if a validator key is valid for a `bigint` type.
 * @example myPrismaField: BigInt ///@zod.bigint.array() -> valid
 * @example myPrismaField: BigInt ///@zod.bigint.email() -> invalid throws error during generation
 */

export const BIGINT_VALIDATOR_REGEX_MAP: ValidatorMap<ZodBigIntValidatorKeys> =
  {
    gt: BIGINT_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    gte: BIGINT_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    min: BIGINT_VALIDATOR_NUMBER_AND_MESSAGE_REGEX, // alias for gte
    lt: BIGINT_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    lte: BIGINT_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    max: BIGINT_VALIDATOR_NUMBER_AND_MESSAGE_REGEX, // alias for lte
    positive: BIGINT_VALIDATOR_MESSAGE_REGEX,
    nonpositive: BIGINT_VALIDATOR_MESSAGE_REGEX,
    negative: BIGINT_VALIDATOR_MESSAGE_REGEX,
    nonnegative: BIGINT_VALIDATOR_MESSAGE_REGEX,
    multipleOf: BIGINT_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    step: BIGINT_VALIDATOR_NUMBER_AND_MESSAGE_REGEX, // alias for multipleOf
    array: ARRAY_VALIDATOR_MESSAGE_REGEX,
    describe: STRING_VALIDATOR_DESCRIBE_REGEX,
  };

export const CUSTOM_VALIDATOR_REGEX_MAP: ValidatorMap<ZodCustomValidatorKeys> =
  {
    use: CUSTOM_VALIDATOR_MESSAGE_REGEX,
    omit: CUSTOM_OMIT_VALIDATOR_MESSAGE_REGEX,
    array: ARRAY_VALIDATOR_MESSAGE_REGEX,
  };

export const ENUM_VALIDATOR_REGEX_MAP: ValidatorMap<ZodEnumValidatorKeys> = {
  array: ARRAY_VALIDATOR_MESSAGE_REGEX,
  describe: STRING_VALIDATOR_DESCRIBE_REGEX,
};

export const OBJECT_VALIDATOR_REGEX_MAP: ValidatorMap<ZodSharedValidatorKeys> =
  {
    array: ARRAY_VALIDATOR_MESSAGE_REGEX,
  };

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFFieldValidatorMap extends ExtendedDMMFFieldValidatorCustomErrors {
  protected _validatorMap: ValidatorFunctionMap = {
    string: (options) =>
      this._validateRegexInMap(STRING_VALIDATOR_REGEX_MAP, options),
    number: (options) =>
      this._validateRegexInMap(NUMBER_VALIDATOR_REGEX_MAP, options),
    date: (options) =>
      this._validateRegexInMap(DATE_VALIDATOR_REGEX_MAP, options),
    bigint: (options) =>
      this._validateRegexInMap(BIGINT_VALIDATOR_REGEX_MAP, options),
    custom: (options) =>
      this._validateRegexInMap(CUSTOM_VALIDATOR_REGEX_MAP, options),
    enum: (options) =>
      this._validateRegexInMap(ENUM_VALIDATOR_REGEX_MAP, options),
    object: (options) =>
      this._validateRegexInMap(OBJECT_VALIDATOR_REGEX_MAP, options),
  };

  //  VALIDATE REGEX IN MAP
  // ----------------------------------------------

  protected _validateRegexInMap = <TKeys extends string>(
    validationMap: ValidatorMap<TKeys>,
    { pattern, key }: ScalarValidatorFnOpts,
  ) => {
    const validate = validationMap[key as keyof ValidatorMap<TKeys>];

    if (!validate) {
      throw new Error(
        `[@zod generator error]: Validator '${key}' is not valid for type '${this.type}', for specified '@zod.[key] or for 'z.array.[key]'. ${this._errorLocation}`,
      );
    }

    if (validate.test(pattern)) {
      return true;
    }

    throw new Error(
      `[@zod generator error]: Could not match validator '${key}' with validatorPattern '${pattern}'. Please check for typos! ${this._errorLocation}`,
    );
  };

  //  VALIDATE PATTERN IN MAP
  // ----------------------------------------------

  protected _validatePatternInMap(opts: ScalarValidatorFnOpts) {
    if (this._validatorType) {
      return this._validatorMap[this._validatorType](opts);
    }

    throw new Error(
      `[@zod generator error]: Validator '${opts.key}' is not valid for type '${this.type}'. ${this._errorLocation}`,
    );
  }

  //  GET VALIDATOR KEY FROM PATTERN
  // ----------------------------------------------

  protected _getValidatorKeyFromPattern(pattern: string) {
    const key = pattern.match(VALIDATOR_KEY_REGEX)?.groups?.['validatorKey'];

    if (key) {
      return key;
    }

    throw new Error(
      `[@zod generator error]: no matching validator key found in '${pattern}'. ${this._errorLocation}`,
    );
  }

  //  VALIDATOR IS VALID
  // ----------------------------------------------

  protected _validatorIsValid() {
    return Boolean(
      this._validatorList?.every((pattern) =>
        this._validatePatternInMap({
          pattern,
          key: this._getValidatorKeyFromPattern(pattern),
        }),
      ),
    );
  }
}
