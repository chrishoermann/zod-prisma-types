import { z } from "zod";
import * as PrismaClient from "@prisma/client";
import { myFunction } from '../../utils/myFunction';
import validator from 'validator';

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

// PRISMA GENERATED ENUMS
//------------------------------------------------------

export const MODELWithUpperCaseScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.MODELWithUpperCaseScalarFieldEnum);

export const QueryModeSchema = z.nativeEnum(PrismaClient.Prisma.QueryMode);

export const SortOrderSchema = z.nativeEnum(PrismaClient.Prisma.SortOrder);

export const TransactionIsolationLevelSchema = z.nativeEnum(PrismaClient.Prisma.TransactionIsolationLevel);

// CUSTOM ENUMS
//------------------------------------------------------

export const MYValueSchema = z.nativeEnum(PrismaClient.MYValue);

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

// MODEL WITH UPPER CASE
//------------------------------------------------------

export const MODELWithUpperCaseSchema = z.object({
  MYValue: MYValueSchema,
  id: z.number(),
  STRING: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const MODELWithUpperCaseOptionalDefaultsSchema = MODELWithUpperCaseSchema.merge(
  z.object({
    id: z.number().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  })
);

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// MODEL WITH UPPER CASE
//------------------------------------------------------

export const MODELWithUpperCaseSelectSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseSelect> = z.object({
  id: z.boolean().optional(),
  STRING: z.boolean().optional(),
  MYValue: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const MODELWithUpperCaseWhereInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseWhereInput> = z.object({
  AND: z.union([z.lazy(() => MODELWithUpperCaseWhereInputSchema), z.lazy(() => MODELWithUpperCaseWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => MODELWithUpperCaseWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => MODELWithUpperCaseWhereInputSchema), z.lazy(() => MODELWithUpperCaseWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  STRING: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  MYValue: z.union([z.lazy(() => EnumMYValueFilterSchema), z.lazy(() => MYValueSchema)]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.date()]).optional(),
}).strict();

export const MODELWithUpperCaseOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  STRING: z.lazy(() => SortOrderSchema).optional(),
  MYValue: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const MODELWithUpperCaseWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseWhereUniqueInput> = z.object({
  id: z.number().optional(),
}).strict();

export const MODELWithUpperCaseOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  STRING: z.lazy(() => SortOrderSchema).optional(),
  MYValue: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MODELWithUpperCaseCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => MODELWithUpperCaseAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MODELWithUpperCaseMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MODELWithUpperCaseMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => MODELWithUpperCaseSumOrderByAggregateInputSchema).optional(),
}).strict();

export const MODELWithUpperCaseScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => MODELWithUpperCaseScalarWhereWithAggregatesInputSchema), z.lazy(() => MODELWithUpperCaseScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => MODELWithUpperCaseScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => MODELWithUpperCaseScalarWhereWithAggregatesInputSchema), z.lazy(() => MODELWithUpperCaseScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
  STRING: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  MYValue: z.union([z.lazy(() => EnumMYValueWithAggregatesFilterSchema), z.lazy(() => MYValueSchema)]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.date()]).optional(),
}).strict();

export const MODELWithUpperCaseCreateInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseCreateInput> = z.object({
  STRING: z.string(),
  MYValue: z.lazy(() => MYValueSchema),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}).strict();

export const MODELWithUpperCaseUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseUncheckedCreateInput> = z.object({
  id: z.number().optional(),
  STRING: z.string(),
  MYValue: z.lazy(() => MYValueSchema),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}).strict();

export const MODELWithUpperCaseUpdateInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseUpdateInput> = z.object({
  STRING: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  MYValue: z.union([z.lazy(() => MYValueSchema), z.lazy(() => EnumMYValueFieldUpdateOperationsInputSchema)]).optional(),
  createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const MODELWithUpperCaseUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseUncheckedUpdateInput> = z.object({
  id: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  STRING: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  MYValue: z.union([z.lazy(() => MYValueSchema), z.lazy(() => EnumMYValueFieldUpdateOperationsInputSchema)]).optional(),
  createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const MODELWithUpperCaseCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseCreateManyInput> = z.object({
  id: z.number().optional(),
  STRING: z.string(),
  MYValue: z.lazy(() => MYValueSchema),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}).strict();

export const MODELWithUpperCaseUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseUpdateManyMutationInput> = z.object({
  STRING: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  MYValue: z.union([z.lazy(() => MYValueSchema), z.lazy(() => EnumMYValueFieldUpdateOperationsInputSchema)]).optional(),
  createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const MODELWithUpperCaseUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseUncheckedUpdateManyInput> = z.object({
  id: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  STRING: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  MYValue: z.union([z.lazy(() => MYValueSchema), z.lazy(() => EnumMYValueFieldUpdateOperationsInputSchema)]).optional(),
  createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<PrismaClient.Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<PrismaClient.Prisma.StringFilter> = z.object({
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
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringFilterSchema)]).optional(),
}).strict();

export const EnumMYValueFilterSchema: z.ZodType<PrismaClient.Prisma.EnumMYValueFilter> = z.object({
  equals: z.lazy(() => MYValueSchema).optional(),
  in: z.lazy(() => MYValueSchema).array().optional(),
  notIn: z.lazy(() => MYValueSchema).array().optional(),
  not: z.union([z.lazy(() => MYValueSchema), z.lazy(() => NestedEnumMYValueFilterSchema)]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<PrismaClient.Prisma.DateTimeFilter> = z.object({
  equals: z.date().optional(),
  in: z.date().array().optional(),
  notIn: z.date().array().optional(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeFilterSchema)]).optional(),
}).strict();

export const MODELWithUpperCaseCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  STRING: z.lazy(() => SortOrderSchema).optional(),
  MYValue: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const MODELWithUpperCaseAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const MODELWithUpperCaseMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  STRING: z.lazy(() => SortOrderSchema).optional(),
  MYValue: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const MODELWithUpperCaseMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  STRING: z.lazy(() => SortOrderSchema).optional(),
  MYValue: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const MODELWithUpperCaseSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.StringWithAggregatesFilter> = z.object({
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
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
}).strict();

export const EnumMYValueWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.EnumMYValueWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MYValueSchema).optional(),
  in: z.lazy(() => MYValueSchema).array().optional(),
  notIn: z.lazy(() => MYValueSchema).array().optional(),
  not: z.union([z.lazy(() => MYValueSchema), z.lazy(() => NestedEnumMYValueWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumMYValueFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumMYValueFilterSchema).optional(),
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.date().optional(),
  in: z.date().array().optional(),
  notIn: z.date().array().optional(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional(),
}).strict();

export const EnumMYValueFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.EnumMYValueFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => MYValueSchema).optional(),
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.date().optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<PrismaClient.Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<PrismaClient.Prisma.NestedStringFilter> = z.object({
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
  not: z.union([z.string(), z.lazy(() => NestedStringFilterSchema)]).optional(),
}).strict();

export const NestedEnumMYValueFilterSchema: z.ZodType<PrismaClient.Prisma.NestedEnumMYValueFilter> = z.object({
  equals: z.lazy(() => MYValueSchema).optional(),
  in: z.lazy(() => MYValueSchema).array().optional(),
  notIn: z.lazy(() => MYValueSchema).array().optional(),
  not: z.union([z.lazy(() => MYValueSchema), z.lazy(() => NestedEnumMYValueFilterSchema)]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<PrismaClient.Prisma.NestedDateTimeFilter> = z.object({
  equals: z.date().optional(),
  in: z.date().array().optional(),
  notIn: z.date().array().optional(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeFilterSchema)]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
}).strict();

export const NestedFloatFilterSchema: z.ZodType<PrismaClient.Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatFilterSchema)]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedStringWithAggregatesFilter> = z.object({
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
  not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
}).strict();

export const NestedEnumMYValueWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedEnumMYValueWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MYValueSchema).optional(),
  in: z.lazy(() => MYValueSchema).array().optional(),
  notIn: z.lazy(() => MYValueSchema).array().optional(),
  not: z.union([z.lazy(() => MYValueSchema), z.lazy(() => NestedEnumMYValueWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumMYValueFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumMYValueFilterSchema).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.date().optional(),
  in: z.date().array().optional(),
  notIn: z.date().array().optional(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const MODELWithUpperCaseFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseFindFirstArgs> = z.object({
  select: MODELWithUpperCaseSelectSchema.optional(),
  where: MODELWithUpperCaseWhereInputSchema.optional(),
  orderBy: z.union([MODELWithUpperCaseOrderByWithRelationInputSchema.array(), MODELWithUpperCaseOrderByWithRelationInputSchema]).optional(),
  cursor: MODELWithUpperCaseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: MODELWithUpperCaseScalarFieldEnumSchema.array().optional(),
}).strict();

export const MODELWithUpperCaseFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseFindFirstOrThrowArgs> = z.object({
  select: MODELWithUpperCaseSelectSchema.optional(),
  where: MODELWithUpperCaseWhereInputSchema.optional(),
  orderBy: z.union([MODELWithUpperCaseOrderByWithRelationInputSchema.array(), MODELWithUpperCaseOrderByWithRelationInputSchema]).optional(),
  cursor: MODELWithUpperCaseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: MODELWithUpperCaseScalarFieldEnumSchema.array().optional(),
}).strict();

export const MODELWithUpperCaseFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseFindManyArgs> = z.object({
  select: MODELWithUpperCaseSelectSchema.optional(),
  where: MODELWithUpperCaseWhereInputSchema.optional(),
  orderBy: z.union([MODELWithUpperCaseOrderByWithRelationInputSchema.array(), MODELWithUpperCaseOrderByWithRelationInputSchema]).optional(),
  cursor: MODELWithUpperCaseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: MODELWithUpperCaseScalarFieldEnumSchema.array().optional(),
}).strict();

export const MODELWithUpperCaseAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseAggregateArgs> = z.object({
  select: MODELWithUpperCaseSelectSchema.optional(),
  where: MODELWithUpperCaseWhereInputSchema.optional(),
  orderBy: z.union([MODELWithUpperCaseOrderByWithRelationInputSchema.array(), MODELWithUpperCaseOrderByWithRelationInputSchema]).optional(),
  cursor: MODELWithUpperCaseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const MODELWithUpperCaseGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseGroupByArgs> = z.object({
  select: MODELWithUpperCaseSelectSchema.optional(),
  where: MODELWithUpperCaseWhereInputSchema.optional(),
  orderBy: z.union([MODELWithUpperCaseOrderByWithAggregationInputSchema.array(), MODELWithUpperCaseOrderByWithAggregationInputSchema]).optional(),
  by: MODELWithUpperCaseScalarFieldEnumSchema.array(),
  having: MODELWithUpperCaseScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const MODELWithUpperCaseFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseFindUniqueArgs> = z.object({
  select: MODELWithUpperCaseSelectSchema.optional(),
  where: MODELWithUpperCaseWhereUniqueInputSchema,
}).strict();

export const MODELWithUpperCaseFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseFindUniqueOrThrowArgs> = z.object({
  select: MODELWithUpperCaseSelectSchema.optional(),
  where: MODELWithUpperCaseWhereUniqueInputSchema,
}).strict();

export const MODELWithUpperCaseCreateArgsSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseCreateArgs> = z.object({
  select: MODELWithUpperCaseSelectSchema.optional(),
  data: z.union([MODELWithUpperCaseCreateInputSchema, MODELWithUpperCaseUncheckedCreateInputSchema]),
}).strict();

export const MODELWithUpperCaseUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseUpsertArgs> = z.object({
  select: MODELWithUpperCaseSelectSchema.optional(),
  where: MODELWithUpperCaseWhereUniqueInputSchema,
  create: z.union([MODELWithUpperCaseCreateInputSchema, MODELWithUpperCaseUncheckedCreateInputSchema]),
  update: z.union([MODELWithUpperCaseUpdateInputSchema, MODELWithUpperCaseUncheckedUpdateInputSchema]),
}).strict();

export const MODELWithUpperCaseCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseCreateManyArgs> = z.object({
  data: MODELWithUpperCaseCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const MODELWithUpperCaseDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseDeleteArgs> = z.object({
  select: MODELWithUpperCaseSelectSchema.optional(),
  where: MODELWithUpperCaseWhereUniqueInputSchema,
}).strict();

export const MODELWithUpperCaseUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseUpdateArgs> = z.object({
  select: MODELWithUpperCaseSelectSchema.optional(),
  data: z.union([MODELWithUpperCaseUpdateInputSchema, MODELWithUpperCaseUncheckedUpdateInputSchema]),
  where: MODELWithUpperCaseWhereUniqueInputSchema,
}).strict();

export const MODELWithUpperCaseUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseUpdateManyArgs> = z.object({
  data: z.union([MODELWithUpperCaseUpdateManyMutationInputSchema, MODELWithUpperCaseUncheckedUpdateManyInputSchema]),
  where: MODELWithUpperCaseWhereInputSchema.optional(),
}).strict();

export const MODELWithUpperCaseDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseDeleteManyArgs> = z.object({
  where: MODELWithUpperCaseWhereInputSchema.optional(),
}).strict();
