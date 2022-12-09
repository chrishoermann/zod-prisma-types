import { DMMF } from '@prisma/generator-helper';
import { FormattedNames } from './formattedNames';
export declare class ExtendedDMMFEnum extends FormattedNames {
  readonly name: string;
  readonly values: DMMF.EnumValue[];
  readonly dbName?: string | null;
  readonly documentation?: string;
  constructor(enums: DMMF.DatamodelEnum);
}
//# sourceMappingURL=extendedDMMFEnum.d.ts.map
