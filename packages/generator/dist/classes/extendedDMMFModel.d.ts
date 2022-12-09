import { DMMF } from '@prisma/generator-helper';
import { ExtendedDMMFField } from './extendedDMMFField';
import { FormattedNames } from './formattedNames';
export declare class ExtendedDMMFModel
  extends FormattedNames
  implements DMMF.Model
{
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
  constructor(model: DMMF.Model);
  private _getExtendedFields;
  private _setScalarFields;
  private _setRelationFields;
  private _setEnumfields;
  private _setHasRelationFields;
}
//# sourceMappingURL=extendedDMMFModel.d.ts.map
