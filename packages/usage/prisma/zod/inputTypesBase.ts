import * as Prisma from "@prisma/client";
import { z } from "zod";

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const QueryMode = z.nativeEnum(Prisma.Prisma.QueryMode);

export const SortOrder = z.nativeEnum(Prisma.Prisma.SortOrder);

export const TransactionIsolationLevel = z.nativeEnum(Prisma.Prisma.TransactionIsolationLevel);

export const UserScalarFieldEnum = z.nativeEnum(Prisma.Prisma.UserScalarFieldEnum);

export const MyValue = z.nativeEnum(Prisma.MyValue);

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInput: z.ZodType<Prisma.Prisma.UserWhereInput> = z.object({
  AND: z.union([z.lazy(() => UserWhereInput), z.lazy(() => UserWhereInput).array(),]).optional(),
  OR: z.lazy(() => UserWhereInput).array(),
  NOT: z.union([z.lazy(() => UserWhereInput), z.lazy(() => UserWhereInput).array(),]).optional(),
  id: z.union([z.lazy(() => StringFilter), z.string(),]).optional(),
  name: z.union([z.lazy(() => StringNullableFilter), z.string(),]).optional().nullable(),
  value: z.union([z.lazy(() => EnumMyValueFilter), z.lazy(() => MyValue),]).optional(),
  intTwo: z.union([z.lazy(() => IntFilter), z.number(),]).optional(),
  int: z.union([z.lazy(() => IntNullableFilter), z.number(),]).optional().nullable(),
  floatOpt: z.union([z.lazy(() => FloatNullableFilter), z.number(),]).optional().nullable(),
  float: z.union([z.lazy(() => FloatFilter), z.number(),]).optional(),
  decimal: z.union([z.lazy(() => DecimalFilter), z.number(),]).optional(),
  decimalOpt: z.union([z.lazy(() => DecimalNullableFilter), z.number(),]).optional().nullable(),
  bigInt: z.union([z.lazy(() => BigIntFilter), z.bigint(),]).optional(),
  bigIntOpt: z.union([z.lazy(() => BigIntNullableFilter), z.bigint(),]).optional().nullable(),
}).strict();

export const UserOrderByWithRelationInput: z.ZodType<Prisma.Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrder),
  name: z.lazy(() => SortOrder),
  value: z.lazy(() => SortOrder),
  intTwo: z.lazy(() => SortOrder),
  int: z.lazy(() => SortOrder),
  floatOpt: z.lazy(() => SortOrder),
  float: z.lazy(() => SortOrder),
  decimal: z.lazy(() => SortOrder),
  decimalOpt: z.lazy(() => SortOrder),
  bigInt: z.lazy(() => SortOrder),
  bigIntOpt: z.lazy(() => SortOrder),
}).strict();

export const UserWhereUniqueInput: z.ZodType<Prisma.Prisma.UserWhereUniqueInput> = z.object({
  id: z.string(),
}).strict();

export const UserOrderByWithAggregationInput: z.ZodType<Prisma.Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrder),
  name: z.lazy(() => SortOrder),
  value: z.lazy(() => SortOrder),
  intTwo: z.lazy(() => SortOrder),
  int: z.lazy(() => SortOrder),
  floatOpt: z.lazy(() => SortOrder),
  float: z.lazy(() => SortOrder),
  decimal: z.lazy(() => SortOrder),
  decimalOpt: z.lazy(() => SortOrder),
  bigInt: z.lazy(() => SortOrder),
  bigIntOpt: z.lazy(() => SortOrder),
  _count: z.lazy(() => UserCountOrderByAggregateInput),
  _avg: z.lazy(() => UserAvgOrderByAggregateInput),
  _max: z.lazy(() => UserMaxOrderByAggregateInput),
  _min: z.lazy(() => UserMinOrderByAggregateInput),
  _sum: z.lazy(() => UserSumOrderByAggregateInput),
}).strict();

export const UserScalarWhereWithAggregatesInput: z.ZodType<Prisma.Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => UserScalarWhereWithAggregatesInput), z.lazy(() => UserScalarWhereWithAggregatesInput).array(),]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInput).array(),
  NOT: z.union([z.lazy(() => UserScalarWhereWithAggregatesInput), z.lazy(() => UserScalarWhereWithAggregatesInput).array(),]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilter), z.string(),]).optional(),
  name: z.union([z.lazy(() => StringNullableWithAggregatesFilter), z.string(),]).optional().nullable(),
  value: z.union([z.lazy(() => EnumMyValueWithAggregatesFilter), z.lazy(() => MyValue),]).optional(),
  intTwo: z.union([z.lazy(() => IntWithAggregatesFilter), z.number(),]).optional(),
  int: z.union([z.lazy(() => IntNullableWithAggregatesFilter), z.number(),]).optional().nullable(),
  floatOpt: z.union([z.lazy(() => FloatNullableWithAggregatesFilter), z.number(),]).optional().nullable(),
  float: z.union([z.lazy(() => FloatWithAggregatesFilter), z.number(),]).optional(),
  decimal: z.union([z.lazy(() => DecimalWithAggregatesFilter), z.number(),]).optional(),
  decimalOpt: z.union([z.lazy(() => DecimalNullableWithAggregatesFilter), z.number(),]).optional().nullable(),
  bigInt: z.union([z.lazy(() => BigIntWithAggregatesFilter), z.bigint(),]).optional(),
  bigIntOpt: z.union([z.lazy(() => BigIntNullableWithAggregatesFilter), z.bigint(),]).optional().nullable(),
}).strict();

