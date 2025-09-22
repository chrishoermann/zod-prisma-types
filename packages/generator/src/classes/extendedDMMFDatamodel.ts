import type DMMF from '@prisma/dmmf';
import type { ReadonlyDeep } from '@prisma/dmmf/dist/util';

import { ExtendedDMMFEnum } from './extendedDMMFEnum';
import { ExtendedDMMFModel, ExtendedDMMFModelClass } from './extendedDMMFModel';
import { ExtendedDMMFIndex } from './extendedDMMFIndex';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFDatamodel {
  readonly enums: ExtendedDMMFEnum[];
  readonly models: ExtendedDMMFModel[];
  readonly types: ExtendedDMMFModel[];
  readonly indexes: ExtendedDMMFIndex[];

  constructor(datamodel: ReadonlyDeep<DMMF.Datamodel>) {
    this.enums = this._getExtendedEnums(datamodel.enums);
    this.models = this._getExtendedModels(datamodel.models);
    this.indexes = this._getExtendedIndexes(datamodel.indexes);
    this.types = this._getExtendedModels(datamodel.types);
  }

  private _getExtendedModels(models: ReadonlyDeep<DMMF.Model[]>) {
    return models.map((model) => new ExtendedDMMFModelClass(model));
  }

  private _getExtendedEnums(enums: ReadonlyDeep<DMMF.DatamodelEnum[]>) {
    return enums.map((elem) => new ExtendedDMMFEnum(elem));
  }

  private _getExtendedIndexes(indexes: ReadonlyDeep<DMMF.Index[]>) {
    return indexes.map((elem) => new ExtendedDMMFIndex(elem));
  }
}
