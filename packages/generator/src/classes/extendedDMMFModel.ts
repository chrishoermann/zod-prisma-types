/* eslint-disable @typescript-eslint/no-explicit-any */
import { DMMF } from '@prisma/generator-helper';

import { ExtendedDMMFField } from './extendedDMMFField';
import { FormattedNames } from './formattedNames';

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

  constructor(model: DMMF.Model) {
    super(model.name);

    this.name = model.name;
    this.dbName = model.dbName;
    this.fields = this.getExtendedFields(model);
    this.uniqueFields = model.uniqueFields;
    this.uniqueIndexes = model.uniqueIndexes;
    this.documentation = model.documentation;
    this.primaryKey = model.primaryKey;
  }

  private getExtendedFields(model: DMMF.Model) {
    return model.fields.map((field) => new ExtendedDMMFField(field, this.name));
  }
}
