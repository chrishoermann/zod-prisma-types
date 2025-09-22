import type DMMF from '@prisma/dmmf';

import { ExtendedDMMFFieldClass } from '../../extendedDMMFField';

export const MODEL_BASE: DMMF.Model = {
  name: 'User',
  dbName: null,
  schema: null,
  fields: [
    new ExtendedDMMFFieldClass(
      {
        name: 'id',
        kind: 'scalar',
        isList: false,
        isRequired: true,
        isUnique: false,
        isId: true,
        isReadOnly: false,
        hasDefaultValue: true,
        type: 'Int',
        default: {
          name: 'autoincrement',
          args: [],
        },
        isGenerated: false,
        isUpdatedAt: false,
      },

      'User',
    ),
    new ExtendedDMMFFieldClass(
      {
        name: 'email',
        kind: 'scalar',
        isList: false,
        isRequired: true,
        isUnique: true,
        isId: false,
        isReadOnly: false,
        hasDefaultValue: false,
        type: 'String',
        isGenerated: false,
        isUpdatedAt: false,
      },

      'User',
    ),
  ],
  primaryKey: null,
  uniqueFields: [],
  uniqueIndexes: [],
  isGenerated: false,
};

export const MODEL_WITH_AUTO_IMPORT_FILDS: DMMF.Model = {
  name: 'User',
  dbName: null,
  schema: null,
  fields: [
    {
      name: 'id',
      kind: 'scalar',
      isList: false,
      isRequired: true,
      isUnique: false,
      isId: true,
      isReadOnly: false,
      hasDefaultValue: true,
      type: 'Decimal',
      default: {
        name: 'autoincrement',
        args: [],
      },
      isGenerated: false,
      isUpdatedAt: false,
    },
    // Json
    {
      name: 'json',
      kind: 'scalar',
      isList: false,
      isRequired: true,
      isUnique: false,
      isId: false,
      isReadOnly: false,
      hasDefaultValue: false,
      type: 'Json',
      isGenerated: false,
      isUpdatedAt: false,
    },
    // optional Json
    {
      name: 'optionalJson',
      kind: 'scalar',
      isList: false,
      isRequired: false,
      isUnique: false,
      isId: false,
      isReadOnly: false,
      hasDefaultValue: false,
      type: 'Json',
      isGenerated: false,
      isUpdatedAt: false,
    },
    // enum
    {
      name: 'enum',
      kind: 'enum',
      isList: false,
      isRequired: true,
      isUnique: false,
      isId: false,
      isReadOnly: false,
      hasDefaultValue: false,
      type: 'Role',
      isGenerated: false,
      isUpdatedAt: false,
    },
  ],
  primaryKey: null,
  uniqueFields: [],
  uniqueIndexes: [],
  isGenerated: false,
};

export const FIELD_BASE: DMMF.Field = {
  kind: 'scalar',
  name: 'test',
  isRequired: true,
  isList: false,
  isUnique: false,
  isId: false,
  isReadOnly: false,
  type: 'String',
  // dbNames: ['test'],
  isGenerated: false,
  isUpdatedAt: false,
  hasDefaultValue: false,
  default: undefined,
  relationToFields: undefined,
  relationOnDelete: undefined,
  relationName: undefined,
  documentation: undefined,
};