export const UserCreateInput: z.ZodType<Prisma.Prisma.UserCreateInput> = z.object({
  id: z.string(({ invalid_type_error: "error" })).cuid(),
  name: z.string(({ required_error: "error" })),
  value: z.lazy(() => MyValue),
  intTwo: z.number(),
  int: z.number(),
  floatOpt: z.number(),
  float: z.number(),
  decimal: z.number(),
  decimalOpt: z.number(),
  bigInt: z.bigint(),
  bigIntOpt: z.bigint(),
}).strict();

export const UserUncheckedCreateInput: z.ZodType<Prisma.Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string(({ invalid_type_error: "error" })).cuid(),
  name: z.string(({ required_error: "error" })),
  value: z.lazy(() => MyValue),
  intTwo: z.number(),
  int: z.number(),
  floatOpt: z.number(),
  float: z.number(),
  decimal: z.number(),
  decimalOpt: z.number(),
  bigInt: z.bigint(),
  bigIntOpt: z.bigint(),
}).strict();

export const UserUpdateInput: z.ZodType<Prisma.Prisma.UserUpdateInput> = z.object({
  id: z.union([z.string(({ invalid_type_error: "error" })).cuid(), z.lazy(() => StringFieldUpdateOperationsInput),]).optional(),
  name: z.union([z.string(({ required_error: "error" })), z.lazy(() => NullableStringFieldUpdateOperationsInput),]).optional().nullable(),
  value: z.union([z.lazy(() => MyValue), z.lazy(() => EnumMyValueFieldUpdateOperationsInput),]).optional(),
  intTwo: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInput),]).optional(),
  int: z.union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInput),]).optional().nullable(),
  floatOpt: z.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInput),]).optional().nullable(),
  float: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInput),]).optional(),
  decimal: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInput),]).optional(),
  decimalOpt: z.union([z.number(), z.lazy(() => NullableDecimalFieldUpdateOperationsInput),]).optional().nullable(),
  bigInt: z.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInput),]).optional(),
  bigIntOpt: z.union([z.bigint(), z.lazy(() => NullableBigIntFieldUpdateOperationsInput),]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateInput: z.ZodType<Prisma.Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([z.string(({ invalid_type_error: "error" })).cuid(), z.lazy(() => StringFieldUpdateOperationsInput),]).optional(),
  name: z.union([z.string(({ required_error: "error" })), z.lazy(() => NullableStringFieldUpdateOperationsInput),]).optional().nullable(),
  value: z.union([z.lazy(() => MyValue), z.lazy(() => EnumMyValueFieldUpdateOperationsInput),]).optional(),
  intTwo: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInput),]).optional(),
  int: z.union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInput),]).optional().nullable(),
  floatOpt: z.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInput),]).optional().nullable(),
  float: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInput),]).optional(),
  decimal: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInput),]).optional(),
  decimalOpt: z.union([z.number(), z.lazy(() => NullableDecimalFieldUpdateOperationsInput),]).optional().nullable(),
  bigInt: z.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInput),]).optional(),
  bigIntOpt: z.union([z.bigint(), z.lazy(() => NullableBigIntFieldUpdateOperationsInput),]).optional().nullable(),
}).strict();

export const UserCreateManyInput: z.ZodType<Prisma.Prisma.UserCreateManyInput> = z.object({
  id: z.string(({ invalid_type_error: "error" })).cuid(),
  name: z.string(({ required_error: "error" })),
  value: z.lazy(() => MyValue),
  intTwo: z.number(),
  int: z.number(),
  floatOpt: z.number(),
  float: z.number(),
  decimal: z.number(),
  decimalOpt: z.number(),
  bigInt: z.bigint(),
  bigIntOpt: z.bigint(),
}).strict();

