/* eslint-disable @typescript-eslint/no-explicit-any */
import { DMMF } from '@prisma/generator-helper';

import { DMMFField } from './DMMFField';
import { FormattedNames } from './formattedNames';

/////////////////////////////////////////////////
// TYPES  INTERFACE
/////////////////////////////////////////////////

export interface ObejctWithName {
  name: string;
  [key: string]: any;
}

export interface ExtendedDatamodel {
  models: DMMFModel[];
  enums: DMMFEnum[];
  types: DMMF.Model[];
}

export type EnumListFilter =
  | '@generate.enum.listFilter'
  | '@generate.enum.filter';

export const ENUM_LIST_FILTER: EnumListFilter = '@generate.enum.listFilter';
export const ENUM_FILTER: EnumListFilter = '@generate.enum.filter';

/////////////////////////////////////////////////
// CLASSES
/////////////////////////////////////////////////

// EXTENDED ENUM
// ------------------------------------------------------

export class DMMFEnum extends FormattedNames implements DMMFEnum {
  name: string;
  values: DMMF.EnumValue[];
  dbName?: string | null;
  documentation?: string;

  /**
   * `true` if the enum has '@generate.enum.listFilter'
   * @default false
   */
  generateEnumListFilter: boolean;

  /**
   * `true` if the enum has '@generate.enum.filter'
   * @default false
   */
  generateEnumFilter: boolean;

  constructor(enums: DMMF.DatamodelEnum) {
    super(enums.name);

    this.name = enums.name;
    this.values = enums.values;
    this.dbName = enums.dbName;
    this.documentation = enums.documentation;

    this.generateEnumListFilter = this.setGenerateFilter(ENUM_LIST_FILTER);
    this.generateEnumFilter = this.setGenerateFilter(ENUM_FILTER);
  }

  private setGenerateFilter(filter: EnumListFilter) {
    return this.documentation?.includes(filter) || false;
  }
}

// EXTENDED MODEL
// ------------------------------------------------------

export class DMMFModel extends FormattedNames implements DMMF.Model {
  readonly name: DMMF.Model['name'];
  readonly dbName: DMMF.Model['dbName'];
  readonly fields: DMMFField[];
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
    return model.fields.map((field) => new DMMFField(field));
  }
}

// EXTENDED DOCUMENT
// ------------------------------------------------------

export class ExtendedDMMF implements DMMF.Document {
  datamodel: ExtendedDatamodel;
  schema: DMMF.Schema;
  mappings: DMMF.Mappings;

  constructor(dmmf: DMMF.Document) {
    this.datamodel = this.getExtendedDatamodel(dmmf);
    this.schema = dmmf.schema;
    this.mappings = dmmf.mappings;
  }

  private getExtendedDatamodel(dmmf: DMMF.Document) {
    return {
      enums: this.getExtendedEnums(dmmf.datamodel.enums),
      models: this.getExtendedModels(dmmf.datamodel.models),
      types: dmmf.datamodel.types,
    };
  }

  private getExtendedModels(models: DMMF.Model[]) {
    return models.map((model) => {
      return new DMMFModel(model);
    });
  }

  private getExtendedEnums(enums: DMMF.DatamodelEnum[]) {
    const enumFields = enums.map((elem) => {
      return new DMMFEnum(elem);
    });

    return this.sortObjectsByName(enumFields);
  }

  sortObjectsByName<T extends ObejctWithName>(objects: T[]): T[] {
    return objects.sort((a: T, b: T) =>
      a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1,
    );
  }
}
