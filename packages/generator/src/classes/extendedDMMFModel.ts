import { DMMF } from '@prisma/generator-helper';

import { ConfigSchema } from '.';
import { ExtendedDMMFField } from './extendedDMMFField';
import { FormattedNames } from './formattedNames';

/////////////////////////////////////////////////
// TYPES  INTERFACE
/////////////////////////////////////////////////

export class ExtendedDMMFModel extends FormattedNames implements DMMF.Model {
  readonly generatorConfig: ConfigSchema;
  readonly name: DMMF.Model['name'];
  readonly dbName: DMMF.Model['dbName'];
  readonly fields: ExtendedDMMFField[];
  readonly uniqueFields: DMMF.Model['uniqueFields'];
  readonly uniqueIndexes: DMMF.Model['uniqueIndexes'];
  readonly documentation?: DMMF.Model['documentation'];
  readonly primaryKey: DMMF.Model['primaryKey'];
  readonly scalarFields: ExtendedDMMFField[];
  readonly relationFields: ExtendedDMMFField[];
  readonly enumFields: ExtendedDMMFField[];
  readonly hasRelationFields: boolean;

  constructor(generatorConfig: ConfigSchema, model: DMMF.Model) {
    super(model.name);
    this.generatorConfig = generatorConfig;
    this.name = model.name;
    this.dbName = model.dbName;
    this.fields = this._getExtendedFields(model);
    this.uniqueFields = model.uniqueFields;
    this.uniqueIndexes = model.uniqueIndexes;
    this.documentation = model.documentation;
    this.primaryKey = model.primaryKey;
    this.scalarFields = this._setScalarFields();
    this.relationFields = this._setRelationFields();
    this.enumFields = this._setEnumfields();
    this.hasRelationFields = this._setHasRelationFields();
  }

  private _getExtendedFields(model: DMMF.Model) {
    return model.fields.map(
      (field) => new ExtendedDMMFField(this.generatorConfig, field, this.name),
    );
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

  private _setHasRelationFields() {
    return this.relationFields.length > 0;
  }
}
