import type DMMF from '@prisma/dmmf';
import { GeneratorConfig } from '../../schemas';
import { ExtendedDMMFModelValidatorPattern } from './04_extendedDMMFModelValidatorPattern';
import { transformImportStringToList } from '../../utils/transformImportStringToList';
import { validateImportStatement } from '../../utils/validateImportStatements';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFModelImportStatement extends ExtendedDMMFModelValidatorPattern {
  protected _importStatements?: string[];
  protected _automaticImports?: string[];
  readonly modelImports: Set<string>;
  readonly fieldImports: Set<string>;
  readonly imports: Set<string>;

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
    const statements: string[] = [];

    const {
      inputTypePath,
      prismaClientPath,
      prismaLibraryPath,
      isPrismaClientGenerator,
    } = this.generatorConfig;

    if (this.fields.some((field) => field.isJsonType)) {
      statements.push(
        `import { JsonValueSchema } from '../${inputTypePath}/JsonValueSchema'`,
      );
    }

    if (this.hasDecimalFields) {
      if (isPrismaClientGenerator) {
        statements.push(
          `import { Decimal as PrismaDecimal } from '${prismaLibraryPath}';`,
        );
      } else {
        statements.push(`import { Prisma } from '${prismaClientPath}'`);
      }
    }

    this.enumFields.forEach((field) => {
      statements.push(
        `import { ${field.type}Schema } from '../${inputTypePath}/${field.type}Schema'`,
      );
    });

    return statements;
  }

  private _getModelImports() {
    if (!this._importStatements) return new Set<string>();

    const importList = this._importStatements
      .map((importStatement) => {
        return transformImportStringToList(importStatement);
      })
      .flat();

    return new Set(importList);
  }

  private _getImports() {
    const imports = new Set<string>();

    if (this._automaticImports) {
      this._automaticImports.forEach((statement) => imports.add(statement));
    }

    if (this.modelImports) {
      this.modelImports.forEach((statement) => imports.add(statement));
    }

    if (this.fieldImports) {
      this.fieldImports.forEach((statement) => imports.add(statement));
    }

    return imports;
  }

  private _getFieldImports() {
    const imports = new Set<string>();

    this.fields.forEach((field) => {
      if (field.imports) {
        field.imports.forEach((statement) => imports.add(statement));
      }
    });

    return imports;
  }
}
