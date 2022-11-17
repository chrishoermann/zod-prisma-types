/* eslint-disable no-new */
import { DMMF } from '@prisma/generator-helper';
import { it, expect } from 'vitest';

import { DMMFField, PrismaScalarTypeMap } from '../../DMMFField';

const BASE_FIELD: DMMF.Field = {
  name: 'name',
  kind: 'scalar',
  isRequired: false,
  isList: false,
  isUnique: false,
  isId: false,
  isReadOnly: false,
  type: 'String',
  dbNames: ['name'],
  isGenerated: false,
  hasDefaultValue: false,
  default: undefined,
  relationToFields: undefined,
  relationOnDelete: undefined,
  relationName: undefined,
};

export const FIELDS: PrismaScalarTypeMap<DMMF.Field> = {
  String: { ...BASE_FIELD, type: 'String' },
  Boolean: { ...BASE_FIELD, type: 'Boolean' },
  DateTime: { ...BASE_FIELD, type: 'DateTime' },
  Int: { ...BASE_FIELD, type: 'Int' },
  BigInt: { ...BASE_FIELD, type: 'BigInt' },
  Float: { ...BASE_FIELD, type: 'Float' },
  Decimal: { ...BASE_FIELD, type: 'Decimal' },
  Json: { ...BASE_FIELD, type: 'Json' },
  Bytes: { ...BASE_FIELD, type: 'Bytes' },
};

it('should extract validator from a string', () => {
  const type = 'string';
  const validator = ".min(3, { message: 'some string' })";
  const match = `@zod.${type}${validator}`;

  const field = new DMMFField({
    ...FIELDS.String,
    documentation: `some string - ${match}`,
  });

  expect(field.validator).toEqual({
    match,
    type,
    typeErrorMessages: undefined,
    validator,
  });
});

// it('should extract validator from a date', () => {
//   const type = 'date';
//   const validator = ".min(3, { message: 'some string' })";
//   const match = `@zod.${type}${validator}`;

//   const field = new DMMFField({
//     ...FIELDS.DateTime,
//     documentation: `some date - ${match}`,
//   });

//   expect(field.validator).toEqual({
//     match,
//     type,
//     typeErrorMessages: undefined,
//     validator,
//   });
// });

// it('should extract validator from a dateTime', () => {
//   const type = 'string';
//   const validator = '.datetime()';
//   const match = `@zod.${type}${validator}`;

//   const field = new DMMFField({
//     ...FIELDS.DateTime,
//     documentation: `some date - ${match}`,
//   });

//   expect(field.validator).toEqual({
//     match,
//     type,
//     typeErrorMessages: undefined,
//     validator,
//   });
// });

// it('should extract validator from a float', () => {
//   const type = 'number';
//   const validator = ".min(3, { message: 'some string' })";
//   const match = `@zod.${type}${validator}`;

//   const field = new DMMFField({
//     ...FIELDS.Float,
//     documentation: `some float - ${match}`,
//   });

//   expect(field.validator).toEqual({
//     match,
//     type,
//     typeErrorMessages: undefined,
//     validator,
//   });
// });

// it('should extract validator with custom error messages', () => {
//   const type = 'string';
//   const typeErrorMessages =
//     "({ custom_error: 'myMessage', error_type: 'myType' })";
//   const validator = ".min(3, { message: 'some string' })";
//   const match = `@zod.${type}${typeErrorMessages}${validator}`;

//   const field = new DMMFField({
//     ...FIELDS.String,
//     documentation: `some string - ${match}`,
//   });

//   expect(field.validator).toEqual({
//     match,
//     type,
//     typeErrorMessages,
//     validator,
//   });
// });

// it('should not extract validator if zod.string is used on number', () => {
//   expect(() => {
//     new DMMFField({
//       ...FIELDS.BigInt,
//       documentation:
//         'some string - @zod.string.min(3, { message: "some string" })',
//     });
//     // eslint-disable-next-line prettier/prettier
//   }).toThrowError("Validator 'string' is not valid for type 'BigInt'");
// });
