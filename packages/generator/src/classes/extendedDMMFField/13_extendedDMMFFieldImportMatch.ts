import { DMMF } from '@prisma/generator-helper';

import { GeneratorConfig } from '../../schemas';
import { transformImportStringToList } from '../../utils/transformImportStringToList';
import { validateImportStatement } from '../../utils/validateImportStatements';
import { ExtendedDMMFFieldZodType } from './12_extendedDMMFFieldZodType';
import { transformImportListToOptions } from '../../utils/transformImportListToOptions';
import { writeImportStatementOptions } from '../fileWriter';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFFieldImportMatch extends ExtendedDMMFFieldZodType {
  protected _importStatements?: string;
  readonly imports: writeImportStatementOptions[];

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
    if (!this._importStatements) return [];
    const importList = transformImportStringToList(this._importStatements);
    return transformImportListToOptions(importList);
  }
}
