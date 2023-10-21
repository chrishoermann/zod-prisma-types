import { DMMF } from '@prisma/generator-helper';

import { ExtendedDMMFFieldValidatorType } from './03_extendedDMMFFieldValidatorType';
import { GeneratorConfig } from '../../schemas';
import { getNestedValidatorList } from '../../utils/getNestedValidatorList';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFFieldValidatorPattern extends ExtendedDMMFFieldValidatorType {
  protected _validatorPattern?: string;
  protected _validatorList?: string[];

  constructor(
    field: DMMF.Field,
    generatorConfig: GeneratorConfig,
    modelName: string,
  ) {
    super(field, generatorConfig, modelName);

    this._validatorPattern = this._getValidatorPattern();
    this._validatorList = this._getValidatorList();
  }

  // GET VALIDATOR PATTERN
  // ----------------------------------------------

  private _getValidatorPattern() {
    if (!this._validatorMatch) return;
    return this._validatorMatch?.groups?.['validatorPattern'];
  }

  // GET VALIDATOR LIST
  // ----------------------------------------------

  private _getValidatorList() {
    if (!this._validatorPattern) return;
    return getNestedValidatorList(this._validatorPattern);
  }

  // HELPER
  // ----------------------------------------------

  protected _getZodValidatorListWithoutArray() {
    return this._validatorList?.filter((elem) => !elem.includes('.array'));
  }

  protected _getZodValidatorListArray() {
    return this._validatorList?.filter((elem) => elem.includes('.array'));
  }
}
