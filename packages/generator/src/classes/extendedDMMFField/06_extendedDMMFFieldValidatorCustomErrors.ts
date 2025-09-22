import type DMMF from '@prisma/dmmf';

import { ExtendedDMMFFieldDefaultValidators } from './05_extendedDMMFFieldDefaultValidators';
import { validateCustomError } from '../../utils/validateCustomError';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFFieldValidatorCustomErrors extends ExtendedDMMFFieldDefaultValidators {
  protected _validatorCustomError?: string;
  readonly zodCustomErrors?: string;

  constructor(field: DMMF.Field, modelName: string) {
    super(field, modelName);

    this._validatorCustomError = this._setValidatorCustomError();
    this.zodCustomErrors = this._setZodCustomErrors();
  }

  private _setValidatorCustomError() {
    if (!this._validatorMatch) return;
    return this._validatorMatch?.groups?.['customErrors'];
  }

  private _setZodCustomErrors() {
    if (!this._validatorCustomError) return;

    return validateCustomError(this._validatorCustomError, this._errorLocation);
  }
}