export const UserUpdateManyMutationInput: z.ZodType<Prisma.Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([z.string(({ invalid_type_error: "error" })).cuid(), z.lazy(() => StringFieldUpdateOperationsInput),]).optional(),
  name: z.union([z.string(({ required_error: "error" })), z.lazy(() => NullableStringFieldUpdateOperationsInput),]).optional().nullable(),
  value: z.union([z.lazy(() => MyValue), z.lazy(() => EnumMyValueFieldUpdateOperationsInput),]).optional(),
  intTwo: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInput),]).optional(),
  int: z.union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInput),]).optional().nullable(),
  floatOpt: z.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInput),]).optional().nullable(),
  float: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInput),]).optional(),
  decimal: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInput),]).optional(),
  decimalOpt: z.union([z.number(), z.lazy(() => NullableDecimalFieldUpdateOperationsInput),]).optional().nullable(),
  bigInt: z.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInput),]).optional(),
  bigIntOpt: z.union([z.bigint(), z.lazy(() => NullableBigIntFieldUpdateOperationsInput),]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateManyInput: z.ZodType<Prisma.Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string(({ invalid_type_error: "error" })).cuid(), z.lazy(() => StringFieldUpdateOperationsInput),]).optional(),
  name: z.union([z.string(({ required_error: "error" })), z.lazy(() => NullableStringFieldUpdateOperationsInput),]).optional().nullable(),
  value: z.union([z.lazy(() => MyValue), z.lazy(() => EnumMyValueFieldUpdateOperationsInput),]).optional(),
  intTwo: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInput),]).optional(),
  int: z.union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInput),]).optional().nullable(),
  floatOpt: z.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInput),]).optional().nullable(),
  float: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInput),]).optional(),
  decimal: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInput),]).optional(),
  decimalOpt: z.union([z.number(), z.lazy(() => NullableDecimalFieldUpdateOperationsInput),]).optional().nullable(),
  bigInt: z.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInput),]).optional(),
  bigIntOpt: z.union([z.bigint(), z.lazy(() => NullableBigIntFieldUpdateOperationsInput),]).optional().nullable(),
}).strict();

export const StringFilter: z.ZodType<Prisma.Prisma.StringFilter> = z.object({
  equals: z.string(),
  in: z.string().array(),
  notIn: z.string().array(),
  lt: z.string(),
  lte: z.string(),
  gt: z.string(),
  gte: z.string(),
  contains: z.string(),
  startsWith: z.string(),
  endsWith: z.string(),
  mode: z.lazy(() => QueryMode),
  not: z.union([z.string(), z.lazy(() => NestedStringFilter),]).optional(),
}).strict();

export const StringNullableFilter: z.ZodType<Prisma.Prisma.StringNullableFilter> = z.object({
  equals: z.string(),
  in: z.string().array(),
  notIn: z.string().array(),
  lt: z.string(),
  lte: z.string(),
  gt: z.string(),
  gte: z.string(),
  contains: z.string(),
  startsWith: z.string(),
  endsWith: z.string(),
  mode: z.lazy(() => QueryMode),
  not: z.union([z.string(), z.lazy(() => NestedStringNullableFilter),]).optional().nullable(),
}).strict();

export const EnumMyValueFilter: z.ZodType<Prisma.Prisma.EnumMyValueFilter> = z.object({
  equals: z.lazy(() => MyValue),
  in: z.lazy(() => MyValue).array(),
  notIn: z.lazy(() => MyValue).array(),
  not: z.union([z.lazy(() => MyValue), z.lazy(() => NestedEnumMyValueFilter),]).optional(),
}).strict();

export const IntFilter: z.ZodType<Prisma.Prisma.IntFilter> = z.object({
  equals: z.number(),
  in: z.number().array(),
  notIn: z.number().array(),
  lt: z.number(),
  lte: z.number(),
  gt: z.number(),
  gte: z.number(),
  not: z.union([z.number(), z.lazy(() => NestedIntFilter),]).optional(),
}).strict();

export const IntNullableFilter: z.ZodType<Prisma.Prisma.IntNullableFilter> = z.object({
  equals: z.number(),
  in: z.number().array(),
  notIn: z.number().array(),
  lt: z.number(),
  lte: z.number(),
  gt: z.number(),
  gte: z.number(),
  not: z.union([z.number(), z.lazy(() => NestedIntNullableFilter),]).optional().nullable(),
}).strict();

export const FloatNullableFilter: z.ZodType<Prisma.Prisma.FloatNullableFilter> = z.object({
  equals: z.number(),
  in: z.number().array(),
  notIn: z.number().array(),
  lt: z.number(),
  lte: z.number(),
  gt: z.number(),
  gte: z.number(),
  not: z.union([z.number(), z.lazy(() => NestedFloatNullableFilter),]).optional().nullable(),
}).strict();

export const FloatFilter: z.ZodType<Prisma.Prisma.FloatFilter> = z.object({
  equals: z.number(),
  in: z.number().array(),
  notIn: z.number().array(),
  lt: z.number(),
  lte: z.number(),
  gt: z.number(),
  gte: z.number(),
  not: z.union([z.number(), z.lazy(() => NestedFloatFilter),]).optional(),
}).strict();

export const DecimalFilter: z.ZodType<Prisma.Prisma.DecimalFilter> = z.object({
  equals: z.number(),
  in: z.number().array(),
  notIn: z.number().array(),
  lt: z.number(),
  lte: z.number(),
  gt: z.number(),
  gte: z.number(),
  not: z.union([z.number(), z.lazy(() => NestedDecimalFilter),]).optional(),
}).strict();

export const DecimalNullableFilter: z.ZodType<Prisma.Prisma.DecimalNullableFilter> = z.object({
  equals: z.number(),
  in: z.number().array(),
  notIn: z.number().array(),
  lt: z.number(),
  lte: z.number(),
  gt: z.number(),
  gte: z.number(),
  not: z.union([z.number(), z.lazy(() => NestedDecimalNullableFilter),]).optional().nullable(),
}).strict();

