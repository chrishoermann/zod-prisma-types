import { DMMF } from '@prisma/generator-helper';

import { ExtendedDMMFFieldValidatorType } from './extendedDMMFFieldValidatorType';
import { GeneratorConfig } from '../../schemas';

/////////////////////////////////////////////////
// REGEX
/////////////////////////////////////////////////

// const VALIDATOR_SPLIT_REGEX = /.[\w]+\((?!")/;
// const VALIDATOR_SPLIT_REGEX = /(?=\.[a-z]+\((?!z))/;
const VALIDATOR_SPLIT_REGEX = /(?=\.[\w]+)/;

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
    if (!this.validatorMatch) return;
    return this.validatorMatch?.groups?.['validatorPattern'];
  }

  // If pattern consists of multiple validators (e.g. .min(1).max(10))
  // the pattern is split into an array for further processing.
  private _getValidatorList() {
    if (!this.validatorPattern) return;
    return this.validatorPattern?.split(VALIDATOR_SPLIT_REGEX);
    // return this.validatorPattern?.split(VALIDATOR_SPLIT_REGEX);
  }
}
