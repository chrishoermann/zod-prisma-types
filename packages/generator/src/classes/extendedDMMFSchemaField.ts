import { DMMF } from '@prisma/generator-helper';

import { GeneratorConfig } from '.';
import {
  FilterdPrismaAction,
  PRISMA_ACTION_ARG_MAP,
  PRISMA_ACTION_ARRAY,
} from '../constants/objectMaps';
import { ExtendedDMMFDatamodel } from './extendedDMMFDatamodel';
import { ExtendedDMMFModel } from './extendedDMMFModel';
import { ExtendedDMMFSchemaArg } from './extendedDMMFSchemaArg';
import { FormattedNames } from './formattedNames';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFSchemaField
  extends FormattedNames
  implements DMMF.SchemaField
{
  readonly name: DMMF.SchemaField['name'];
  readonly isNullable: DMMF.SchemaField['isNullable'];
  readonly outputType: DMMF.SchemaField['outputType'];
  readonly args: ExtendedDMMFSchemaArg[];
  readonly deprecation?: DMMF.SchemaField['deprecation'];
  readonly documentation?: DMMF.SchemaField['documentation'];

  /**
   * Prisma action of the field.
   * @example "findManyUser"
   */
  readonly prismaAction: FilterdPrismaAction;

  /**
   * String that contains the arg name according to prisma types.
   * @example "UserFindManyArgs"
   */
  readonly argName?: string;

  /**
   * Type of the model according to the prisma action.
   * @example "User" for "findManyUser"
   */
  readonly modelType: string | DMMF.OutputType | DMMF.SchemaEnum;

  /**
   * Linked `ExtendedDMMFModel`.
   * Used when generating the `select` and `include` args.
   */
  readonly linkedModel?: ExtendedDMMFModel;

  constructor(
    readonly generatorConfig: GeneratorConfig,
    field: DMMF.SchemaField,
    datamodel: ExtendedDMMFDatamodel,
  ) {
    super(field.name);
    this.generatorConfig = generatorConfig;
    this.name = field.name;
    this.isNullable = field.isNullable;
    this.outputType = field.outputType;
    this.deprecation = field.deprecation;
    this.documentation = field.documentation;
    this.prismaAction = this._setMatchedPrismaAction();
    this.modelType = this._setModelType();
    this.argName = this._setArgName();
    this.linkedModel = this._setLinkedModel(datamodel);
    this.args = this._setArgs(field);
  }

  private _setArgs({ args }: DMMF.SchemaField) {
    return args.map((arg) => {
      const linkedField = this.linkedModel?.fields.find(
        (field) => field?.name === arg?.name,
      );

      return new ExtendedDMMFSchemaArg(this.generatorConfig, arg, linkedField);
    });
  }

  /**
   * Matches the prisma action to the specific field.
   * @example "findManyUser" for "findMany"
   * @returns prisma action of the field e.g. "findMany"
   */
  private _setMatchedPrismaAction() {
    return PRISMA_ACTION_ARRAY.find((elem) =>
      this.name.includes(elem),
    ) as FilterdPrismaAction; // can be asserted because all other fields are filterd in ExtendedDMMFOutputType
  }

  /**
   * Extracts the type of the model from the prisma action.
   * @example "findManyUser" -> "User"
   * @returns type of the model extracted from string
   */
  private _setModelType() {
    return this.name
      .replace(this.prismaAction as string, '')
      .replace('OrThrow', '');
  }

  /**
   * Rebuilds the `arg` typename used in prisma types.
   * @example "findManyUser" -> "UserFindManyArgs"
   * @returns name of the argType used in prisma types
   */
  private _setArgName() {
    const argName: FormattedNames | undefined =
      PRISMA_ACTION_ARG_MAP[this.prismaAction];

    if (this.name.includes('OrThrow')) {
      return `${this.modelType}${argName?.formattedNames.pascalCase}OrThrowArgs`;
    }

    return `${this.modelType}${argName?.formattedNames.pascalCase}Args`;
  }

  /**
   * Link dmmf model to schema field to get access to the model properties.
   * Used when generating the `select` and `include` args.
   * @returns datamodel matching the field
   */
  private _setLinkedModel(datamodel: ExtendedDMMFDatamodel) {
    return datamodel.models.find((model) =>
      typeof this.modelType === 'string'
        ? this.modelType.includes(model.name)
        : false,
    );
  }
}
