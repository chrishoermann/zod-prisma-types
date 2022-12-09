import { DMMF } from '@prisma/generator-helper';
import { FilterdPrismaAction } from '../constants/objectMaps';
import { ExtendedDMMFDatamodel } from './extendedDMMFDatamodel';
import { ExtendedDMMFModel } from './extendedDMMFModel';
import { ExtendedDMMFSchemaArg } from './extendedDMMFSchemaArg';
import { FormattedNames } from './formattedNames';
export declare class ExtendedDMMFSchemaField
  extends FormattedNames
  implements DMMF.SchemaField
{
  readonly name: DMMF.SchemaField['name'];
  readonly isNullable: DMMF.SchemaField['isNullable'];
  readonly outputType: DMMF.SchemaField['outputType'];
  readonly args: ExtendedDMMFSchemaArg[];
  readonly deprecation?: DMMF.SchemaField['deprecation'];
  readonly documentation?: DMMF.SchemaField['documentation'];
  readonly prismaAction: FilterdPrismaAction;
  readonly argName: string;
  readonly modelType: string | DMMF.OutputType | DMMF.SchemaEnum;
  readonly linkedModel?: ExtendedDMMFModel;
  constructor(field: DMMF.SchemaField, datamodel: ExtendedDMMFDatamodel);
  private _setArgs;
  private _setMatchedPrismaAction;
  private _setModelType;
  private _setArgName;
  private _setLinkedModel;
}
//# sourceMappingURL=extendedDMMFSchemaField.d.ts.map
