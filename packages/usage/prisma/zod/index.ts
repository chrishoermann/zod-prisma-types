import { z } from "zod";
import * as PrismaClient from "@prisma/client";
import validator from "validator";
import { myFunction } from '../../myFunction';

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

// PRISMA GENERATED ENUMS
//------------------------------------------------------

export const MyModelScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.MyModelScalarFieldEnum);

export const QueryModeSchema = z.nativeEnum(PrismaClient.Prisma.QueryMode);

export const SortOrderSchema = z.nativeEnum(PrismaClient.Prisma.SortOrder);

export const TransactionIsolationLevelSchema = z.nativeEnum(PrismaClient.Prisma.TransactionIsolationLevel);

// CUSTOM ENUMS
//------------------------------------------------------

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

// MY MODEL
//------------------------------------------------------

/**
 * comment line one
 * comment line two
 */
export const MyModelSchema = z.object({
  id: z.number(),
  custom: z.string().refine((val) => myFunction(val), { message: 'Is not valid' }).nullish(),
});

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// MY MODEL
//------------------------------------------------------

export const MyModelSelectSchema: z.ZodType<PrismaClient.Prisma.MyModelSelect> = z.object({
  id: z.boolean().optional(),
  custom: z.boolean().optional(),
}).strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const MyModelWhereInputSchema: z.ZodType<PrismaClient.Prisma.MyModelWhereInput> = z.object({
  AND: z.union([z.lazy(() => MyModelWhereInputSchema), z.lazy(() => MyModelWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => MyModelWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => MyModelWhereInputSchema), z.lazy(() => MyModelWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  custom: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
}).strict();

export const MyModelOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.MyModelOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  custom: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const MyModelWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.MyModelWhereUniqueInput> = z.object({
  id: z.number().optional(),
}).strict();

export const MyModelOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.MyModelOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  custom: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MyModelCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => MyModelAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MyModelMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MyModelMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => MyModelSumOrderByAggregateInputSchema).optional(),
}).strict();

export const MyModelScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.MyModelScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => MyModelScalarWhereWithAggregatesInputSchema), z.lazy(() => MyModelScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => MyModelScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => MyModelScalarWhereWithAggregatesInputSchema), z.lazy(() => MyModelScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
  custom: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
}).strict();

export const MyModelCreateInputSchema: z.ZodType<PrismaClient.Prisma.MyModelCreateInput> = z.object({
  custom: z.string().refine((val) => myFunction(val), { message: 'Is not valid' }).optional().nullable(),
}).strict();

export const MyModelUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.MyModelUncheckedCreateInput> = z.object({
  id: z.number().optional(),
  custom: z.string().refine((val) => myFunction(val), { message: 'Is not valid' }).optional().nullable(),
}).strict();

