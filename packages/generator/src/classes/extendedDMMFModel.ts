/* eslint-disable @typescript-eslint/no-explicit-any */
import { DMMF } from '@prisma/generator-helper';

import { KeyValueMap, PrismaScalarType } from '../types';
import { ExtendedDMMFField } from './extendedDMMFField';
import { FormattedNames } from './formattedNames';

/////////////////////////////////////////////////
// TYPES  INTERFACE
/////////////////////////////////////////////////

export type ScalarFields = KeyValueMap<PrismaScalarType, ExtendedDMMFField[]>;

// EXTENDED MODEL
// ------------------------------------------------------

export class ExtendedDMMFModel extends FormattedNames implements DMMF.Model {
  readonly name: DMMF.Model['name'];
  readonly dbName: DMMF.Model['dbName'];
  readonly fields: ExtendedDMMFField[];
  readonly uniqueFields: DMMF.Model['uniqueFields'];
  readonly uniqueIndexes: DMMF.Model['uniqueIndexes'];
  readonly documentation?: DMMF.Model['documentation'];
  readonly primaryKey: DMMF.Model['primaryKey'];

  readonly scalarFields: ExtendedDMMFField[];
  readonly realationFields: ExtendedDMMFField[];
  readonly enumFields: ExtendedDMMFField[];

  constructor(model: DMMF.Model) {
    super(model.name);

    this.name = model.name;
    this.dbName = model.dbName;
    this.fields = this._getExtendedFields(model);
    this.uniqueFields = model.uniqueFields;
    this.uniqueIndexes = model.uniqueIndexes;
    this.documentation = model.documentation;
    this.primaryKey = model.primaryKey;

    this.scalarFields = this._setScalarFields();
    this.realationFields = this._setRelationFields();
    this.enumFields = this._setEnumfields();
  }

  private _getExtendedFields(model: DMMF.Model) {
    return model.fields.map((field) => new ExtendedDMMFField(field, this.name));
  }

  private _setScalarFields() {
    return this.fields.filter((field) => field.kind === 'scalar');
  }

  private _setRelationFields() {
    return this.fields.filter((field) => field.kind === 'object');
  }

  private _setEnumfields() {
    return this.fields.filter((field) => field.kind === 'enum');
  }
}
