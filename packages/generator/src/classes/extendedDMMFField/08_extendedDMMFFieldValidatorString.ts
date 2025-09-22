import type DMMF from '@prisma/dmmf';

import { ExtendedDMMFFieldValidatorMap } from './07_extendedDMMFFieldValidatorMap';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFFieldValidatorString extends ExtendedDMMFFieldValidatorMap {
  readonly zodValidatorString?: string;

  constructor(field: DMMF.Field, modelName: string) {
    super(field, modelName);

    this.zodValidatorString = this._getZodValidatorString();
  }

  // GET VALIDATOR STRING
  // ----------------------------------------------

  private _getZodValidatorString() {
    if (!this._validatorType || this._validatorType === 'custom')
      return this._defaultValidatorString;

    return this._validatorIsValid()
      ? this._getZodValidatorStringWithoutArray()
      : this.zodValidatorString;
  }

  // HELPER
  // ----------------------------------------------

  private _getZodValidatorStringWithoutArray() {
    return this._getZodValidatorListWithoutArray()?.join('');
  }
}
