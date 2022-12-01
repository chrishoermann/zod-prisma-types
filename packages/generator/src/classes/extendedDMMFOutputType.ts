import { DMMF } from '@prisma/generator-helper';

import { PRISMA_ACTION_ARRAY } from '../constants/objectMaps';
import { ExtendedDMMFSchemaField } from './extendedDMMFSchemaField';
import { ExtendedDatamodel } from './extendedDatamodel';
import { FormattedNames } from './formattedNames';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFOutputType
  extends FormattedNames
  implements DMMF.OutputType
{
  readonly name: DMMF.OutputType['name'];
  readonly fields: ExtendedDMMFSchemaField[];
  readonly fieldMap?: DMMF.OutputType['fieldMap'];

  constructor(type: DMMF.OutputType, datamodel: ExtendedDatamodel) {
    super(type.name);
    this.name = type.name;
    this.fields = this._setFields(type.fields, datamodel);
    this.fieldMap = type.fieldMap;
  }

  private _setFields(fields: DMMF.SchemaField[], datamodel: ExtendedDatamodel) {
    return (
      fields
        // filter all fields that are not in the PRISMA_ACTION_ARRAY
        // and those fields that end with "OrThrow" because they
        // use the same input types as the non "OrThrow" version
        .filter(
          (field) =>
            PRISMA_ACTION_ARRAY.find((elem) => field.name.includes(elem)) &&
            !field.name.includes('OrThrow'),
        )
        .map((field) => new ExtendedDMMFSchemaField(field, datamodel))
    );
  }
}
