/* eslint-disable @typescript-eslint/no-explicit-any */
import { DMMF } from '@prisma/generator-helper';

import { ExtendedDMMFEnum } from './extendedDMMFEnum';
import { ExtendedDMMFModel } from './extendedDMMFModel';

/////////////////////////////////////////////////
// TYPES  INTERFACE
/////////////////////////////////////////////////

export interface ObejctWithName {
  name: string;
  [key: string]: any;
}

export interface ExtendedDatamodel {
  models: ExtendedDMMFModel[];
  enums: ExtendedDMMFEnum[];
  types: DMMF.Model[];
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
      return new ExtendedDMMFModel(model);
    });
  }

  private getExtendedEnums(enums: DMMF.DatamodelEnum[]) {
    const enumFields = enums.map((elem) => {
      return new ExtendedDMMFEnum(elem);
    });

    return this.sortObjectsByName(enumFields);
  }

  sortObjectsByName<T extends ObejctWithName>(objects: T[]): T[] {
    return objects.sort((a: T, b: T) =>
      a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1,
    );
  }
}
