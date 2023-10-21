import { DMMF } from '@prisma/generator-helper';
import { GeneratorConfig } from '../../schemas';
import { ExtendedDMMFModelImportStatement } from './05_extendedDMMFModelImportStatement';
import { validateCustomError } from '../../utils/validateCustomError';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFModelCustomErrors extends ExtendedDMMFModelImportStatement {
  protected _validatorCustomError?: string;
  readonly zodCustomErrors?: string;

  constructor(generatorConfig: GeneratorConfig, model: DMMF.Model) {
    super(generatorConfig, model);

    this._validatorCustomError = this._setValidatorCustomError();
    this.zodCustomErrors = this._setZodCustomErrors();
  }

  private _setValidatorCustomError() {
    if (!this._validatorList) return;
    const validatorCustomError = this._validatorList.filter((elem) =>
      elem.includes('.error('),
    );

    if (validatorCustomError.length > 1) {
      throw new Error(
        `[@zod generator error]: Only one error message property can be set. ${this._errorLocation}`,
      );
    }

    if (validatorCustomError.length === 0) return;

    return validatorCustomError[0].replace('.error', '');
  }

  private _setZodCustomErrors() {
    if (!this._validatorCustomError) return;
    return validateCustomError(this._validatorCustomError, this._errorLocation);
  }
}
