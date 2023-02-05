import { DMMF } from '@prisma/generator-helper';

import { ExtendedDMMFFieldValidatorType } from './extendedDMMFFieldValidatorType';
import { GeneratorConfig } from '../../schemas';

/////////////////////////////////////////////////
// REGEX
/////////////////////////////////////////////////

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFFieldValidatorPattern extends ExtendedDMMFFieldValidatorType {
  protected validatorPattern?: string;

  constructor(
    field: DMMF.Field,
    generatorConfig: GeneratorConfig,
    modelName: string,
  ) {
    super(field, generatorConfig, modelName);

    this.validatorPattern = this._getValidatorPattern();
  }

  private _getValidatorPattern() {
    if (!this.validatorMatch) return;
    return this.validatorMatch?.groups?.['validatorPattern'];
  }
}