export const MyModelUpdateInputSchema: z.ZodType<PrismaClient.Prisma.MyModelUpdateInput> = z.object({
  custom: z.union([z.string().refine((val) => myFunction(val), { message: 'Is not valid' }), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const MyModelUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.MyModelUncheckedUpdateInput> = z.object({
  id: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  custom: z.union([z.string().refine((val) => myFunction(val), { message: 'Is not valid' }), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const MyModelCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.MyModelCreateManyInput> = z.object({
  id: z.number().optional(),
  custom: z.string().refine((val) => myFunction(val), { message: 'Is not valid' }).optional().nullable(),
}).strict();

export const MyModelUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.MyModelUpdateManyMutationInput> = z.object({
  custom: z.union([z.string().refine((val) => myFunction(val), { message: 'Is not valid' }), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const MyModelUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.MyModelUncheckedUpdateManyInput> = z.object({
  id: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  custom: z.union([z.string().refine((val) => myFunction(val), { message: 'Is not valid' }), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
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

export const StringNullableFilterSchema: z.ZodType<PrismaClient.Prisma.StringNullableFilter> = z.object({
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
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)]).optional().nullable(),
}).strict();

export const MyModelCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.MyModelCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  custom: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const MyModelAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.MyModelAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const MyModelMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.MyModelMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  custom: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const MyModelMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.MyModelMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  custom: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const MyModelSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.MyModelSumOrderByAggregateInput> = z.object({
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

export const StringNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.StringNullableWithAggregatesFilter> = z.object({
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
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable(),
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

export const NestedStringNullableFilterSchema: z.ZodType<PrismaClient.Prisma.NestedStringNullableFilter> = z.object({
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
  not: z.union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)]).optional().nullable(),
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

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
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
  not: z.union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<PrismaClient.Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const MyModelFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.MyModelFindFirstArgs> = z.object({
  select: z.lazy(() => MyModelSelectSchema).optional(),
  where: MyModelWhereInputSchema.optional(),
  orderBy: z.union([MyModelOrderByWithRelationInputSchema.array(), MyModelOrderByWithRelationInputSchema]).optional(),
  cursor: MyModelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: MyModelScalarFieldEnumSchema.array().optional(),
}).strict();

export const MyModelFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.MyModelFindFirstOrThrowArgs> = z.object({
  select: z.lazy(() => MyModelSelectSchema).optional(),
  where: MyModelWhereInputSchema.optional(),
  orderBy: z.union([MyModelOrderByWithRelationInputSchema.array(), MyModelOrderByWithRelationInputSchema]).optional(),
  cursor: MyModelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: MyModelScalarFieldEnumSchema.array().optional(),
}).strict();

export const MyModelFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.MyModelFindManyArgs> = z.object({
  select: z.lazy(() => MyModelSelectSchema).optional(),
  where: MyModelWhereInputSchema.optional(),
  orderBy: z.union([MyModelOrderByWithRelationInputSchema.array(), MyModelOrderByWithRelationInputSchema]).optional(),
  cursor: MyModelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: MyModelScalarFieldEnumSchema.array().optional(),
}).strict();

export const MyModelAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.MyModelAggregateArgs> = z.object({
  select: z.lazy(() => MyModelSelectSchema).optional(),
  where: MyModelWhereInputSchema.optional(),
  orderBy: z.union([MyModelOrderByWithRelationInputSchema.array(), MyModelOrderByWithRelationInputSchema]).optional(),
  cursor: MyModelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const MyModelGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.MyModelGroupByArgs> = z.object({
  select: z.lazy(() => MyModelSelectSchema).optional(),
  where: MyModelWhereInputSchema.optional(),
  orderBy: z.union([MyModelOrderByWithAggregationInputSchema.array(), MyModelOrderByWithAggregationInputSchema]).optional(),
  by: MyModelScalarFieldEnumSchema.array(),
  having: MyModelScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const MyModelFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.MyModelFindUniqueArgs> = z.object({
  select: z.lazy(() => MyModelSelectSchema).optional(),
  where: MyModelWhereUniqueInputSchema,
}).strict();

export const MyModelFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.MyModelFindUniqueOrThrowArgs> = z.object({
  select: z.lazy(() => MyModelSelectSchema).optional(),
  where: MyModelWhereUniqueInputSchema,
}).strict();

export const MyModelCreateArgsSchema: z.ZodType<PrismaClient.Prisma.MyModelCreateArgs> = z.object({
  select: z.lazy(() => MyModelSelectSchema).optional(),
  data: z.union([MyModelCreateInputSchema, MyModelUncheckedCreateInputSchema]),
}).strict();

export const MyModelUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.MyModelUpsertArgs> = z.object({
  select: z.lazy(() => MyModelSelectSchema).optional(),
  where: MyModelWhereUniqueInputSchema,
  create: z.union([MyModelCreateInputSchema, MyModelUncheckedCreateInputSchema]),
  update: z.union([MyModelUpdateInputSchema, MyModelUncheckedUpdateInputSchema]),
}).strict();

export const MyModelCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.MyModelCreateManyArgs> = z.object({
  select: z.lazy(() => MyModelSelectSchema).optional(),
  data: MyModelCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const MyModelDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.MyModelDeleteArgs> = z.object({
  select: z.lazy(() => MyModelSelectSchema).optional(),
  where: MyModelWhereUniqueInputSchema,
}).strict();

export const MyModelUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.MyModelUpdateArgs> = z.object({
  select: z.lazy(() => MyModelSelectSchema).optional(),
  data: z.union([MyModelUpdateInputSchema, MyModelUncheckedUpdateInputSchema]),
  where: MyModelWhereUniqueInputSchema,
}).strict();

export const MyModelUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.MyModelUpdateManyArgs> = z.object({
  select: z.lazy(() => MyModelSelectSchema).optional(),
  data: z.union([MyModelUpdateManyMutationInputSchema, MyModelUncheckedUpdateManyInputSchema]),
  where: MyModelWhereInputSchema.optional(),
}).strict();

export const MyModelDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.MyModelDeleteManyArgs> = z.object({
  select: z.lazy(() => MyModelSelectSchema).optional(),
  where: MyModelWhereInputSchema.optional(),
}).strict();
