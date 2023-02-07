import { DMMF } from '@prisma/generator-helper';

import { ExtendedDMMFFieldValidatorCustomErrors } from './extendedDMMFFieldValidatorCustomErrors';
import { ZodValidatorType } from './extendedDMMFFieldValidatorType';
import {
  CUSTOM_VALIDATOR_REGEX_MAP,
  DATE_VALIDATOR_REGEX_MAP,
  NUMBER_VALIDATOR_REGEX_MAP,
  STRING_VALIDATOR_REGEX_MAP,
  ValidatorMap,
} from '../../constants';
import { GeneratorConfig } from '../../schemas';

/////////////////////////////////////////////////
// TYPES
/////////////////////////////////////////////////

export interface ScalarValidatorFnOpts {
  key: string;
  pattern: string;
}

export type ValidatorFn = (opts: ScalarValidatorFnOpts) => string | undefined;

export type ValidatorFunctionMap = Record<ZodValidatorType, ValidatorFn>;

/////////////////////////////////////////////////
// REGEX
/////////////////////////////////////////////////

export const VALIDATOR_KEY_REGEX = /(\.(?<validatorKey>[\w]+))/;

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFFieldValidatorString extends ExtendedDMMFFieldValidatorCustomErrors {
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

  constructor(
    field: DMMF.Field,
    generatorConfig: GeneratorConfig,
    modelName: string,
  ) {
    super(field, generatorConfig, modelName);

    this.zodValidatorString = this._getZodValidatorString();
  }

  // GET VALIDATOR STRING
  // ----------------------------------------------

  private _getZodValidatorString() {
    if (!this.validatorType || this.validatorType === 'custom')
      return this.zodValidatorString;

    return this._validatorIsValid(this.validatorType)
      ? this.validatorPattern
      : this.zodValidatorString;
  }

  // Check if validator is valid for type by comparing the validator pattern
  // with a regex stored in a regex map

  private _validatorIsValid(type: ZodValidatorType) {
    return Boolean(
      this.validatorList?.every((pattern) => {
        const key = this._getValidatorKeyFromPattern(pattern);
        if (this._validatorMap[type]({ pattern, key })) return true;

        throw new Error(
          `[@zod generator error]: Validator '${key}' is not valid for type '${this.type}'. ${this.errorLocation}`,
        );
      }),
    );
  }

  private _getValidatorKeyFromPattern(pattern: string) {
    const key = pattern.match(VALIDATOR_KEY_REGEX)?.groups?.['validatorKey'];

    if (!key)
      throw new Error(
        `[@zod generator error]: no matching validator key found in '${pattern}'. ${this.errorLocation}`,
      );

    return key;
  }

  //  VALIDATE REGEX IN MAP
  // ----------------------------------------------

  private _validateRegexInMap = <TKeys extends string>(
    validationMap: ValidatorMap<TKeys>,
    { pattern, key }: ScalarValidatorFnOpts,
  ): string => {
    const validate = validationMap[key as keyof ValidatorMap<TKeys>];

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
}