export const BigIntFilter: z.ZodType<Prisma.Prisma.BigIntFilter> = z.object({
  equals: z.bigint(),
  in: z.bigint().array(),
  notIn: z.bigint().array(),
  lt: z.bigint(),
  lte: z.bigint(),
  gt: z.bigint(),
  gte: z.bigint(),
  not: z.union([z.bigint(), z.lazy(() => NestedBigIntFilter),]).optional(),
}).strict();

export const BigIntNullableFilter: z.ZodType<Prisma.Prisma.BigIntNullableFilter> = z.object({
  equals: z.bigint(),
  in: z.bigint().array(),
  notIn: z.bigint().array(),
  lt: z.bigint(),
  lte: z.bigint(),
  gt: z.bigint(),
  gte: z.bigint(),
  not: z.union([z.bigint(), z.lazy(() => NestedBigIntNullableFilter),]).optional().nullable(),
}).strict();

export const UserCountOrderByAggregateInput: z.ZodType<Prisma.Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrder),
  name: z.lazy(() => SortOrder),
  value: z.lazy(() => SortOrder),
  intTwo: z.lazy(() => SortOrder),
  int: z.lazy(() => SortOrder),
  floatOpt: z.lazy(() => SortOrder),
  float: z.lazy(() => SortOrder),
  decimal: z.lazy(() => SortOrder),
  decimalOpt: z.lazy(() => SortOrder),
  bigInt: z.lazy(() => SortOrder),
  bigIntOpt: z.lazy(() => SortOrder),
}).strict();

export const UserAvgOrderByAggregateInput: z.ZodType<Prisma.Prisma.UserAvgOrderByAggregateInput> = z.object({
  intTwo: z.lazy(() => SortOrder),
  int: z.lazy(() => SortOrder),
  floatOpt: z.lazy(() => SortOrder),
  float: z.lazy(() => SortOrder),
  decimal: z.lazy(() => SortOrder),
  decimalOpt: z.lazy(() => SortOrder),
  bigInt: z.lazy(() => SortOrder),
  bigIntOpt: z.lazy(() => SortOrder),
}).strict();

export const UserMaxOrderByAggregateInput: z.ZodType<Prisma.Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrder),
  name: z.lazy(() => SortOrder),
  value: z.lazy(() => SortOrder),
  intTwo: z.lazy(() => SortOrder),
  int: z.lazy(() => SortOrder),
  floatOpt: z.lazy(() => SortOrder),
  float: z.lazy(() => SortOrder),
  decimal: z.lazy(() => SortOrder),
  decimalOpt: z.lazy(() => SortOrder),
  bigInt: z.lazy(() => SortOrder),
  bigIntOpt: z.lazy(() => SortOrder),
}).strict();

export const UserMinOrderByAggregateInput: z.ZodType<Prisma.Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrder),
  name: z.lazy(() => SortOrder),
  value: z.lazy(() => SortOrder),
  intTwo: z.lazy(() => SortOrder),
  int: z.lazy(() => SortOrder),
  floatOpt: z.lazy(() => SortOrder),
  float: z.lazy(() => SortOrder),
  decimal: z.lazy(() => SortOrder),
  decimalOpt: z.lazy(() => SortOrder),
  bigInt: z.lazy(() => SortOrder),
  bigIntOpt: z.lazy(() => SortOrder),
}).strict();

export const UserSumOrderByAggregateInput: z.ZodType<Prisma.Prisma.UserSumOrderByAggregateInput> = z.object({
  intTwo: z.lazy(() => SortOrder),
  int: z.lazy(() => SortOrder),
  floatOpt: z.lazy(() => SortOrder),
  float: z.lazy(() => SortOrder),
  decimal: z.lazy(() => SortOrder),
  decimalOpt: z.lazy(() => SortOrder),
  bigInt: z.lazy(() => SortOrder),
  bigIntOpt: z.lazy(() => SortOrder),
}).strict();

export const StringWithAggregatesFilter: z.ZodType<Prisma.Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string(),
  in: z.string().array(),
  notIn: z.string().array(),
  lt: z.string(),
  lte: z.string(),
  gt: z.string(),
  gte: z.string(),
  contains: z.string(),
  startsWith: z.string(),
  endsWith: z.string(),
  mode: z.lazy(() => QueryMode),
  not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilter),]).optional(),
  _count: z.lazy(() => NestedIntFilter),
  _min: z.lazy(() => NestedStringFilter),
  _max: z.lazy(() => NestedStringFilter),
}).strict();

export const StringNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string(),
  in: z.string().array(),
  notIn: z.string().array(),
  lt: z.string(),
  lte: z.string(),
  gt: z.string(),
  gte: z.string(),
  contains: z.string(),
  startsWith: z.string(),
  endsWith: z.string(),
  mode: z.lazy(() => QueryMode),
  not: z.union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilter),]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilter),
  _min: z.lazy(() => NestedStringNullableFilter),
  _max: z.lazy(() => NestedStringNullableFilter),
}).strict();

