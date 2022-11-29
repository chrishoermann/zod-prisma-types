import * as Prisma from '@prisma/client';
import { z } from 'zod';

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const QueryMode = z.nativeEnum(Prisma.Prisma.QueryMode);

export const SortOrder = z.nativeEnum(Prisma.Prisma.SortOrder);

export const TransactionIsolationLevel = z.nativeEnum(
  Prisma.Prisma.TransactionIsolationLevel,
);

export const UserScalarFieldEnum = z.nativeEnum(
  Prisma.Prisma.UserScalarFieldEnum,
);

export const MyValue = z.nativeEnum(Prisma.MyValue);

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInput: z.ZodType<Prisma.Prisma.UserWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserWhereInput),
        z.lazy(() => UserWhereInput).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserWhereInput)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserWhereInput),
        z.lazy(() => UserWhereInput).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilter), z.string()]).optional(),
    name: z
      .union([z.lazy(() => StringNullableFilter), z.string()])
      .optional()
      .nullable(),
    value: z
      .union([z.lazy(() => EnumMyValueFilter), z.lazy(() => MyValue)])
      .optional(),
    intTwo: z.union([z.lazy(() => IntFilter), z.number()]).optional(),
    int: z
      .union([z.lazy(() => IntNullableFilter), z.number()])
      .optional()
      .nullable(),
    floatOpt: z
      .union([z.lazy(() => FloatNullableFilter), z.number()])
      .optional()
      .nullable(),
    float: z.union([z.lazy(() => FloatFilter), z.number()]).optional(),
    decimal: z.union([z.lazy(() => DecimalFilter), z.number()]).optional(),
    decimalOpt: z
      .union([z.lazy(() => DecimalNullableFilter), z.number()])
      .optional()
      .nullable(),
    bigInt: z.union([z.lazy(() => BigIntFilter), z.bigint()]).optional(),
    bigIntOpt: z
      .union([z.lazy(() => BigIntNullableFilter), z.bigint()])
      .optional()
      .nullable(),
  })
  .strict();

export const UserOrderByWithRelationInput: z.ZodType<Prisma.Prisma.UserOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrder).optional(),
      name: z.lazy(() => SortOrder).optional(),
      value: z.lazy(() => SortOrder).optional(),
      intTwo: z.lazy(() => SortOrder).optional(),
      int: z.lazy(() => SortOrder).optional(),
      floatOpt: z.lazy(() => SortOrder).optional(),
      float: z.lazy(() => SortOrder).optional(),
      decimal: z.lazy(() => SortOrder).optional(),
      decimalOpt: z.lazy(() => SortOrder).optional(),
      bigInt: z.lazy(() => SortOrder).optional(),
      bigIntOpt: z.lazy(() => SortOrder).optional(),
    })
    .strict();

export const UserWhereUniqueInput: z.ZodType<Prisma.Prisma.UserWhereUniqueInput> =
  z
    .object({
      id: z.string().optional(),
    })
    .strict();

export const UserOrderByWithAggregationInput: z.ZodType<Prisma.Prisma.UserOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrder).optional(),
      name: z.lazy(() => SortOrder).optional(),
      value: z.lazy(() => SortOrder).optional(),
      intTwo: z.lazy(() => SortOrder).optional(),
      int: z.lazy(() => SortOrder).optional(),
      floatOpt: z.lazy(() => SortOrder).optional(),
      float: z.lazy(() => SortOrder).optional(),
      decimal: z.lazy(() => SortOrder).optional(),
      decimalOpt: z.lazy(() => SortOrder).optional(),
      bigInt: z.lazy(() => SortOrder).optional(),
      bigIntOpt: z.lazy(() => SortOrder).optional(),
      _count: z.lazy(() => UserCountOrderByAggregateInput).optional(),
      _avg: z.lazy(() => UserAvgOrderByAggregateInput).optional(),
      _max: z.lazy(() => UserMaxOrderByAggregateInput).optional(),
      _min: z.lazy(() => UserMinOrderByAggregateInput).optional(),
      _sum: z.lazy(() => UserSumOrderByAggregateInput).optional(),
    })
    .strict();

