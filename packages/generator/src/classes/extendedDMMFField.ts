import { DMMF } from '@prisma/generator-helper';

import {
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
// TYPES AND INTERFACES
/////////////////////////////////////////////////

export interface GetValidator {
  type: ZodValidatorType;
  pattern?: string;
}

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
  };

  readonly zodCustomErrors?: string;
  readonly zodValidatorString?: string;
  readonly zodCustomValidatorString?: string;
  readonly clearedDocumentation?: string;
  readonly zodType: string;

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
    this.errorLocation = this._setErrorLocation();

    const validatorData = this._getZodValidatorData();

    this.zodCustomErrors = validatorData?.zodCustomErrors;
    this.zodValidatorString = validatorData?.zodValidatorString;
    this.zodCustomValidatorString = validatorData?.zodCustomValidatorString;
    this.clearedDocumentation = validatorData?.clearedDocumentation;

    this.zodType = this._setZodType();
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

  private _getZodValidatorData = () => {
    const matchArrary = this._getValidatorRegexMatch();
    if (!matchArrary) return;

    const type = this._getValidatorType(matchArrary);
    if (!type) return;

    const pattern = this._getValidatorPattern(matchArrary);
    const options: GetValidator = { type, pattern };

    return {
      zodCustomErrors: this._getZodCustomErrors(matchArrary),
      zodValidatorString: this._getZodValidatorString(options),
      zodCustomValidatorString: this._getZodCustomValidatorString(options),
      clearedDocumentation: this._removeValidatorPatternFromDocs(),
    };
  };

  // MATCH VALIDATOR AGAINST REGEX
  // ----------------------------------------------

  private _getValidatorRegexMatch = () => {
    if (!this.documentation) return;
    return this.documentation.match(VALIDATOR_TYPE_REGEX) ?? undefined;
  };

  // EXTRACT VALIDATOR TYPE
  // ----------------------------------------------

  private _getValidatorType(matchArray: RegExpMatchArray) {
    const validatorType = matchArray?.groups?.['type'];
    if (!validatorType) return;

    const isValidType = PRISMA_TO_VALIDATOR_TYPE_MAP[
      validatorType as ZodValidatorType
    ].includes(this.type as PrismaScalarType);

    if (!isValidType)
      throw new Error(
        `[@zod generator error]: Validator '${validatorType}' is not valid for type '${this.type}'. ${this.errorLocation}`,
      );

    return validatorType as ZodValidatorType;
  }

  // EXTRACT VALIDATOR PATTERN
  // ----------------------------------------------

  private _getValidatorPattern(matchArray: RegExpMatchArray) {
    if (!matchArray) return;
    return matchArray?.groups?.['validatorPattern'];
  }

  // EXTRACT CUSTOM ERROR MESSAGES
  // ----------------------------------------------

  private _getZodCustomErrors(matchArray: RegExpMatchArray) {
    const customErrors = matchArray?.groups?.['customErrors'];
    if (!customErrors) return;

    const customErrorsString = customErrors.match(VALIDATOR_CUSTOM_ERROR_REGEX);

    const validErrorMessages = customErrorsString?.groups?.['object'].match(
      VALIDATOR_CUSTOM_ERROR_KEYS_REGEX,
    );

    if (!validErrorMessages) return;

    return `{ ${validErrorMessages.join(', ')} }`;
  }

  // GET ZOD VALIDATOR STRINGS
  // ----------------------------------------------

  private _getZodCustomValidatorString({ type, pattern }: GetValidator) {
    if (type !== 'custom' || !pattern) return;
    const key = this._getValidatorKeyFromPattern(pattern);

    if (key !== 'use')
      throw new Error(
        `[@zod generator error]: Please use the '.use()' key on '@zod.custom.use(...yourCode)'. ${this.errorLocation}`,
      );

    return this._validatorMap[type]({ pattern, key });
  }

  private _getZodValidatorString({ type, pattern }: GetValidator) {
    if (type === 'custom' || !pattern) return;

    // If pattern consists of multiple validators (e.g. .min(1).max(10))
    // the pattern is split into an array for further processing
    const validatorList = pattern?.match(SPLIT_VALIDATOR_PATTERN_REGEX);

    if (!validatorList) {
      throw new Error(
        `[@zod generator error]: no validators found in pattern: ${pattern}. ${this.errorLocation}`,
      );
    }

    // Check if each validator in list is valid for the field type
    validatorList.forEach((pattern) => {
      const key = this._getValidatorKeyFromPattern(pattern);

      if (!type)
        throw new Error(
          `[@zod generator error]: No validator type set in class 'ExtendedDMMFField'. ${this.errorLocation}`,
        );

      return this._validatorMap[type]({ pattern, key });
    });

    return pattern;
  }

  private _getValidatorKeyFromPattern(pattern: string) {
    const key = pattern?.match(VALIDATOR_KEY_REGEX)?.groups?.['validatorKey'];

    if (!key)
      throw new Error(
        `[@zod generator error]: no matching validator key found. ${this.errorLocation}`,
      );

    return key;
  }

  private _validateRegexInMap = <TKeys extends string>(
    validationMap: ValidatorMap<TKeys>,
    { pattern, key }: ScalarValidatorFunctionOptions,
  ): string => {
    const validate = validationMap[key as keyof typeof validationMap];

    if (!validate) {
      throw new Error(
        `[@zod generator error]: Validator '${key}' is not valid for type '${this.type}'. ${this.errorLocation}`,
      );
    }

    if (typeof validate === 'function') {
      const validPattern = validate(pattern);

      if (!validPattern) {
        throw new Error(
          `[@zod generator error]: Validator '${key}' is not valid for type '${this.type}'. ${this.errorLocation}`,
        );
      }

      return validPattern;
    }

    const match = pattern.match(validate);

    if (!match) {
      throw new Error(
        `[@zod generator error]: Could not match validator '${key}' with validatorPattern ${pattern}. Please check for typos! ${this.errorLocation}`,
      );
    }

    return match[0];
  };

  // GET CLEARED DOCUMENTATION
  // ----------------------------------------------

  private _removeValidatorPatternFromDocs() {
    if (!this.documentation) return;
    return this.documentation.replace(VALIDATOR_TYPE_REGEX, '').trim();
  }
}
