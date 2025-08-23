import type DMMF from '@prisma/dmmf';
import type { ReadonlyDeep } from '@prisma/dmmf/dist/util';

import { ExtendedDMMFFieldValidatorPattern } from './04_extendedDMMFFieldValidatorPattern';
import { GeneratorConfig } from '../../schemas';

export class ExtendedDMMFFieldDefaultValidators extends ExtendedDMMFFieldValidatorPattern {
  protected _defaultValidatorString?: string;

  constructor(
    field: ReadonlyDeep<DMMF.Field>,
    generatorConfig: GeneratorConfig,
    modelName: string,
  ) {
    super(field, generatorConfig, modelName);

    this._defaultValidatorString = this._setZodDefaultValidator();
    this._validatorList = this._updateValidatorList();
  }

  // GET DEFAULT VALIDATOR
  // ----------------------------------------------

  private _setZodDefaultValidator() {
    if (!this.generatorConfig.useDefaultValidators) return;
    if (this._validatorList?.includes('.noDefault()')) return;
    if (this._isCuid2()) return '.cuid2()';
    if (this._isCuid()) return '.cuid()';
    if (this._isUuid()) return '.uuid()';
    if (this._isInt()) return '.int()';
    return undefined;
  }

  private _isCuid2() {
    if (this._IsFieldDefault(this.default))
      return this.default.name === 'cuid' && this.default.args?.[0] === 2;
    return false;
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
    value?: ReadonlyDeep<
      | ReadonlyDeep<DMMF.FieldDefault>
      | ReadonlyDeep<DMMF.FieldDefaultScalar>
      | ReadonlyDeep<DMMF.FieldDefaultScalar>[]
    >,
  ): value is ReadonlyDeep<DMMF.FieldDefault> {
    return (value as ReadonlyDeep<DMMF.FieldDefault>)?.name !== undefined;
  }

  // The validator list needs to be updated after the default validator
  // has been added to the list. This is because ".noDefault()" would
  // otherwise be added to the "zodValidatorString" later on.

  private _updateValidatorList() {
    if (!this._validatorList) return;

    const filterdList = this._validatorList.filter(
      (validator) => !validator.includes('.noDefault()'),
    );

    if (filterdList.length < 1) {
      return undefined;
    }

    return filterdList;
  }
}
