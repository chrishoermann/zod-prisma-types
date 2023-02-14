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
        const isValid = this.validatorMap[type]({ pattern, key });

        if (isValid) {
          return true;
        }

        throw new Error(
          `[@zod generator error]: Validator '${key}' is not valid for type '${this.type}'. ${this.errorLocation}`,
        );
      }),
    );
  }

  private _getValidatorKeyFromPattern(pattern: string) {
    const key = pattern.match(VALIDATOR_KEY_REGEX)?.groups?.['validatorKey'];

    if (!key) {
      throw new Error(
        `[@zod generator error]: no matching validator key found in '${pattern}'. ${this.errorLocation}`,
      );
    }

    return key;
  }
}
