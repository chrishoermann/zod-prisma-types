import { DMMF } from '@prisma/generator-helper';

import { GeneratorConfig } from '../../schemas';
import { ExtendedDMMFFieldValidatorMatch } from './02_extendedDMMFFieldValidatorMatch';
import { transformImportStringToSet } from 'src/utils/transformImportStringToSet';
import { validateImportStatements } from 'src/utils/validateImportStatements';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFFieldImportMatch extends ExtendedDMMFFieldValidatorMatch {
  protected _importStatement?: string;
  protected _importStatements?: string;
  readonly imports?: Set<string>;

  constructor(
    field: DMMF.Field,
    generatorConfig: GeneratorConfig,
    modelName: string,
  ) {
    super(field, generatorConfig, modelName);

    this._importStatement = this._getImportStatement();
    this._importStatements = this._getImportStatements();
    this.imports = this._getImports();
  }

  private _getImportStatement() {
    if (!this._validatorMatch?.groups?.['import']) return;
    const importStatements = validateImportStatements(
      this._validatorMatch?.groups?.['import'],
      this._errorLocation,
    );

    return importStatements;
  }
  private _getImportStatements() {
    if (!this._validatorMatch?.groups?.['imports']) return;
    return this._validatorMatch?.groups?.['imports'];
  }

  private _getImports() {
    if (!this._importStatements) return;
    return new Set(transformImportStringToSet(this._importStatements));
  }
}
