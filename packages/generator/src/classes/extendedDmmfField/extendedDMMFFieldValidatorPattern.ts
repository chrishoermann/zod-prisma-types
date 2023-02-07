import { DMMF } from '@prisma/generator-helper';

import { ExtendedDMMFFieldValidatorType } from './extendedDMMFFieldValidatorType';
import { GeneratorConfig } from '../../schemas';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFFieldValidatorPattern extends ExtendedDMMFFieldValidatorType {
  protected validatorPattern?: string;
  protected validatorList?: string[];

  constructor(
    field: DMMF.Field,
    generatorConfig: GeneratorConfig,
    modelName: string,
  ) {
    super(field, generatorConfig, modelName);

    this.validatorPattern = this._getValidatorPattern();
    this.validatorList = this._getValidatorList();
  }

  private _getValidatorPattern() {
    return this.validatorMatch?.groups?.['validatorPattern'];
  }

  // If pattern consists of multiple validators (e.g. .min(1).max(10))
  // the pattern is split into an array for further processing.
  private _getValidatorList() {
    return this.validatorPattern?.split(/(?=\.[\w])/);
  }
}