export const EnumMyValueWithAggregatesFilter: z.ZodType<Prisma.Prisma.EnumMyValueWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MyValue),
  in: z.lazy(() => MyValue).array(),
  notIn: z.lazy(() => MyValue).array(),
  not: z.union([z.lazy(() => MyValue), z.lazy(() => NestedEnumMyValueWithAggregatesFilter),]).optional(),
  _count: z.lazy(() => NestedIntFilter),
  _min: z.lazy(() => NestedEnumMyValueFilter),
  _max: z.lazy(() => NestedEnumMyValueFilter),
}).strict();

export const IntWithAggregatesFilter: z.ZodType<Prisma.Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number(),
  in: z.number().array(),
  notIn: z.number().array(),
  lt: z.number(),
  lte: z.number(),
  gt: z.number(),
  gte: z.number(),
  not: z.union([z.number(), z.lazy(() => NestedIntWithAggregatesFilter),]).optional(),
  _count: z.lazy(() => NestedIntFilter),
  _avg: z.lazy(() => NestedFloatFilter),
  _sum: z.lazy(() => NestedIntFilter),
  _min: z.lazy(() => NestedIntFilter),
  _max: z.lazy(() => NestedIntFilter),
}).strict();

export const IntNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number(),
  in: z.number().array(),
  notIn: z.number().array(),
  lt: z.number(),
  lte: z.number(),
  gt: z.number(),
  gte: z.number(),
  not: z.union([z.number(), z.lazy(() => NestedIntNullableWithAggregatesFilter),]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilter),
  _avg: z.lazy(() => NestedFloatNullableFilter),
  _sum: z.lazy(() => NestedIntNullableFilter),
  _min: z.lazy(() => NestedIntNullableFilter),
  _max: z.lazy(() => NestedIntNullableFilter),
}).strict();

export const FloatNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number(),
  in: z.number().array(),
  notIn: z.number().array(),
  lt: z.number(),
  lte: z.number(),
  gt: z.number(),
  gte: z.number(),
  not: z.union([z.number(), z.lazy(() => NestedFloatNullableWithAggregatesFilter),]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilter),
  _avg: z.lazy(() => NestedFloatNullableFilter),
  _sum: z.lazy(() => NestedFloatNullableFilter),
  _min: z.lazy(() => NestedFloatNullableFilter),
  _max: z.lazy(() => NestedFloatNullableFilter),
}).strict();

export const FloatWithAggregatesFilter: z.ZodType<Prisma.Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number(),
  in: z.number().array(),
  notIn: z.number().array(),
  lt: z.number(),
  lte: z.number(),
  gt: z.number(),
  gte: z.number(),
  not: z.union([z.number(), z.lazy(() => NestedFloatWithAggregatesFilter),]).optional(),
  _count: z.lazy(() => NestedIntFilter),
  _avg: z.lazy(() => NestedFloatFilter),
  _sum: z.lazy(() => NestedFloatFilter),
  _min: z.lazy(() => NestedFloatFilter),
  _max: z.lazy(() => NestedFloatFilter),
}).strict();

export const DecimalWithAggregatesFilter: z.ZodType<Prisma.Prisma.DecimalWithAggregatesFilter> = z.object({
  equals: z.number(),
  in: z.number().array(),
  notIn: z.number().array(),
  lt: z.number(),
  lte: z.number(),
  gt: z.number(),
  gte: z.number(),
  not: z.union([z.number(), z.lazy(() => NestedDecimalWithAggregatesFilter),]).optional(),
  _count: z.lazy(() => NestedIntFilter),
  _avg: z.lazy(() => NestedDecimalFilter),
  _sum: z.lazy(() => NestedDecimalFilter),
  _min: z.lazy(() => NestedDecimalFilter),
  _max: z.lazy(() => NestedDecimalFilter),
}).strict();

export const DecimalNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.DecimalNullableWithAggregatesFilter> = z.object({
  equals: z.number(),
  in: z.number().array(),
  notIn: z.number().array(),
  lt: z.number(),
  lte: z.number(),
  gt: z.number(),
  gte: z.number(),
  not: z.union([z.number(), z.lazy(() => NestedDecimalNullableWithAggregatesFilter),]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilter),
  _avg: z.lazy(() => NestedDecimalNullableFilter),
  _sum: z.lazy(() => NestedDecimalNullableFilter),
  _min: z.lazy(() => NestedDecimalNullableFilter),
  _max: z.lazy(() => NestedDecimalNullableFilter),
}).strict();

export const BigIntWithAggregatesFilter: z.ZodType<Prisma.Prisma.BigIntWithAggregatesFilter> = z.object({
  equals: z.bigint(),
  in: z.bigint().array(),
  notIn: z.bigint().array(),
  lt: z.bigint(),
  lte: z.bigint(),
  gt: z.bigint(),
  gte: z.bigint(),
  not: z.union([z.bigint(), z.lazy(() => NestedBigIntWithAggregatesFilter),]).optional(),
  _count: z.lazy(() => NestedIntFilter),
  _avg: z.lazy(() => NestedFloatFilter),
  _sum: z.lazy(() => NestedBigIntFilter),
  _min: z.lazy(() => NestedBigIntFilter),
  _max: z.lazy(() => NestedBigIntFilter),
}).strict();

