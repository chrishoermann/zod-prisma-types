import { DMMF } from '@prisma/generator-helper';

import { FormattedNames } from './formattedNames';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFSchemaEnum
  extends FormattedNames
  implements DMMF.SchemaEnum
{
  name: DMMF.SchemaEnum['name'];
  values: DMMF.SchemaEnum['values'];
  useNativeEnum: boolean;

  constructor(enumType: DMMF.SchemaEnum) {
    super(enumType.name);

    this.name = enumType.name;
    this.values = enumType.values;
    this.useNativeEnum = this._setUseNativeEnum();
  }

  private _setUseNativeEnum() {
    const isJsonField = this.name.includes('Json');
    if (isJsonField) return false;
    return true;
  }
}