export const UserScalarWhereWithAggregatesInput: z.ZodType<Prisma.Prisma.UserScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => UserScalarWhereWithAggregatesInput),
          z.lazy(() => UserScalarWhereWithAggregatesInput).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => UserScalarWhereWithAggregatesInput)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => UserScalarWhereWithAggregatesInput),
          z.lazy(() => UserScalarWhereWithAggregatesInput).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilter), z.string()])
        .optional(),
      name: z
        .union([z.lazy(() => StringNullableWithAggregatesFilter), z.string()])
        .optional()
        .nullable(),
      value: z
        .union([
          z.lazy(() => EnumMyValueWithAggregatesFilter),
          z.lazy(() => MyValue),
        ])
        .optional(),
      intTwo: z
        .union([z.lazy(() => IntWithAggregatesFilter), z.number()])
        .optional(),
      int: z
        .union([z.lazy(() => IntNullableWithAggregatesFilter), z.number()])
        .optional()
        .nullable(),
      floatOpt: z
        .union([z.lazy(() => FloatNullableWithAggregatesFilter), z.number()])
        .optional()
        .nullable(),
      float: z
        .union([z.lazy(() => FloatWithAggregatesFilter), z.number()])
        .optional(),
      decimal: z
        .union([z.lazy(() => DecimalWithAggregatesFilter), z.number()])
        .optional(),
      decimalOpt: z
        .union([z.lazy(() => DecimalNullableWithAggregatesFilter), z.number()])
        .optional()
        .nullable(),
      bigInt: z
        .union([z.lazy(() => BigIntWithAggregatesFilter), z.bigint()])
        .optional(),
      bigIntOpt: z
        .union([z.lazy(() => BigIntNullableWithAggregatesFilter), z.bigint()])
        .optional()
        .nullable(),
    })
    .strict();

export const UserCreateInput: z.ZodType<Prisma.Prisma.UserCreateInput> = z
  .object({
    id: z.string({ invalid_type_error: 'error' }).cuid().optional(),
    name: z.string({ required_error: 'error' }).optional().nullable(),
    value: z.lazy(() => MyValue),
    intTwo: z.number(),
    int: z.number().optional().nullable(),
    floatOpt: z.number().optional().nullable(),
    float: z.number(),
    decimal: z.number(),
    decimalOpt: z.number().optional().nullable(),
    bigInt: z.bigint(),
    bigIntOpt: z.bigint().optional().nullable(),
  })
  .strict();

export const UserUncheckedCreateInput: z.ZodType<Prisma.Prisma.UserUncheckedCreateInput> =
  z
    .object({
      id: z.string({ invalid_type_error: 'error' }).cuid().optional(),
      name: z.string({ required_error: 'error' }).optional().nullable(),
      value: z.lazy(() => MyValue),
      intTwo: z.number(),
      int: z.number().optional().nullable(),
      floatOpt: z.number().optional().nullable(),
      float: z.number(),
      decimal: z.number(),
      decimalOpt: z.number().optional().nullable(),
      bigInt: z.bigint(),
      bigIntOpt: z.bigint().optional().nullable(),
    })
    .strict();