export const BigIntNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.BigIntNullableWithAggregatesFilter> = z.object({
  equals: z.bigint(),
  in: z.bigint().array(),
  notIn: z.bigint().array(),
  lt: z.bigint(),
  lte: z.bigint(),
  gt: z.bigint(),
  gte: z.bigint(),
  not: z.union([z.bigint(), z.lazy(() => NestedBigIntNullableWithAggregatesFilter),]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilter),
  _avg: z.lazy(() => NestedFloatNullableFilter),
  _sum: z.lazy(() => NestedBigIntNullableFilter),
  _min: z.lazy(() => NestedBigIntNullableFilter),
  _max: z.lazy(() => NestedBigIntNullableFilter),
}).strict();

export const StringFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string(),
}).strict();

export const NullableStringFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string(),
}).strict();

export const EnumMyValueFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.EnumMyValueFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => MyValue),
}).strict();

export const IntFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number(),
  increment: z.number(),
  decrement: z.number(),
  multiply: z.number(),
  divide: z.number(),
}).strict();

export const NullableIntFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number(),
  increment: z.number(),
  decrement: z.number(),
  multiply: z.number(),
  divide: z.number(),
}).strict();

export const NullableFloatFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number(),
  increment: z.number(),
  decrement: z.number(),
  multiply: z.number(),
  divide: z.number(),
}).strict();

export const FloatFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number(),
  increment: z.number(),
  decrement: z.number(),
  multiply: z.number(),
  divide: z.number(),
}).strict();

export const DecimalFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.DecimalFieldUpdateOperationsInput> = z.object({
  set: z.number(),
  increment: z.number(),
  decrement: z.number(),
  multiply: z.number(),
  divide: z.number(),
}).strict();

export const NullableDecimalFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.NullableDecimalFieldUpdateOperationsInput> = z.object({
  set: z.number(),
  increment: z.number(),
  decrement: z.number(),
  multiply: z.number(),
  divide: z.number(),
}).strict();

export const BigIntFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.BigIntFieldUpdateOperationsInput> = z.object({
  set: z.bigint(),
  increment: z.bigint(),
  decrement: z.bigint(),
  multiply: z.bigint(),
  divide: z.bigint(),
}).strict();

export const NullableBigIntFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.NullableBigIntFieldUpdateOperationsInput> = z.object({
  set: z.bigint(),
  increment: z.bigint(),
  decrement: z.bigint(),
  multiply: z.bigint(),
  divide: z.bigint(),
}).strict();

export const NestedStringFilter: z.ZodType<Prisma.Prisma.NestedStringFilter> = z.object({
  equals: z.string(),
  in: z.string().array(),
  notIn: z.string().array(),
  lt: z.string(),
  lte: z.string(),
  gt: z.string(),
  gte: z.string(),
  contains: z.string(),
  startsWith: z.string(),
  endsWith: z.string(),
  not: z.union([z.string(), z.lazy(() => NestedStringFilter),]).optional(),
}).strict();

export const NestedStringNullableFilter: z.ZodType<Prisma.Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string(),
  in: z.string().array(),
  notIn: z.string().array(),
  lt: z.string(),
  lte: z.string(),
  gt: z.string(),
  gte: z.string(),
  contains: z.string(),
  startsWith: z.string(),
  endsWith: z.string(),
  not: z.union([z.string(), z.lazy(() => NestedStringNullableFilter),]).optional().nullable(),
}).strict();

export const NestedEnumMyValueFilter: z.ZodType<Prisma.Prisma.NestedEnumMyValueFilter> = z.object({
  equals: z.lazy(() => MyValue),
  in: z.lazy(() => MyValue).array(),
  notIn: z.lazy(() => MyValue).array(),
  not: z.union([z.lazy(() => MyValue), z.lazy(() => NestedEnumMyValueFilter),]).optional(),
}).strict();

export const NestedIntFilter: z.ZodType<Prisma.Prisma.NestedIntFilter> = z.object({
  equals: z.number(),
  in: z.number().array(),
  notIn: z.number().array(),
  lt: z.number(),
  lte: z.number(),
  gt: z.number(),
  gte: z.number(),
  not: z.union([z.number(), z.lazy(() => NestedIntFilter),]).optional(),
}).strict();

export const NestedIntNullableFilter: z.ZodType<Prisma.Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number(),
  in: z.number().array(),
  notIn: z.number().array(),
  lt: z.number(),
  lte: z.number(),
  gt: z.number(),
  gte: z.number(),
  not: z.union([z.number(), z.lazy(() => NestedIntNullableFilter),]).optional().nullable(),
}).strict();

export const NestedFloatNullableFilter: z.ZodType<Prisma.Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number(),
  in: z.number().array(),
  notIn: z.number().array(),
  lt: z.number(),
  lte: z.number(),
  gt: z.number(),
  gte: z.number(),
  not: z.union([z.number(), z.lazy(() => NestedFloatNullableFilter),]).optional().nullable(),
}).strict();

export const NestedFloatFilter: z.ZodType<Prisma.Prisma.NestedFloatFilter> = z.object({
  equals: z.number(),
  in: z.number().array(),
  notIn: z.number().array(),
  lt: z.number(),
  lte: z.number(),
  gt: z.number(),
  gte: z.number(),
  not: z.union([z.number(), z.lazy(() => NestedFloatFilter),]).optional(),
}).strict();

