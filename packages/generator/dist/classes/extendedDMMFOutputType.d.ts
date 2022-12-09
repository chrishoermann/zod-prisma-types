import { DMMF } from '@prisma/generator-helper';
import { ExtendedDMMFDatamodel } from './extendedDMMFDatamodel';
import { ExtendedDMMFSchemaField } from './extendedDMMFSchemaField';
import { FormattedNames } from './formattedNames';
export declare class ExtendedDMMFOutputType
  extends FormattedNames
  implements DMMF.OutputType
{
  readonly name: DMMF.OutputType['name'];
  readonly fields: ExtendedDMMFSchemaField[];
  readonly fieldMap?: DMMF.OutputType['fieldMap'];
  constructor(type: DMMF.OutputType, datamodel: ExtendedDMMFDatamodel);
  private _setFields;
}
//# sourceMappingURL=extendedDMMFOutputType.d.ts.map