export const UserUpdateInput: z.ZodType<Prisma.Prisma.UserUpdateInput> = z
  .object({
    id: z
      .union([
        z.string({ invalid_type_error: 'error' }).cuid(),
        z.lazy(() => StringFieldUpdateOperationsInput),
      ])
      .optional(),
    name: z
      .union([
        z.string({ required_error: 'error' }),
        z.lazy(() => NullableStringFieldUpdateOperationsInput),
      ])
      .optional()
      .nullable(),
    value: z
      .union([
        z.lazy(() => MyValue),
        z.lazy(() => EnumMyValueFieldUpdateOperationsInput),
      ])
      .optional(),
    intTwo: z
      .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInput)])
      .optional(),
    int: z
      .union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInput)])
      .optional()
      .nullable(),
    floatOpt: z
      .union([
        z.number(),
        z.lazy(() => NullableFloatFieldUpdateOperationsInput),
      ])
      .optional()
      .nullable(),
    float: z
      .union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInput)])
      .optional(),
    decimal: z
      .union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInput)])
      .optional(),
    decimalOpt: z
      .union([
        z.number(),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInput),
      ])
      .optional()
      .nullable(),
    bigInt: z
      .union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInput)])
      .optional(),
    bigIntOpt: z
      .union([
        z.bigint(),
        z.lazy(() => NullableBigIntFieldUpdateOperationsInput),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const UserUncheckedUpdateInput: z.ZodType<Prisma.Prisma.UserUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string({ invalid_type_error: 'error' }).cuid(),
          z.lazy(() => StringFieldUpdateOperationsInput),
        ])
        .optional(),
      name: z
        .union([
          z.string({ required_error: 'error' }),
          z.lazy(() => NullableStringFieldUpdateOperationsInput),
        ])
        .optional()
        .nullable(),
      value: z
        .union([
          z.lazy(() => MyValue),
          z.lazy(() => EnumMyValueFieldUpdateOperationsInput),
        ])
        .optional(),
      intTwo: z
        .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInput)])
        .optional(),
      int: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInput),
        ])
        .optional()
        .nullable(),
      floatOpt: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInput),
        ])
        .optional()
        .nullable(),
      float: z
        .union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInput)])
        .optional(),
      decimal: z
        .union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInput)])
        .optional(),
      decimalOpt: z
        .union([
          z.number(),
          z.lazy(() => NullableDecimalFieldUpdateOperationsInput),
        ])
        .optional()
        .nullable(),
      bigInt: z
        .union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInput)])
        .optional(),
      bigIntOpt: z
        .union([
          z.bigint(),
          z.lazy(() => NullableBigIntFieldUpdateOperationsInput),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const UserCreateManyInput: z.ZodType<Prisma.Prisma.UserCreateManyInput> =
  z
    .object({
      id: z.string({ invalid_type_error: 'error' }).cuid().optional(),
      name: z.string({ required_error: 'error' }).optional().nullable(),
      value: z.lazy(() => MyValue),
      intTwo: z.number(),
      int: z.number().optional().nullable(),
      floatOpt: z.number().optional().nullable(),
      float: z.number(),
      decimal: z.number(),
      decimalOpt: z.number().optional().nullable(),
      bigInt: z.bigint(),
      bigIntOpt: z.bigint().optional().nullable(),
    })
    .strict();

export const UserUpdateManyMutationInput: z.ZodType<Prisma.Prisma.UserUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string({ invalid_type_error: 'error' }).cuid(),
          z.lazy(() => StringFieldUpdateOperationsInput),
        ])
        .optional(),
      name: z
        .union([
          z.string({ required_error: 'error' }),
          z.lazy(() => NullableStringFieldUpdateOperationsInput),
        ])
        .optional()
        .nullable(),
      value: z
        .union([
          z.lazy(() => MyValue),
          z.lazy(() => EnumMyValueFieldUpdateOperationsInput),
        ])
        .optional(),
      intTwo: z
        .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInput)])
        .optional(),
      int: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInput),
        ])
        .optional()
        .nullable(),
      floatOpt: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInput),
        ])
        .optional()
        .nullable(),
      float: z
        .union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInput)])
        .optional(),
      decimal: z
        .union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInput)])
        .optional(),
      decimalOpt: z
        .union([
          z.number(),
          z.lazy(() => NullableDecimalFieldUpdateOperationsInput),
        ])
        .optional()
        .nullable(),
      bigInt: z
        .union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInput)])
        .optional(),
      bigIntOpt: z
        .union([
          z.bigint(),
          z.lazy(() => NullableBigIntFieldUpdateOperationsInput),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const UserUncheckedUpdateManyInput: z.ZodType<Prisma.Prisma.UserUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string({ invalid_type_error: 'error' }).cuid(),
          z.lazy(() => StringFieldUpdateOperationsInput),
        ])
        .optional(),
      name: z
        .union([
          z.string({ required_error: 'error' }),
          z.lazy(() => NullableStringFieldUpdateOperationsInput),
        ])
        .optional()
        .nullable(),
      value: z
        .union([
          z.lazy(() => MyValue),
          z.lazy(() => EnumMyValueFieldUpdateOperationsInput),
        ])
        .optional(),
      intTwo: z
        .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInput)])
        .optional(),
      int: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInput),
        ])
        .optional()
        .nullable(),
      floatOpt: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInput),
        ])
        .optional()
        .nullable(),
      float: z
        .union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInput)])
        .optional(),
      decimal: z
        .union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInput)])
        .optional(),
      decimalOpt: z
        .union([
          z.number(),
          z.lazy(() => NullableDecimalFieldUpdateOperationsInput),
        ])
        .optional()
        .nullable(),
      bigInt: z
        .union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInput)])
        .optional(),
      bigIntOpt: z
        .union([
          z.bigint(),
          z.lazy(() => NullableBigIntFieldUpdateOperationsInput),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const StringFilter: z.ZodType<Prisma.Prisma.StringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    mode: z.lazy(() => QueryMode).optional(),
    not: z.union([z.string(), z.lazy(() => NestedStringFilter)]).optional(),
  })
  .strict();

export const StringNullableFilter: z.ZodType<Prisma.Prisma.StringNullableFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      mode: z.lazy(() => QueryMode).optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableFilter)])
        .optional()
        .nullable(),
    })
    .strict();

export const EnumMyValueFilter: z.ZodType<Prisma.Prisma.EnumMyValueFilter> = z
  .object({
    equals: z.lazy(() => MyValue).optional(),
    in: z
      .lazy(() => MyValue)
      .array()
      .optional(),
    notIn: z
      .lazy(() => MyValue)
      .array()
      .optional(),
    not: z
      .union([z.lazy(() => MyValue), z.lazy(() => NestedEnumMyValueFilter)])
      .optional(),
  })
  .strict();

export const IntFilter: z.ZodType<Prisma.Prisma.IntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilter)]).optional(),
  })
  .strict();

