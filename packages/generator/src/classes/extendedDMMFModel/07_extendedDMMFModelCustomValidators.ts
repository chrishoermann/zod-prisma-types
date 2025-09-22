import type DMMF from '@prisma/dmmf';
import { ExtendedDMMFModelCustomErrors } from './06_extendedDMMFModelCustomErrors';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFModelCustomValidators extends ExtendedDMMFModelCustomErrors {
  readonly zodCustomValidators?: string[];

  constructor(model: DMMF.Model) {
    super(model);

    this.zodCustomValidators = this._setZodCustomValidators();
  }

  private _setZodCustomValidators() {
    if (!this._validatorList) return;

    const filterdValidatorList = this._validatorList
      .filter(
        (elem) => !(elem.includes('.error(') || elem.includes('.import(')),
      )
      .sort((a, b) => {
        if (a === '.strict()') return -1;
        if (b === '.strict()') return 1;
        return 0; // Keep the relative order of other items unchanged
      });

    return filterdValidatorList;
  }
}
