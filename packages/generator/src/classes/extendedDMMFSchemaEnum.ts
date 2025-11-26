import type DMMF from '@prisma/dmmf';
import type { ReadonlyDeep } from '@prisma/dmmf/dist/util';

import { FormattedNames } from './formattedNames';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFSchemaEnum
  extends FormattedNames
  implements DMMF.DatamodelSchemaEnum
{
  readonly name: DMMF.DatamodelSchemaEnum['name'];
  readonly values: DMMF.DatamodelSchemaEnum['values'];
  readonly useNativeEnum: boolean;

  constructor(enumType: ReadonlyDeep<DMMF.DatamodelSchemaEnum>) {
    super(enumType.name);
    this.name = enumType.name;
    this.values = enumType.values;
    this.useNativeEnum = this._setUseNativeEnum();
  }

  private _setUseNativeEnum() {
    return !this.name.includes('JsonNullValue');
  }
}