export const IntNullableFilter: z.ZodType<Prisma.Prisma.IntNullableFilter> = z
  .object({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableFilter)])
      .optional()
      .nullable(),
  })
  .strict();

export const FloatNullableFilter: z.ZodType<Prisma.Prisma.FloatNullableFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedFloatNullableFilter)])
        .optional()
        .nullable(),
    })
    .strict();

export const FloatFilter: z.ZodType<Prisma.Prisma.FloatFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedFloatFilter)]).optional(),
  })
  .strict();

export const DecimalFilter: z.ZodType<Prisma.Prisma.DecimalFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedDecimalFilter)]).optional(),
  })
  .strict();

export const DecimalNullableFilter: z.ZodType<Prisma.Prisma.DecimalNullableFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedDecimalNullableFilter)])
        .optional()
        .nullable(),
    })
    .strict();

export const BigIntFilter: z.ZodType<Prisma.Prisma.BigIntFilter> = z
  .object({
    equals: z.bigint().optional(),
    in: z.bigint().array().optional(),
    notIn: z.bigint().array().optional(),
    lt: z.bigint().optional(),
    lte: z.bigint().optional(),
    gt: z.bigint().optional(),
    gte: z.bigint().optional(),
    not: z.union([z.bigint(), z.lazy(() => NestedBigIntFilter)]).optional(),
  })
  .strict();

export const BigIntNullableFilter: z.ZodType<Prisma.Prisma.BigIntNullableFilter> =
  z
    .object({
      equals: z.bigint().optional().nullable(),
      in: z.bigint().array().optional().nullable(),
      notIn: z.bigint().array().optional().nullable(),
      lt: z.bigint().optional(),
      lte: z.bigint().optional(),
      gt: z.bigint().optional(),
      gte: z.bigint().optional(),
      not: z
        .union([z.bigint(), z.lazy(() => NestedBigIntNullableFilter)])
        .optional()
        .nullable(),
    })
    .strict();

export const UserCountOrderByAggregateInput: z.ZodType<Prisma.Prisma.UserCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrder).optional(),
      name: z.lazy(() => SortOrder).optional(),
      value: z.lazy(() => SortOrder).optional(),
      intTwo: z.lazy(() => SortOrder).optional(),
      int: z.lazy(() => SortOrder).optional(),
      floatOpt: z.lazy(() => SortOrder).optional(),
      float: z.lazy(() => SortOrder).optional(),
      decimal: z.lazy(() => SortOrder).optional(),
      decimalOpt: z.lazy(() => SortOrder).optional(),
      bigInt: z.lazy(() => SortOrder).optional(),
      bigIntOpt: z.lazy(() => SortOrder).optional(),
    })
    .strict();

export const UserAvgOrderByAggregateInput: z.ZodType<Prisma.Prisma.UserAvgOrderByAggregateInput> =
  z
    .object({
      intTwo: z.lazy(() => SortOrder).optional(),
      int: z.lazy(() => SortOrder).optional(),
      floatOpt: z.lazy(() => SortOrder).optional(),
      float: z.lazy(() => SortOrder).optional(),
      decimal: z.lazy(() => SortOrder).optional(),
      decimalOpt: z.lazy(() => SortOrder).optional(),
      bigInt: z.lazy(() => SortOrder).optional(),
      bigIntOpt: z.lazy(() => SortOrder).optional(),
    })
    .strict();

export const UserMaxOrderByAggregateInput: z.ZodType<Prisma.Prisma.UserMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrder).optional(),
      name: z.lazy(() => SortOrder).optional(),
      value: z.lazy(() => SortOrder).optional(),
      intTwo: z.lazy(() => SortOrder).optional(),
      int: z.lazy(() => SortOrder).optional(),
      floatOpt: z.lazy(() => SortOrder).optional(),
      float: z.lazy(() => SortOrder).optional(),
      decimal: z.lazy(() => SortOrder).optional(),
      decimalOpt: z.lazy(() => SortOrder).optional(),
      bigInt: z.lazy(() => SortOrder).optional(),
      bigIntOpt: z.lazy(() => SortOrder).optional(),
    })
    .strict();

export const UserMinOrderByAggregateInput: z.ZodType<Prisma.Prisma.UserMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrder).optional(),
      name: z.lazy(() => SortOrder).optional(),
      value: z.lazy(() => SortOrder).optional(),
      intTwo: z.lazy(() => SortOrder).optional(),
      int: z.lazy(() => SortOrder).optional(),
      floatOpt: z.lazy(() => SortOrder).optional(),
      float: z.lazy(() => SortOrder).optional(),
      decimal: z.lazy(() => SortOrder).optional(),
      decimalOpt: z.lazy(() => SortOrder).optional(),
      bigInt: z.lazy(() => SortOrder).optional(),
      bigIntOpt: z.lazy(() => SortOrder).optional(),
    })
    .strict();

