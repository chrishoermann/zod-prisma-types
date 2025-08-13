import type DMMF from '@prisma/dmmf';
import type { ReadonlyDeep } from '@prisma/dmmf/dist/util';

import { ExtendedDMMFModel, writeImportStatementOptions } from '.';
import { PRISMA_ACTION_ARRAY } from '../constants/objectMaps';
import { GeneratorConfig } from '../schemas';
import { ExtendedDMMFDatamodel } from './extendedDMMFDatamodel';
import { ExtendedDMMFSchemaField } from './extendedDMMFSchemaField';
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
  readonly prismaActionFields: ExtendedDMMFSchemaField[];
  readonly prismaOtherFields: ExtendedDMMFSchemaField[];
  readonly linkedModel?: ExtendedDMMFModel;
  readonly selectImports: writeImportStatementOptions[];
  readonly includeImports: writeImportStatementOptions[];

  constructor(
    readonly generatorConfig: GeneratorConfig,
    type: DMMF.OutputType,
    datamodel: ExtendedDMMFDatamodel,
  ) {
    super(type.name);
    this.generatorConfig = generatorConfig;
    this.name = type.name;
    this.fields = this._setFields(type.fields, datamodel);
    this.prismaActionFields = this._setFields(
      type.fields,
      datamodel,
      'PRISMA_ACTION',
    );
    this.prismaOtherFields = this._setFields(
      type.fields,
      datamodel,
      'OTHER_FIELDS',
    );
    this.linkedModel = this._setLinkedModel(datamodel);
    this.selectImports = this._setSelectImports();
    this.includeImports = this._setIncludeImports();
  }

  /**
   * Generates the import string for the given import name and path.
   * This function is used to generate the import statements for the output types.
   * It checks the module resolution setting and adds the .js extension if necessary.
   * @param schemaName Name of the schema to be imported
   * @returns A string representing the import statement
   *          e.g. `import { MyModelArgsSchema } from "../prisma/MyModelArgsSchema.js"`
   */
  private _generateSchemaImportString(
    schemaName: string,
  ): writeImportStatementOptions {
    const { outputTypePath } = this.generatorConfig;
    return {
      name: schemaName,
      path: `../${outputTypePath}/${schemaName}`,
    };
  }

  /**
   * Finds the datamodel that matches the input type.
   * This way the documentation ,validator strings and other information
   * from the datamodel can be added to the input types.
   */
  private _setLinkedModel(datamodel: ExtendedDMMFDatamodel) {
    return datamodel.models.find((model) => {
      return this.name.match(model.name);
    });
  }

  /**
   * Creates an array of ExtendedDMMFSchemaField objects.
   * - Returns the fields that are in the `PRISMA_ACTION_ARRAY` if the fieldCategory is set to `PRISMA_ACTION`.
   * - Returns all fields that are not in `PRISMA_ACTION_ARRAY` if the fieldCategory is set to `OTHER_FIELDS`.
   */
  private _setFields(
    fields: ReadonlyDeep<DMMF.SchemaField[]>,
    datamodel: ExtendedDMMFDatamodel,
    fieldCategory?: 'PRISMA_ACTION' | 'OTHER_FIELDS',
  ) {
    if (fieldCategory === 'PRISMA_ACTION') {
      return fields
        .filter(
          (field) =>
            !field.name.includes('Raw') && // necessary for mongodb because a RawAggregate type would otherwise be generated
            PRISMA_ACTION_ARRAY.some((elem) => {
              return elem.every((e) => field.name.includes(e));
            }),
        )
        .map((field) => {
          // console.log('prisma fields', field.name);
          return new ExtendedDMMFSchemaField(
            this.generatorConfig,
            field,
            datamodel,
          );
        });
    }

    if (fieldCategory === 'OTHER_FIELDS') {
      return fields
        .filter(
          (field) =>
            !PRISMA_ACTION_ARRAY.some((elem) => {
              return elem.every((e) => field.name.includes(e));
            }),
        )
        .map((field) => {
          // console.log('other fields', field.name);
          return new ExtendedDMMFSchemaField(
            this.generatorConfig,
            field,
            datamodel,
          );
        });
    }

    return fields.map((field) => {
      return new ExtendedDMMFSchemaField(
        this.generatorConfig,
        field,
        datamodel,
      );
    });
  }

  private _setSelectImports() {
    const imports: writeImportStatementOptions[] = [];

    this.fields.forEach((field) => {
      if (field.writeSelectFindManyField) {
        return imports.push(
          this._generateSchemaImportString(
            `${field.outputType.type}FindManyArgsSchema`,
          ),
        );
      }

      if (field.writeSelectField) {
        return imports.push(
          this._generateSchemaImportString(
            `${field.outputType.type}ArgsSchema`,
          ),
        );
      }

      return undefined;
    });

    return imports;
  }

  private _setIncludeImports() {
    const imports: writeImportStatementOptions[] = [];

    this.fields.forEach((field) => {
      if (field.writeIncludeFindManyField) {
        return imports.push(
          this._generateSchemaImportString(
            `${field.outputType.type}FindManyArgsSchema`,
          ),
        );
      }

      if (field.writeIncludeField) {
        return imports.push(
          this._generateSchemaImportString(
            `${field.outputType.type}ArgsSchema`,
          ),
        );
      }

      return undefined;
    });

    return imports;
  }

  /**
   * This function checks if the output type has a field with the name "_count".
   * This information is necessary when generating the `include` and `select` arguments.
   * @returns true if the output type has a field with the name "_count"
   */
  hasCountField() {
    return this.fields.some((field) => field.name === '_count');
  }

  /**
   * This function checks if the output type has fields that are relations to other models.
   * This information is necessary when generating the `include` and `select` arguments.
   * @returns true if the output type has fields that are relations to other models
   */
  hasRelationField() {
    return this.fields.some(
      (field) => field.outputType.location === 'outputObjectTypes',
    );
  }

  // only write the include statement if the type is a prisma model
  writeMongoDbInclude() {
    return (
      this.generatorConfig.isMongoDb &&
      this.fields.some((field) => field.isObjectOutputType())
    );
  }

  writeInclude() {
    return this.hasRelationField() || this.writeMongoDbInclude();
  }

  writeIncludeArgs() {
    return this.hasRelationField() || this.generatorConfig.isMongoDb;
  }

  writeCountArgs() {
    return this.hasCountField();
  }
}
