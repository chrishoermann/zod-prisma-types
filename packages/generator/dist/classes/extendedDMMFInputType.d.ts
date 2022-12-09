import { DMMF } from '@prisma/generator-helper';
import { ExtendedDMMFModel } from './extendedDMMFModel';
import { ExtendedDMMFSchemaArg } from './extendedDMMFSchemaArg';
import { FormattedNames } from './formattedNames';
export declare class ExtendedDMMFInputType
  extends FormattedNames
  implements DMMF.InputType
{
  readonly name: DMMF.InputType['name'];
  readonly constraints: DMMF.InputType['constraints'];
  readonly meta: DMMF.InputType['meta'];
  readonly fields: ExtendedDMMFSchemaArg[];
  readonly fieldMap: DMMF.InputType['fieldMap'];
  readonly linkedModel?: ExtendedDMMFModel;
  readonly isJsonField: boolean;
  readonly isBytesField: boolean;
  readonly isDecimalField: boolean;
  constructor(type: DMMF.InputType, model?: ExtendedDMMFModel);
  private _setFields;
  private _fieldIsPrismaFunctionType;
  private _getZodValidatorString;
  private _getZodCustomErrorsString;
  private _getZodCustomValidatorString;
  private _setIsJsonField;
  private _setIsBytesField;
  private _setIsDecimalField;
}
//# sourceMappingURL=extendedDMMFInputType.d.ts.map