export const NestedDecimalFilter: z.ZodType<Prisma.Prisma.NestedDecimalFilter> = z.object({
  equals: z.number(),
  in: z.number().array(),
  notIn: z.number().array(),
  lt: z.number(),
  lte: z.number(),
  gt: z.number(),
  gte: z.number(),
  not: z.union([z.number(), z.lazy(() => NestedDecimalFilter),]).optional(),
}).strict();

export const NestedDecimalNullableFilter: z.ZodType<Prisma.Prisma.NestedDecimalNullableFilter> = z.object({
  equals: z.number(),
  in: z.number().array(),
  notIn: z.number().array(),
  lt: z.number(),
  lte: z.number(),
  gt: z.number(),
  gte: z.number(),
  not: z.union([z.number(), z.lazy(() => NestedDecimalNullableFilter),]).optional().nullable(),
}).strict();

export const NestedBigIntFilter: z.ZodType<Prisma.Prisma.NestedBigIntFilter> = z.object({
  equals: z.bigint(),
  in: z.bigint().array(),
  notIn: z.bigint().array(),
  lt: z.bigint(),
  lte: z.bigint(),
  gt: z.bigint(),
  gte: z.bigint(),
  not: z.union([z.bigint(), z.lazy(() => NestedBigIntFilter),]).optional(),
}).strict();

export const NestedBigIntNullableFilter: z.ZodType<Prisma.Prisma.NestedBigIntNullableFilter> = z.object({
  equals: z.bigint(),
  in: z.bigint().array(),
  notIn: z.bigint().array(),
  lt: z.bigint(),
  lte: z.bigint(),
  gt: z.bigint(),
  gte: z.bigint(),
  not: z.union([z.bigint(), z.lazy(() => NestedBigIntNullableFilter),]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string(),
  in: z.string().array(),
  notIn: z.string().array(),
  lt: z.string(),
  lte: z.string(),
  gt: z.string(),
  gte: z.string(),
  contains: z.string(),
  startsWith: z.string(),
  endsWith: z.string(),
  not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilter),]).optional(),
  _count: z.lazy(() => NestedIntFilter),
  _min: z.lazy(() => NestedStringFilter),
  _max: z.lazy(() => NestedStringFilter),
}).strict();

export const NestedStringNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string(),
  in: z.string().array(),
  notIn: z.string().array(),
  lt: z.string(),
  lte: z.string(),
  gt: z.string(),
  gte: z.string(),
  contains: z.string(),
  startsWith: z.string(),
  endsWith: z.string(),
  not: z.union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilter),]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilter),
  _min: z.lazy(() => NestedStringNullableFilter),
  _max: z.lazy(() => NestedStringNullableFilter),
}).strict();

export const NestedEnumMyValueWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedEnumMyValueWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MyValue),
  in: z.lazy(() => MyValue).array(),
  notIn: z.lazy(() => MyValue).array(),
  not: z.union([z.lazy(() => MyValue), z.lazy(() => NestedEnumMyValueWithAggregatesFilter),]).optional(),
  _count: z.lazy(() => NestedIntFilter),
  _min: z.lazy(() => NestedEnumMyValueFilter),
  _max: z.lazy(() => NestedEnumMyValueFilter),
}).strict();

export const NestedIntWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number(),
  in: z.number().array(),
  notIn: z.number().array(),
  lt: z.number(),
  lte: z.number(),
  gt: z.number(),
  gte: z.number(),
  not: z.union([z.number(), z.lazy(() => NestedIntWithAggregatesFilter),]).optional(),
  _count: z.lazy(() => NestedIntFilter),
  _avg: z.lazy(() => NestedFloatFilter),
  _sum: z.lazy(() => NestedIntFilter),
  _min: z.lazy(() => NestedIntFilter),
  _max: z.lazy(() => NestedIntFilter),
}).strict();

export const NestedIntNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number(),
  in: z.number().array(),
  notIn: z.number().array(),
  lt: z.number(),
  lte: z.number(),
  gt: z.number(),
  gte: z.number(),
  not: z.union([z.number(), z.lazy(() => NestedIntNullableWithAggregatesFilter),]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilter),
  _avg: z.lazy(() => NestedFloatNullableFilter),
  _sum: z.lazy(() => NestedIntNullableFilter),
  _min: z.lazy(() => NestedIntNullableFilter),
  _max: z.lazy(() => NestedIntNullableFilter),
}).strict();

export const NestedFloatNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number(),
  in: z.number().array(),
  notIn: z.number().array(),
  lt: z.number(),
  lte: z.number(),
  gt: z.number(),
  gte: z.number(),
  not: z.union([z.number(), z.lazy(() => NestedFloatNullableWithAggregatesFilter),]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilter),
  _avg: z.lazy(() => NestedFloatNullableFilter),
  _sum: z.lazy(() => NestedFloatNullableFilter),
  _min: z.lazy(() => NestedFloatNullableFilter),
  _max: z.lazy(() => NestedFloatNullableFilter),
}).strict();

