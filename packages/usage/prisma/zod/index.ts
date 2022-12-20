import { z } from "zod";
import * as PrismaClient from "../client";
import { myFunction } from '../../utils/myFunction';
import validator from 'validator';

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

// PRISMA GENERATED ENUMS
//------------------------------------------------------

export const JsonModelScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.JsonModelScalarFieldEnum);

export const JsonNullValueFilterSchema = z.enum(['DbNull', 'JsonNull', 'AnyNull',]);

export const JsonNullValueInputSchema = z.enum(['JsonNull',]);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull', 'JsonNull',]).transform((v) => transformJsonNull(v));

export const SortOrderSchema = z.nativeEnum(PrismaClient.Prisma.SortOrder);

export const TransactionIsolationLevelSchema = z.nativeEnum(PrismaClient.Prisma.TransactionIsolationLevel);

// CUSTOM ENUMS
//------------------------------------------------------

/////////////////////////////////////////
// HELPER TYPES
/////////////////////////////////////////

type NullableJsonInput = PrismaClient.Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | PrismaClient.Prisma.NullTypes.DbNull | PrismaClient.Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return PrismaClient.Prisma.DbNull;
  if (v === 'JsonNull') return PrismaClient.Prisma.JsonNull;
  return v;
};

export const JsonValue: z.ZodType<PrismaClient.Prisma.JsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(JsonValue)),
  z.lazy(() => z.record(JsonValue)),
]);

export const NullableJsonValue = z
  .union([JsonValue, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export const InputJsonValue: z.ZodType<PrismaClient.Prisma.InputJsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(InputJsonValue.nullable())),
  z.lazy(() => z.record(InputJsonValue.nullable())),
]);

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

// JSON MODEL
//------------------------------------------------------

export const JsonModelSchema = z.object({
  id: z.number(),
  json: InputJsonValue,
  jsonOpt: NullableJsonValue.optional(),
});

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// JSON MODEL
//------------------------------------------------------

export const JsonModelSelectSchema: z.ZodType<PrismaClient.Prisma.JsonModelSelect> = z.object({
  id: z.boolean().optional(),
  json: z.boolean().optional(),
  jsonOpt: z.boolean().optional(),
}).strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const JsonModelWhereInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelWhereInput> = z.object({
  AND: z.union([z.lazy(() => JsonModelWhereInputSchema), z.lazy(() => JsonModelWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => JsonModelWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => JsonModelWhereInputSchema), z.lazy(() => JsonModelWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  json: z.lazy(() => JsonFilterSchema).optional(),
  jsonOpt: z.lazy(() => JsonNullableFilterSchema).optional(),
}).strict();

export const JsonModelOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  json: z.lazy(() => SortOrderSchema).optional(),
  jsonOpt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const JsonModelWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelWhereUniqueInput> = z.object({
  id: z.number().optional(),
}).strict();

export const JsonModelOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  json: z.lazy(() => SortOrderSchema).optional(),
  jsonOpt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => JsonModelCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => JsonModelAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => JsonModelMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => JsonModelMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => JsonModelSumOrderByAggregateInputSchema).optional(),
}).strict();

export const JsonModelScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => JsonModelScalarWhereWithAggregatesInputSchema), z.lazy(() => JsonModelScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => JsonModelScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => JsonModelScalarWhereWithAggregatesInputSchema), z.lazy(() => JsonModelScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
  json: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  jsonOpt: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
}).strict();

export const JsonModelCreateInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelCreateInput> = z.object({
  json: z.union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue]),
  jsonOpt: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
}).strict();

export const JsonModelUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelUncheckedCreateInput> = z.object({
  id: z.number().optional(),
  json: z.union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue]),
  jsonOpt: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
}).strict();

export const JsonModelUpdateInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelUpdateInput> = z.object({
  json: z.union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue]).optional(),
  jsonOpt: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
}).strict();

export const JsonModelUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelUncheckedUpdateInput> = z.object({
  id: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  json: z.union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue]).optional(),
  jsonOpt: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
}).strict();

export const JsonModelCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelCreateManyInput> = z.object({
  id: z.number().optional(),
  json: z.union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue]),
  jsonOpt: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
}).strict();

export const JsonModelUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelUpdateManyMutationInput> = z.object({
  json: z.union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue]).optional(),
  jsonOpt: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
}).strict();

export const JsonModelUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelUncheckedUpdateManyInput> = z.object({
  id: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  json: z.union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue]).optional(),
  jsonOpt: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
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

export const JsonFilterSchema: z.ZodType<PrismaClient.Prisma.JsonFilter> = z.object({
  equals: z.union([InputJsonValue, z.lazy(() => JsonNullValueFilterSchema)]).optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([InputJsonValue, z.lazy(() => JsonNullValueFilterSchema)]).optional(),
}).strict();

export const JsonNullableFilterSchema: z.ZodType<PrismaClient.Prisma.JsonNullableFilter> = z.object({
  equals: z.union([InputJsonValue, z.lazy(() => JsonNullValueFilterSchema)]).optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([InputJsonValue, z.lazy(() => JsonNullValueFilterSchema)]).optional(),
}).strict();

