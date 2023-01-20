import { DMMF } from '@prisma/generator-helper';
import { IMPORT_STATEMENT_REGEX } from '../constants';

import { GeneratorConfig } from '.';
import { ExtendedDMMFField } from './extendedDMMFField';
import { FormattedNames } from './formattedNames';

/////////////////////////////////////////////////
// TYPES  INTERFACE
/////////////////////////////////////////////////

export class ExtendedDMMFModel extends FormattedNames implements DMMF.Model {
  readonly generatorConfig: GeneratorConfig;
  readonly name: DMMF.Model['name'];
  readonly dbName: DMMF.Model['dbName'];
  readonly fields: ExtendedDMMFField[];
  readonly uniqueFields: DMMF.Model['uniqueFields'];
  readonly uniqueIndexes: DMMF.Model['uniqueIndexes'];
  readonly documentation?: DMMF.Model['documentation'];
  readonly primaryKey: DMMF.Model['primaryKey'];
  readonly scalarFields: ExtendedDMMFField[];
  readonly relationFields: ExtendedDMMFField[];
  readonly enumFields: ExtendedDMMFField[];
  readonly hasRelationFields: boolean;
  readonly hasOmitFields: boolean;
  readonly imports: Set<string>;
  readonly customImports?: Set<string>;
  readonly errorLocation: string;
  readonly clearedDocumentation?: string;

  constructor(generatorConfig: GeneratorConfig, model: DMMF.Model) {
    super(model.name);
    this.generatorConfig = generatorConfig;
    this.name = model.name;
    this.dbName = model.dbName;
    this.fields = this._getExtendedFields(model);
    this.uniqueFields = model.uniqueFields;
    this.uniqueIndexes = model.uniqueIndexes;
    this.documentation = model.documentation;
    this.primaryKey = model.primaryKey;
    this.scalarFields = this._setScalarFields();
    this.relationFields = this._setRelationFields();
    this.enumFields = this._setEnumfields();
    this.hasRelationFields = this._setHasRelationFields();
    this.hasOmitFields = this._setHasOmitFields();
    this.errorLocation = this._setErrorLocation();

    const docsContent = this._getDocumentationContent();

    this.imports = docsContent.imports;
    this.customImports = docsContent.customImports;
    this.clearedDocumentation = docsContent?.documentation;
  }

  private _setErrorLocation() {
    return `[Error Location]: Model: '${this.name}'.`;
  }

  private _getExtendedFields(model: DMMF.Model) {
    return model.fields.map(
      (field) => new ExtendedDMMFField(this.generatorConfig, field, this.name),
    );
  }

  private _setScalarFields() {
    return this.fields.filter((field) => field.kind === 'scalar');
  }

  private _setRelationFields() {
    return this.fields.filter((field) => field.kind === 'object');
  }

  private _setEnumfields() {
    return this.fields.filter((field) => field.kind === 'enum');
  }

  private _setHasRelationFields() {
    return this.relationFields.length > 0;
  }

  private _setHasOmitFields() {
    return this.fields.some((field) => field.isOmitField());
  }

  private _getDocumentationContent() {
    const zodDirectives = this._extractZodDirectives();
    const automaticImports = this._getAutomaticImports();

    if (!zodDirectives)
      return {
        imports: new Set(automaticImports),
      };

    return {
      imports: new Set([...zodDirectives.statements, ...automaticImports]),
      documentation: zodDirectives.clearedDocumentation,
      customImports: new Set(zodDirectives.statements),
    };
  }

  /**
   * extracts import statements  from the model's documentation and removes them from the documentation.
   * @returns array of import statements from the model's documentation and
   * a string of the documentation with the import statements removed.
   */
  private _extractZodDirectives() {
    if (!this.documentation) return;

    const importStatements = this.documentation?.match(IMPORT_STATEMENT_REGEX);
    if (!importStatements) return;

    const type = importStatements.groups?.['type'];
    if (type !== 'import')
      throw new Error(
        `[@zod generator error]: '${type}' is not a valid validator key. ${this.errorLocation}`,
      );

    const importsList = importStatements.groups?.['imports']?.split(', ');
    if (!importsList) return;

    return {
      statements: importsList
        .map((statement) =>
          statement
            .match(/"(?<statement>[\w "'\{\}\/,;.*]+)"/)
            ?.groups?.['statement'].replace(/["']/g, "'"),
        )
        .filter(
          (statement): statement is string => typeof statement === 'string',
        ),
      clearedDocumentation: this.documentation.replace(importStatements[0], ''),
    };
  }

  /**
   * Checks for certain field types and conditions and adds the necessary import statements to the model's imports.
   * @returns array of import statements that are automatically added to the model's imports.
   */
  private _getAutomaticImports() {
    const statements: string[] = [];
    if (this.fields.some((field) => field.isJsonType && !field.isRequired)) {
      statements.push(
        `import { NullableJsonValue } from "../${this.generatorConfig.inputTypePath}/NullableJsonValue"`,
      );
    }

    if (this.fields.some((field) => field.isJsonType && field.isRequired)) {
      statements.push(
        `import { InputJsonValue } from "../${this.generatorConfig.inputTypePath}/InputJsonValue"`,
      );
    }

    if (this.fields.some((field) => field.isDecimalType)) {
      statements.push(
        `import * as PrismaClient from '${this.generatorConfig.prismaClientPath}'`,
        `import { DecimalJSLikeSchema } from "../${this.generatorConfig.inputTypePath}/DecimalJsLikeSchema"`,
        `import { isValidDecimalInput } from "../${this.generatorConfig.inputTypePath}/isValidDecimalInput"`,
      );
    }

    this.enumFields.forEach((field) => {
      statements.push(
        `import { ${field.type}Schema } from '../${this.generatorConfig.inputTypePath}/${field.type}Schema'`,
      );
    });

    return statements;
  }

  writeOptionalDefaultValuesTypes() {
    return (
      this.fields.some((field) => field.isOptionalDefaultField()) &&
      this.generatorConfig.createOptionalDefaultValuesTypes
    );
  }

  hasDecimalFields() {
    return this.fields.some((field) => field.isDecimalType);
  }
}
