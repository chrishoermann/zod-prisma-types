import { DMMF } from '@prisma/generator-helper';

import { GeneratorConfig } from '.';
import {
  DATE_VALIDATOR_REGEX_MAP,
  NUMBER_VALIDATOR_REGEX_MAP,
  PRISMA_TO_ZOD_TYPE_MAP,
  STRING_VALIDATOR_REGEX_MAP,
  PRISMA_TO_VALIDATOR_TYPE_MAP,
  CUSTOM_VALIDATOR_REGEX_MAP,
  ValidatorMap,
  ZOD_VALID_ERROR_KEYS,
} from '../constants/objectMaps';
import {
  PRISMA_FUNCTION_TYPES_WITH_VALIDATORS,
  VALIDATOR_CUSTOM_ERROR_MESSAGE_REGEX,
  VALIDATOR_CUSTOM_ERROR_REGEX,
  VALIDATOR_CUSTOM_ERROR_SPLIT_KEYS_REGEX,
  VALIDATOR_KEY_REGEX,
  VALIDATOR_TYPE_IS_VALID_REGEX,
  VALIDATOR_TYPE_REGEX,
} from '../constants/regex';
import {
  PrismaScalarType,
  ValidatorFunctionMap,
  ScalarValidatorFunctionOptions,
  ZodValidatorType,
  ZodPrismaScalarType,
  ZodCustomErrorKey,
} from '../types';
import { FormattedNames } from './formattedNames';

/////////////////////////////////////////////////
// TYPES AND INTERFACES
/////////////////////////////////////////////////

export interface GetValidator {
  type: ZodValidatorType;
  pattern: string;
}