export const JsonModelCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  json: z.lazy(() => SortOrderSchema).optional(),
  jsonOpt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const JsonModelAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const JsonModelMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const JsonModelMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const JsonModelSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelSumOrderByAggregateInput> = z.object({
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

export const JsonWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.JsonWithAggregatesFilter> = z.object({
  equals: z.union([InputJsonValue, z.lazy(() => JsonNullValueFilterSchema)]).optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([InputJsonValue, z.lazy(() => JsonNullValueFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonFilterSchema).optional(),
}).strict();

export const JsonNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.JsonNullableWithAggregatesFilter> = z.object({
  equals: z.union([InputJsonValue, z.lazy(() => JsonNullValueFilterSchema)]).optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([InputJsonValue, z.lazy(() => JsonNullValueFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
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

export const NestedJsonFilterSchema: z.ZodType<PrismaClient.Prisma.NestedJsonFilter> = z.object({
  equals: z.union([InputJsonValue, z.lazy(() => JsonNullValueFilterSchema)]).optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([InputJsonValue, z.lazy(() => JsonNullValueFilterSchema)]).optional(),
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

export const NestedJsonNullableFilterSchema: z.ZodType<PrismaClient.Prisma.NestedJsonNullableFilter> = z.object({
  equals: z.union([InputJsonValue, z.lazy(() => JsonNullValueFilterSchema)]).optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([InputJsonValue, z.lazy(() => JsonNullValueFilterSchema)]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const JsonModelFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.JsonModelFindFirstArgs> = z.object({
  select: JsonModelSelectSchema.optional(),
  where: JsonModelWhereInputSchema.optional(),
  orderBy: z.union([JsonModelOrderByWithRelationInputSchema.array(), JsonModelOrderByWithRelationInputSchema]).optional(),
  cursor: JsonModelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: JsonModelScalarFieldEnumSchema.array().optional(),
}).strict();

export const JsonModelFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.JsonModelFindFirstOrThrowArgs> = z.object({
  select: JsonModelSelectSchema.optional(),
  where: JsonModelWhereInputSchema.optional(),
  orderBy: z.union([JsonModelOrderByWithRelationInputSchema.array(), JsonModelOrderByWithRelationInputSchema]).optional(),
  cursor: JsonModelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: JsonModelScalarFieldEnumSchema.array().optional(),
}).strict();

export const JsonModelFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.JsonModelFindManyArgs> = z.object({
  select: JsonModelSelectSchema.optional(),
  where: JsonModelWhereInputSchema.optional(),
  orderBy: z.union([JsonModelOrderByWithRelationInputSchema.array(), JsonModelOrderByWithRelationInputSchema]).optional(),
  cursor: JsonModelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: JsonModelScalarFieldEnumSchema.array().optional(),
}).strict();

export const JsonModelAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.JsonModelAggregateArgs> = z.object({
  select: JsonModelSelectSchema.optional(),
  where: JsonModelWhereInputSchema.optional(),
  orderBy: z.union([JsonModelOrderByWithRelationInputSchema.array(), JsonModelOrderByWithRelationInputSchema]).optional(),
  cursor: JsonModelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const JsonModelGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.JsonModelGroupByArgs> = z.object({
  select: JsonModelSelectSchema.optional(),
  where: JsonModelWhereInputSchema.optional(),
  orderBy: z.union([JsonModelOrderByWithAggregationInputSchema.array(), JsonModelOrderByWithAggregationInputSchema]).optional(),
  by: JsonModelScalarFieldEnumSchema.array(),
  having: JsonModelScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const JsonModelFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.JsonModelFindUniqueArgs> = z.object({
  select: JsonModelSelectSchema.optional(),
  where: JsonModelWhereUniqueInputSchema,
}).strict();

export const JsonModelFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.JsonModelFindUniqueOrThrowArgs> = z.object({
  select: JsonModelSelectSchema.optional(),
  where: JsonModelWhereUniqueInputSchema,
}).strict();

export const JsonModelCreateArgsSchema: z.ZodType<PrismaClient.Prisma.JsonModelCreateArgs> = z.object({
  select: JsonModelSelectSchema.optional(),
  data: z.union([JsonModelCreateInputSchema, JsonModelUncheckedCreateInputSchema]),
}).strict();

export const JsonModelUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.JsonModelUpsertArgs> = z.object({
  select: JsonModelSelectSchema.optional(),
  where: JsonModelWhereUniqueInputSchema,
  create: z.union([JsonModelCreateInputSchema, JsonModelUncheckedCreateInputSchema]),
  update: z.union([JsonModelUpdateInputSchema, JsonModelUncheckedUpdateInputSchema]),
}).strict();

export const JsonModelCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.JsonModelCreateManyArgs> = z.object({
  data: JsonModelCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const JsonModelDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.JsonModelDeleteArgs> = z.object({
  select: JsonModelSelectSchema.optional(),
  where: JsonModelWhereUniqueInputSchema,
}).strict();

export const JsonModelUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.JsonModelUpdateArgs> = z.object({
  select: JsonModelSelectSchema.optional(),
  data: z.union([JsonModelUpdateInputSchema, JsonModelUncheckedUpdateInputSchema]),
  where: JsonModelWhereUniqueInputSchema,
}).strict();

export const JsonModelUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.JsonModelUpdateManyArgs> = z.object({
  data: z.union([JsonModelUpdateManyMutationInputSchema, JsonModelUncheckedUpdateManyInputSchema]),
  where: JsonModelWhereInputSchema.optional(),
}).strict();

export const JsonModelDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.JsonModelDeleteManyArgs> = z.object({
  where: JsonModelWhereInputSchema.optional(),
}).strict();
