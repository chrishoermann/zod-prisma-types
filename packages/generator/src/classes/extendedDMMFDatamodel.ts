import { DMMF } from '@prisma/generator-helper';

import { ConfigSchema } from '.';
import { ExtendedDMMFEnum } from './extendedDMMFEnum';
import { ExtendedDMMFModel } from './extendedDMMFModel';

export interface ExtendedDMMFDatamodelOptions {
  datamodel: DMMF.Datamodel;
  config: ConfigSchema;
}

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFDatamodel {
  readonly enums: ExtendedDMMFEnum[];
  readonly models: ExtendedDMMFModel[];
  readonly types: DMMF.Model[];

  constructor(
    readonly generatorConfig: ConfigSchema,
    datamodel: DMMF.Datamodel,
  ) {
    this.generatorConfig = generatorConfig;
    this.enums = this._getExtendedEnums(datamodel.enums);
    this.models = this._getExtendedModels(datamodel.models);
    this.types = datamodel.types;
  }

  private _getExtendedModels(models: DMMF.Model[]) {
    return models.map(
      (model) => new ExtendedDMMFModel(this.generatorConfig, model),
    );
  }

  private _getExtendedEnums(enums: DMMF.DatamodelEnum[]) {
    return enums.map(
      (elem) => new ExtendedDMMFEnum(this.generatorConfig, elem),
    );
  }
}
