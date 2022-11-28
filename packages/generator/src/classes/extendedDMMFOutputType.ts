import { DMMF } from '@prisma/generator-helper';
import { PrismaAction } from 'src/types';

import { ExtendedDMMFSchemaField } from './extendedDMMFSchemaField';
import { FormattedNames } from './formattedNames';

export const PRISMA_ACTION_MAP: PrismaAction[] = [
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
  fieldMap: DMMF.OutputType['fieldMap'];

  constructor(type: DMMF.OutputType) {
    super(type.name);
    this.name = type.name;
    this.fields = this.setFields(type.fields);
    this.fieldMap = type.fieldMap;
  }

  private setFields(fields: DMMF.SchemaField[]) {
    return fields
      .filter((field) =>
        PRISMA_ACTION_MAP.find((elem) => field.name.includes(elem)),
      )
      .filter((field) => !field.name.includes('OrThrow'))
      .map((field) => {
        return new ExtendedDMMFSchemaField(field);
      });
  }
}
