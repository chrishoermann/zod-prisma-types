import type DMMF from '@prisma/dmmf';
import { GeneratorConfig } from '../../schemas';
import { ExtendedDMMFModelValidatorPattern } from './04_extendedDMMFModelValidatorPattern';
import { transformImportStringToList } from '../../utils/transformImportStringToList';
import { validateImportStatement } from '../../utils/validateImportStatements';
import { writeImportStatementOptions } from '../fileWriter';
import { transformImportListToOptions } from '../../utils/transformImportListToOptions';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFModelImportStatement extends ExtendedDMMFModelValidatorPattern {
  protected _importStatements?: string[];
  protected _automaticImports?: writeImportStatementOptions[];
  readonly modelImports: writeImportStatementOptions[];
  readonly fieldImports: writeImportStatementOptions[];
  readonly imports: writeImportStatementOptions[];

  constructor(generatorConfig: GeneratorConfig, model: DMMF.Model) {
    super(generatorConfig, model);

    this._importStatements = this._getImportStatement();
    this._automaticImports = this._getAutomaticImports();
    this.modelImports = this._getModelImports();
    this.fieldImports = this._getFieldImports();
    this.imports = this._getImports();
  }

  /**
   * Validates all the import statements before further processing.
   * @returns array of import statements that are defined in the model's docs.
   */
  private _getImportStatement() {
    if (!this._validatorList) return;
    const importStatements = this._validatorList
      .filter((elem) => elem.includes('.import('))
      .map((importStatement) => {
        return validateImportStatement(importStatement, this._errorLocation);
      });

    return importStatements;
  }

  /**
   * Checks for certain field types and conditions and adds the necessary import statements to the model's imports.
   * @returns array of import statements that are automatically added to the model's imports.
   */
  private _getAutomaticImports() {
    const statements: writeImportStatementOptions[] = [];

    const {
      inputTypePath,
      prismaClientPath,
      prismaLibraryPath,
      isPrismaClientGenerator,
    } = this.generatorConfig;

    if (this.fields.some((field) => field.isJsonType)) {
      statements.push({
        name: 'JsonValueSchema',
        path: `../${inputTypePath}/JsonValueSchema`,
      });
    }

    if (this.hasDecimalFields) {
      if (isPrismaClientGenerator) {
        statements.push({
          name: 'Decimal',
          as: 'PrismaDecimal',
          path: prismaLibraryPath,
        });
      } else {
        statements.push({
          name: 'Prisma',
          path: prismaClientPath,
        });
      }
    }

    this.enumFields.forEach((field) => {
      statements.push({
        name: `${field.type}Schema`,
        path: `../${inputTypePath}/${field.type}Schema`,
      });
    });

    return statements;
  }

  private _getModelImports() {
    if (!this._importStatements) return [];

    const importList = this._importStatements
      .map((importStatement) => {
        return transformImportStringToList(importStatement);
      })
      .flat();

    return transformImportListToOptions(importList);
  }

  private _getImports() {
    const imports: writeImportStatementOptions[] = [];

    if (this._automaticImports) {
      this._automaticImports.forEach((statement) => imports.push(statement));
    }

    if (this.modelImports) {
      this.modelImports.forEach((statement) => imports.push(statement));
    }

    if (this.fieldImports) {
      this.fieldImports.forEach((statement) => imports.push(statement));
    }

    return imports;
  }

  private _getFieldImports() {
    const imports: writeImportStatementOptions[] = [];

    this.fields.forEach((field) => {
      if (field.imports) {
        field.imports.forEach((statement) => imports.push(statement));
      }
    });

    return imports;
  }
}
