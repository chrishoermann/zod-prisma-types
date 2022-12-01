import { DMMF } from '@prisma/generator-helper';

import { ExtendedDMMFEnum } from './extendedDMMFEnum';
import { ExtendedDMMFModel } from './extendedDMMFModel';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFDatamodel {
  readonly enums: ExtendedDMMFEnum[];
  readonly models: ExtendedDMMFModel[];
  readonly types: DMMF.Model[];

  constructor(datamodel: DMMF.Datamodel) {
    this.enums = this._getExtendedEnums(datamodel.enums);
    this.models = this._getExtendedModels(datamodel.models);
    this.types = datamodel.types;
  }

  private _getExtendedModels(models: DMMF.Model[]) {
    return models.map((model) => new ExtendedDMMFModel(model));
  }

  private _getExtendedEnums(enums: DMMF.DatamodelEnum[]) {
    return enums.map((elem) => new ExtendedDMMFEnum(elem));
  }
}
