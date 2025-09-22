import type DMMF from '@prisma/dmmf';

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
