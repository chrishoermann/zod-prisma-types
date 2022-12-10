import { z } from "zod";
import * as PrismaClient from "@prisma/client";
import validator from "validator";

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

// PRISMA GENERATED ENUMS
//------------------------------------------------------

export const JsonNullValueFilterSchema = z.enum(['DbNull', 'JsonNull', 'AnyNull',]);

export const JsonNullValueInputSchema = z.enum(['JsonNull',]);

export const MyModelScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.MyModelScalarFieldEnum);

export const MyPrismaScalarsTypeScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.MyPrismaScalarsTypeScalarFieldEnum);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull', 'JsonNull',]);

export const PostScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.PostScalarFieldEnum);

export const ProfileScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.ProfileScalarFieldEnum);

export const QueryModeSchema = z.nativeEnum(PrismaClient.Prisma.QueryMode);

export const SortOrderSchema = z.nativeEnum(PrismaClient.Prisma.SortOrder);

export const TestScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.TestScalarFieldEnum);

export const TransactionIsolationLevelSchema = z.nativeEnum(PrismaClient.Prisma.TransactionIsolationLevel);

export const UserScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.UserScalarFieldEnum);

// CUSTOM ENUMS
//------------------------------------------------------

export const MyValueSchema = z.nativeEnum(PrismaClient.MyValue);

export const RoleSchema = z.nativeEnum(PrismaClient.Role);

export const SecondEnumSchema = z.nativeEnum(PrismaClient.SecondEnum);

export const AnotherEnumSchema = z.nativeEnum(PrismaClient.AnotherEnum);

/////////////////////////////////////////
// HELPER TYPES
/////////////////////////////////////////

export const JsonValue: z.ZodType<PrismaClient.Prisma.JsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(JsonValue)),
  z.lazy(() => z.record(JsonValue)),
]).nullable();

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

// MY MODEL
//------------------------------------------------------

/**
 * Docuemtnation on my model
 * multiline docs
 */
export const MyModelSchema = z.object({
  id: z.number(),
  custom: z.string().refine(val => validator.isBIC(val)).transform(val => val.toUpperCase()).nullish(),
});

// TEST
//------------------------------------------------------

export const TestSchema = z.object({
  value: MyValueSchema,
  id: z.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid(),
  name: z.string({ required_error: "error", invalid_type_error: "error" }).nullish(),
  bic: z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }).nullish(),
  intTwo: z.number(),
  int: z.number().nullish(),
  floatOpt: z.number().nullish(),
  float: z.number(),
  decimal: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Field "decimal" must be a Decimal', path: ['Models', 'Test'] }),
  decimalOpt: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Field "decimalOpt" must be a Decimal', path: ['Models', 'Test'] }).nullish(),
  date: z.date(),
  dateOpt: z.date({ invalid_type_error: "wrong date type" }).nullish(),
  bigInt: z.bigint({ invalid_type_error: "error" }),
  bigIntOpt: z.bigint().nullish(),
  json: JsonValue,
  jsonOpt: JsonValue.nullish(),
  bytes: z.instanceof(Buffer),
  bytesOpt: z.instanceof(Buffer).nullish(),
});

// MY PRISMA SCALARS TYPE
//------------------------------------------------------

export const MyPrismaScalarsTypeSchema = z.object({
  id: z.string({ invalid_type_error: "invalid type error" }).cuid(),
  /**
   * Some comment about string
   */
  string: z.string().min(3, { message: "min error" }).max(10, { message: "max error" }).nullish(),
  bic: z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }).nullish(),
  float: z.number().lt(10, { message: "lt error" }).gt(5, { message: "gt error" }),
  decimal: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Field "decimal" must be a Decimal', path: ['Models', 'MyPrismaScalarsType'] }),
  date: z.date().min(new Date('2020-01-01')).max(new Date('2020-12-31')).nullish(),
  bigInt: z.bigint(),
  json: JsonValue,
  bytes: z.instanceof(Buffer),
  custom: z.string().nullish(),
});

// USER
//------------------------------------------------------

export const UserSchema = z.object({
  role: RoleSchema.array(),
  enum: AnotherEnumSchema,
  id: z.string().cuid(),
  email: z.string().email({ message: "Invalid email address" }),
  /**
   * some other comment
   * some message after
   */
  name: z.string().min(1).max(100).nullish(),
});

// POST
//------------------------------------------------------

export const PostSchema = z.object({
  anotherEnum: AnotherEnumSchema.array(),
  id: z.number(),
  title: z.string(),
  content: z.string().nullish(),
  published: z.boolean(),
  authorId: z.string(),
});

// PROFILE
//------------------------------------------------------

export const ProfileSchema = z.object({
  role: RoleSchema.array(),
  second: SecondEnumSchema,
  id: z.number(),
  bio: z.string(),
  userId: z.string(),
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

// TEST
//------------------------------------------------------

export const TestSelectSchema: z.ZodType<PrismaClient.Prisma.TestSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  bic: z.boolean().optional(),
  intTwo: z.boolean().optional(),
  int: z.boolean().optional(),
  floatOpt: z.boolean().optional(),
  float: z.boolean().optional(),
  decimal: z.boolean().optional(),
  decimalOpt: z.boolean().optional(),
  date: z.boolean().optional(),
  dateOpt: z.boolean().optional(),
  bigInt: z.boolean().optional(),
  bigIntOpt: z.boolean().optional(),
  json: z.boolean().optional(),
  jsonOpt: z.boolean().optional(),
  bytes: z.boolean().optional(),
  bytesOpt: z.boolean().optional(),
  value: z.boolean().optional(),
}).strict();

// MY PRISMA SCALARS TYPE
//------------------------------------------------------

export const MyPrismaScalarsTypeSelectSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeSelect> = z.object({
  id: z.boolean().optional(),
  string: z.boolean().optional(),
  bic: z.boolean().optional(),
  float: z.boolean().optional(),
  decimal: z.boolean().optional(),
  date: z.boolean().optional(),
  bigInt: z.boolean().optional(),
  json: z.boolean().optional(),
  bytes: z.boolean().optional(),
  custom: z.boolean().optional(),
}).strict();

// USER
//------------------------------------------------------

export const UserArgsSchema: z.ZodType<PrismaClient.Prisma.UserArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserSelectSchema: z.ZodType<PrismaClient.Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  role: z.boolean().optional(),
  enum: z.boolean().optional(),
  posts: z.union([z.boolean(), z.lazy(() => PostArgsSchema)]).optional(),
  profile: z.union([z.boolean(), z.lazy(() => ProfileArgsSchema)]).optional(),
}).strict();

export const UserIncludeSchema: z.ZodType<PrismaClient.Prisma.UserInclude> = z.object({
  posts: z.union([z.boolean(), z.lazy(() => PostArgsSchema)]).optional(),
  profile: z.union([z.boolean(), z.lazy(() => ProfileArgsSchema)]).optional(),
}).strict();

// POST
//------------------------------------------------------

export const PostArgsSchema: z.ZodType<PrismaClient.Prisma.PostArgs> = z.object({
  select: z.lazy(() => PostSelectSchema).optional(),
  include: z.lazy(() => PostIncludeSchema).optional(),
}).strict();

