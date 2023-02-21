import { DMMF } from '@prisma/generator-helper';

import { ExtendedDMMFFieldCustomValidatorString } from './extendedDMMFFieldCustomValidatorString';
import { ARRAY_VALIDATOR_MESSAGE_REGEX } from './extendedDMMFFieldValidatorMap';
import { GeneratorConfig } from '../../schemas';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFFieldArrayValidatorString extends ExtendedDMMFFieldCustomValidatorString {
  readonly zodArrayValidatorString?: string;

  constructor(
    field: DMMF.Field,
    generatorConfig: GeneratorConfig,
    modelName: string,
  ) {
    super(field, generatorConfig, modelName);

    this.zodArrayValidatorString = this._getZodArrayValidatorString();
  }

  // GET ARRAY VALIDATOR STRING
  // ----------------------------------------------

  private _getZodArrayValidatorString() {
    if (!this._validatorType) return this.zodArrayValidatorString;

    return this._validatorIsValid()
      ? this._extractArrayPattern()
      : this.zodArrayValidatorString;
  }

  // HELPER
  // ----------------------------------------------

  private _extractArrayPattern() {
    const pattern = this._getZodValidatorListArray()?.find((pattern) =>
      pattern.includes('.array'),
    );

    if (pattern && !this.isList)
      throw new Error(
        `[@zod generator error]: '.array' validator is only allowed on lists. ${this.errorLocation}`,
      );

    return pattern?.match(ARRAY_VALIDATOR_MESSAGE_REGEX)?.groups?.['pattern'];
  }
}
