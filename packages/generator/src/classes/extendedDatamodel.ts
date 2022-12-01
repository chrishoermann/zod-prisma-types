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

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDatamodel {
  readonly enums: ExtendedDMMFEnum[];
  readonly models: ExtendedDMMFModel[];
  readonly types: DMMF.Model[];

  constructor(datamodel: DMMF.Datamodel) {
    this.enums = this._getExtendedEnums(datamodel.enums);
    this.models = this._getExtendedModels(datamodel.models);
    this.types = datamodel.types;
  }

  private _getExtendedModels(models: DMMF.Model[]) {
    return models.map((model) => {
      return new ExtendedDMMFModel(model);
    });
  }

  private _getExtendedEnums(enums: DMMF.DatamodelEnum[]) {
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

  hasEnum() {
    return this.enums.length !== 0;
  }
}
