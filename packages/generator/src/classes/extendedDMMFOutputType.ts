import { DMMF } from '@prisma/generator-helper';
import { PrismaAction } from 'src/types';

import { ExtendedDMMFSchemaField } from './extendedDMMFSchemaField';
import { FormattedNames } from './formattedNames';

/**
 * This array contains all the prisma actions for which
 * we want to generate a zod input schema.
 */
export const PRISMA_ACTION_ARRAY: PrismaAction[] = [
  'findUnique',
  'findMany',
  'findFirst',
  'createOne',
  'createMany',
  'updateOne',
  'updateMany',
  'upsertOne',
  'deleteOne',
  'deleteMany',
  'aggregate',
  'groupBy',
];

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFOutputType
  extends FormattedNames
  implements DMMF.OutputType
{
  name: DMMF.OutputType['name'];
  fields: ExtendedDMMFSchemaField[];
  fieldMap?: DMMF.OutputType['fieldMap'];

  constructor(type: DMMF.OutputType) {
    super(type.name);
    this.name = type.name;
    this.fields = this._setFields(type.fields);
    this.fieldMap = type.fieldMap;
  }

  private _setFields(fields: DMMF.SchemaField[]) {
    return (
      fields
        // filter all fields that are not in the PRISMA_ACTION_ARRAY
        .filter((field) =>
          PRISMA_ACTION_ARRAY.find((elem) => field.name.includes(elem)),
        )
        // filter those fields that end with "OrThrow" because they
        // use the same input types as the non "OrThrow" version
        .filter((field) => !field.name.includes('OrThrow'))
        .map((field) => {
          return new ExtendedDMMFSchemaField(field);
        })
    );
  }
}
