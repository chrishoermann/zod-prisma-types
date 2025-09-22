import type DMMF from '@prisma/dmmf';
import { ExtendedDMMFModelCustomValidators } from './07_extendedDMMFModelCustomValidators';

export class ExtendedDMMFModelFormatingHelpers extends ExtendedDMMFModelCustomValidators {
  readonly optionalJsonFieldUnion: string;

  constructor(model: DMMF.Model) {
    super(model);

    this.optionalJsonFieldUnion = this._setOptionalJsonFieldUnion();
  }

  private _setOptionalJsonFieldUnion() {
    return this.optionalJsonFields
      .map((field) => `"${field.name}"`)
      .join(' | ');
  }
}
