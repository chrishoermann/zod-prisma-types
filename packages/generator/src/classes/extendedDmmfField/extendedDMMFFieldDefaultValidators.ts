import { DMMF } from '@prisma/generator-helper';

import { ExtendedDMMFFieldBase } from './extendedDMMFFieldBase';
import { GeneratorConfig } from '../../schemas';

export class ExtendedDMMFFieldDefaultValidators extends ExtendedDMMFFieldBase {
  readonly zodValidatorString?: string;

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
    if (this._isCuid()) return '.cuid()';
    if (this._isUuid()) return '.uuid()';
    if (this._isInt()) return '.int()';
    return undefined;
  }

  private _isCuid() {
    const defaults = this.default;
    if (this._IsFieldDefault(defaults)) return defaults.name === 'cuid';
    return false;
  }

  private _isUuid() {
    const defaults = this.default;
    if (this._IsFieldDefault(defaults)) return defaults.name === 'uuid';
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
