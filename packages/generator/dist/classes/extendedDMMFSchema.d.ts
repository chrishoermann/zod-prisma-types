import { DMMF } from '@prisma/generator-helper';
import {
  ExtendedDMMFDatamodel,
  ExtendedDMMFInputType,
  ExtendedDMMFOutputType,
  ExtendedDMMFSchemaEnum,
} from '.';
export declare class ExtendedDMMFSchema implements DMMF.Schema {
  readonly rootQueryType?: DMMF.Schema['rootQueryType'];
  readonly rootMutationType?: DMMF.Schema['rootMutationType'];
  readonly inputObjectTypes: {
    readonly model?: DMMF.InputType[];
    readonly prisma: ExtendedDMMFInputType[];
  };
  readonly outputObjectTypes: {
    readonly model: DMMF.OutputType[];
    readonly prisma: ExtendedDMMFOutputType[];
  };
  readonly enumTypes: {
    readonly model?: DMMF.SchemaEnum[];
    readonly prisma: ExtendedDMMFSchemaEnum[];
  };
  readonly fieldRefTypes: {
    readonly prisma?: DMMF.FieldRefType[];
  };
  readonly hasJsonTypes: boolean;
  readonly hasBytesTypes: boolean;
  readonly hasDecimalTypes: boolean;
  constructor(schema: DMMF.Schema, datamodel: ExtendedDMMFDatamodel);
  private _setExtendedInputObjectTypes;
  private _setExtendedOutputObjectTypes;
  private _setExtendedEnumTypes;
  private _setHasJsonTypes;
  private _setHasBytesTypes;
  private _setHasDecimalTypes;
}
//# sourceMappingURL=extendedDMMFSchema.d.ts.map
