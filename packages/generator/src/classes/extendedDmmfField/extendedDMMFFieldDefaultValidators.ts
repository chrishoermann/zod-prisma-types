import { DMMF } from '@prisma/generator-helper';

import { ExtendedDMMFFieldValidatorPattern } from './extendedDMMFFieldValidatorPattern';
import { GeneratorConfig } from '../../schemas';

export class ExtendedDMMFFieldDefaultValidators extends ExtendedDMMFFieldValidatorPattern {
  zodValidatorString?: string;

  constructor(
    field: DMMF.Field,
    generatorConfig: GeneratorConfig,
    modelName: string,
  ) {
    super(field, generatorConfig, modelName);

    this.zodValidatorString = this._setZodDefaultValidator();
  }

  // GET DEFAULT VALIDATOR
  // ----------------------------------------------

  private _setZodDefaultValidator() {
    if (!this.generatorConfig.useDefaultValidators) return;
    if (this._validatorList?.includes('.noDefault()')) return;
    if (this._isCuid()) return '.cuid()';
    if (this._isUuid()) return '.uuid()';
    if (this._isInt()) return '.int()';
    return undefined;
  }

  private _isCuid() {
    if (this._IsFieldDefault(this.default)) return this.default.name === 'cuid';
    return false;
  }

  private _isUuid() {
    if (this._IsFieldDefault(this.default)) return this.default.name === 'uuid';
    return false;
  }

  private _isInt() {
    return this.type === 'Int';
  }

  // Type guard to check if the field default is a DMMF.FieldDefault.
  // While investigating the DMMF, I found that the default property
  // is exclusively a DMMF.FieldDefault. Maybe in the future, the
  // other properties will be used, but for now they are not.

  private _IsFieldDefault(
    value?:
      | DMMF.FieldDefault
      | DMMF.FieldDefaultScalar
      | DMMF.FieldDefaultScalar[],
  ): value is DMMF.FieldDefault {
    return (value as DMMF.FieldDefault)?.name !== undefined;
  }
}
