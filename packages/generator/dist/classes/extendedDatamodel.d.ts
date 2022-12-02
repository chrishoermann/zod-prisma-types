import { DMMF } from '@prisma/generator-helper';
import { ExtendedDMMFEnum } from './extendedDMMFEnum';
import { ExtendedDMMFModel } from './extendedDMMFModel';
export declare class ExtendedDatamodel {
  readonly enums: ExtendedDMMFEnum[];
  readonly models: ExtendedDMMFModel[];
  readonly types: DMMF.Model[];
  constructor(datamodel: DMMF.Datamodel);
  private _getExtendedModels;
  private _getExtendedEnums;
}
//# sourceMappingURL=extendedDatamodel.d.ts.map
