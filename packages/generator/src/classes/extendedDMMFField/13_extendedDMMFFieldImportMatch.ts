import type DMMF from '@prisma/dmmf';

import { GeneratorConfig } from '../../schemas';
import { transformImportStringToList } from '../../utils/transformImportStringToList';
import { validateImportStatement } from '../../utils/validateImportStatements';
import { ExtendedDMMFFieldZodType } from './12_extendedDMMFFieldZodType';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFFieldImportMatch extends ExtendedDMMFFieldZodType {
  protected _importStatements?: string;
  readonly imports: Set<string>;

  constructor(
    field: DMMF.Field,
    generatorConfig: GeneratorConfig,
    modelName: string,
  ) {
    super(field, generatorConfig, modelName);

    this._importStatements = this._getImportStatement();
    this.imports = this._getImports();
  }

  private _getImportStatement() {
    if (!this._validatorMatch?.groups?.['import']) return;
    return validateImportStatement(
      this._validatorMatch?.groups?.['import'],
      this._errorLocation,
    );
  }

  private _getImports() {
    if (!this._importStatements) return new Set([]);
    return new Set(transformImportStringToList(this._importStatements));
  }
}