export const UserSumOrderByAggregateInput: z.ZodType<Prisma.Prisma.UserSumOrderByAggregateInput> =
  z
    .object({
      intTwo: z.lazy(() => SortOrder).optional(),
      int: z.lazy(() => SortOrder).optional(),
      floatOpt: z.lazy(() => SortOrder).optional(),
      float: z.lazy(() => SortOrder).optional(),
      decimal: z.lazy(() => SortOrder).optional(),
      decimalOpt: z.lazy(() => SortOrder).optional(),
      bigInt: z.lazy(() => SortOrder).optional(),
      bigIntOpt: z.lazy(() => SortOrder).optional(),
    })
    .strict();

export const StringWithAggregatesFilter: z.ZodType<Prisma.Prisma.StringWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      mode: z.lazy(() => QueryMode).optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringWithAggregatesFilter)])
        .optional(),
      _count: z.lazy(() => NestedIntFilter).optional(),
      _min: z.lazy(() => NestedStringFilter).optional(),
      _max: z.lazy(() => NestedStringFilter).optional(),
    })
    .strict();

export const StringNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.StringNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      mode: z.lazy(() => QueryMode).optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringNullableWithAggregatesFilter),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilter).optional(),
      _min: z.lazy(() => NestedStringNullableFilter).optional(),
      _max: z.lazy(() => NestedStringNullableFilter).optional(),
    })
    .strict();

export const EnumMyValueWithAggregatesFilter: z.ZodType<Prisma.Prisma.EnumMyValueWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => MyValue).optional(),
      in: z
        .lazy(() => MyValue)
        .array()
        .optional(),
      notIn: z
        .lazy(() => MyValue)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => MyValue),
          z.lazy(() => NestedEnumMyValueWithAggregatesFilter),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilter).optional(),
      _min: z.lazy(() => NestedEnumMyValueFilter).optional(),
      _max: z.lazy(() => NestedEnumMyValueFilter).optional(),
    })
    .strict();

export const IntWithAggregatesFilter: z.ZodType<Prisma.Prisma.IntWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilter)])
        .optional(),
      _count: z.lazy(() => NestedIntFilter).optional(),
      _avg: z.lazy(() => NestedFloatFilter).optional(),
      _sum: z.lazy(() => NestedIntFilter).optional(),
      _min: z.lazy(() => NestedIntFilter).optional(),
      _max: z.lazy(() => NestedIntFilter).optional(),
    })
    .strict();

export const IntNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.IntNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedIntNullableWithAggregatesFilter),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilter).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilter).optional(),
      _sum: z.lazy(() => NestedIntNullableFilter).optional(),
      _min: z.lazy(() => NestedIntNullableFilter).optional(),
      _max: z.lazy(() => NestedIntNullableFilter).optional(),
    })
    .strict();

export const FloatNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.FloatNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedFloatNullableWithAggregatesFilter),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilter).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilter).optional(),
      _sum: z.lazy(() => NestedFloatNullableFilter).optional(),
      _min: z.lazy(() => NestedFloatNullableFilter).optional(),
      _max: z.lazy(() => NestedFloatNullableFilter).optional(),
    })
    .strict();

export const FloatWithAggregatesFilter: z.ZodType<Prisma.Prisma.FloatWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedFloatWithAggregatesFilter)])
        .optional(),
      _count: z.lazy(() => NestedIntFilter).optional(),
      _avg: z.lazy(() => NestedFloatFilter).optional(),
      _sum: z.lazy(() => NestedFloatFilter).optional(),
      _min: z.lazy(() => NestedFloatFilter).optional(),
      _max: z.lazy(() => NestedFloatFilter).optional(),
    })
    .strict();

export const DecimalWithAggregatesFilter: z.ZodType<Prisma.Prisma.DecimalWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedDecimalWithAggregatesFilter)])
        .optional(),
      _count: z.lazy(() => NestedIntFilter).optional(),
      _avg: z.lazy(() => NestedDecimalFilter).optional(),
      _sum: z.lazy(() => NestedDecimalFilter).optional(),
      _min: z.lazy(() => NestedDecimalFilter).optional(),
      _max: z.lazy(() => NestedDecimalFilter).optional(),
    })
    .strict();

export const DecimalNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.DecimalNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedDecimalNullableWithAggregatesFilter),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilter).optional(),
      _avg: z.lazy(() => NestedDecimalNullableFilter).optional(),
      _sum: z.lazy(() => NestedDecimalNullableFilter).optional(),
      _min: z.lazy(() => NestedDecimalNullableFilter).optional(),
      _max: z.lazy(() => NestedDecimalNullableFilter).optional(),
    })
    .strict();

