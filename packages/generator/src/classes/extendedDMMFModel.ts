/* eslint-disable @typescript-eslint/no-explicit-any */
import { DMMF } from '@prisma/generator-helper';

import { ExtendedDMMFField } from './extendedDMMFField';
import { FormattedNames } from './formattedNames';

import { KeyValueMap, PrismaScalarType } from '@/types';

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

  readonly stringFields: ExtendedDMMFField[];
  readonly booleanFields: ExtendedDMMFField[];
  readonly intFields: ExtendedDMMFField[];
  readonly bigIntFields: ExtendedDMMFField[];
  readonly floatFields: ExtendedDMMFField[];
  readonly decimalFields: ExtendedDMMFField[];
  readonly dateTimeFields: ExtendedDMMFField[];
  readonly jsonFields: ExtendedDMMFField[];
  readonly bytesFields: ExtendedDMMFField[];

  readonly scalarFields: KeyValueMap<PrismaScalarType, ExtendedDMMFField[]>;
  readonly realationFields: ExtendedDMMFField[];
  readonly enumFields: ExtendedDMMFField[];

  readonly writeStringFilter: boolean;
  readonly writeBooleanFilter: boolean;
  readonly writeIntFilter: boolean;
  readonly writeBigIntFilter: boolean;
  readonly writeFloatFilter: boolean;
  readonly writeDecimalFilter: boolean;
  readonly writeDateTimeFilter: boolean;
  readonly writeJsonFilter: boolean;
  readonly writeBytesFilter: boolean;

  constructor(model: DMMF.Model) {
    super(model.name);

    this.name = model.name;
    this.dbName = model.dbName;
    this.fields = this.getExtendedFields(model);
    this.uniqueFields = model.uniqueFields;
    this.uniqueIndexes = model.uniqueIndexes;
    this.documentation = model.documentation;
    this.primaryKey = model.primaryKey;

    this.stringFields = this.getScalarFields('String');
    this.booleanFields = this.getScalarFields('Boolean');
    this.intFields = this.getScalarFields('Int');
    this.bigIntFields = this.getScalarFields('BigInt');
    this.floatFields = this.getScalarFields('Float');
    this.decimalFields = this.getScalarFields('Decimal');
    this.dateTimeFields = this.getScalarFields('DateTime');
    this.jsonFields = this.getScalarFields('Json');
    this.bytesFields = this.getScalarFields('Bytes');

    this.scalarFields = this.setScalarFields();
    this.realationFields = this.setRelationFields();
    this.enumFields = this.setEnumfields();

    this.writeIntFilter = this.setWriteIntFilters();
    this.writeBooleanFilter = this.booleanFields.length !== 0;
  }

  private getScalarFields(type: PrismaScalarType) {
    return this.fields.filter((field) => field.type === type);
  }

  private setScalarFields() {
    return {
      String: this.stringFields,
      Boolean: this.booleanFields,
      Int: this.intFields,
      BigInt: this.bigIntFields,
      Float: this.floatFields,
      Decimal: this.decimalFields,
      DateTime: this.dateTimeFields,
      Json: this.jsonFields,
      Bytes: this.bytesFields,
    };
  }

  private setRelationFields() {
    return this.fields.filter((field) => field.kind === 'object');
  }

  private setEnumfields() {
    return this.fields.filter((field) => field.kind === 'enum');
  }

  setWriteIntFilters() {
    return this.intFields.length !== 0;
  }

  private getExtendedFields(model: DMMF.Model) {
    return model.fields.map((field) => new ExtendedDMMFField(field, this.name));
  }
}