export const PostSelectSchema: z.ZodType<PrismaClient.Prisma.PostSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  content: z.boolean().optional(),
  published: z.boolean().optional(),
  authorId: z.boolean().optional(),
  anotherEnum: z.boolean().optional(),
  author: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const PostIncludeSchema: z.ZodType<PrismaClient.Prisma.PostInclude> = z.object({
  author: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

// PROFILE
//------------------------------------------------------

export const ProfileArgsSchema: z.ZodType<PrismaClient.Prisma.ProfileArgs> = z.object({
  select: z.lazy(() => ProfileSelectSchema).optional(),
  include: z.lazy(() => ProfileIncludeSchema).optional(),
}).strict();

export const ProfileSelectSchema: z.ZodType<PrismaClient.Prisma.ProfileSelect> = z.object({
  id: z.boolean().optional(),
  bio: z.boolean().optional(),
  userId: z.boolean().optional(),
  role: z.boolean().optional(),
  second: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const ProfileIncludeSchema: z.ZodType<PrismaClient.Prisma.ProfileInclude> = z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
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

export const TestWhereInputSchema: z.ZodType<PrismaClient.Prisma.TestWhereInput> = z.object({
  AND: z.union([z.lazy(() => TestWhereInputSchema), z.lazy(() => TestWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => TestWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => TestWhereInputSchema), z.lazy(() => TestWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  value: z.union([z.lazy(() => EnumMyValueFilterSchema), z.lazy(() => MyValueSchema)]).optional(),
  bic: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  intTwo: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  int: z.union([z.lazy(() => IntNullableFilterSchema), z.number()]).optional().nullable(),
  floatOpt: z.union([z.lazy(() => FloatNullableFilterSchema), z.number()]).optional().nullable(),
  float: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  decimal: z.union([z.lazy(() => DecimalFilterSchema), z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' })]).optional(),
  decimalOpt: z.union([z.lazy(() => DecimalNullableFilterSchema), z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' })]).optional().nullable(),
  date: z.union([z.lazy(() => DateTimeFilterSchema), z.date()]).optional(),
  dateOpt: z.union([z.lazy(() => DateTimeNullableFilterSchema), z.date()]).optional().nullable(),
  bigInt: z.union([z.lazy(() => BigIntFilterSchema), z.bigint()]).optional(),
  bigIntOpt: z.union([z.lazy(() => BigIntNullableFilterSchema), z.bigint()]).optional().nullable(),
  json: z.lazy(() => JsonFilterSchema).optional(),
  jsonOpt: z.lazy(() => JsonNullableFilterSchema).optional(),
  bytes: z.union([z.lazy(() => BytesFilterSchema), z.instanceof(Buffer)]).optional(),
  bytesOpt: z.union([z.lazy(() => BytesNullableFilterSchema), z.instanceof(Buffer)]).optional().nullable(),
}).strict();

export const TestOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.TestOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  bic: z.lazy(() => SortOrderSchema).optional(),
  intTwo: z.lazy(() => SortOrderSchema).optional(),
  int: z.lazy(() => SortOrderSchema).optional(),
  floatOpt: z.lazy(() => SortOrderSchema).optional(),
  float: z.lazy(() => SortOrderSchema).optional(),
  decimal: z.lazy(() => SortOrderSchema).optional(),
  decimalOpt: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  dateOpt: z.lazy(() => SortOrderSchema).optional(),
  bigInt: z.lazy(() => SortOrderSchema).optional(),
  bigIntOpt: z.lazy(() => SortOrderSchema).optional(),
  json: z.lazy(() => SortOrderSchema).optional(),
  jsonOpt: z.lazy(() => SortOrderSchema).optional(),
  bytes: z.lazy(() => SortOrderSchema).optional(),
  bytesOpt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const TestWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.TestWhereUniqueInput> = z.object({
  id: z.string().optional(),
}).strict();

export const TestOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.TestOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  bic: z.lazy(() => SortOrderSchema).optional(),
  intTwo: z.lazy(() => SortOrderSchema).optional(),
  int: z.lazy(() => SortOrderSchema).optional(),
  floatOpt: z.lazy(() => SortOrderSchema).optional(),
  float: z.lazy(() => SortOrderSchema).optional(),
  decimal: z.lazy(() => SortOrderSchema).optional(),
  decimalOpt: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  dateOpt: z.lazy(() => SortOrderSchema).optional(),
  bigInt: z.lazy(() => SortOrderSchema).optional(),
  bigIntOpt: z.lazy(() => SortOrderSchema).optional(),
  json: z.lazy(() => SortOrderSchema).optional(),
  jsonOpt: z.lazy(() => SortOrderSchema).optional(),
  bytes: z.lazy(() => SortOrderSchema).optional(),
  bytesOpt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TestCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TestAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TestMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TestMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TestSumOrderByAggregateInputSchema).optional(),
}).strict();

export const TestScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.TestScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => TestScalarWhereWithAggregatesInputSchema), z.lazy(() => TestScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => TestScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => TestScalarWhereWithAggregatesInputSchema), z.lazy(() => TestScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  value: z.union([z.lazy(() => EnumMyValueWithAggregatesFilterSchema), z.lazy(() => MyValueSchema)]).optional(),
  bic: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  intTwo: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
  int: z.union([z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number()]).optional().nullable(),
  floatOpt: z.union([z.lazy(() => FloatNullableWithAggregatesFilterSchema), z.number()]).optional().nullable(),
  float: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
  decimal: z.union([z.lazy(() => DecimalWithAggregatesFilterSchema), z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' })]).optional(),
  decimalOpt: z.union([z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' })]).optional().nullable(),
  date: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.date()]).optional(),
  dateOpt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.date()]).optional().nullable(),
  bigInt: z.union([z.lazy(() => BigIntWithAggregatesFilterSchema), z.bigint()]).optional(),
  bigIntOpt: z.union([z.lazy(() => BigIntNullableWithAggregatesFilterSchema), z.bigint()]).optional().nullable(),
  json: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  jsonOpt: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  bytes: z.union([z.lazy(() => BytesWithAggregatesFilterSchema), z.instanceof(Buffer)]).optional(),
  bytesOpt: z.union([z.lazy(() => BytesNullableWithAggregatesFilterSchema), z.instanceof(Buffer)]).optional().nullable(),
}).strict();

export const MyPrismaScalarsTypeWhereInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeWhereInput> = z.object({
  AND: z.union([z.lazy(() => MyPrismaScalarsTypeWhereInputSchema), z.lazy(() => MyPrismaScalarsTypeWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => MyPrismaScalarsTypeWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => MyPrismaScalarsTypeWhereInputSchema), z.lazy(() => MyPrismaScalarsTypeWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  string: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  bic: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  float: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  decimal: z.union([z.lazy(() => DecimalFilterSchema), z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' })]).optional(),
  date: z.union([z.lazy(() => DateTimeNullableFilterSchema), z.date()]).optional().nullable(),
  bigInt: z.union([z.lazy(() => BigIntFilterSchema), z.bigint()]).optional(),
  json: z.lazy(() => JsonFilterSchema).optional(),
  bytes: z.union([z.lazy(() => BytesFilterSchema), z.instanceof(Buffer)]).optional(),
  custom: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
}).strict();

export const MyPrismaScalarsTypeOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  string: z.lazy(() => SortOrderSchema).optional(),
  bic: z.lazy(() => SortOrderSchema).optional(),
  float: z.lazy(() => SortOrderSchema).optional(),
  decimal: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  bigInt: z.lazy(() => SortOrderSchema).optional(),
  json: z.lazy(() => SortOrderSchema).optional(),
  bytes: z.lazy(() => SortOrderSchema).optional(),
  custom: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const MyPrismaScalarsTypeWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeWhereUniqueInput> = z.object({
  id: z.string().optional(),
}).strict();

export const MyPrismaScalarsTypeOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  string: z.lazy(() => SortOrderSchema).optional(),
  bic: z.lazy(() => SortOrderSchema).optional(),
  float: z.lazy(() => SortOrderSchema).optional(),
  decimal: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  bigInt: z.lazy(() => SortOrderSchema).optional(),
  json: z.lazy(() => SortOrderSchema).optional(),
  bytes: z.lazy(() => SortOrderSchema).optional(),
  custom: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MyPrismaScalarsTypeCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => MyPrismaScalarsTypeAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MyPrismaScalarsTypeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MyPrismaScalarsTypeMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => MyPrismaScalarsTypeSumOrderByAggregateInputSchema).optional(),
}).strict();

export const MyPrismaScalarsTypeScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => MyPrismaScalarsTypeScalarWhereWithAggregatesInputSchema), z.lazy(() => MyPrismaScalarsTypeScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => MyPrismaScalarsTypeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => MyPrismaScalarsTypeScalarWhereWithAggregatesInputSchema), z.lazy(() => MyPrismaScalarsTypeScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  string: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  bic: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  float: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
  decimal: z.union([z.lazy(() => DecimalWithAggregatesFilterSchema), z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' })]).optional(),
  date: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.date()]).optional().nullable(),
  bigInt: z.union([z.lazy(() => BigIntWithAggregatesFilterSchema), z.bigint()]).optional(),
  json: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  bytes: z.union([z.lazy(() => BytesWithAggregatesFilterSchema), z.instanceof(Buffer)]).optional(),
  custom: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
}).strict();

export const UserWhereInputSchema: z.ZodType<PrismaClient.Prisma.UserWhereInput> = z.object({
  AND: z.union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  posts: z.lazy(() => PostListRelationFilterSchema).optional(),
  profile: z.union([z.lazy(() => ProfileRelationFilterSchema), z.lazy(() => ProfileWhereInputSchema)]).optional().nullable(),
  role: z.lazy(() => EnumRoleNullableListFilterSchema).optional(),
  enum: z.union([z.lazy(() => EnumAnotherEnumFilterSchema), z.lazy(() => AnotherEnumSchema)]).optional(),
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  posts: z.lazy(() => PostOrderByRelationAggregateInputSchema).optional(),
  profile: z.lazy(() => ProfileOrderByWithRelationInputSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  enum: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().optional(),
  email: z.string().optional(),
}).strict();

export const UserOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  enum: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  role: z.lazy(() => EnumRoleNullableListFilterSchema).optional(),
  enum: z.union([z.lazy(() => EnumAnotherEnumWithAggregatesFilterSchema), z.lazy(() => AnotherEnumSchema)]).optional(),
}).strict();

export const PostWhereInputSchema: z.ZodType<PrismaClient.Prisma.PostWhereInput> = z.object({
  AND: z.union([z.lazy(() => PostWhereInputSchema), z.lazy(() => PostWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => PostWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => PostWhereInputSchema), z.lazy(() => PostWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  content: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  published: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
  author: z.union([z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional(),
  authorId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  anotherEnum: z.lazy(() => EnumAnotherEnumNullableListFilterSchema).optional(),
}).strict();

export const PostOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.PostOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  published: z.lazy(() => SortOrderSchema).optional(),
  author: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  anotherEnum: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const PostWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.PostWhereUniqueInput> = z.object({
  id: z.number().optional(),
}).strict();

export const PostOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.PostOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  published: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  anotherEnum: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PostCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PostAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PostMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PostMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PostSumOrderByAggregateInputSchema).optional(),
}).strict();

export const PostScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.PostScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => PostScalarWhereWithAggregatesInputSchema), z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => PostScalarWhereWithAggregatesInputSchema), z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
  title: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  content: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  published: z.union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()]).optional(),
  authorId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  anotherEnum: z.lazy(() => EnumAnotherEnumNullableListFilterSchema).optional(),
}).strict();

export const ProfileWhereInputSchema: z.ZodType<PrismaClient.Prisma.ProfileWhereInput> = z.object({
  AND: z.union([z.lazy(() => ProfileWhereInputSchema), z.lazy(() => ProfileWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => ProfileWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => ProfileWhereInputSchema), z.lazy(() => ProfileWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  bio: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  user: z.union([z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional(),
  userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  role: z.lazy(() => EnumRoleNullableListFilterSchema).optional(),
  second: z.union([z.lazy(() => EnumSecondEnumFilterSchema), z.lazy(() => SecondEnumSchema)]).optional(),
}).strict();

export const ProfileOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.ProfileOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  second: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ProfileWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.ProfileWhereUniqueInput> = z.object({
  id: z.number().optional(),
  userId: z.string().optional(),
}).strict();

export const ProfileOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.ProfileOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  second: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProfileCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ProfileAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProfileMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProfileMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ProfileSumOrderByAggregateInputSchema).optional(),
}).strict();

export const ProfileScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.ProfileScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => ProfileScalarWhereWithAggregatesInputSchema), z.lazy(() => ProfileScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => ProfileScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => ProfileScalarWhereWithAggregatesInputSchema), z.lazy(() => ProfileScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
  bio: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  role: z.lazy(() => EnumRoleNullableListFilterSchema).optional(),
  second: z.union([z.lazy(() => EnumSecondEnumWithAggregatesFilterSchema), z.lazy(() => SecondEnumSchema)]).optional(),
}).strict();

export const MyModelCreateInputSchema: z.ZodType<PrismaClient.Prisma.MyModelCreateInput> = z.object({
  custom: z.string().refine(val => validator.isBIC(val)).transform(val => val.toUpperCase()).optional().nullable(),
}).strict();

export const MyModelUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.MyModelUncheckedCreateInput> = z.object({
  id: z.number().optional(),
  custom: z.string().refine(val => validator.isBIC(val)).transform(val => val.toUpperCase()).optional().nullable(),
}).strict();

export const MyModelUpdateInputSchema: z.ZodType<PrismaClient.Prisma.MyModelUpdateInput> = z.object({
  custom: z.union([z.string().refine(val => validator.isBIC(val)).transform(val => val.toUpperCase()), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const MyModelUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.MyModelUncheckedUpdateInput> = z.object({
  id: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  custom: z.union([z.string().refine(val => validator.isBIC(val)).transform(val => val.toUpperCase()), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const MyModelCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.MyModelCreateManyInput> = z.object({
  id: z.number().optional(),
  custom: z.string().refine(val => validator.isBIC(val)).transform(val => val.toUpperCase()).optional().nullable(),
}).strict();

export const MyModelUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.MyModelUpdateManyMutationInput> = z.object({
  custom: z.union([z.string().refine(val => validator.isBIC(val)).transform(val => val.toUpperCase()), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const MyModelUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.MyModelUncheckedUpdateManyInput> = z.object({
  id: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  custom: z.union([z.string().refine(val => validator.isBIC(val)).transform(val => val.toUpperCase()), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const TestCreateInputSchema: z.ZodType<PrismaClient.Prisma.TestCreateInput> = z.object({
  id: z.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid().optional(),
  name: z.string({ required_error: "error", invalid_type_error: "error" }).optional().nullable(),
  value: z.lazy(() => MyValueSchema),
  bic: z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }).optional().nullable(),
  intTwo: z.number(),
  int: z.number().optional().nullable(),
  floatOpt: z.number().optional().nullable(),
  float: z.number(),
  decimal: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }),
  decimalOpt: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional().nullable(),
  date: z.date().optional(),
  dateOpt: z.date({ invalid_type_error: "wrong date type" }).optional().nullable(),
  bigInt: z.bigint({ invalid_type_error: "error" }),
  bigIntOpt: z.bigint().optional().nullable(),
  json: z.union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue]),
  jsonOpt: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  bytes: z.instanceof(Buffer),
  bytesOpt: z.instanceof(Buffer).optional().nullable(),
}).strict();

export const TestUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.TestUncheckedCreateInput> = z.object({
  id: z.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid().optional(),
  name: z.string({ required_error: "error", invalid_type_error: "error" }).optional().nullable(),
  value: z.lazy(() => MyValueSchema),
  bic: z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }).optional().nullable(),
  intTwo: z.number(),
  int: z.number().optional().nullable(),
  floatOpt: z.number().optional().nullable(),
  float: z.number(),
  decimal: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }),
  decimalOpt: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional().nullable(),
  date: z.date().optional(),
  dateOpt: z.date({ invalid_type_error: "wrong date type" }).optional().nullable(),
  bigInt: z.bigint({ invalid_type_error: "error" }),
  bigIntOpt: z.bigint().optional().nullable(),
  json: z.union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue]),
  jsonOpt: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  bytes: z.instanceof(Buffer),
  bytesOpt: z.instanceof(Buffer).optional().nullable(),
}).strict();

export const TestUpdateInputSchema: z.ZodType<PrismaClient.Prisma.TestUpdateInput> = z.object({
  id: z.union([z.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string({ required_error: "error", invalid_type_error: "error" }), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  value: z.union([z.lazy(() => MyValueSchema), z.lazy(() => EnumMyValueFieldUpdateOperationsInputSchema)]).optional(),
  bic: z.union([z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  intTwo: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  int: z.union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  floatOpt: z.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)]).optional().nullable(),
  float: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  decimal: z.union([z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => DecimalFieldUpdateOperationsInputSchema)]).optional(),
  decimalOpt: z.union([z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema)]).optional().nullable(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  dateOpt: z.union([z.date({ invalid_type_error: "wrong date type" }), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  bigInt: z.union([z.bigint({ invalid_type_error: "error" }), z.lazy(() => BigIntFieldUpdateOperationsInputSchema)]).optional(),
  bigIntOpt: z.union([z.bigint(), z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  json: z.union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue]).optional(),
  jsonOpt: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  bytes: z.union([z.instanceof(Buffer), z.lazy(() => BytesFieldUpdateOperationsInputSchema)]).optional(),
  bytesOpt: z.union([z.instanceof(Buffer), z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const TestUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.TestUncheckedUpdateInput> = z.object({
  id: z.union([z.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string({ required_error: "error", invalid_type_error: "error" }), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  value: z.union([z.lazy(() => MyValueSchema), z.lazy(() => EnumMyValueFieldUpdateOperationsInputSchema)]).optional(),
  bic: z.union([z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  intTwo: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  int: z.union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  floatOpt: z.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)]).optional().nullable(),
  float: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  decimal: z.union([z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => DecimalFieldUpdateOperationsInputSchema)]).optional(),
  decimalOpt: z.union([z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema)]).optional().nullable(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  dateOpt: z.union([z.date({ invalid_type_error: "wrong date type" }), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  bigInt: z.union([z.bigint({ invalid_type_error: "error" }), z.lazy(() => BigIntFieldUpdateOperationsInputSchema)]).optional(),
  bigIntOpt: z.union([z.bigint(), z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  json: z.union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue]).optional(),
  jsonOpt: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  bytes: z.union([z.instanceof(Buffer), z.lazy(() => BytesFieldUpdateOperationsInputSchema)]).optional(),
  bytesOpt: z.union([z.instanceof(Buffer), z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const TestCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.TestCreateManyInput> = z.object({
  id: z.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid().optional(),
  name: z.string({ required_error: "error", invalid_type_error: "error" }).optional().nullable(),
  value: z.lazy(() => MyValueSchema),
  bic: z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }).optional().nullable(),
  intTwo: z.number(),
  int: z.number().optional().nullable(),
  floatOpt: z.number().optional().nullable(),
  float: z.number(),
  decimal: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }),
  decimalOpt: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional().nullable(),
  date: z.date().optional(),
  dateOpt: z.date({ invalid_type_error: "wrong date type" }).optional().nullable(),
  bigInt: z.bigint({ invalid_type_error: "error" }),
  bigIntOpt: z.bigint().optional().nullable(),
  json: z.union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue]),
  jsonOpt: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  bytes: z.instanceof(Buffer),
  bytesOpt: z.instanceof(Buffer).optional().nullable(),
}).strict();

export const TestUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.TestUpdateManyMutationInput> = z.object({
  id: z.union([z.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string({ required_error: "error", invalid_type_error: "error" }), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  value: z.union([z.lazy(() => MyValueSchema), z.lazy(() => EnumMyValueFieldUpdateOperationsInputSchema)]).optional(),
  bic: z.union([z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  intTwo: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  int: z.union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  floatOpt: z.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)]).optional().nullable(),
  float: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  decimal: z.union([z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => DecimalFieldUpdateOperationsInputSchema)]).optional(),
  decimalOpt: z.union([z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema)]).optional().nullable(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  dateOpt: z.union([z.date({ invalid_type_error: "wrong date type" }), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  bigInt: z.union([z.bigint({ invalid_type_error: "error" }), z.lazy(() => BigIntFieldUpdateOperationsInputSchema)]).optional(),
  bigIntOpt: z.union([z.bigint(), z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  json: z.union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue]).optional(),
  jsonOpt: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  bytes: z.union([z.instanceof(Buffer), z.lazy(() => BytesFieldUpdateOperationsInputSchema)]).optional(),
  bytesOpt: z.union([z.instanceof(Buffer), z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const TestUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.TestUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string({ required_error: "error", invalid_type_error: "error" }), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  value: z.union([z.lazy(() => MyValueSchema), z.lazy(() => EnumMyValueFieldUpdateOperationsInputSchema)]).optional(),
  bic: z.union([z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  intTwo: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  int: z.union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  floatOpt: z.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)]).optional().nullable(),
  float: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  decimal: z.union([z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => DecimalFieldUpdateOperationsInputSchema)]).optional(),
  decimalOpt: z.union([z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema)]).optional().nullable(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  dateOpt: z.union([z.date({ invalid_type_error: "wrong date type" }), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  bigInt: z.union([z.bigint({ invalid_type_error: "error" }), z.lazy(() => BigIntFieldUpdateOperationsInputSchema)]).optional(),
  bigIntOpt: z.union([z.bigint(), z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  json: z.union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue]).optional(),
  jsonOpt: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  bytes: z.union([z.instanceof(Buffer), z.lazy(() => BytesFieldUpdateOperationsInputSchema)]).optional(),
  bytesOpt: z.union([z.instanceof(Buffer), z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const MyPrismaScalarsTypeCreateInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeCreateInput> = z.object({
  id: z.string({ invalid_type_error: "invalid type error" }).cuid().optional(),
  string: z.string().min(3, { message: "min error" }).max(10, { message: "max error" }).optional().nullable(),
  bic: z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }).optional().nullable(),
  float: z.number().lt(10, { message: "lt error" }).gt(5, { message: "gt error" }),
  decimal: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }),
  date: z.date().min(new Date('2020-01-01')).max(new Date('2020-12-31')).optional().nullable(),
  bigInt: z.bigint(),
  json: z.union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue]),
  bytes: z.instanceof(Buffer),
  custom: z.string().optional().nullable(),
}).strict();

export const MyPrismaScalarsTypeUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeUncheckedCreateInput> = z.object({
  id: z.string({ invalid_type_error: "invalid type error" }).cuid().optional(),
  string: z.string().min(3, { message: "min error" }).max(10, { message: "max error" }).optional().nullable(),
  bic: z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }).optional().nullable(),
  float: z.number().lt(10, { message: "lt error" }).gt(5, { message: "gt error" }),
  decimal: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }),
  date: z.date().min(new Date('2020-01-01')).max(new Date('2020-12-31')).optional().nullable(),
  bigInt: z.bigint(),
  json: z.union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue]),
  bytes: z.instanceof(Buffer),
  custom: z.string().optional().nullable(),
}).strict();

export const MyPrismaScalarsTypeUpdateInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeUpdateInput> = z.object({
  id: z.union([z.string({ invalid_type_error: "invalid type error" }).cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  string: z.union([z.string().min(3, { message: "min error" }).max(10, { message: "max error" }), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  bic: z.union([z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  float: z.union([z.number().lt(10, { message: "lt error" }).gt(5, { message: "gt error" }), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  decimal: z.union([z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => DecimalFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date().min(new Date('2020-01-01')).max(new Date('2020-12-31')), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  bigInt: z.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInputSchema)]).optional(),
  json: z.union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue]).optional(),
  bytes: z.union([z.instanceof(Buffer), z.lazy(() => BytesFieldUpdateOperationsInputSchema)]).optional(),
  custom: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const MyPrismaScalarsTypeUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeUncheckedUpdateInput> = z.object({
  id: z.union([z.string({ invalid_type_error: "invalid type error" }).cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  string: z.union([z.string().min(3, { message: "min error" }).max(10, { message: "max error" }), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  bic: z.union([z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  float: z.union([z.number().lt(10, { message: "lt error" }).gt(5, { message: "gt error" }), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  decimal: z.union([z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => DecimalFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date().min(new Date('2020-01-01')).max(new Date('2020-12-31')), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  bigInt: z.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInputSchema)]).optional(),
  json: z.union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue]).optional(),
  bytes: z.union([z.instanceof(Buffer), z.lazy(() => BytesFieldUpdateOperationsInputSchema)]).optional(),
  custom: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const MyPrismaScalarsTypeCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeCreateManyInput> = z.object({
  id: z.string({ invalid_type_error: "invalid type error" }).cuid().optional(),
  string: z.string().min(3, { message: "min error" }).max(10, { message: "max error" }).optional().nullable(),
  bic: z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }).optional().nullable(),
  float: z.number().lt(10, { message: "lt error" }).gt(5, { message: "gt error" }),
  decimal: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }),
  date: z.date().min(new Date('2020-01-01')).max(new Date('2020-12-31')).optional().nullable(),
  bigInt: z.bigint(),
  json: z.union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue]),
  bytes: z.instanceof(Buffer),
  custom: z.string().optional().nullable(),
}).strict();

export const MyPrismaScalarsTypeUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeUpdateManyMutationInput> = z.object({
  id: z.union([z.string({ invalid_type_error: "invalid type error" }).cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  string: z.union([z.string().min(3, { message: "min error" }).max(10, { message: "max error" }), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  bic: z.union([z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  float: z.union([z.number().lt(10, { message: "lt error" }).gt(5, { message: "gt error" }), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  decimal: z.union([z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => DecimalFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date().min(new Date('2020-01-01')).max(new Date('2020-12-31')), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  bigInt: z.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInputSchema)]).optional(),
  json: z.union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue]).optional(),
  bytes: z.union([z.instanceof(Buffer), z.lazy(() => BytesFieldUpdateOperationsInputSchema)]).optional(),
  custom: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const MyPrismaScalarsTypeUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string({ invalid_type_error: "invalid type error" }).cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  string: z.union([z.string().min(3, { message: "min error" }).max(10, { message: "max error" }), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  bic: z.union([z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  float: z.union([z.number().lt(10, { message: "lt error" }).gt(5, { message: "gt error" }), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  decimal: z.union([z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => DecimalFieldUpdateOperationsInputSchema)]).optional(),
  date: z.union([z.date().min(new Date('2020-01-01')).max(new Date('2020-12-31')), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  bigInt: z.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInputSchema)]).optional(),
  json: z.union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue]).optional(),
  bytes: z.union([z.instanceof(Buffer), z.lazy(() => BytesFieldUpdateOperationsInputSchema)]).optional(),
  custom: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
}).strict();

export const UserCreateInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().min(1).max(100).optional().nullable(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutUserInputSchema).optional(),
  role: z.union([z.lazy(() => UserCreateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.lazy(() => AnotherEnumSchema).optional(),
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().min(1).max(100).optional().nullable(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  profile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  role: z.union([z.lazy(() => UserCreateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.lazy(() => AnotherEnumSchema).optional(),
}).strict();

export const UserUpdateInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string().email({ message: "Invalid email address" }), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string().min(1).max(100), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  profile: z.lazy(() => ProfileUpdateOneWithoutUserNestedInputSchema).optional(),
  role: z.union([z.lazy(() => UserUpdateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.union([z.lazy(() => AnotherEnumSchema), z.lazy(() => EnumAnotherEnumFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string().email({ message: "Invalid email address" }), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string().min(1).max(100), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  profile: z.lazy(() => ProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  role: z.union([z.lazy(() => UserUpdateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.union([z.lazy(() => AnotherEnumSchema), z.lazy(() => EnumAnotherEnumFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const UserCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().min(1).max(100).optional().nullable(),
  role: z.union([z.lazy(() => UserCreateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.lazy(() => AnotherEnumSchema).optional(),
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string().email({ message: "Invalid email address" }), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string().min(1).max(100), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  role: z.union([z.lazy(() => UserUpdateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.union([z.lazy(() => AnotherEnumSchema), z.lazy(() => EnumAnotherEnumFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string().email({ message: "Invalid email address" }), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string().min(1).max(100), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  role: z.union([z.lazy(() => UserUpdateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.union([z.lazy(() => AnotherEnumSchema), z.lazy(() => EnumAnotherEnumFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const PostCreateInputSchema: z.ZodType<PrismaClient.Prisma.PostCreateInput> = z.object({
  title: z.string(),
  content: z.string().optional().nullable(),
  published: z.boolean().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema),
  anotherEnum: z.union([z.lazy(() => PostCreateanotherEnumInputSchema), z.lazy(() => AnotherEnumSchema).array()]).optional(),
}).strict();

export const PostUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.PostUncheckedCreateInput> = z.object({
  id: z.number().optional(),
  title: z.string(),
  content: z.string().optional().nullable(),
  published: z.boolean().optional(),
  authorId: z.string(),
  anotherEnum: z.union([z.lazy(() => PostCreateanotherEnumInputSchema), z.lazy(() => AnotherEnumSchema).array()]).optional(),
}).strict();

export const PostUpdateInputSchema: z.ZodType<PrismaClient.Prisma.PostUpdateInput> = z.object({
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  content: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  published: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutPostsNestedInputSchema).optional(),
  anotherEnum: z.union([z.lazy(() => PostUpdateanotherEnumInputSchema), z.lazy(() => AnotherEnumSchema).array()]).optional(),
}).strict();

export const PostUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.PostUncheckedUpdateInput> = z.object({
  id: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  content: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  published: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  authorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  anotherEnum: z.union([z.lazy(() => PostUpdateanotherEnumInputSchema), z.lazy(() => AnotherEnumSchema).array()]).optional(),
}).strict();

export const PostCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.PostCreateManyInput> = z.object({
  id: z.number().optional(),
  title: z.string(),
  content: z.string().optional().nullable(),
  published: z.boolean().optional(),
  authorId: z.string(),
  anotherEnum: z.union([z.lazy(() => PostCreateanotherEnumInputSchema), z.lazy(() => AnotherEnumSchema).array()]).optional(),
}).strict();

export const PostUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.PostUpdateManyMutationInput> = z.object({
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  content: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  published: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  anotherEnum: z.union([z.lazy(() => PostUpdateanotherEnumInputSchema), z.lazy(() => AnotherEnumSchema).array()]).optional(),
}).strict();

export const PostUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.PostUncheckedUpdateManyInput> = z.object({
  id: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  content: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  published: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  authorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  anotherEnum: z.union([z.lazy(() => PostUpdateanotherEnumInputSchema), z.lazy(() => AnotherEnumSchema).array()]).optional(),
}).strict();

export const ProfileCreateInputSchema: z.ZodType<PrismaClient.Prisma.ProfileCreateInput> = z.object({
  bio: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutProfileInputSchema),
  role: z.union([z.lazy(() => ProfileCreateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  second: z.lazy(() => SecondEnumSchema).optional(),
}).strict();

export const ProfileUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.ProfileUncheckedCreateInput> = z.object({
  id: z.number().optional(),
  bio: z.string(),
  userId: z.string(),
  role: z.union([z.lazy(() => ProfileCreateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  second: z.lazy(() => SecondEnumSchema).optional(),
}).strict();

export const ProfileUpdateInputSchema: z.ZodType<PrismaClient.Prisma.ProfileUpdateInput> = z.object({
  bio: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutProfileNestedInputSchema).optional(),
  role: z.union([z.lazy(() => ProfileUpdateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  second: z.union([z.lazy(() => SecondEnumSchema), z.lazy(() => EnumSecondEnumFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const ProfileUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.ProfileUncheckedUpdateInput> = z.object({
  id: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  bio: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.lazy(() => ProfileUpdateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  second: z.union([z.lazy(() => SecondEnumSchema), z.lazy(() => EnumSecondEnumFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const ProfileCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.ProfileCreateManyInput> = z.object({
  id: z.number().optional(),
  bio: z.string(),
  userId: z.string(),
  role: z.union([z.lazy(() => ProfileCreateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  second: z.lazy(() => SecondEnumSchema).optional(),
}).strict();

export const ProfileUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.ProfileUpdateManyMutationInput> = z.object({
  bio: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.lazy(() => ProfileUpdateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  second: z.union([z.lazy(() => SecondEnumSchema), z.lazy(() => EnumSecondEnumFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const ProfileUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.ProfileUncheckedUpdateManyInput> = z.object({
  id: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  bio: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.lazy(() => ProfileUpdateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  second: z.union([z.lazy(() => SecondEnumSchema), z.lazy(() => EnumSecondEnumFieldUpdateOperationsInputSchema)]).optional(),
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

export const EnumMyValueFilterSchema: z.ZodType<PrismaClient.Prisma.EnumMyValueFilter> = z.object({
  equals: z.lazy(() => MyValueSchema).optional(),
  in: z.lazy(() => MyValueSchema).array().optional(),
  notIn: z.lazy(() => MyValueSchema).array().optional(),
  not: z.union([z.lazy(() => MyValueSchema), z.lazy(() => NestedEnumMyValueFilterSchema)]).optional(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<PrismaClient.Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)]).optional().nullable(),
}).strict();

export const FloatNullableFilterSchema: z.ZodType<PrismaClient.Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatNullableFilterSchema)]).optional().nullable(),
}).strict();

export const FloatFilterSchema: z.ZodType<PrismaClient.Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatFilterSchema)]).optional(),
}).strict();

export const DecimalFilterSchema: z.ZodType<PrismaClient.Prisma.DecimalFilter> = z.object({
  equals: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  in: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional(),
  notIn: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional(),
  lt: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => NestedDecimalFilterSchema)]).optional(),
}).strict();

export const DecimalNullableFilterSchema: z.ZodType<PrismaClient.Prisma.DecimalNullableFilter> = z.object({
  equals: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional().nullable(),
  in: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional().nullable(),
  notIn: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional().nullable(),
  lt: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => NestedDecimalNullableFilterSchema)]).optional().nullable(),
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

export const DateTimeNullableFilterSchema: z.ZodType<PrismaClient.Prisma.DateTimeNullableFilter> = z.object({
  equals: z.date().optional().nullable(),
  in: z.date().array().optional().nullable(),
  notIn: z.date().array().optional().nullable(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeNullableFilterSchema)]).optional().nullable(),
}).strict();

export const BigIntFilterSchema: z.ZodType<PrismaClient.Prisma.BigIntFilter> = z.object({
  equals: z.bigint().optional(),
  in: z.bigint().array().optional(),
  notIn: z.bigint().array().optional(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([z.bigint(), z.lazy(() => NestedBigIntFilterSchema)]).optional(),
}).strict();

export const BigIntNullableFilterSchema: z.ZodType<PrismaClient.Prisma.BigIntNullableFilter> = z.object({
  equals: z.bigint().optional().nullable(),
  in: z.bigint().array().optional().nullable(),
  notIn: z.bigint().array().optional().nullable(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([z.bigint(), z.lazy(() => NestedBigIntNullableFilterSchema)]).optional().nullable(),
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

export const BytesFilterSchema: z.ZodType<PrismaClient.Prisma.BytesFilter> = z.object({
  equals: z.instanceof(Buffer).optional(),
  in: z.instanceof(Buffer).array().optional(),
  notIn: z.instanceof(Buffer).array().optional(),
  not: z.union([z.instanceof(Buffer), z.lazy(() => NestedBytesFilterSchema)]).optional(),
}).strict();

export const BytesNullableFilterSchema: z.ZodType<PrismaClient.Prisma.BytesNullableFilter> = z.object({
  equals: z.instanceof(Buffer).optional().nullable(),
  in: z.instanceof(Buffer).array().optional().nullable(),
  notIn: z.instanceof(Buffer).array().optional().nullable(),
  not: z.union([z.instanceof(Buffer), z.lazy(() => NestedBytesNullableFilterSchema)]).optional().nullable(),
}).strict();

export const TestCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.TestCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  bic: z.lazy(() => SortOrderSchema).optional(),
  intTwo: z.lazy(() => SortOrderSchema).optional(),
  int: z.lazy(() => SortOrderSchema).optional(),
  floatOpt: z.lazy(() => SortOrderSchema).optional(),
  float: z.lazy(() => SortOrderSchema).optional(),
  decimal: z.lazy(() => SortOrderSchema).optional(),
  decimalOpt: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  dateOpt: z.lazy(() => SortOrderSchema).optional(),
  bigInt: z.lazy(() => SortOrderSchema).optional(),
  bigIntOpt: z.lazy(() => SortOrderSchema).optional(),
  json: z.lazy(() => SortOrderSchema).optional(),
  jsonOpt: z.lazy(() => SortOrderSchema).optional(),
  bytes: z.lazy(() => SortOrderSchema).optional(),
  bytesOpt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const TestAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.TestAvgOrderByAggregateInput> = z.object({
  intTwo: z.lazy(() => SortOrderSchema).optional(),
  int: z.lazy(() => SortOrderSchema).optional(),
  floatOpt: z.lazy(() => SortOrderSchema).optional(),
  float: z.lazy(() => SortOrderSchema).optional(),
  decimal: z.lazy(() => SortOrderSchema).optional(),
  decimalOpt: z.lazy(() => SortOrderSchema).optional(),
  bigInt: z.lazy(() => SortOrderSchema).optional(),
  bigIntOpt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const TestMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.TestMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  bic: z.lazy(() => SortOrderSchema).optional(),
  intTwo: z.lazy(() => SortOrderSchema).optional(),
  int: z.lazy(() => SortOrderSchema).optional(),
  floatOpt: z.lazy(() => SortOrderSchema).optional(),
  float: z.lazy(() => SortOrderSchema).optional(),
  decimal: z.lazy(() => SortOrderSchema).optional(),
  decimalOpt: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  dateOpt: z.lazy(() => SortOrderSchema).optional(),
  bigInt: z.lazy(() => SortOrderSchema).optional(),
  bigIntOpt: z.lazy(() => SortOrderSchema).optional(),
  bytes: z.lazy(() => SortOrderSchema).optional(),
  bytesOpt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const TestMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.TestMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  bic: z.lazy(() => SortOrderSchema).optional(),
  intTwo: z.lazy(() => SortOrderSchema).optional(),
  int: z.lazy(() => SortOrderSchema).optional(),
  floatOpt: z.lazy(() => SortOrderSchema).optional(),
  float: z.lazy(() => SortOrderSchema).optional(),
  decimal: z.lazy(() => SortOrderSchema).optional(),
  decimalOpt: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  dateOpt: z.lazy(() => SortOrderSchema).optional(),
  bigInt: z.lazy(() => SortOrderSchema).optional(),
  bigIntOpt: z.lazy(() => SortOrderSchema).optional(),
  bytes: z.lazy(() => SortOrderSchema).optional(),
  bytesOpt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const TestSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.TestSumOrderByAggregateInput> = z.object({
  intTwo: z.lazy(() => SortOrderSchema).optional(),
  int: z.lazy(() => SortOrderSchema).optional(),
  floatOpt: z.lazy(() => SortOrderSchema).optional(),
  float: z.lazy(() => SortOrderSchema).optional(),
  decimal: z.lazy(() => SortOrderSchema).optional(),
  decimalOpt: z.lazy(() => SortOrderSchema).optional(),
  bigInt: z.lazy(() => SortOrderSchema).optional(),
  bigIntOpt: z.lazy(() => SortOrderSchema).optional(),
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

export const EnumMyValueWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.EnumMyValueWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MyValueSchema).optional(),
  in: z.lazy(() => MyValueSchema).array().optional(),
  notIn: z.lazy(() => MyValueSchema).array().optional(),
  not: z.union([z.lazy(() => MyValueSchema), z.lazy(() => NestedEnumMyValueWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumMyValueFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumMyValueFilterSchema).optional(),
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
}).strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional(),
}).strict();

export const DecimalWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.DecimalWithAggregatesFilter> = z.object({
  equals: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  in: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional(),
  notIn: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional(),
  lt: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => NestedDecimalWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _sum: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _min: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _max: z.lazy(() => NestedDecimalFilterSchema).optional(),
}).strict();

export const DecimalNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.DecimalNullableWithAggregatesFilter> = z.object({
  equals: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional().nullable(),
  in: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional().nullable(),
  notIn: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional().nullable(),
  lt: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => NestedDecimalNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
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

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.date().optional().nullable(),
  in: z.date().array().optional().nullable(),
  notIn: z.date().array().optional().nullable(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
}).strict();

export const BigIntWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.BigIntWithAggregatesFilter> = z.object({
  equals: z.bigint().optional(),
  in: z.bigint().array().optional(),
  notIn: z.bigint().array().optional(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([z.bigint(), z.lazy(() => NestedBigIntWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedBigIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBigIntFilterSchema).optional(),
  _max: z.lazy(() => NestedBigIntFilterSchema).optional(),
}).strict();

export const BigIntNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.BigIntNullableWithAggregatesFilter> = z.object({
  equals: z.bigint().optional().nullable(),
  in: z.bigint().array().optional().nullable(),
  notIn: z.bigint().array().optional().nullable(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([z.bigint(), z.lazy(() => NestedBigIntNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedBigIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBigIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBigIntNullableFilterSchema).optional(),
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

export const BytesWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.BytesWithAggregatesFilter> = z.object({
  equals: z.instanceof(Buffer).optional(),
  in: z.instanceof(Buffer).array().optional(),
  notIn: z.instanceof(Buffer).array().optional(),
  not: z.union([z.instanceof(Buffer), z.lazy(() => NestedBytesWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBytesFilterSchema).optional(),
  _max: z.lazy(() => NestedBytesFilterSchema).optional(),
}).strict();

export const BytesNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.BytesNullableWithAggregatesFilter> = z.object({
  equals: z.instanceof(Buffer).optional().nullable(),
  in: z.instanceof(Buffer).array().optional().nullable(),
  notIn: z.instanceof(Buffer).array().optional().nullable(),
  not: z.union([z.instanceof(Buffer), z.lazy(() => NestedBytesNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBytesNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBytesNullableFilterSchema).optional(),
}).strict();

export const MyPrismaScalarsTypeCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  string: z.lazy(() => SortOrderSchema).optional(),
  bic: z.lazy(() => SortOrderSchema).optional(),
  float: z.lazy(() => SortOrderSchema).optional(),
  decimal: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  bigInt: z.lazy(() => SortOrderSchema).optional(),
  json: z.lazy(() => SortOrderSchema).optional(),
  bytes: z.lazy(() => SortOrderSchema).optional(),
  custom: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const MyPrismaScalarsTypeAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeAvgOrderByAggregateInput> = z.object({
  float: z.lazy(() => SortOrderSchema).optional(),
  decimal: z.lazy(() => SortOrderSchema).optional(),
  bigInt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const MyPrismaScalarsTypeMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  string: z.lazy(() => SortOrderSchema).optional(),
  bic: z.lazy(() => SortOrderSchema).optional(),
  float: z.lazy(() => SortOrderSchema).optional(),
  decimal: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  bigInt: z.lazy(() => SortOrderSchema).optional(),
  bytes: z.lazy(() => SortOrderSchema).optional(),
  custom: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const MyPrismaScalarsTypeMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  string: z.lazy(() => SortOrderSchema).optional(),
  bic: z.lazy(() => SortOrderSchema).optional(),
  float: z.lazy(() => SortOrderSchema).optional(),
  decimal: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  bigInt: z.lazy(() => SortOrderSchema).optional(),
  bytes: z.lazy(() => SortOrderSchema).optional(),
  custom: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const MyPrismaScalarsTypeSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeSumOrderByAggregateInput> = z.object({
  float: z.lazy(() => SortOrderSchema).optional(),
  decimal: z.lazy(() => SortOrderSchema).optional(),
  bigInt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const PostListRelationFilterSchema: z.ZodType<PrismaClient.Prisma.PostListRelationFilter> = z.object({
  every: z.lazy(() => PostWhereInputSchema).optional(),
  some: z.lazy(() => PostWhereInputSchema).optional(),
  none: z.lazy(() => PostWhereInputSchema).optional(),
}).strict();

export const ProfileRelationFilterSchema: z.ZodType<PrismaClient.Prisma.ProfileRelationFilter> = z.object({
  is: z.lazy(() => ProfileWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ProfileWhereInputSchema).optional().nullable(),
}).strict();

export const EnumRoleNullableListFilterSchema: z.ZodType<PrismaClient.Prisma.EnumRoleNullableListFilter> = z.object({
  equals: z.lazy(() => RoleSchema).array().optional().nullable(),
  has: z.lazy(() => RoleSchema).optional().nullable(),
  hasEvery: z.lazy(() => RoleSchema).array().optional(),
  hasSome: z.lazy(() => RoleSchema).array().optional(),
  isEmpty: z.boolean().optional(),
}).strict();

export const EnumAnotherEnumFilterSchema: z.ZodType<PrismaClient.Prisma.EnumAnotherEnumFilter> = z.object({
  equals: z.lazy(() => AnotherEnumSchema).optional(),
  in: z.lazy(() => AnotherEnumSchema).array().optional(),
  notIn: z.lazy(() => AnotherEnumSchema).array().optional(),
  not: z.union([z.lazy(() => AnotherEnumSchema), z.lazy(() => NestedEnumAnotherEnumFilterSchema)]).optional(),
}).strict();

export const PostOrderByRelationAggregateInputSchema: z.ZodType<PrismaClient.Prisma.PostOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  enum: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enum: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enum: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const EnumAnotherEnumWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.EnumAnotherEnumWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AnotherEnumSchema).optional(),
  in: z.lazy(() => AnotherEnumSchema).array().optional(),
  notIn: z.lazy(() => AnotherEnumSchema).array().optional(),
  not: z.union([z.lazy(() => AnotherEnumSchema), z.lazy(() => NestedEnumAnotherEnumWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAnotherEnumFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAnotherEnumFilterSchema).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<PrismaClient.Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)]).optional(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<PrismaClient.Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional(),
}).strict();

export const EnumAnotherEnumNullableListFilterSchema: z.ZodType<PrismaClient.Prisma.EnumAnotherEnumNullableListFilter> = z.object({
  equals: z.lazy(() => AnotherEnumSchema).array().optional().nullable(),
  has: z.lazy(() => AnotherEnumSchema).optional().nullable(),
  hasEvery: z.lazy(() => AnotherEnumSchema).array().optional(),
  hasSome: z.lazy(() => AnotherEnumSchema).array().optional(),
  isEmpty: z.boolean().optional(),
}).strict();

export const PostCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.PostCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  published: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  anotherEnum: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const PostAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.PostAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const PostMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.PostMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  published: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const PostMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.PostMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  published: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const PostSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.PostSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional(),
}).strict();

export const EnumSecondEnumFilterSchema: z.ZodType<PrismaClient.Prisma.EnumSecondEnumFilter> = z.object({
  equals: z.lazy(() => SecondEnumSchema).optional(),
  in: z.lazy(() => SecondEnumSchema).array().optional(),
  notIn: z.lazy(() => SecondEnumSchema).array().optional(),
  not: z.union([z.lazy(() => SecondEnumSchema), z.lazy(() => NestedEnumSecondEnumFilterSchema)]).optional(),
}).strict();

export const ProfileCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ProfileCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  second: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ProfileAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ProfileAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ProfileMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ProfileMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  second: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ProfileMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ProfileMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  second: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ProfileSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ProfileSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const EnumSecondEnumWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.EnumSecondEnumWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SecondEnumSchema).optional(),
  in: z.lazy(() => SecondEnumSchema).array().optional(),
  notIn: z.lazy(() => SecondEnumSchema).array().optional(),
  not: z.union([z.lazy(() => SecondEnumSchema), z.lazy(() => NestedEnumSecondEnumWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSecondEnumFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSecondEnumFilterSchema).optional(),
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

export const StringFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional(),
}).strict();

export const EnumMyValueFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.EnumMyValueFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => MyValueSchema).optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
}).strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
}).strict();

export const DecimalFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.DecimalFieldUpdateOperationsInput> = z.object({
  set: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  increment: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  decrement: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  multiply: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  divide: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
}).strict();

export const NullableDecimalFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.NullableDecimalFieldUpdateOperationsInput> = z.object({
  set: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional().nullable(),
  increment: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  decrement: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  multiply: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  divide: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.date().optional(),
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.date().optional().nullable(),
}).strict();

export const BigIntFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.BigIntFieldUpdateOperationsInput> = z.object({
  set: z.bigint().optional(),
  increment: z.bigint().optional(),
  decrement: z.bigint().optional(),
  multiply: z.bigint().optional(),
  divide: z.bigint().optional(),
}).strict();

export const NullableBigIntFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.NullableBigIntFieldUpdateOperationsInput> = z.object({
  set: z.bigint().optional().nullable(),
  increment: z.bigint().optional(),
  decrement: z.bigint().optional(),
  multiply: z.bigint().optional(),
  divide: z.bigint().optional(),
}).strict();

export const BytesFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.BytesFieldUpdateOperationsInput> = z.object({
  set: z.instanceof(Buffer).optional(),
}).strict();

export const NullableBytesFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.NullableBytesFieldUpdateOperationsInput> = z.object({
  set: z.instanceof(Buffer).optional().nullable(),
}).strict();

export const PostCreateNestedManyWithoutAuthorInputSchema: z.ZodType<PrismaClient.Prisma.PostCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([z.lazy(() => PostCreateWithoutAuthorInputSchema), z.lazy(() => PostCreateWithoutAuthorInputSchema).array(), z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema), z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema), z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array()]).optional(),
  createMany: z.lazy(() => PostCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => PostWhereUniqueInputSchema), z.lazy(() => PostWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const ProfileCreateNestedOneWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.ProfileCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([z.lazy(() => ProfileCreateWithoutUserInputSchema), z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional(),
}).strict();

export const UserCreateroleInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateroleInput> = z.object({
  set: z.lazy(() => RoleSchema).array(),
}).strict();

export const PostUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<PrismaClient.Prisma.PostUncheckedCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([z.lazy(() => PostCreateWithoutAuthorInputSchema), z.lazy(() => PostCreateWithoutAuthorInputSchema).array(), z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema), z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema), z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array()]).optional(),
  createMany: z.lazy(() => PostCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => PostWhereUniqueInputSchema), z.lazy(() => PostWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const ProfileUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.ProfileUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([z.lazy(() => ProfileCreateWithoutUserInputSchema), z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional(),
}).strict();

export const PostUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<PrismaClient.Prisma.PostUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([z.lazy(() => PostCreateWithoutAuthorInputSchema), z.lazy(() => PostCreateWithoutAuthorInputSchema).array(), z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema), z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema), z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema), z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema).array()]).optional(),
  createMany: z.lazy(() => PostCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => PostWhereUniqueInputSchema), z.lazy(() => PostWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PostWhereUniqueInputSchema), z.lazy(() => PostWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PostWhereUniqueInputSchema), z.lazy(() => PostWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PostWhereUniqueInputSchema), z.lazy(() => PostWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema), z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema), z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PostScalarWhereInputSchema), z.lazy(() => PostScalarWhereInputSchema).array()]).optional(),
}).strict();

export const ProfileUpdateOneWithoutUserNestedInputSchema: z.ZodType<PrismaClient.Prisma.ProfileUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([z.lazy(() => ProfileCreateWithoutUserInputSchema), z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => ProfileUpsertWithoutUserInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => ProfileUpdateWithoutUserInputSchema), z.lazy(() => ProfileUncheckedUpdateWithoutUserInputSchema)]).optional(),
}).strict();

export const UserUpdateroleInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateroleInput> = z.object({
  set: z.lazy(() => RoleSchema).array().optional(),
  push: z.union([z.lazy(() => RoleSchema), z.lazy(() => RoleSchema).array()]).optional(),
}).strict();

export const EnumAnotherEnumFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.EnumAnotherEnumFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => AnotherEnumSchema).optional(),
}).strict();

export const PostUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<PrismaClient.Prisma.PostUncheckedUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([z.lazy(() => PostCreateWithoutAuthorInputSchema), z.lazy(() => PostCreateWithoutAuthorInputSchema).array(), z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema), z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema), z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema), z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema).array()]).optional(),
  createMany: z.lazy(() => PostCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => PostWhereUniqueInputSchema), z.lazy(() => PostWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PostWhereUniqueInputSchema), z.lazy(() => PostWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PostWhereUniqueInputSchema), z.lazy(() => PostWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PostWhereUniqueInputSchema), z.lazy(() => PostWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema), z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema), z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PostScalarWhereInputSchema), z.lazy(() => PostScalarWhereInputSchema).array()]).optional(),
}).strict();

export const ProfileUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<PrismaClient.Prisma.ProfileUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([z.lazy(() => ProfileCreateWithoutUserInputSchema), z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => ProfileUpsertWithoutUserInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => ProfileUpdateWithoutUserInputSchema), z.lazy(() => ProfileUncheckedUpdateWithoutUserInputSchema)]).optional(),
}).strict();

export const UserCreateNestedOneWithoutPostsInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateNestedOneWithoutPostsInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutPostsInputSchema), z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPostsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
}).strict();

export const PostCreateanotherEnumInputSchema: z.ZodType<PrismaClient.Prisma.PostCreateanotherEnumInput> = z.object({
  set: z.lazy(() => AnotherEnumSchema).array(),
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional(),
}).strict();

export const UserUpdateOneRequiredWithoutPostsNestedInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateOneRequiredWithoutPostsNestedInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutPostsInputSchema), z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPostsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPostsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateWithoutPostsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema)]).optional(),
}).strict();

export const PostUpdateanotherEnumInputSchema: z.ZodType<PrismaClient.Prisma.PostUpdateanotherEnumInput> = z.object({
  set: z.lazy(() => AnotherEnumSchema).array().optional(),
  push: z.union([z.lazy(() => AnotherEnumSchema), z.lazy(() => AnotherEnumSchema).array()]).optional(),
}).strict();

export const UserCreateNestedOneWithoutProfileInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateNestedOneWithoutProfileInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutProfileInputSchema), z.lazy(() => UserUncheckedCreateWithoutProfileInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProfileInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
}).strict();

export const ProfileCreateroleInputSchema: z.ZodType<PrismaClient.Prisma.ProfileCreateroleInput> = z.object({
  set: z.lazy(() => RoleSchema).array(),
}).strict();

export const UserUpdateOneRequiredWithoutProfileNestedInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateOneRequiredWithoutProfileNestedInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutProfileInputSchema), z.lazy(() => UserUncheckedCreateWithoutProfileInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProfileInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutProfileInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateWithoutProfileInputSchema), z.lazy(() => UserUncheckedUpdateWithoutProfileInputSchema)]).optional(),
}).strict();

export const ProfileUpdateroleInputSchema: z.ZodType<PrismaClient.Prisma.ProfileUpdateroleInput> = z.object({
  set: z.lazy(() => RoleSchema).array().optional(),
  push: z.union([z.lazy(() => RoleSchema), z.lazy(() => RoleSchema).array()]).optional(),
}).strict();

export const EnumSecondEnumFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.EnumSecondEnumFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => SecondEnumSchema).optional(),
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

export const NestedEnumMyValueFilterSchema: z.ZodType<PrismaClient.Prisma.NestedEnumMyValueFilter> = z.object({
  equals: z.lazy(() => MyValueSchema).optional(),
  in: z.lazy(() => MyValueSchema).array().optional(),
  notIn: z.lazy(() => MyValueSchema).array().optional(),
  not: z.union([z.lazy(() => MyValueSchema), z.lazy(() => NestedEnumMyValueFilterSchema)]).optional(),
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<PrismaClient.Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatNullableFilterSchema)]).optional().nullable(),
}).strict();

export const NestedDecimalFilterSchema: z.ZodType<PrismaClient.Prisma.NestedDecimalFilter> = z.object({
  equals: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  in: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional(),
  notIn: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional(),
  lt: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => NestedDecimalFilterSchema)]).optional(),
}).strict();

export const NestedDecimalNullableFilterSchema: z.ZodType<PrismaClient.Prisma.NestedDecimalNullableFilter> = z.object({
  equals: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional().nullable(),
  in: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional().nullable(),
  notIn: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional().nullable(),
  lt: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => NestedDecimalNullableFilterSchema)]).optional().nullable(),
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

export const NestedDateTimeNullableFilterSchema: z.ZodType<PrismaClient.Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.date().optional().nullable(),
  in: z.date().array().optional().nullable(),
  notIn: z.date().array().optional().nullable(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeNullableFilterSchema)]).optional().nullable(),
}).strict();

export const NestedBigIntFilterSchema: z.ZodType<PrismaClient.Prisma.NestedBigIntFilter> = z.object({
  equals: z.bigint().optional(),
  in: z.bigint().array().optional(),
  notIn: z.bigint().array().optional(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([z.bigint(), z.lazy(() => NestedBigIntFilterSchema)]).optional(),
}).strict();

export const NestedBigIntNullableFilterSchema: z.ZodType<PrismaClient.Prisma.NestedBigIntNullableFilter> = z.object({
  equals: z.bigint().optional().nullable(),
  in: z.bigint().array().optional().nullable(),
  notIn: z.bigint().array().optional().nullable(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([z.bigint(), z.lazy(() => NestedBigIntNullableFilterSchema)]).optional().nullable(),
}).strict();

export const NestedBytesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedBytesFilter> = z.object({
  equals: z.instanceof(Buffer).optional(),
  in: z.instanceof(Buffer).array().optional(),
  notIn: z.instanceof(Buffer).array().optional(),
  not: z.union([z.instanceof(Buffer), z.lazy(() => NestedBytesFilterSchema)]).optional(),
}).strict();

export const NestedBytesNullableFilterSchema: z.ZodType<PrismaClient.Prisma.NestedBytesNullableFilter> = z.object({
  equals: z.instanceof(Buffer).optional().nullable(),
  in: z.instanceof(Buffer).array().optional().nullable(),
  notIn: z.instanceof(Buffer).array().optional().nullable(),
  not: z.union([z.instanceof(Buffer), z.lazy(() => NestedBytesNullableFilterSchema)]).optional().nullable(),
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

export const NestedEnumMyValueWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedEnumMyValueWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MyValueSchema).optional(),
  in: z.lazy(() => MyValueSchema).array().optional(),
  notIn: z.lazy(() => MyValueSchema).array().optional(),
  not: z.union([z.lazy(() => MyValueSchema), z.lazy(() => NestedEnumMyValueWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumMyValueFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumMyValueFilterSchema).optional(),
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
}).strict();

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional(),
}).strict();

export const NestedDecimalWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedDecimalWithAggregatesFilter> = z.object({
  equals: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  in: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional(),
  notIn: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional(),
  lt: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => NestedDecimalWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _sum: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _min: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _max: z.lazy(() => NestedDecimalFilterSchema).optional(),
}).strict();

export const NestedDecimalNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedDecimalNullableWithAggregatesFilter> = z.object({
  equals: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional().nullable(),
  in: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional().nullable(),
  notIn: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional().nullable(),
  lt: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => NestedDecimalNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
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

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.date().optional().nullable(),
  in: z.date().array().optional().nullable(),
  notIn: z.date().array().optional().nullable(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
}).strict();

export const NestedBigIntWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedBigIntWithAggregatesFilter> = z.object({
  equals: z.bigint().optional(),
  in: z.bigint().array().optional(),
  notIn: z.bigint().array().optional(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([z.bigint(), z.lazy(() => NestedBigIntWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedBigIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBigIntFilterSchema).optional(),
  _max: z.lazy(() => NestedBigIntFilterSchema).optional(),
}).strict();

export const NestedBigIntNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedBigIntNullableWithAggregatesFilter> = z.object({
  equals: z.bigint().optional().nullable(),
  in: z.bigint().array().optional().nullable(),
  notIn: z.bigint().array().optional().nullable(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([z.bigint(), z.lazy(() => NestedBigIntNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedBigIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBigIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBigIntNullableFilterSchema).optional(),
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

export const NestedBytesWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedBytesWithAggregatesFilter> = z.object({
  equals: z.instanceof(Buffer).optional(),
  in: z.instanceof(Buffer).array().optional(),
  notIn: z.instanceof(Buffer).array().optional(),
  not: z.union([z.instanceof(Buffer), z.lazy(() => NestedBytesWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBytesFilterSchema).optional(),
  _max: z.lazy(() => NestedBytesFilterSchema).optional(),
}).strict();

export const NestedBytesNullableWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedBytesNullableWithAggregatesFilter> = z.object({
  equals: z.instanceof(Buffer).optional().nullable(),
  in: z.instanceof(Buffer).array().optional().nullable(),
  notIn: z.instanceof(Buffer).array().optional().nullable(),
  not: z.union([z.instanceof(Buffer), z.lazy(() => NestedBytesNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBytesNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBytesNullableFilterSchema).optional(),
}).strict();

export const NestedEnumAnotherEnumFilterSchema: z.ZodType<PrismaClient.Prisma.NestedEnumAnotherEnumFilter> = z.object({
  equals: z.lazy(() => AnotherEnumSchema).optional(),
  in: z.lazy(() => AnotherEnumSchema).array().optional(),
  notIn: z.lazy(() => AnotherEnumSchema).array().optional(),
  not: z.union([z.lazy(() => AnotherEnumSchema), z.lazy(() => NestedEnumAnotherEnumFilterSchema)]).optional(),
}).strict();

export const NestedEnumAnotherEnumWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedEnumAnotherEnumWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AnotherEnumSchema).optional(),
  in: z.lazy(() => AnotherEnumSchema).array().optional(),
  notIn: z.lazy(() => AnotherEnumSchema).array().optional(),
  not: z.union([z.lazy(() => AnotherEnumSchema), z.lazy(() => NestedEnumAnotherEnumWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAnotherEnumFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAnotherEnumFilterSchema).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<PrismaClient.Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional(),
}).strict();

export const NestedEnumSecondEnumFilterSchema: z.ZodType<PrismaClient.Prisma.NestedEnumSecondEnumFilter> = z.object({
  equals: z.lazy(() => SecondEnumSchema).optional(),
  in: z.lazy(() => SecondEnumSchema).array().optional(),
  notIn: z.lazy(() => SecondEnumSchema).array().optional(),
  not: z.union([z.lazy(() => SecondEnumSchema), z.lazy(() => NestedEnumSecondEnumFilterSchema)]).optional(),
}).strict();

export const NestedEnumSecondEnumWithAggregatesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedEnumSecondEnumWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SecondEnumSchema).optional(),
  in: z.lazy(() => SecondEnumSchema).array().optional(),
  notIn: z.lazy(() => SecondEnumSchema).array().optional(),
  not: z.union([z.lazy(() => SecondEnumSchema), z.lazy(() => NestedEnumSecondEnumWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSecondEnumFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSecondEnumFilterSchema).optional(),
}).strict();

export const PostCreateWithoutAuthorInputSchema: z.ZodType<PrismaClient.Prisma.PostCreateWithoutAuthorInput> = z.object({
  title: z.string(),
  content: z.string().optional().nullable(),
  published: z.boolean().optional(),
  anotherEnum: z.union([z.lazy(() => PostCreateanotherEnumInputSchema), z.lazy(() => AnotherEnumSchema).array()]).optional(),
}).strict();

export const PostUncheckedCreateWithoutAuthorInputSchema: z.ZodType<PrismaClient.Prisma.PostUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.number().optional(),
  title: z.string(),
  content: z.string().optional().nullable(),
  published: z.boolean().optional(),
  anotherEnum: z.union([z.lazy(() => PostCreateanotherEnumInputSchema), z.lazy(() => AnotherEnumSchema).array()]).optional(),
}).strict();

export const PostCreateOrConnectWithoutAuthorInputSchema: z.ZodType<PrismaClient.Prisma.PostCreateOrConnectWithoutAuthorInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([z.lazy(() => PostCreateWithoutAuthorInputSchema), z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema)]),
}).strict();

export const PostCreateManyAuthorInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.PostCreateManyAuthorInputEnvelope> = z.object({
  data: z.lazy(() => PostCreateManyAuthorInputSchema).array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ProfileCreateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.ProfileCreateWithoutUserInput> = z.object({
  bio: z.string(),
  role: z.union([z.lazy(() => ProfileCreateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  second: z.lazy(() => SecondEnumSchema).optional(),
}).strict();

export const ProfileUncheckedCreateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.ProfileUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().optional(),
  bio: z.string(),
  role: z.union([z.lazy(() => ProfileCreateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  second: z.lazy(() => SecondEnumSchema).optional(),
}).strict();

export const ProfileCreateOrConnectWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.ProfileCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ProfileWhereUniqueInputSchema),
  create: z.union([z.lazy(() => ProfileCreateWithoutUserInputSchema), z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema)]),
}).strict();

export const PostUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<PrismaClient.Prisma.PostUpsertWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  update: z.union([z.lazy(() => PostUpdateWithoutAuthorInputSchema), z.lazy(() => PostUncheckedUpdateWithoutAuthorInputSchema)]),
  create: z.union([z.lazy(() => PostCreateWithoutAuthorInputSchema), z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema)]),
}).strict();

export const PostUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<PrismaClient.Prisma.PostUpdateWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  data: z.union([z.lazy(() => PostUpdateWithoutAuthorInputSchema), z.lazy(() => PostUncheckedUpdateWithoutAuthorInputSchema)]),
}).strict();

export const PostUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<PrismaClient.Prisma.PostUpdateManyWithWhereWithoutAuthorInput> = z.object({
  where: z.lazy(() => PostScalarWhereInputSchema),
  data: z.union([z.lazy(() => PostUpdateManyMutationInputSchema), z.lazy(() => PostUncheckedUpdateManyWithoutPostsInputSchema)]),
}).strict();

export const PostScalarWhereInputSchema: z.ZodType<PrismaClient.Prisma.PostScalarWhereInput> = z.object({
  AND: z.union([z.lazy(() => PostScalarWhereInputSchema), z.lazy(() => PostScalarWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => PostScalarWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => PostScalarWhereInputSchema), z.lazy(() => PostScalarWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  content: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  published: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
  authorId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  anotherEnum: z.lazy(() => EnumAnotherEnumNullableListFilterSchema).optional(),
}).strict();

export const ProfileUpsertWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.ProfileUpsertWithoutUserInput> = z.object({
  update: z.union([z.lazy(() => ProfileUpdateWithoutUserInputSchema), z.lazy(() => ProfileUncheckedUpdateWithoutUserInputSchema)]),
  create: z.union([z.lazy(() => ProfileCreateWithoutUserInputSchema), z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema)]),
}).strict();

export const ProfileUpdateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.ProfileUpdateWithoutUserInput> = z.object({
  bio: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.lazy(() => ProfileUpdateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  second: z.union([z.lazy(() => SecondEnumSchema), z.lazy(() => EnumSecondEnumFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const ProfileUncheckedUpdateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.ProfileUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  bio: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.lazy(() => ProfileUpdateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  second: z.union([z.lazy(() => SecondEnumSchema), z.lazy(() => EnumSecondEnumFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const UserCreateWithoutPostsInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateWithoutPostsInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutUserInputSchema).optional(),
  role: z.union([z.lazy(() => UserCreateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.lazy(() => AnotherEnumSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutPostsInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedCreateWithoutPostsInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  profile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  role: z.union([z.lazy(() => UserCreateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.lazy(() => AnotherEnumSchema).optional(),
}).strict();

export const UserCreateOrConnectWithoutPostsInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateOrConnectWithoutPostsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([z.lazy(() => UserCreateWithoutPostsInputSchema), z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema)]),
}).strict();

export const UserUpsertWithoutPostsInputSchema: z.ZodType<PrismaClient.Prisma.UserUpsertWithoutPostsInput> = z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutPostsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutPostsInputSchema), z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema)]),
}).strict();

export const UserUpdateWithoutPostsInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateWithoutPostsInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  profile: z.lazy(() => ProfileUpdateOneWithoutUserNestedInputSchema).optional(),
  role: z.union([z.lazy(() => UserUpdateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.union([z.lazy(() => AnotherEnumSchema), z.lazy(() => EnumAnotherEnumFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutPostsInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedUpdateWithoutPostsInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  profile: z.lazy(() => ProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  role: z.union([z.lazy(() => UserUpdateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.union([z.lazy(() => AnotherEnumSchema), z.lazy(() => EnumAnotherEnumFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const UserCreateWithoutProfileInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateWithoutProfileInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  role: z.union([z.lazy(() => UserCreateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.lazy(() => AnotherEnumSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutProfileInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedCreateWithoutProfileInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  role: z.union([z.lazy(() => UserCreateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.lazy(() => AnotherEnumSchema).optional(),
}).strict();

export const UserCreateOrConnectWithoutProfileInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateOrConnectWithoutProfileInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([z.lazy(() => UserCreateWithoutProfileInputSchema), z.lazy(() => UserUncheckedCreateWithoutProfileInputSchema)]),
}).strict();

export const UserUpsertWithoutProfileInputSchema: z.ZodType<PrismaClient.Prisma.UserUpsertWithoutProfileInput> = z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutProfileInputSchema), z.lazy(() => UserUncheckedUpdateWithoutProfileInputSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutProfileInputSchema), z.lazy(() => UserUncheckedCreateWithoutProfileInputSchema)]),
}).strict();

export const UserUpdateWithoutProfileInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateWithoutProfileInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  role: z.union([z.lazy(() => UserUpdateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.union([z.lazy(() => AnotherEnumSchema), z.lazy(() => EnumAnotherEnumFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutProfileInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedUpdateWithoutProfileInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  role: z.union([z.lazy(() => UserUpdateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.union([z.lazy(() => AnotherEnumSchema), z.lazy(() => EnumAnotherEnumFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const PostCreateManyAuthorInputSchema: z.ZodType<PrismaClient.Prisma.PostCreateManyAuthorInput> = z.object({
  id: z.number().optional(),
  title: z.string(),
  content: z.string().optional().nullable(),
  published: z.boolean().optional(),
  anotherEnum: z.union([z.lazy(() => PostCreateanotherEnumInputSchema), z.lazy(() => AnotherEnumSchema).array()]).optional(),
}).strict();

export const PostUpdateWithoutAuthorInputSchema: z.ZodType<PrismaClient.Prisma.PostUpdateWithoutAuthorInput> = z.object({
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  content: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  published: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  anotherEnum: z.union([z.lazy(() => PostUpdateanotherEnumInputSchema), z.lazy(() => AnotherEnumSchema).array()]).optional(),
}).strict();

export const PostUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<PrismaClient.Prisma.PostUncheckedUpdateWithoutAuthorInput> = z.object({
  id: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  content: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  published: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  anotherEnum: z.union([z.lazy(() => PostUpdateanotherEnumInputSchema), z.lazy(() => AnotherEnumSchema).array()]).optional(),
}).strict();

export const PostUncheckedUpdateManyWithoutPostsInputSchema: z.ZodType<PrismaClient.Prisma.PostUncheckedUpdateManyWithoutPostsInput> = z.object({
  id: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  content: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  published: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  anotherEnum: z.union([z.lazy(() => PostUpdateanotherEnumInputSchema), z.lazy(() => AnotherEnumSchema).array()]).optional(),
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

export const TestFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.TestFindFirstArgs> = z.object({
  select: z.lazy(() => TestSelectSchema).optional(),
  where: TestWhereInputSchema.optional(),
  orderBy: z.union([TestOrderByWithRelationInputSchema.array(), TestOrderByWithRelationInputSchema]).optional(),
  cursor: TestWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TestScalarFieldEnumSchema.array().optional(),
}).strict();

export const TestFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.TestFindManyArgs> = z.object({
  select: z.lazy(() => TestSelectSchema).optional(),
  where: TestWhereInputSchema.optional(),
  orderBy: z.union([TestOrderByWithRelationInputSchema.array(), TestOrderByWithRelationInputSchema]).optional(),
  cursor: TestWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TestScalarFieldEnumSchema.array().optional(),
}).strict();

export const TestAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.TestAggregateArgs> = z.object({
  select: z.lazy(() => TestSelectSchema).optional(),
  where: TestWhereInputSchema.optional(),
  orderBy: z.union([TestOrderByWithRelationInputSchema.array(), TestOrderByWithRelationInputSchema]).optional(),
  cursor: TestWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const TestGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.TestGroupByArgs> = z.object({
  select: z.lazy(() => TestSelectSchema).optional(),
  where: TestWhereInputSchema.optional(),
  orderBy: z.union([TestOrderByWithAggregationInputSchema.array(), TestOrderByWithAggregationInputSchema]).optional(),
  by: TestScalarFieldEnumSchema.array(),
  having: TestScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const TestFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.TestFindUniqueArgs> = z.object({
  select: z.lazy(() => TestSelectSchema).optional(),
  where: TestWhereUniqueInputSchema,
}).strict();

export const MyPrismaScalarsTypeFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeFindFirstArgs> = z.object({
  select: z.lazy(() => MyPrismaScalarsTypeSelectSchema).optional(),
  where: MyPrismaScalarsTypeWhereInputSchema.optional(),
  orderBy: z.union([MyPrismaScalarsTypeOrderByWithRelationInputSchema.array(), MyPrismaScalarsTypeOrderByWithRelationInputSchema]).optional(),
  cursor: MyPrismaScalarsTypeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: MyPrismaScalarsTypeScalarFieldEnumSchema.array().optional(),
}).strict();

export const MyPrismaScalarsTypeFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeFindManyArgs> = z.object({
  select: z.lazy(() => MyPrismaScalarsTypeSelectSchema).optional(),
  where: MyPrismaScalarsTypeWhereInputSchema.optional(),
  orderBy: z.union([MyPrismaScalarsTypeOrderByWithRelationInputSchema.array(), MyPrismaScalarsTypeOrderByWithRelationInputSchema]).optional(),
  cursor: MyPrismaScalarsTypeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: MyPrismaScalarsTypeScalarFieldEnumSchema.array().optional(),
}).strict();

export const MyPrismaScalarsTypeAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeAggregateArgs> = z.object({
  select: z.lazy(() => MyPrismaScalarsTypeSelectSchema).optional(),
  where: MyPrismaScalarsTypeWhereInputSchema.optional(),
  orderBy: z.union([MyPrismaScalarsTypeOrderByWithRelationInputSchema.array(), MyPrismaScalarsTypeOrderByWithRelationInputSchema]).optional(),
  cursor: MyPrismaScalarsTypeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const MyPrismaScalarsTypeGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeGroupByArgs> = z.object({
  select: z.lazy(() => MyPrismaScalarsTypeSelectSchema).optional(),
  where: MyPrismaScalarsTypeWhereInputSchema.optional(),
  orderBy: z.union([MyPrismaScalarsTypeOrderByWithAggregationInputSchema.array(), MyPrismaScalarsTypeOrderByWithAggregationInputSchema]).optional(),
  by: MyPrismaScalarsTypeScalarFieldEnumSchema.array(),
  having: MyPrismaScalarsTypeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const MyPrismaScalarsTypeFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeFindUniqueArgs> = z.object({
  select: z.lazy(() => MyPrismaScalarsTypeSelectSchema).optional(),
  where: MyPrismaScalarsTypeWhereUniqueInputSchema,
}).strict();

export const UserFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.UserFindFirstArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict();

export const UserFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.UserFindManyArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict();

export const UserAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.UserAggregateArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.UserGroupByArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([UserOrderByWithAggregationInputSchema.array(), UserOrderByWithAggregationInputSchema]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.UserFindUniqueArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
  where: UserWhereUniqueInputSchema,
}).strict();

export const PostFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.PostFindFirstArgs> = z.object({
  select: z.lazy(() => PostSelectSchema).optional(),
  include: z.lazy(() => PostIncludeSchema).optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([PostOrderByWithRelationInputSchema.array(), PostOrderByWithRelationInputSchema]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PostScalarFieldEnumSchema.array().optional(),
}).strict();

export const PostFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.PostFindManyArgs> = z.object({
  select: z.lazy(() => PostSelectSchema).optional(),
  include: z.lazy(() => PostIncludeSchema).optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([PostOrderByWithRelationInputSchema.array(), PostOrderByWithRelationInputSchema]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PostScalarFieldEnumSchema.array().optional(),
}).strict();

export const PostAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.PostAggregateArgs> = z.object({
  select: z.lazy(() => PostSelectSchema).optional(),
  include: z.lazy(() => PostIncludeSchema).optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([PostOrderByWithRelationInputSchema.array(), PostOrderByWithRelationInputSchema]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const PostGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.PostGroupByArgs> = z.object({
  select: z.lazy(() => PostSelectSchema).optional(),
  include: z.lazy(() => PostIncludeSchema).optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([PostOrderByWithAggregationInputSchema.array(), PostOrderByWithAggregationInputSchema]).optional(),
  by: PostScalarFieldEnumSchema.array(),
  having: PostScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const PostFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.PostFindUniqueArgs> = z.object({
  select: z.lazy(() => PostSelectSchema).optional(),
  include: z.lazy(() => PostIncludeSchema).optional(),
  where: PostWhereUniqueInputSchema,
}).strict();

export const ProfileFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.ProfileFindFirstArgs> = z.object({
  select: z.lazy(() => ProfileSelectSchema).optional(),
  include: z.lazy(() => ProfileIncludeSchema).optional(),
  where: ProfileWhereInputSchema.optional(),
  orderBy: z.union([ProfileOrderByWithRelationInputSchema.array(), ProfileOrderByWithRelationInputSchema]).optional(),
  cursor: ProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ProfileScalarFieldEnumSchema.array().optional(),
}).strict();

export const ProfileFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.ProfileFindManyArgs> = z.object({
  select: z.lazy(() => ProfileSelectSchema).optional(),
  include: z.lazy(() => ProfileIncludeSchema).optional(),
  where: ProfileWhereInputSchema.optional(),
  orderBy: z.union([ProfileOrderByWithRelationInputSchema.array(), ProfileOrderByWithRelationInputSchema]).optional(),
  cursor: ProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ProfileScalarFieldEnumSchema.array().optional(),
}).strict();

export const ProfileAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.ProfileAggregateArgs> = z.object({
  select: z.lazy(() => ProfileSelectSchema).optional(),
  include: z.lazy(() => ProfileIncludeSchema).optional(),
  where: ProfileWhereInputSchema.optional(),
  orderBy: z.union([ProfileOrderByWithRelationInputSchema.array(), ProfileOrderByWithRelationInputSchema]).optional(),
  cursor: ProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ProfileGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.ProfileGroupByArgs> = z.object({
  select: z.lazy(() => ProfileSelectSchema).optional(),
  include: z.lazy(() => ProfileIncludeSchema).optional(),
  where: ProfileWhereInputSchema.optional(),
  orderBy: z.union([ProfileOrderByWithAggregationInputSchema.array(), ProfileOrderByWithAggregationInputSchema]).optional(),
  by: ProfileScalarFieldEnumSchema.array(),
  having: ProfileScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ProfileFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.ProfileFindUniqueArgs> = z.object({
  select: z.lazy(() => ProfileSelectSchema).optional(),
  include: z.lazy(() => ProfileIncludeSchema).optional(),
  where: ProfileWhereUniqueInputSchema,
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

export const TestCreateArgsSchema: z.ZodType<PrismaClient.Prisma.TestCreateArgs> = z.object({
  select: z.lazy(() => TestSelectSchema).optional(),
  data: z.union([TestCreateInputSchema, TestUncheckedCreateInputSchema]),
}).strict();

export const TestUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.TestUpsertArgs> = z.object({
  select: z.lazy(() => TestSelectSchema).optional(),
  where: TestWhereUniqueInputSchema,
  create: z.union([TestCreateInputSchema, TestUncheckedCreateInputSchema]),
  update: z.union([TestUpdateInputSchema, TestUncheckedUpdateInputSchema]),
}).strict();

export const TestCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.TestCreateManyArgs> = z.object({
  select: z.lazy(() => TestSelectSchema).optional(),
  data: TestCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const TestDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.TestDeleteArgs> = z.object({
  select: z.lazy(() => TestSelectSchema).optional(),
  where: TestWhereUniqueInputSchema,
}).strict();

export const TestUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.TestUpdateArgs> = z.object({
  select: z.lazy(() => TestSelectSchema).optional(),
  data: z.union([TestUpdateInputSchema, TestUncheckedUpdateInputSchema]),
  where: TestWhereUniqueInputSchema,
}).strict();

export const TestUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.TestUpdateManyArgs> = z.object({
  select: z.lazy(() => TestSelectSchema).optional(),
  data: z.union([TestUpdateManyMutationInputSchema, TestUncheckedUpdateManyInputSchema]),
  where: TestWhereInputSchema.optional(),
}).strict();

export const TestDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.TestDeleteManyArgs> = z.object({
  select: z.lazy(() => TestSelectSchema).optional(),
  where: TestWhereInputSchema.optional(),
}).strict();

export const MyPrismaScalarsTypeCreateArgsSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeCreateArgs> = z.object({
  select: z.lazy(() => MyPrismaScalarsTypeSelectSchema).optional(),
  data: z.union([MyPrismaScalarsTypeCreateInputSchema, MyPrismaScalarsTypeUncheckedCreateInputSchema]),
}).strict();

export const MyPrismaScalarsTypeUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeUpsertArgs> = z.object({
  select: z.lazy(() => MyPrismaScalarsTypeSelectSchema).optional(),
  where: MyPrismaScalarsTypeWhereUniqueInputSchema,
  create: z.union([MyPrismaScalarsTypeCreateInputSchema, MyPrismaScalarsTypeUncheckedCreateInputSchema]),
  update: z.union([MyPrismaScalarsTypeUpdateInputSchema, MyPrismaScalarsTypeUncheckedUpdateInputSchema]),
}).strict();

export const MyPrismaScalarsTypeCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeCreateManyArgs> = z.object({
  select: z.lazy(() => MyPrismaScalarsTypeSelectSchema).optional(),
  data: MyPrismaScalarsTypeCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const MyPrismaScalarsTypeDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeDeleteArgs> = z.object({
  select: z.lazy(() => MyPrismaScalarsTypeSelectSchema).optional(),
  where: MyPrismaScalarsTypeWhereUniqueInputSchema,
}).strict();

export const MyPrismaScalarsTypeUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeUpdateArgs> = z.object({
  select: z.lazy(() => MyPrismaScalarsTypeSelectSchema).optional(),
  data: z.union([MyPrismaScalarsTypeUpdateInputSchema, MyPrismaScalarsTypeUncheckedUpdateInputSchema]),
  where: MyPrismaScalarsTypeWhereUniqueInputSchema,
}).strict();

export const MyPrismaScalarsTypeUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeUpdateManyArgs> = z.object({
  select: z.lazy(() => MyPrismaScalarsTypeSelectSchema).optional(),
  data: z.union([MyPrismaScalarsTypeUpdateManyMutationInputSchema, MyPrismaScalarsTypeUncheckedUpdateManyInputSchema]),
  where: MyPrismaScalarsTypeWhereInputSchema.optional(),
}).strict();

export const MyPrismaScalarsTypeDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeDeleteManyArgs> = z.object({
  select: z.lazy(() => MyPrismaScalarsTypeSelectSchema).optional(),
  where: MyPrismaScalarsTypeWhereInputSchema.optional(),
}).strict();

export const UserCreateArgsSchema: z.ZodType<PrismaClient.Prisma.UserCreateArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
  data: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
}).strict();

export const UserUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.UserUpsertArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
  update: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
}).strict();

export const UserCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.UserCreateManyArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
  data: UserCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.UserDeleteArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
  where: UserWhereUniqueInputSchema,
}).strict();

export const UserUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.UserUpdateArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
  data: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
  where: UserWhereUniqueInputSchema,
}).strict();

export const UserUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.UserUpdateManyArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
  data: z.union([UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema]),
  where: UserWhereInputSchema.optional(),
}).strict();

export const UserDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.UserDeleteManyArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
  where: UserWhereInputSchema.optional(),
}).strict();

export const PostCreateArgsSchema: z.ZodType<PrismaClient.Prisma.PostCreateArgs> = z.object({
  select: z.lazy(() => PostSelectSchema).optional(),
  include: z.lazy(() => PostIncludeSchema).optional(),
  data: z.union([PostCreateInputSchema, PostUncheckedCreateInputSchema]),
}).strict();

export const PostUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.PostUpsertArgs> = z.object({
  select: z.lazy(() => PostSelectSchema).optional(),
  include: z.lazy(() => PostIncludeSchema).optional(),
  where: PostWhereUniqueInputSchema,
  create: z.union([PostCreateInputSchema, PostUncheckedCreateInputSchema]),
  update: z.union([PostUpdateInputSchema, PostUncheckedUpdateInputSchema]),
}).strict();

export const PostCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.PostCreateManyArgs> = z.object({
  select: z.lazy(() => PostSelectSchema).optional(),
  include: z.lazy(() => PostIncludeSchema).optional(),
  data: PostCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const PostDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.PostDeleteArgs> = z.object({
  select: z.lazy(() => PostSelectSchema).optional(),
  include: z.lazy(() => PostIncludeSchema).optional(),
  where: PostWhereUniqueInputSchema,
}).strict();

export const PostUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.PostUpdateArgs> = z.object({
  select: z.lazy(() => PostSelectSchema).optional(),
  include: z.lazy(() => PostIncludeSchema).optional(),
  data: z.union([PostUpdateInputSchema, PostUncheckedUpdateInputSchema]),
  where: PostWhereUniqueInputSchema,
}).strict();

export const PostUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.PostUpdateManyArgs> = z.object({
  select: z.lazy(() => PostSelectSchema).optional(),
  include: z.lazy(() => PostIncludeSchema).optional(),
  data: z.union([PostUpdateManyMutationInputSchema, PostUncheckedUpdateManyInputSchema]),
  where: PostWhereInputSchema.optional(),
}).strict();

export const PostDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.PostDeleteManyArgs> = z.object({
  select: z.lazy(() => PostSelectSchema).optional(),
  include: z.lazy(() => PostIncludeSchema).optional(),
  where: PostWhereInputSchema.optional(),
}).strict();

export const ProfileCreateArgsSchema: z.ZodType<PrismaClient.Prisma.ProfileCreateArgs> = z.object({
  select: z.lazy(() => ProfileSelectSchema).optional(),
  include: z.lazy(() => ProfileIncludeSchema).optional(),
  data: z.union([ProfileCreateInputSchema, ProfileUncheckedCreateInputSchema]),
}).strict();

export const ProfileUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.ProfileUpsertArgs> = z.object({
  select: z.lazy(() => ProfileSelectSchema).optional(),
  include: z.lazy(() => ProfileIncludeSchema).optional(),
  where: ProfileWhereUniqueInputSchema,
  create: z.union([ProfileCreateInputSchema, ProfileUncheckedCreateInputSchema]),
  update: z.union([ProfileUpdateInputSchema, ProfileUncheckedUpdateInputSchema]),
}).strict();

export const ProfileCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.ProfileCreateManyArgs> = z.object({
  select: z.lazy(() => ProfileSelectSchema).optional(),
  include: z.lazy(() => ProfileIncludeSchema).optional(),
  data: ProfileCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ProfileDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.ProfileDeleteArgs> = z.object({
  select: z.lazy(() => ProfileSelectSchema).optional(),
  include: z.lazy(() => ProfileIncludeSchema).optional(),
  where: ProfileWhereUniqueInputSchema,
}).strict();

export const ProfileUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.ProfileUpdateArgs> = z.object({
  select: z.lazy(() => ProfileSelectSchema).optional(),
  include: z.lazy(() => ProfileIncludeSchema).optional(),
  data: z.union([ProfileUpdateInputSchema, ProfileUncheckedUpdateInputSchema]),
  where: ProfileWhereUniqueInputSchema,
}).strict();

export const ProfileUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.ProfileUpdateManyArgs> = z.object({
  select: z.lazy(() => ProfileSelectSchema).optional(),
  include: z.lazy(() => ProfileIncludeSchema).optional(),
  data: z.union([ProfileUpdateManyMutationInputSchema, ProfileUncheckedUpdateManyInputSchema]),
  where: ProfileWhereInputSchema.optional(),
}).strict();

export const ProfileDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.ProfileDeleteManyArgs> = z.object({
  select: z.lazy(() => ProfileSelectSchema).optional(),
  include: z.lazy(() => ProfileIncludeSchema).optional(),
  where: ProfileWhereInputSchema.optional(),
}).strict();
