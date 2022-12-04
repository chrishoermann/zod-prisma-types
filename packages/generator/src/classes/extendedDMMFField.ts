import { DMMF } from '@prisma/generator-helper';

import {
  // CUSTOM_ERROR_MAP,
  DATE_VALIDATOR_REGEX_MAP,
  NUMBER_VALIDATOR_REGEX_MAP,
  PRISMA_TO_ZOD_TYPE_MAP,
  STRING_VALIDATOR_REGEX_MAP,
  PRISMA_TO_VALIDATOR_TYPE_MAP,
  CUSTOM_VALIDATOR_REGEX_MAP,
  ValidatorMap,
} from '../constants/objectMaps';
import {
  SPLIT_VALIDATOR_PATTERN_REGEX,
  VALIDATOR_CUSTOM_ERROR_KEYS_REGEX,
  VALIDATOR_CUSTOM_ERROR_REGEX,
  VALIDATOR_KEY_REGEX,
  VALIDATOR_TYPE_REGEX,
} from '../constants/regex';
import {
  PrismaScalarType,
  ValidatorFunctionMap,
  ScalarValidatorFunctionOptions,
  ZodValidatorType,
  ZodPrismaScalarType,
} from '../types';
import { FormattedNames } from './formattedNames';

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
  readonly hasDefaultValue: DMMF.Field['hasDefaultValue'];
  readonly default?: DMMF.Field['default'];
  readonly relationToFields?: DMMF.Field['relationToFields'];
  readonly relationOnDelete?: DMMF.Field['relationOnDelete'];
  readonly relationName?: DMMF.Field['relationName'];
  readonly documentation?: DMMF.Field['documentation'];

  readonly isNullable: boolean;
  readonly isJsonType: boolean;
  readonly isBytesType: boolean;
  readonly isDecimalType: boolean;
  readonly modelName: string;

  private _zodValidatorRegexMatch?: RegExpMatchArray;
  private _zodValidatorPattern?: string;
  private _zodValidatorType?: ZodValidatorType;
  private _validatorMap: ValidatorFunctionMap = {
    string: (options) =>
      this._validateRegexInMap(STRING_VALIDATOR_REGEX_MAP, options),
    number: (options) =>
      this._validateRegexInMap(NUMBER_VALIDATOR_REGEX_MAP, options),
    date: (options) =>
      this._validateRegexInMap(DATE_VALIDATOR_REGEX_MAP, options),
    custom: (options) =>
      this._validateRegexInMap(CUSTOM_VALIDATOR_REGEX_MAP, options),
  };

  readonly clearedDocumentation?: string;
  readonly zodValidatorString?: string;
  readonly zodCustomErrors?: string;
  readonly zodCustomValidatorString?: string;
  readonly zodType: string;
  /**
   * @deprecated check for `zodCustomValidatorString` instead
   */
  readonly isZodCustomField: boolean;

  constructor(field: DMMF.Field, modelName: string) {
    super(field.name);

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
    this.hasDefaultValue = field.hasDefaultValue;
    this.default = field.default;
    this.relationToFields = field.relationToFields;
    this.relationOnDelete = field.relationOnDelete;
    this.relationName = field.relationName;
    this.documentation = field.documentation;

    this.isJsonType = this._setIsJsonType();
    this.isBytesType = this._setIsBytesType();
    this.isDecimalType = this._setIsDecimalType();

    this.isNullable = this._setIsNullable();
    this.modelName = modelName;

    this._zodValidatorRegexMatch = this._setZodValidatorRegexMatch();
    this._zodValidatorType = this._setZodValidatorType();
    this._zodValidatorPattern = this._setZodValidatorPattern();

    this.clearedDocumentation = this._setClearedDocumentation();
    this.zodType = this._setZodType();
    this.zodCustomErrors = this._setZodCustomErrors();
    this.zodValidatorString = this._setZodValidatorString();
    this.zodCustomValidatorString = this._setZodCustomValidatorString();

    this.isZodCustomField = this._setIsZodCustomField();
  }

  // INITIALIZERS
  // ----------------------------------------------

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

  private _setIsZodCustomField() {
    return this._zodValidatorType === 'custom';
  }

  private _getZodTypeFromScalarType(): string {
    return (
      PRISMA_TO_ZOD_TYPE_MAP[this.type as ZodPrismaScalarType] || this.type
    );
  }

  /**
   * Checks if the field has a validator in the documentation and returns the match array
   * @returns match array of validator regex
   */
  private _setZodValidatorRegexMatch() {
    if (!this.documentation) return;
    return this.documentation.match(VALIDATOR_TYPE_REGEX) ?? undefined;
  }

  /**
   * Extracts the pattern containing the validators from the regex match array
   * @returns the string that contains the validator information
   */
  private _setZodValidatorPattern() {
    if (!this._zodValidatorRegexMatch) return;
    return this._zodValidatorRegexMatch?.groups?.['validatorPattern'];
  }

  /**
   * Checkst if a matching type field is present in the validator regex match array and returns the type
   * @returns the zod validator type
   */
  private _setZodValidatorType() {
    const validatorType = this._zodValidatorRegexMatch?.groups?.['type'];

    if (!validatorType) return;

    if (!this._isZodValidatorType(validatorType))
      throw new Error(
        `[@zod validator error]: Validator '${validatorType}' is not valid for type '${this.type}' @${this.modelName}.${this.name}`,
      );

    return validatorType as ZodValidatorType;
  }

  /**
   * Checks if the validator type in the documentation is valid for the prisma field Type
   * @example 'string' is valid for 'String' but 'number' is not valid for 'String'
   * @param validatorType string that could be a zod validator type
   * @returns true if validatorType is a zod validator type
   */
  private _isZodValidatorType(validatorType: string) {
    return PRISMA_TO_VALIDATOR_TYPE_MAP[
      validatorType as ZodValidatorType
    ].includes(this.type as PrismaScalarType);
  }

  /**
   * After extracting possible validators from the documentation,
   * this function removes them from the docuemtation.
   * @returns the cleared documentation string
   */
  private _setClearedDocumentation() {
    if (!this.documentation) return;
    return this.documentation.replace(VALIDATOR_TYPE_REGEX, '');
  }

  /**
   * Filters out all invalid custom error keys from the matched regex
   * @example invalid_type_error: "some error" // -> is valid key
   * @example some_error_key: "some error" // -> is invalid key -gets filterd out
   * @returns valid error messages string for zod
   */
  private _setZodCustomErrors() {
    const customErrors = this._zodValidatorRegexMatch?.groups?.['customErrors'];
    if (!customErrors) return;

    const customErrorsString = customErrors.match(VALIDATOR_CUSTOM_ERROR_REGEX);

    const validErrorMessages = customErrorsString?.groups?.['object'].match(
      VALIDATOR_CUSTOM_ERROR_KEYS_REGEX,
    );

    if (!validErrorMessages) return;

    return `{ ${validErrorMessages.join(', ')} }`;
  }

  /**
   * Checks if a the validator has a `key` field and returns the key
   * @param pattern validator pattern extracted from the documentation
   * @returns validator key found in the pattern
   */
  private _getValidatorKeyFromPattern(pattern = this._zodValidatorPattern) {
    const key = pattern?.match(VALIDATOR_KEY_REGEX)?.groups?.['validatorKey'];

    if (!key)
      throw new Error(
        `[@zod validator error]: no matching validator key found in field: ${this.modelName}.${this.name}`,
      );

    return key;
  }

  /**
   * If the field has a `custom` validator in the documentation,
   * this function returns the custom validator string
   * @returns the zod custom validator string
   */
  private _setZodCustomValidatorString() {
    if (
      !this._zodValidatorType ||
      !this._zodValidatorPattern ||
      this._zodValidatorType !== 'custom'
    )
      return;

    return this._validatorMap[this._zodValidatorType]({
      pattern: this._zodValidatorPattern,
      key: this._getValidatorKeyFromPattern(),
    });
  }

  /**
   * Checks if the validator type in the documentation is valid for the prisma field type
   * and thrwos an error if not
   * @returns zod validator string for the field
   */
  private _setZodValidatorString() {
    if (
      !this._zodValidatorType ||
      !this._zodValidatorPattern ||
      this._zodValidatorType === 'custom'
    )
      return;

    // If pattern consists of multiple validators (e.g. .min(1).max(10))
    // the pattern is split into an array for further processing
    const validatorList = this._zodValidatorPattern?.match(
      SPLIT_VALIDATOR_PATTERN_REGEX,
    );

    if (!validatorList) {
      throw new Error(
        `[@zod validator error]: no validators found in pattern: ${this._zodValidatorPattern} in field ${this.modelName}.${this.name}`,
      );
    }

    // Check if each validator in list is valid for the field type
    validatorList.forEach((pattern) => {
      const key = this._getValidatorKeyFromPattern(pattern);

      if (!this._zodValidatorType)
        throw new Error(
          `[@zod validator error]: No validator type set in class 'ExtendedDMMFField' of: ${this.modelName}.${this.name}`,
        );

      return this._validatorMap[this._zodValidatorType]({ pattern, key });
    });

    return this._zodValidatorPattern;
  }

  private _validateRegexInMap = <TKeys extends string>(
    validationMap: ValidatorMap<TKeys>,
    { pattern, key }: ScalarValidatorFunctionOptions,
  ): string => {
    const validate = validationMap[key as keyof typeof validationMap];

    if (!validate) {
      throw new Error(
        `[@zod validator error]: Could not find regex for validator '${key}' in regexMap @${this.modelName}.${this.name}`,
      );
    }

    if (typeof validate === 'function') {
      const validPattern = validate(pattern);

      if (!validPattern) {
        throw new Error(
          `[@zod validator error]: Validator '${key}' is not valid for type '${this.type}' @${this.modelName}.${this.name}`,
        );
      }

      return validPattern;
    }

    const match = pattern.match(validate);

    if (!match) {
      throw new Error(
        `[@zod validator error]: Could not match validator '${key}' with validatorPattern ${pattern} @${this.modelName}.${this.name}`,
      );
    }

    return match[0];
  };
}
