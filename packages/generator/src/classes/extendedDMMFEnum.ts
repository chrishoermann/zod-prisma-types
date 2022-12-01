/* eslint-disable @typescript-eslint/no-explicit-any */
import { DMMF } from '@prisma/generator-helper';

import { FormattedNames } from './formattedNames';

/////////////////////////////////////////////////
// TYPES  INTERFACE
/////////////////////////////////////////////////

export type EnumListFilter =
  | '@generate.enum.listFilter'
  | '@generate.enum.filter';

export const ENUM_LIST_FILTER: EnumListFilter = '@generate.enum.listFilter';
export const ENUM_FILTER: EnumListFilter = '@generate.enum.filter';

/////////////////////////////////////////////////
// CLASSES
/////////////////////////////////////////////////

// EXTENDED ENUM
// ------------------------------------------------------

export class ExtendedDMMFEnum extends FormattedNames {
  name: string;
  values: DMMF.EnumValue[];
  dbName?: string | null;
  documentation?: string;

  constructor(enums: DMMF.DatamodelEnum) {
    super(enums.name);

    this.name = enums.name;
    this.values = enums.values;
    this.dbName = enums.dbName;
    this.documentation = enums.documentation;
  }
}
