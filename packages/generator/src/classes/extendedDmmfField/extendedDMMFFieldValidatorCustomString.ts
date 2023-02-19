import { DMMF } from '@prisma/generator-helper';

import { ExtendedDMMFFieldValidatorString } from './extendedDMMFFieldValidatorString';
import { GeneratorConfig } from '../../schemas';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFFieldValidatorCustomString extends ExtendedDMMFFieldValidatorString {
  readonly zodCustomValidatorString?: string;

  constructor(
    field: DMMF.Field,
    generatorConfig: GeneratorConfig,
    modelName: string,
  ) {
    super(field, generatorConfig, modelName);

    this.zodCustomValidatorString = this._getZodCustomValidatorCustomString();
  }

  // GET VALIDATOR STRING
  // ----------------------------------------------

  // only validates keys that are of type 'custom'
  private _getZodCustomValidatorCustomString() {
    if (!this.validatorType || this.validatorType !== 'custom')
      return this.zodValidatorString;

    return this._validatorIsValid(this.validatorType)
      ? this.validatorPattern
      : this.zodValidatorString;
  }
}
