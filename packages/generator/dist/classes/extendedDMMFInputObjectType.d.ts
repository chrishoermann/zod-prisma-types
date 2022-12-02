import { DMMF } from '@prisma/generator-helper';
import { ExtendedDMMFModel } from './extendedDMMFModel';
import { ExtendedDMMFSchemaArg } from './extendedDMMFSchemaArg';
import { FormattedNames } from './formattedNames';
export declare class ExtendedDMMFInputObjectType
  extends FormattedNames
  implements DMMF.InputType
{
  name: DMMF.InputType['name'];
  constraints: DMMF.InputType['constraints'];
  meta: DMMF.InputType['meta'];
  fields: ExtendedDMMFSchemaArg[];
  fieldMap: DMMF.InputType['fieldMap'];
  matchingModel?: ExtendedDMMFModel;
  constructor(type: DMMF.InputType, model?: ExtendedDMMFModel);
  private setFields;
  getZodValidatorString(fieldName: string): string | undefined;
  getZodCustomErrorsString(fieldName: string): string | undefined;
}
//# sourceMappingURL=extendedDMMFInputObjectType.d.ts.map