export const NestedFloatWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number(),
  in: z.number().array(),
  notIn: z.number().array(),
  lt: z.number(),
  lte: z.number(),
  gt: z.number(),
  gte: z.number(),
  not: z.union([z.number(), z.lazy(() => NestedFloatWithAggregatesFilter),]).optional(),
  _count: z.lazy(() => NestedIntFilter),
  _avg: z.lazy(() => NestedFloatFilter),
  _sum: z.lazy(() => NestedFloatFilter),
  _min: z.lazy(() => NestedFloatFilter),
  _max: z.lazy(() => NestedFloatFilter),
}).strict();

export const NestedDecimalWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedDecimalWithAggregatesFilter> = z.object({
  equals: z.number(),
  in: z.number().array(),
  notIn: z.number().array(),
  lt: z.number(),
  lte: z.number(),
  gt: z.number(),
  gte: z.number(),
  not: z.union([z.number(), z.lazy(() => NestedDecimalWithAggregatesFilter),]).optional(),
  _count: z.lazy(() => NestedIntFilter),
  _avg: z.lazy(() => NestedDecimalFilter),
  _sum: z.lazy(() => NestedDecimalFilter),
  _min: z.lazy(() => NestedDecimalFilter),
  _max: z.lazy(() => NestedDecimalFilter),
}).strict();

export const NestedDecimalNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedDecimalNullableWithAggregatesFilter> = z.object({
  equals: z.number(),
  in: z.number().array(),
  notIn: z.number().array(),
  lt: z.number(),
  lte: z.number(),
  gt: z.number(),
  gte: z.number(),
  not: z.union([z.number(), z.lazy(() => NestedDecimalNullableWithAggregatesFilter),]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilter),
  _avg: z.lazy(() => NestedDecimalNullableFilter),
  _sum: z.lazy(() => NestedDecimalNullableFilter),
  _min: z.lazy(() => NestedDecimalNullableFilter),
  _max: z.lazy(() => NestedDecimalNullableFilter),
}).strict();

export const NestedBigIntWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedBigIntWithAggregatesFilter> = z.object({
  equals: z.bigint(),
  in: z.bigint().array(),
  notIn: z.bigint().array(),
  lt: z.bigint(),
  lte: z.bigint(),
  gt: z.bigint(),
  gte: z.bigint(),
  not: z.union([z.bigint(), z.lazy(() => NestedBigIntWithAggregatesFilter),]).optional(),
  _count: z.lazy(() => NestedIntFilter),
  _avg: z.lazy(() => NestedFloatFilter),
  _sum: z.lazy(() => NestedBigIntFilter),
  _min: z.lazy(() => NestedBigIntFilter),
  _max: z.lazy(() => NestedBigIntFilter),
}).strict();

export const NestedBigIntNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedBigIntNullableWithAggregatesFilter> = z.object({
  equals: z.bigint(),
  in: z.bigint().array(),
  notIn: z.bigint().array(),
  lt: z.bigint(),
  lte: z.bigint(),
  gt: z.bigint(),
  gte: z.bigint(),
  not: z.union([z.bigint(), z.lazy(() => NestedBigIntNullableWithAggregatesFilter),]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilter),
  _avg: z.lazy(() => NestedFloatNullableFilter),
  _sum: z.lazy(() => NestedBigIntNullableFilter),
  _min: z.lazy(() => NestedBigIntNullableFilter),
  _max: z.lazy(() => NestedBigIntNullableFilter),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgs: z.ZodType<Prisma.Prisma.UserFindFirstArgs> = z.object({
}).strict();

export const UserFindManyArgs: z.ZodType<Prisma.Prisma.UserFindManyArgs> = z.object({
}).strict();

export const UserAggregateArgs: z.ZodType<Prisma.Prisma.UserAggregateArgs> = z.object({
}).strict();

export const UserGroupByArgs: z.ZodType<Prisma.Prisma.UserGroupByArgs> = z.object({
}).strict();

export const UserFindUniqueArgs: z.ZodType<Prisma.Prisma.UserFindUniqueArgs> = z.object({
}).strict();

export const UserCreateUniqueArgs: z.ZodType<Prisma.Prisma.UserCreateUniqueArgs> = z.object({
}).strict();

export const UserUpsertUniqueArgs: z.ZodType<Prisma.Prisma.UserUpsertUniqueArgs> = z.object({
}).strict();

export const UserCreateManyArgs: z.ZodType<Prisma.Prisma.UserCreateManyArgs> = z.object({
}).strict();

export const UserDeleteUniqueArgs: z.ZodType<Prisma.Prisma.UserDeleteUniqueArgs> = z.object({
}).strict();

export const UserUpdateUniqueArgs: z.ZodType<Prisma.Prisma.UserUpdateUniqueArgs> = z.object({
}).strict();

export const UserUpdateManyArgs: z.ZodType<Prisma.Prisma.UserUpdateManyArgs> = z.object({
}).strict();

export const UserDeleteManyArgs: z.ZodType<Prisma.Prisma.UserDeleteManyArgs> = z.object({
}).strict();