export const BigIntWithAggregatesFilter: z.ZodType<Prisma.Prisma.BigIntWithAggregatesFilter> =
  z
    .object({
      equals: z.bigint().optional(),
      in: z.bigint().array().optional(),
      notIn: z.bigint().array().optional(),
      lt: z.bigint().optional(),
      lte: z.bigint().optional(),
      gt: z.bigint().optional(),
      gte: z.bigint().optional(),
      not: z
        .union([z.bigint(), z.lazy(() => NestedBigIntWithAggregatesFilter)])
        .optional(),
      _count: z.lazy(() => NestedIntFilter).optional(),
      _avg: z.lazy(() => NestedFloatFilter).optional(),
      _sum: z.lazy(() => NestedBigIntFilter).optional(),
      _min: z.lazy(() => NestedBigIntFilter).optional(),
      _max: z.lazy(() => NestedBigIntFilter).optional(),
    })
    .strict();

export const BigIntNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.BigIntNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.bigint().optional().nullable(),
      in: z.bigint().array().optional().nullable(),
      notIn: z.bigint().array().optional().nullable(),
      lt: z.bigint().optional(),
      lte: z.bigint().optional(),
      gt: z.bigint().optional(),
      gte: z.bigint().optional(),
      not: z
        .union([
          z.bigint(),
          z.lazy(() => NestedBigIntNullableWithAggregatesFilter),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilter).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilter).optional(),
      _sum: z.lazy(() => NestedBigIntNullableFilter).optional(),
      _min: z.lazy(() => NestedBigIntNullableFilter).optional(),
      _max: z.lazy(() => NestedBigIntNullableFilter).optional(),
    })
    .strict();

export const StringFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.StringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional(),
    })
    .strict();

export const NullableStringFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.NullableStringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional().nullable(),
    })
    .strict();

export const EnumMyValueFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.EnumMyValueFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => MyValue).optional(),
    })
    .strict();

export const IntFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.IntFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict();

export const NullableIntFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.NullableIntFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional().nullable(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict();

export const NullableFloatFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.NullableFloatFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional().nullable(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict();

export const FloatFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.FloatFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict();

export const DecimalFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.DecimalFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict();

export const NullableDecimalFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.NullableDecimalFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional().nullable(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict();

export const BigIntFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.BigIntFieldUpdateOperationsInput> =
  z
    .object({
      set: z.bigint().optional(),
      increment: z.bigint().optional(),
      decrement: z.bigint().optional(),
      multiply: z.bigint().optional(),
      divide: z.bigint().optional(),
    })
    .strict();

export const NullableBigIntFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.NullableBigIntFieldUpdateOperationsInput> =
  z
    .object({
      set: z.bigint().optional().nullable(),
      increment: z.bigint().optional(),
      decrement: z.bigint().optional(),
      multiply: z.bigint().optional(),
      divide: z.bigint().optional(),
    })
    .strict();

export const NestedStringFilter: z.ZodType<Prisma.Prisma.NestedStringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z.union([z.string(), z.lazy(() => NestedStringFilter)]).optional(),
  })
  .strict();

export const NestedStringNullableFilter: z.ZodType<Prisma.Prisma.NestedStringNullableFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableFilter)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedEnumMyValueFilter: z.ZodType<Prisma.Prisma.NestedEnumMyValueFilter> =
  z
    .object({
      equals: z.lazy(() => MyValue).optional(),
      in: z
        .lazy(() => MyValue)
        .array()
        .optional(),
      notIn: z
        .lazy(() => MyValue)
        .array()
        .optional(),
      not: z
        .union([z.lazy(() => MyValue), z.lazy(() => NestedEnumMyValueFilter)])
        .optional(),
    })
    .strict();

export const NestedIntFilter: z.ZodType<Prisma.Prisma.NestedIntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilter)]).optional(),
  })
  .strict();

export const NestedIntNullableFilter: z.ZodType<Prisma.Prisma.NestedIntNullableFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntNullableFilter)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedFloatNullableFilter: z.ZodType<Prisma.Prisma.NestedFloatNullableFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedFloatNullableFilter)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedFloatFilter: z.ZodType<Prisma.Prisma.NestedFloatFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedFloatFilter)]).optional(),
  })
  .strict();

export const NestedDecimalFilter: z.ZodType<Prisma.Prisma.NestedDecimalFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z.union([z.number(), z.lazy(() => NestedDecimalFilter)]).optional(),
    })
    .strict();