export type OmitFieldMode = 'model' | 'input' | 'all' | 'none';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFField extends FormattedNames implements DMMF.Field {
  readonly kind: DMMF.Field['kind'];
  readonly name: DMMF.Field['name'];
  readonly isRequired: DMMF.Field['isRequired'];
  readonly isList: DMMF.Field['isList'];
  readonly isUnique: DMMF.Field['isUnique'];
  readonly isId: DMMF.Field['isId'];
  readonly isReadOnly: DMMF.Field['isReadOnly'];
  readonly type: DMMF.Field['type'];
  readonly dbNames?: DMMF.Field['dbNames'];
  readonly isGenerated: DMMF.Field['isGenerated'];
  readonly isUpdatedAt: DMMF.Field['isUpdatedAt'];
  readonly hasDefaultValue: DMMF.Field['hasDefaultValue'];
  readonly default?: DMMF.Field['default'];
  readonly relationToFields?: DMMF.Field['relationToFields'];
  readonly relationOnDelete?: DMMF.Field['relationOnDelete'];
  readonly relationName?: DMMF.Field['relationName'];
  readonly documentation?: DMMF.Field['documentation'];

  readonly isNullable: boolean;
  readonly isOptionalOnDefaultValue: boolean;
  readonly isJsonType: boolean;
  readonly isBytesType: boolean;
  readonly isDecimalType: boolean;
  readonly modelName: string;
  readonly errorLocation: string;

  private _validatorMap: ValidatorFunctionMap = {
    string: (options) =>
      this._validateRegexInMap(STRING_VALIDATOR_REGEX_MAP, options),
    number: (options) =>
      this._validateRegexInMap(NUMBER_VALIDATOR_REGEX_MAP, options),
    date: (options) =>
      this._validateRegexInMap(DATE_VALIDATOR_REGEX_MAP, options),
    custom: (options) =>
      this._validateRegexInMap(CUSTOM_VALIDATOR_REGEX_MAP, options),
    bigint: () => undefined,
  };

  readonly zodCustomErrors?: string;
  readonly zodValidatorString?: string;
  readonly zodCustomValidatorString?: string;
  readonly zodOmitField: OmitFieldMode = 'none';
  readonly clearedDocumentation?: string;
  readonly zodType: string;

  constructor(
    readonly generatorConfig: GeneratorConfig,
    field: DMMF.Field,
    modelName: string,
  ) {
    super(field.name);

    this.generatorConfig = generatorConfig;

    this.kind = field.kind;
    this.name = field.name;
    this.isRequired = field.isRequired;
    this.isList = field.isList;
    this.isUnique = field.isUnique;
    this.isId = field.isId;
    this.isReadOnly = field.isReadOnly;
    this.type = field.type;
    this.dbNames = field.dbNames;
    this.isGenerated = field.isGenerated;
    this.isUpdatedAt = field.isUpdatedAt;
    this.hasDefaultValue = field.hasDefaultValue;
    this.default = field.default;
    this.relationToFields = field.relationToFields;
    this.relationOnDelete = field.relationOnDelete;
    this.relationName = field.relationName;
    this.documentation = field.documentation;

    this.isNullable = this._setIsNullable();
    this.isOptionalOnDefaultValue = this._setDefaultValueOptional();
    this.isJsonType = this._setIsJsonType();
    this.isBytesType = this._setIsBytesType();
    this.isDecimalType = this._setIsDecimalType();
    this.modelName = modelName;
    this.errorLocation = this._setErrorLocation();

    const validatorData = this._getZodValidatorData();

    this.zodCustomErrors = validatorData?.zodCustomErrors;
    this.zodValidatorString = validatorData?.zodValidatorString;
    this.zodCustomValidatorString = validatorData?.zodCustomValidatorString;
    this.zodOmitField = validatorData?.zodOmitField || 'none';
    this.clearedDocumentation = validatorData?.clearedDocumentation;

    this.zodType = this._setZodType();
  }

  // INITIALIZERS
  // ----------------------------------------------

  private _setDefaultValueOptional() {
    return (
      (this.hasDefaultValue || Boolean(this.isUpdatedAt)) &&
      this.generatorConfig.createOptionalDefaultValuesTypes
    );
  }

  private _setIsJsonType() {
    return this.type === 'Json';
  }

  private _setIsBytesType() {
    return this.type === 'Bytes';
  }

  private _setIsDecimalType() {
    return this.type === 'Decimal';
  }

  private _setIsNullable() {
    return !this.isRequired;
  }

  private _setZodType(): string {
    if (this.kind === 'scalar') return this._getZodTypeFromScalarType();
    return this.type;
  }

  private _getZodTypeFromScalarType(): string {
    return (
      PRISMA_TO_ZOD_TYPE_MAP[this.type as ZodPrismaScalarType] || this.type
    );
  }

  private _setErrorLocation() {
    return `[Error Location]: Model: '${this.modelName}', Field: '${this.name}'.`;
  }

  /////////////////////////////////////////////////
  // EXTRACT VALIDATORS
  /////////////////////////////////////////////////

  /**
   * Extracts the validator pattern from the field's documentation
   * and splits the pattern into the different subpatterns.
   * @returns Object of subpatterns to be set in constructor
   */
  private _getZodValidatorData = () => {
    const matchArrary = this._getValidatorRegexMatch();
    // if a match array is found, the match takes precedence over the default validator
    if (!matchArrary)
      return {
        zodValidatorString: this._getZodDefaultValidator(),
      };

    const type = this._getValidatorType(matchArrary);
    if (!type) return;

    const pattern = this._getValidatorPattern(matchArrary);

    if (!pattern)
      return {
        zodCustomErrors: this._getZodCustomErrors(matchArrary),
      };

    const options: GetValidator = { type, pattern };

    return {
      zodCustomErrors: this._getZodCustomErrors(matchArrary),
      zodValidatorString: this._getZodValidatorString(options),
      zodCustomValidatorString: this._getZodCustomValidatorString(options),
      clearedDocumentation: this._removeValidatorPatternFromDocs(),
      zodOmitField: this._getZodOmitField(options),
    };
  };

  // GET DEFAULT VALIDATOR
  // ----------------------------------------------

  private _getZodDefaultValidator() {
    if (!this.generatorConfig.useDefaultValidators) return;
    if (this._isCuid()) return '.cuid()';
    if (this._isUuid()) return '.uuid()';
    if (this._isInt()) return '.int()';
    return;
  }

  private _isCuid() {
    const defaults = this.default;
    if (this._IsFieldDefault(defaults)) return defaults.name === 'cuid';
    return false;
  }

  private _isUuid() {
    const defaults = this.default;
    if (this._IsFieldDefault(defaults)) return defaults.name === 'uuid';
    return false;
  }

  private _isInt() {
    return this.type === 'Int';
  }

  /**
   * Type guard to check if the field default is a DMMF.FieldDefault.
   * @param value field default value
   * @returns boolean if the value is a field default
   */
  private _IsFieldDefault(
    value?:
      | DMMF.FieldDefault
      | DMMF.FieldDefaultScalar
      | DMMF.FieldDefaultScalar[],
  ): value is DMMF.FieldDefault {
    return (value as DMMF.FieldDefault)?.name !== undefined;
  }

  // MATCH VALIDATOR AGAINST REGEX
  // ----------------------------------------------

  /**
   * Checks if the field's documentation contains a matching validator pattern.
   * @returns The match array from the regex match or undefined if no match.
   */
  private _getValidatorRegexMatch = () => {
    if (!this.documentation) return;
    return this.documentation.match(VALIDATOR_TYPE_REGEX) ?? undefined;
  };

  // EXTRACT VALIDATOR TYPE
  // ----------------------------------------------

  /**
   * Extracts the validator type from the match array. This type is used to
   * further check if the validators are valid for the field's type.
   * @param matchArray match array extracted from the field's documentation
   * @returns type of the validator e.g. "string", "number", "date", as `ZodValidatorType`
   */
  private _getValidatorType(matchArray: RegExpMatchArray) {
    const validatorType = matchArray?.groups?.['type'];

    if (!validatorType?.match(VALIDATOR_TYPE_IS_VALID_REGEX))
      throw new Error(
        `[@zod generator error]: '${validatorType}' is not a valid validator type. ${this.errorLocation}`,
      );

    const isValidTypeForPrisma = PRISMA_TO_VALIDATOR_TYPE_MAP[
      validatorType as ZodValidatorType
    ].includes(this.type as PrismaScalarType);

    if (!isValidTypeForPrisma)
      throw new Error(
        `[@zod generator error]: Validator '${validatorType}' is not valid for type '${this.type}'. ${this.errorLocation}`,
      );

    return validatorType as ZodValidatorType;
  }

  // EXTRACT VALIDATOR PATTERN
  // ----------------------------------------------

  /**
   * Extracts the validator pattern e.g. '.min(2).max(10)' from the match array.
   * @param matchArray match array extracted from the field's documentation
   * @returns returns the validator pattern as a string or undefined if no pattern is found
   */
  private _getValidatorPattern(matchArray: RegExpMatchArray) {
    if (!matchArray) return;
    return matchArray?.groups?.['validatorPattern'];
  }

  // EXTRACT CUSTOM ERROR MESSAGES
  // ----------------------------------------------

  /**
   * Extracts the custom error messages from the match array.
   * @param matchArray match array extracted from the field's documentation
   * @returns returns the custom error messages as a string or undefined if no custom error messages are found
   */
  private _getZodCustomErrors(matchArray: RegExpMatchArray) {
    const customErrors = matchArray?.groups?.['customErrors'];
    if (!customErrors) return;

    const customErrorsString = customErrors.match(VALIDATOR_CUSTOM_ERROR_REGEX);

    // extract the keys of the custom error messages
    const customErrorKeys = customErrorsString?.groups?.['messages']
      .replace(VALIDATOR_CUSTOM_ERROR_MESSAGE_REGEX, '')
      .match(VALIDATOR_CUSTOM_ERROR_SPLIT_KEYS_REGEX);

    // check if the keys are valid
    customErrorKeys?.forEach((key) => {
      if (!ZOD_VALID_ERROR_KEYS.includes(key as ZodCustomErrorKey)) {
        throw new Error(
          `[@zod generator error]: Custom error key '${key}' is not valid. Please check for typos! ${this.errorLocation}`,
        );
      }
    });

    // return the valid custom error messages
    return customErrorsString?.groups?.['object'];
  }

  // GET ZOD CUSTOM VALIDATOR
  // ----------------------------------------------

  /**
   * Extracts the `custom` validator key e.g. `use` or `omit` from the validator pattern.
   * @param pattern validator pattern as string
   * @returns returns the custom validator key as a string or undefined if no custom validator key is found
   * @throws Error if the custom validator key is not `use` or `omit`
   */
  private _getZodCustomValidatorKey({ type, pattern }: GetValidator) {
    if (type !== 'custom' || !pattern) return;
    const key = this._getValidatorKeyFromPattern(pattern);

    if (key !== 'use' && key !== 'omit')
      throw new Error(
        `[@zod generator error]: Please use the '.use()' on '@zod.custom.use(...yourCode)' or the '.omit(["model", "input"])' key. ${this.errorLocation}`,
      );

    return key;
  }

  /**
   * Extract the string provided via the `use` key from the validator pattern.
   * @param pattern validator pattern as string
   * @returns returns the string provided via the `use` key as a string or undefined if no string is found
   */
  private _getZodCustomValidatorString({ type, pattern }: GetValidator) {
    const key = this._getZodCustomValidatorKey({ type, pattern });
    if (key !== 'use') return;
    return this._validatorMap[type]({ pattern, key });
  }

  /**
   * Extract the string provided via the `omit` key from the validator pattern.
   * @param pattern validator pattern as string
   * @returns returns the string provided via the `omit` key as type 'OmitFieldMode' or `all` if no matching string is found
   * @throws Error if the string provided via the `omit` key is not a valid pattern
   * @throws Error if the string provided via the `omit` key is not `model` or `input`
   */
  private _getZodOmitField({ type, pattern }: GetValidator): OmitFieldMode {
    const key = this._getZodCustomValidatorKey({ type, pattern });
    if (key !== 'omit') return 'none';

    const validatedString = this._validatorMap[type]({ pattern, key });

    if (!validatedString)
      throw new Error(
        `[@zod generator error]: Please use the '.omit(["model", "input"])' key. ${this.errorLocation}`,
      );

    // extract the keys from the string
    const omitField = validatedString?.match(/[\w]+/g);

    // check if only valid strings are used
    omitField?.forEach((field) => {
      const isValid = field.match(/model|input/);

      if (!isValid)
        throw new Error(
          `[@zod generator error]: unknown key '${field}' in '.omit()'. only 'model' and 'input' are allowed. ${this.errorLocation}`,
        );
    });

    if (!omitField) return 'none';

    if (omitField.length === 2) return 'all';

    return omitField[0].trim() as OmitFieldMode;
  }

  // GET ZOD TYPE VALIDATORS
  // ----------------------------------------------

  /**
   * Checks if the validator pattern is valid for the field type.
   * @param param0 validator type and pattern
   * @returns the validator pattern as a string
   * @throws Error if the validator pattern is not valid for the field type
   */
  private _getZodValidatorString({ type, pattern }: GetValidator) {
    if (type === 'custom') return;

    // If pattern consists of multiple validators (e.g. .min(1).max(10))
    // the pattern is split into an array for further processing
    // lookahead regex is used to split on '.' followed by any word e.g. '.min'
    const splitPattern = pattern.split(/(?=\.[\w])/);

    // Check if each validator in list is valid for the field type
    splitPattern.forEach((pattern) => {
      const key = this._getValidatorKeyFromPattern(pattern);
      const isValid = this._validatorMap[type]({ pattern, key });

      if (!isValid)
        throw new Error(
          `[@zod generator error]: Validator '${key}' is not valid for type '${this.type}'. ${this.errorLocation}`,
        );
    });

    // If user opts out of default validator, no validator is returned
    if (
      !this.generatorConfig.useDefaultValidators ||
      splitPattern.includes('.noDefault()')
    )
      return;

    return pattern;
  }

  /**
   * Extracts the validator key from the validator pattern.
   * @param pattern validator pattern as string
   * @returns the validator key as a string
   * @throws Error if no matching validator key is found
   */
  private _getValidatorKeyFromPattern(pattern: string) {
    const key = pattern.match(VALIDATOR_KEY_REGEX)?.groups?.['validatorKey'];

    if (!key)
      throw new Error(
        `[@zod generator error]: no matching validator key found in '${pattern}'. ${this.errorLocation}`,
      );

    return key;
  }

  // VALIDATE REGEX IN MAPS
  // ----------------------------------------------

  /**
   * Helper function to validate a regex pattern against a map of regex validators.
   * @param validationMap map of regex validators for each type
   * @param param1 key and pattern of the validator
   * @returns validated pattern as a string
   * @throws Error if the validator key is not valid for the field type
   * @throws Error if the validator pattern is not valid for the field type
   */
  private _validateRegexInMap = <TKeys extends string>(
    validationMap: ValidatorMap<TKeys>,
    { pattern, key }: ScalarValidatorFunctionOptions,
  ): string => {
    const validate = validationMap[key as keyof typeof validationMap];

    if (!validate) {
      throw new Error(
        `[@zod generator error]: Validator '${key}' is not valid for type '${this.type}' or for specified '@zod.[key]'. ${this.errorLocation}`,
      );
    }

    if (typeof validate === 'function') {
      const validPattern = validate(pattern);

      if (!validPattern) {
        throw new Error(
          `[@zod generator error]: Validator '${key}' is not valid for type '${this.type}' or for specified '@zod.[key]'. ${this.errorLocation}`,
        );
      }

      return validPattern;
    }

    const match = pattern.match(validate);

    if (!match) {
      throw new Error(
        `[@zod generator error]: Could not match validator '${key}' with validatorPattern '${pattern}'. Please check for typos! ${this.errorLocation}`,
      );
    }

    return match[0];
  };

  // GET CLEARED DOCUMENTATION
  // ----------------------------------------------

  /**
   * Removes the validator pattern from the documentation.
   * @returns the documentation without the validator pattern
   */
  private _removeValidatorPatternFromDocs() {
    if (!this.documentation) return;
    return (
      this.documentation.replace(VALIDATOR_TYPE_REGEX, '').trim() || undefined
    );
  }

  /**
   * Checks if the field should be omitted in the model schemas.
   */
  omitInModel() {
    return this.zodOmitField === 'model' || this.zodOmitField === 'all';
  }

  /**
   * Checks if the field should be omitted in the inputType schemas.
   * @param inputTypeName name of the input type
   */
  omitInInputTypes(inputTypeName: string) {
    const isInputType = inputTypeName.match(
      PRISMA_FUNCTION_TYPES_WITH_VALIDATORS,
    );

    return (
      isInputType &&
      (this.zodOmitField === 'input' || this.zodOmitField === 'all')
    );
  }

  /**
   * Checks if the field should be omitted in any of the schemas.
   */
  isOmitField() {
    return this.zodOmitField !== 'none';
  }

  isOptionalDefaultField() {
    return this.hasDefaultValue || this.isUpdatedAt;
  }
}
