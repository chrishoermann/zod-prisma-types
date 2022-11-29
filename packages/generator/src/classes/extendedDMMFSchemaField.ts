import { DMMF } from '@prisma/generator-helper';
import { KeyValueMap, PrismaAction } from 'src/types';

import { PRISMA_ACTION_MAP } from './extendedDMMFOutputType';
import { ExtendedDMMFSchemaArg } from './extendedDMMFSchemaArg';
import { FormattedNames } from './formattedNames';

export type FilterdPrismaAction = Exclude<
  PrismaAction,
  'executeRaw' | 'queryRaw' | 'count'
>;

/**
 * Map is used to get the right naming for the prisma action
 * according to the prisma schema.
 * @example type UserFindUnique // becomes const UserFindUnique = ...
 */
export const PRISMA_ACTION_ARG_MAP: KeyValueMap<
  FilterdPrismaAction,
  FormattedNames
> = {
  findUnique: new FormattedNames('findUnique'),
  findMany: new FormattedNames('findMany'),
  findFirst: new FormattedNames('findFirst'),
  createOne: new FormattedNames('create'),
  createMany: new FormattedNames('createMany'),
  updateOne: new FormattedNames('update'),
  updateMany: new FormattedNames('updateMany'),
  upsertOne: new FormattedNames('upsert'),
  deleteOne: new FormattedNames('delete'),
  deleteMany: new FormattedNames('deleteMany'),
  aggregate: new FormattedNames('aggregate'),
  groupBy: new FormattedNames('groupBy'),
};

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFSchemaField
  extends FormattedNames
  implements DMMF.SchemaField
{
  name: DMMF.SchemaField['name'];
  isNullable: DMMF.SchemaField['isNullable'];
  outputType: DMMF.SchemaField['outputType'];
  args: ExtendedDMMFSchemaArg[];
  deprecation?: DMMF.SchemaField['deprecation'];
  documentation?: DMMF.SchemaField['documentation'];

  argName: string;
  modelType: string | DMMF.OutputType | DMMF.SchemaEnum;

  constructor(params: DMMF.SchemaField) {
    super(params.name);
    this.name = params.name;
    this.isNullable = params.isNullable;
    this.outputType = params.outputType;
    this.args = this.setArgs(params);
    this.deprecation = params.deprecation;
    this.documentation = params.documentation;

    this.modelType = this.setType();
    this.argName = this.setArgName();
  }

  private setArgs({ args }: DMMF.SchemaField) {
    return args.map((arg) => {
      return new ExtendedDMMFSchemaArg(arg);
    });
  }

  // filter out the typename from the prisma naming convention
  private setType() {
    const matchedPrismaAction = PRISMA_ACTION_MAP.find((elem) =>
      this.name.includes(elem),
    );

    const type = this.name.replace(matchedPrismaAction as string, '');
    return type;
  }

  // rebuild the typename used in prisma types
  private setArgName() {
    const matchedPrismaAction = PRISMA_ACTION_MAP.find((elem) =>
      this.name.includes(elem),
    );

    const argName =
      PRISMA_ACTION_ARG_MAP[matchedPrismaAction as FilterdPrismaAction];

    return `${this.modelType}${argName.formattedNames.pascalCase}Args`;
  }
}
