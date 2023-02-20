import { DMMF } from '@prisma/generator-helper';

import {
  ARRAY_VALIDATOR_MESSAGE_REGEX,
  CUSTOM_VALIDATOR_MESSAGE_REGEX,
  ExtendedDMMFFieldValidatorMap,
} from './extendedDMMFFieldValidatorMap';
import { ZodValidatorType } from './extendedDMMFFieldValidatorType';
import { GeneratorConfig } from '../../schemas';

/////////////////////////////////////////////////
// TYPES
/////////////////////////////////////////////////

export type OmitFieldMode = 'model' | 'input' | 'all' | 'none';

/////////////////////////////////////////////////
// REGEX
/////////////////////////////////////////////////

export const VALIDATOR_KEY_REGEX = /(\.(?<validatorKey>[\w]+))/;

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFFieldValidatorString extends ExtendedDMMFFieldValidatorMap {
  readonly zodCustomValidatorString?: string;
  readonly zodArrayValidatorString?: string;
  readonly zodOmitField: OmitFieldMode = 'none';

  constructor(
    field: DMMF.Field,
    generatorConfig: GeneratorConfig,
    modelName: string,
  ) {
    super(field, generatorConfig, modelName);

    this.zodValidatorString = this._getZodValidatorString();
    this.zodCustomValidatorString = this._getZodCustomValidatorString();
    this.zodArrayValidatorString = this._getZodArrayValidatorString();
  }

  // GET VALIDATOR STRING
  // ----------------------------------------------

  private _getZodValidatorString() {
    if (!this._validatorType || this._validatorType === 'custom')
      return this.zodValidatorString;

    return this._validatorIsValid(this._validatorType)
      ? this._getZodValidatorStringWithoutArray()
      : this.zodValidatorString;
  }

  // GET CUSTOM VALIDATOR STRING
  // ----------------------------------------------

  private _getZodCustomValidatorString() {
    if (!this._validatorType || this._validatorType !== 'custom')
      return this.zodCustomValidatorString;

    return this._validatorIsValid(this._validatorType)
      ? this._extractUsePattern()
      : this.zodCustomValidatorString;
  }

  private _extractUsePattern() {
    return this._getZodValidatorListWithoutArray()
      ?.find((pattern) => pattern.includes('.use'))
      ?.match(CUSTOM_VALIDATOR_MESSAGE_REGEX)?.groups?.['pattern'];
  }

  // GET ARRAY VALIDATOR STRING
  // ----------------------------------------------

  private _getZodArrayValidatorString() {
    if (!this._validatorType) return this.zodArrayValidatorString;

    return this._validatorIsValid(this._validatorType)
      ? this._extractArrayPattern()
      : this.zodArrayValidatorString;
  }

  private _extractArrayPattern() {
    return this._getZodValidatorListArray()
      ?.find((pattern) => pattern.includes('.array'))
      ?.match(ARRAY_VALIDATOR_MESSAGE_REGEX)?.groups?.['pattern'];
  }

  // HELPER
  // ----------------------------------------------

  private _getZodValidatorListWithoutArray() {
    return this._validatorList?.filter((elem) => !elem.includes('.array'));
  }
  private _getZodValidatorListArray() {
    return this._validatorList?.filter((elem) => elem.includes('.array'));
  }

  private _getZodValidatorStringWithoutArray() {
    return this._getZodValidatorListWithoutArray()?.join('');
  }

  protected _validatorIsValid(type: ZodValidatorType) {
    return Boolean(
      this._validatorList?.every((pattern) => {
        const key = this._getValidatorKeyFromPattern(pattern);
        const isValid = this._validatorMap[type]({ pattern, key });

        if (isValid) {
          return true;
        }

        throw new Error(
          `[@zod generator error]: Validator '${key}' is not valid for type '${this.type}'. ${this.errorLocation}`,
        );
      }),
    );
  }

  protected _getValidatorKeyFromPattern(pattern: string) {
    const key = pattern.match(VALIDATOR_KEY_REGEX)?.groups?.['validatorKey'];

    if (!key) {
      throw new Error(
        `[@zod generator error]: no matching validator key found in '${pattern}'. ${this.errorLocation}`,
      );
    }

    return key;
  }
}
