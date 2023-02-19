import { DMMF } from '@prisma/generator-helper';

import { ExtendedDMMFFieldValidatorMap } from './extendedDMMFFieldValidatorMap';
import { ZodValidatorType } from './extendedDMMFFieldValidatorType';
import { GeneratorConfig } from '../../schemas';

/////////////////////////////////////////////////
// REGEX
/////////////////////////////////////////////////

export const VALIDATOR_KEY_REGEX = /(\.(?<validatorKey>[\w]+))/;

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFFieldValidatorString extends ExtendedDMMFFieldValidatorMap {
  readonly zodCustomValidatorString?: string;

  constructor(
    field: DMMF.Field,
    generatorConfig: GeneratorConfig,
    modelName: string,
  ) {
    super(field, generatorConfig, modelName);

    this.zodValidatorString = this._getZodValidatorString();
    this.zodCustomValidatorString = this._getZodCustomValidatorCustomString();

    console.log('validatorList', this.validatorList);
  }

  // GET VALIDATOR STRING
  // ----------------------------------------------

  // only validates types that are not of type 'custom'
  private _getZodValidatorString() {
    if (!this.validatorType || this.validatorType === 'custom')
      return this.zodValidatorString;

    return this._validatorIsValid(this.validatorType)
      ? this.validatorPattern
      : this.zodValidatorString;
  }

  // GET CUSTOM VALIDATOR STRING
  // ----------------------------------------------

  // only validates keys that are of type 'custom'
  private _getZodCustomValidatorCustomString() {
    if (
      !this.validatorType ||
      this.validatorType !== 'custom' ||
      !this.validatorPattern
    )
      return this.zodCustomValidatorString;

    console.log('this.validatorPattern', this.validatorPattern);

    const validatorKey = this._getValidatorKeyFromPattern(
      this.validatorPattern,
    );

    console.log('validatorKey', validatorKey);
    console.log('validatorList', this.validatorList);

    return undefined;
    // return this._validatorIsValid(this.validatorType)
    //   ? this.validatorPattern
    //   : this.zodCustomValidatorString;
  }

  // HELPER METHODS
  // ----------------------------------------------

  protected _validatorIsValid(type: ZodValidatorType) {
    return Boolean(
      this.validatorList?.every((pattern) => {
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