export const NestedDecimalNullableFilter: z.ZodType<Prisma.Prisma.NestedDecimalNullableFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedDecimalNullableFilter)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedBigIntFilter: z.ZodType<Prisma.Prisma.NestedBigIntFilter> = z
  .object({
    equals: z.bigint().optional(),
    in: z.bigint().array().optional(),
    notIn: z.bigint().array().optional(),
    lt: z.bigint().optional(),
    lte: z.bigint().optional(),
    gt: z.bigint().optional(),
    gte: z.bigint().optional(),
    not: z.union([z.bigint(), z.lazy(() => NestedBigIntFilter)]).optional(),
  })
  .strict();

export const NestedBigIntNullableFilter: z.ZodType<Prisma.Prisma.NestedBigIntNullableFilter> =
  z
    .object({
      equals: z.bigint().optional().nullable(),
      in: z.bigint().array().optional().nullable(),
      notIn: z.bigint().array().optional().nullable(),
      lt: z.bigint().optional(),
      lte: z.bigint().optional(),
      gt: z.bigint().optional(),
      gte: z.bigint().optional(),
      not: z
        .union([z.bigint(), z.lazy(() => NestedBigIntNullableFilter)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedStringWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedStringWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringWithAggregatesFilter)])
        .optional(),
      _count: z.lazy(() => NestedIntFilter).optional(),
      _min: z.lazy(() => NestedStringFilter).optional(),
      _max: z.lazy(() => NestedStringFilter).optional(),
    })
    .strict();

export const NestedStringNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedStringNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringNullableWithAggregatesFilter),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilter).optional(),
      _min: z.lazy(() => NestedStringNullableFilter).optional(),
      _max: z.lazy(() => NestedStringNullableFilter).optional(),
    })
    .strict();

export const NestedEnumMyValueWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedEnumMyValueWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => MyValue).optional(),
      in: z
        .lazy(() => MyValue)
        .array()
        .optional(),
      notIn: z
        .lazy(() => MyValue)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => MyValue),
          z.lazy(() => NestedEnumMyValueWithAggregatesFilter),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilter).optional(),
      _min: z.lazy(() => NestedEnumMyValueFilter).optional(),
      _max: z.lazy(() => NestedEnumMyValueFilter).optional(),
    })
    .strict();

export const NestedIntWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedIntWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilter)])
        .optional(),
      _count: z.lazy(() => NestedIntFilter).optional(),
      _avg: z.lazy(() => NestedFloatFilter).optional(),
      _sum: z.lazy(() => NestedIntFilter).optional(),
      _min: z.lazy(() => NestedIntFilter).optional(),
      _max: z.lazy(() => NestedIntFilter).optional(),
    })
    .strict();

export const NestedIntNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedIntNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedIntNullableWithAggregatesFilter),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilter).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilter).optional(),
      _sum: z.lazy(() => NestedIntNullableFilter).optional(),
      _min: z.lazy(() => NestedIntNullableFilter).optional(),
      _max: z.lazy(() => NestedIntNullableFilter).optional(),
    })
    .strict();

export const NestedFloatNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedFloatNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedFloatNullableWithAggregatesFilter),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilter).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilter).optional(),
      _sum: z.lazy(() => NestedFloatNullableFilter).optional(),
      _min: z.lazy(() => NestedFloatNullableFilter).optional(),
      _max: z.lazy(() => NestedFloatNullableFilter).optional(),
    })
    .strict();

export const NestedFloatWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedFloatWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedFloatWithAggregatesFilter)])
        .optional(),
      _count: z.lazy(() => NestedIntFilter).optional(),
      _avg: z.lazy(() => NestedFloatFilter).optional(),
      _sum: z.lazy(() => NestedFloatFilter).optional(),
      _min: z.lazy(() => NestedFloatFilter).optional(),
      _max: z.lazy(() => NestedFloatFilter).optional(),
    })
    .strict();

export const NestedDecimalWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedDecimalWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedDecimalWithAggregatesFilter)])
        .optional(),
      _count: z.lazy(() => NestedIntFilter).optional(),
      _avg: z.lazy(() => NestedDecimalFilter).optional(),
      _sum: z.lazy(() => NestedDecimalFilter).optional(),
      _min: z.lazy(() => NestedDecimalFilter).optional(),
      _max: z.lazy(() => NestedDecimalFilter).optional(),
    })
    .strict();

export const NestedDecimalNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedDecimalNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedDecimalNullableWithAggregatesFilter),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilter).optional(),
      _avg: z.lazy(() => NestedDecimalNullableFilter).optional(),
      _sum: z.lazy(() => NestedDecimalNullableFilter).optional(),
      _min: z.lazy(() => NestedDecimalNullableFilter).optional(),
      _max: z.lazy(() => NestedDecimalNullableFilter).optional(),
    })
    .strict();

export const NestedBigIntWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedBigIntWithAggregatesFilter> =
  z
    .object({
      equals: z.bigint().optional(),
      in: z.bigint().array().optional(),
      notIn: z.bigint().array().optional(),
      lt: z.bigint().optional(),
      lte: z.bigint().optional(),
      gt: z.bigint().optional(),
      gte: z.bigint().optional(),
      not: z
        .union([z.bigint(), z.lazy(() => NestedBigIntWithAggregatesFilter)])
        .optional(),
      _count: z.lazy(() => NestedIntFilter).optional(),
      _avg: z.lazy(() => NestedFloatFilter).optional(),
      _sum: z.lazy(() => NestedBigIntFilter).optional(),
      _min: z.lazy(() => NestedBigIntFilter).optional(),
      _max: z.lazy(() => NestedBigIntFilter).optional(),
    })
    .strict();

export const NestedBigIntNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedBigIntNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.bigint().optional().nullable(),
      in: z.bigint().array().optional().nullable(),
      notIn: z.bigint().array().optional().nullable(),
      lt: z.bigint().optional(),
      lte: z.bigint().optional(),
      gt: z.bigint().optional(),
      gte: z.bigint().optional(),
      not: z
        .union([
          z.bigint(),
          z.lazy(() => NestedBigIntNullableWithAggregatesFilter),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilter).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilter).optional(),
      _sum: z.lazy(() => NestedBigIntNullableFilter).optional(),
      _min: z.lazy(() => NestedBigIntNullableFilter).optional(),
      _max: z.lazy(() => NestedBigIntNullableFilter).optional(),
    })
    .strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgs: z.ZodType<Prisma.Prisma.UserFindFirstArgs> = z
  .object({
    where: UserWhereInput.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInput.array(),
        UserOrderByWithRelationInput,
      ])
      .optional(),
    cursor: UserWhereUniqueInput.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: UserScalarFieldEnum.array().optional(),
  })
  .strict();

export const UserFindManyArgs: z.ZodType<Prisma.Prisma.UserFindManyArgs> = z
  .object({
    where: UserWhereInput.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInput.array(),
        UserOrderByWithRelationInput,
      ])
      .optional(),
    cursor: UserWhereUniqueInput.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: UserScalarFieldEnum.array().optional(),
  })
  .strict();

export const UserAggregateArgs: z.ZodType<Prisma.Prisma.UserAggregateArgs> = z
  .object({
    where: UserWhereInput.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInput.array(),
        UserOrderByWithRelationInput,
      ])
      .optional(),
    cursor: UserWhereUniqueInput.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const UserGroupByArgs: z.ZodType<Prisma.Prisma.UserGroupByArgs> = z
  .object({
    where: UserWhereInput.optional(),
    orderBy: z
      .union([
        UserOrderByWithAggregationInput.array(),
        UserOrderByWithAggregationInput,
      ])
      .optional(),
    by: UserScalarFieldEnum.array(),
    having: UserScalarWhereWithAggregatesInput.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const UserFindUniqueArgs: z.ZodType<Prisma.Prisma.UserFindUniqueArgs> = z
  .object({
    where: UserWhereUniqueInput,
  })
  .strict();

export const UserCreateArgs: z.ZodType<Prisma.Prisma.UserCreateArgs> = z
  .object({
    data: z.union([UserCreateInput, UserUncheckedCreateInput]),
  })
  .strict();

export const UserUpsertArgs: z.ZodType<Prisma.Prisma.UserUpsertArgs> = z
  .object({
    where: UserWhereUniqueInput,
    create: z.union([UserCreateInput, UserUncheckedCreateInput]),
    update: z.union([UserUpdateInput, UserUncheckedUpdateInput]),
  })
  .strict();

export const UserCreateManyArgs: z.ZodType<Prisma.Prisma.UserCreateManyArgs> = z
  .object({
    data: UserCreateManyInput.array(),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const UserDeleteArgs: z.ZodType<Prisma.Prisma.UserDeleteArgs> = z
  .object({
    where: UserWhereUniqueInput,
  })
  .strict();

export const UserUpdateArgs: z.ZodType<Prisma.Prisma.UserUpdateArgs> = z
  .object({
    data: z.union([UserUpdateInput, UserUncheckedUpdateInput]),
    where: UserWhereUniqueInput,
  })
  .strict();

export const UserUpdateManyArgs: z.ZodType<Prisma.Prisma.UserUpdateManyArgs> = z
  .object({
    data: z.union([UserUpdateManyMutationInput, UserUncheckedUpdateManyInput]),
    where: UserWhereInput.optional(),
  })
  .strict();

export const UserDeleteManyArgs: z.ZodType<Prisma.Prisma.UserDeleteManyArgs> = z
  .object({
    where: UserWhereInput.optional(),
  })
  .strict();
