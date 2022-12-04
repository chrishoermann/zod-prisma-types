import { z } from "zod";
import * as Prisma from "@prisma/client";
import { Decimal } from "decimal.js";
import validator from "validator";

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

// PRISMA GENERATED ENUMS
//------------------------------------------------------

export const JsonNullValueFilter = z.enum(['DbNull', 'JsonNull', 'AnyNull',]);

export const JsonNullValueInput = z.enum(['JsonNull',]);

export const NullableJsonNullValueInput = z.enum(['DbNull', 'JsonNull',]);

export const PostScalarFieldEnum = z.nativeEnum(Prisma.Prisma.PostScalarFieldEnum);

export const ProfileScalarFieldEnum = z.nativeEnum(Prisma.Prisma.ProfileScalarFieldEnum);

export const QueryMode = z.nativeEnum(Prisma.Prisma.QueryMode);

export const SortOrder = z.nativeEnum(Prisma.Prisma.SortOrder);

export const TestScalarFieldEnum = z.nativeEnum(Prisma.Prisma.TestScalarFieldEnum);

export const TransactionIsolationLevel = z.nativeEnum(Prisma.Prisma.TransactionIsolationLevel);

export const UserScalarFieldEnum = z.nativeEnum(Prisma.Prisma.UserScalarFieldEnum);

// CUSTOM ENUMS
//------------------------------------------------------

export const MyValue = z.nativeEnum(Prisma.MyValue);

export const Role = z.nativeEnum(Prisma.Role);

export const SecondEnum = z.nativeEnum(Prisma.SecondEnum);

export const AnotherEnum = z.nativeEnum(Prisma.AnotherEnum);

/////////////////////////////////////////
// HELPER TYPES
/////////////////////////////////////////

export const JsonValue: z.ZodType<Prisma.Prisma.JsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(JsonValue)),
  z.lazy(() => z.record(JsonValue)),
]).nullable();

export const InputJsonValue: z.ZodType<Prisma.Prisma.InputJsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(InputJsonValue.nullable())),
  z.lazy(() => z.record(InputJsonValue.nullable())),
]);

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

// TEST
//------------------------------------------------------

export const Test = z.object({
  value: MyValue,
  id: z.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid(),
  name: z.string({ required_error: "error", invalid_type_error: "error" }).nullable(),
  bic: z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }).nullable(),
  intTwo: z.number(),
  int: z.number().nullable(),
  floatOpt: z.number().nullable(),
  float: z.number(),
  decimal: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal', path: ['Models', 'Test'] }),
  decimalOpt: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal', path: ['Models', 'Test'] }).nullable(),
  date: z.date(),
  dateOpt: z.date().nullable(),
  bigInt: z.bigint(),
  bigIntOpt: z.bigint().nullable(),
  json: InputJsonValue,
  jsonOpt: InputJsonValue.nullable(),
  bytes: z.instanceof(Buffer),
  bytesOpt: z.instanceof(Buffer).nullable(),
});

// USER
//------------------------------------------------------

export const User = z.object({
  role: Role.array(),
  enum: AnotherEnum,
  id: z.string().cuid(),
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().min(1).max(100).nullable(),
});

// POST
//------------------------------------------------------

export const Post = z.object({
  anotherEnum: AnotherEnum.array(),
  id: z.number(),
  title: z.string(),
  content: z.string().nullable(),
  published: z.boolean(),
  authorId: z.string(),
});

// PROFILE
//------------------------------------------------------

export const Profile = z.object({
  role: Role.array(),
  second: SecondEnum,
  id: z.number(),
  bio: z.string(),
  userId: z.string(),
});

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// TEST
//------------------------------------------------------

export const TestSelect: z.ZodType<Prisma.Prisma.TestSelect> = z.object({
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

// USER
//------------------------------------------------------

export const UserArgs: z.ZodType<Prisma.Prisma.UserArgs> = z.object({
  select: z.lazy(() => UserSelect).optional(),
  include: z.lazy(() => UserInclude).optional(),
}).strict();

export const UserSelect: z.ZodType<Prisma.Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  role: z.boolean().optional(),
  enum: z.boolean().optional(),
  posts: z.union([z.boolean(), z.lazy(() => PostArgs)]).optional(),
  profile: z.union([z.boolean(), z.lazy(() => ProfileArgs)]).optional(),
}).strict();

export const UserInclude: z.ZodType<Prisma.Prisma.UserInclude> = z.object({
  posts: z.union([z.boolean(), z.lazy(() => PostArgs)]).optional(),
  profile: z.union([z.boolean(), z.lazy(() => ProfileArgs)]).optional(),
}).strict();

// POST
//------------------------------------------------------

export const PostArgs: z.ZodType<Prisma.Prisma.PostArgs> = z.object({
  select: z.lazy(() => PostSelect).optional(),
  include: z.lazy(() => PostInclude).optional(),
}).strict();

export const PostSelect: z.ZodType<Prisma.Prisma.PostSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  content: z.boolean().optional(),
  published: z.boolean().optional(),
  authorId: z.boolean().optional(),
  anotherEnum: z.boolean().optional(),
  author: z.union([z.boolean(), z.lazy(() => UserArgs)]).optional(),
}).strict();

export const PostInclude: z.ZodType<Prisma.Prisma.PostInclude> = z.object({
  author: z.union([z.boolean(), z.lazy(() => UserArgs)]).optional(),
}).strict();

// PROFILE
//------------------------------------------------------

export const ProfileArgs: z.ZodType<Prisma.Prisma.ProfileArgs> = z.object({
  select: z.lazy(() => ProfileSelect).optional(),
  include: z.lazy(() => ProfileInclude).optional(),
}).strict();

export const ProfileSelect: z.ZodType<Prisma.Prisma.ProfileSelect> = z.object({
  id: z.boolean().optional(),
  bio: z.boolean().optional(),
  userId: z.boolean().optional(),
  role: z.boolean().optional(),
  second: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgs)]).optional(),
}).strict();

export const ProfileInclude: z.ZodType<Prisma.Prisma.ProfileInclude> = z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgs)]).optional(),
}).strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const TestWhereInput: z.ZodType<Prisma.Prisma.TestWhereInput> = z.object({
  AND: z.union([z.lazy(() => TestWhereInput), z.lazy(() => TestWhereInput).array()]).optional(),
  OR: z.lazy(() => TestWhereInput).array().optional(),
  NOT: z.union([z.lazy(() => TestWhereInput), z.lazy(() => TestWhereInput).array()]).optional(),
  id: z.union([z.lazy(() => StringFilter), z.string()]).optional(),
  name: z.union([z.lazy(() => StringNullableFilter), z.string()]).optional().nullable(),
  value: z.union([z.lazy(() => EnumMyValueFilter), z.lazy(() => MyValue)]).optional(),
  bic: z.union([z.lazy(() => StringNullableFilter), z.string()]).optional().nullable(),
  intTwo: z.union([z.lazy(() => IntFilter), z.number()]).optional(),
  int: z.union([z.lazy(() => IntNullableFilter), z.number()]).optional().nullable(),
  floatOpt: z.union([z.lazy(() => FloatNullableFilter), z.number()]).optional().nullable(),
  float: z.union([z.lazy(() => FloatFilter), z.number()]).optional(),
  decimal: z.union([z.lazy(() => DecimalFilter), z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' })]).optional(),
  decimalOpt: z.union([z.lazy(() => DecimalNullableFilter), z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' })]).optional().nullable(),
  date: z.union([z.lazy(() => DateTimeFilter), z.date()]).optional(),
  dateOpt: z.union([z.lazy(() => DateTimeNullableFilter), z.date()]).optional().nullable(),
  bigInt: z.union([z.lazy(() => BigIntFilter), z.bigint()]).optional(),
  bigIntOpt: z.union([z.lazy(() => BigIntNullableFilter), z.bigint()]).optional().nullable(),
  json: z.lazy(() => JsonFilter).optional(),
  jsonOpt: z.lazy(() => JsonNullableFilter).optional(),
  bytes: z.union([z.lazy(() => BytesFilter), z.instanceof(Buffer)]).optional(),
  bytesOpt: z.union([z.lazy(() => BytesNullableFilter), z.instanceof(Buffer)]).optional().nullable(),
}).strict();

export const TestOrderByWithRelationInput: z.ZodType<Prisma.Prisma.TestOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrder).optional(),
  name: z.lazy(() => SortOrder).optional(),
  value: z.lazy(() => SortOrder).optional(),
  bic: z.lazy(() => SortOrder).optional(),
  intTwo: z.lazy(() => SortOrder).optional(),
  int: z.lazy(() => SortOrder).optional(),
  floatOpt: z.lazy(() => SortOrder).optional(),
  float: z.lazy(() => SortOrder).optional(),
  decimal: z.lazy(() => SortOrder).optional(),
  decimalOpt: z.lazy(() => SortOrder).optional(),
  date: z.lazy(() => SortOrder).optional(),
  dateOpt: z.lazy(() => SortOrder).optional(),
  bigInt: z.lazy(() => SortOrder).optional(),
  bigIntOpt: z.lazy(() => SortOrder).optional(),
  json: z.lazy(() => SortOrder).optional(),
  jsonOpt: z.lazy(() => SortOrder).optional(),
  bytes: z.lazy(() => SortOrder).optional(),
  bytesOpt: z.lazy(() => SortOrder).optional(),
}).strict();

export const TestWhereUniqueInput: z.ZodType<Prisma.Prisma.TestWhereUniqueInput> = z.object({
  id: z.string().optional(),
}).strict();

export const TestOrderByWithAggregationInput: z.ZodType<Prisma.Prisma.TestOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrder).optional(),
  name: z.lazy(() => SortOrder).optional(),
  value: z.lazy(() => SortOrder).optional(),
  bic: z.lazy(() => SortOrder).optional(),
  intTwo: z.lazy(() => SortOrder).optional(),
  int: z.lazy(() => SortOrder).optional(),
  floatOpt: z.lazy(() => SortOrder).optional(),
  float: z.lazy(() => SortOrder).optional(),
  decimal: z.lazy(() => SortOrder).optional(),
  decimalOpt: z.lazy(() => SortOrder).optional(),
  date: z.lazy(() => SortOrder).optional(),
  dateOpt: z.lazy(() => SortOrder).optional(),
  bigInt: z.lazy(() => SortOrder).optional(),
  bigIntOpt: z.lazy(() => SortOrder).optional(),
  json: z.lazy(() => SortOrder).optional(),
  jsonOpt: z.lazy(() => SortOrder).optional(),
  bytes: z.lazy(() => SortOrder).optional(),
  bytesOpt: z.lazy(() => SortOrder).optional(),
  _count: z.lazy(() => TestCountOrderByAggregateInput).optional(),
  _avg: z.lazy(() => TestAvgOrderByAggregateInput).optional(),
  _max: z.lazy(() => TestMaxOrderByAggregateInput).optional(),
  _min: z.lazy(() => TestMinOrderByAggregateInput).optional(),
  _sum: z.lazy(() => TestSumOrderByAggregateInput).optional(),
}).strict();

export const TestScalarWhereWithAggregatesInput: z.ZodType<Prisma.Prisma.TestScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => TestScalarWhereWithAggregatesInput), z.lazy(() => TestScalarWhereWithAggregatesInput).array()]).optional(),
  OR: z.lazy(() => TestScalarWhereWithAggregatesInput).array().optional(),
  NOT: z.union([z.lazy(() => TestScalarWhereWithAggregatesInput), z.lazy(() => TestScalarWhereWithAggregatesInput).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilter), z.string()]).optional(),
  name: z.union([z.lazy(() => StringNullableWithAggregatesFilter), z.string()]).optional().nullable(),
  value: z.union([z.lazy(() => EnumMyValueWithAggregatesFilter), z.lazy(() => MyValue)]).optional(),
  bic: z.union([z.lazy(() => StringNullableWithAggregatesFilter), z.string()]).optional().nullable(),
  intTwo: z.union([z.lazy(() => IntWithAggregatesFilter), z.number()]).optional(),
  int: z.union([z.lazy(() => IntNullableWithAggregatesFilter), z.number()]).optional().nullable(),
  floatOpt: z.union([z.lazy(() => FloatNullableWithAggregatesFilter), z.number()]).optional().nullable(),
  float: z.union([z.lazy(() => FloatWithAggregatesFilter), z.number()]).optional(),
  decimal: z.union([z.lazy(() => DecimalWithAggregatesFilter), z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' })]).optional(),
  decimalOpt: z.union([z.lazy(() => DecimalNullableWithAggregatesFilter), z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' })]).optional().nullable(),
  date: z.union([z.lazy(() => DateTimeWithAggregatesFilter), z.date()]).optional(),
  dateOpt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilter), z.date()]).optional().nullable(),
  bigInt: z.union([z.lazy(() => BigIntWithAggregatesFilter), z.bigint()]).optional(),
  bigIntOpt: z.union([z.lazy(() => BigIntNullableWithAggregatesFilter), z.bigint()]).optional().nullable(),
  json: z.lazy(() => JsonWithAggregatesFilter).optional(),
  jsonOpt: z.lazy(() => JsonNullableWithAggregatesFilter).optional(),
  bytes: z.union([z.lazy(() => BytesWithAggregatesFilter), z.instanceof(Buffer)]).optional(),
  bytesOpt: z.union([z.lazy(() => BytesNullableWithAggregatesFilter), z.instanceof(Buffer)]).optional().nullable(),
}).strict();

export const UserWhereInput: z.ZodType<Prisma.Prisma.UserWhereInput> = z.object({
  AND: z.union([z.lazy(() => UserWhereInput), z.lazy(() => UserWhereInput).array()]).optional(),
  OR: z.lazy(() => UserWhereInput).array().optional(),
  NOT: z.union([z.lazy(() => UserWhereInput), z.lazy(() => UserWhereInput).array()]).optional(),
  id: z.union([z.lazy(() => StringFilter), z.string()]).optional(),
  email: z.union([z.lazy(() => StringFilter), z.string()]).optional(),
  name: z.union([z.lazy(() => StringNullableFilter), z.string()]).optional().nullable(),
  posts: z.lazy(() => PostListRelationFilter).optional(),
  profile: z.union([z.lazy(() => ProfileRelationFilter), z.lazy(() => ProfileWhereInput)]).optional().nullable(),
  role: z.lazy(() => EnumRoleNullableListFilter).optional(),
  enum: z.union([z.lazy(() => EnumAnotherEnumFilter), z.lazy(() => AnotherEnum)]).optional(),
}).strict();

export const UserOrderByWithRelationInput: z.ZodType<Prisma.Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrder).optional(),
  email: z.lazy(() => SortOrder).optional(),
  name: z.lazy(() => SortOrder).optional(),
  posts: z.lazy(() => PostOrderByRelationAggregateInput).optional(),
  profile: z.lazy(() => ProfileOrderByWithRelationInput).optional(),
  role: z.lazy(() => SortOrder).optional(),
  enum: z.lazy(() => SortOrder).optional(),
}).strict();

export const UserWhereUniqueInput: z.ZodType<Prisma.Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().optional(),
  email: z.string().optional(),
}).strict();

export const UserOrderByWithAggregationInput: z.ZodType<Prisma.Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrder).optional(),
  email: z.lazy(() => SortOrder).optional(),
  name: z.lazy(() => SortOrder).optional(),
  role: z.lazy(() => SortOrder).optional(),
  enum: z.lazy(() => SortOrder).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInput).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInput).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInput).optional(),
}).strict();

export const UserScalarWhereWithAggregatesInput: z.ZodType<Prisma.Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => UserScalarWhereWithAggregatesInput), z.lazy(() => UserScalarWhereWithAggregatesInput).array()]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInput).array().optional(),
  NOT: z.union([z.lazy(() => UserScalarWhereWithAggregatesInput), z.lazy(() => UserScalarWhereWithAggregatesInput).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilter), z.string()]).optional(),
  email: z.union([z.lazy(() => StringWithAggregatesFilter), z.string()]).optional(),
  name: z.union([z.lazy(() => StringNullableWithAggregatesFilter), z.string()]).optional().nullable(),
  role: z.lazy(() => EnumRoleNullableListFilter).optional(),
  enum: z.union([z.lazy(() => EnumAnotherEnumWithAggregatesFilter), z.lazy(() => AnotherEnum)]).optional(),
}).strict();

export const PostWhereInput: z.ZodType<Prisma.Prisma.PostWhereInput> = z.object({
  AND: z.union([z.lazy(() => PostWhereInput), z.lazy(() => PostWhereInput).array()]).optional(),
  OR: z.lazy(() => PostWhereInput).array().optional(),
  NOT: z.union([z.lazy(() => PostWhereInput), z.lazy(() => PostWhereInput).array()]).optional(),
  id: z.union([z.lazy(() => IntFilter), z.number()]).optional(),
  title: z.union([z.lazy(() => StringFilter), z.string()]).optional(),
  content: z.union([z.lazy(() => StringNullableFilter), z.string()]).optional().nullable(),
  published: z.union([z.lazy(() => BoolFilter), z.boolean()]).optional(),
  author: z.union([z.lazy(() => UserRelationFilter), z.lazy(() => UserWhereInput)]).optional(),
  authorId: z.union([z.lazy(() => StringFilter), z.string()]).optional(),
  anotherEnum: z.lazy(() => EnumAnotherEnumNullableListFilter).optional(),
}).strict();

export const PostOrderByWithRelationInput: z.ZodType<Prisma.Prisma.PostOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrder).optional(),
  title: z.lazy(() => SortOrder).optional(),
  content: z.lazy(() => SortOrder).optional(),
  published: z.lazy(() => SortOrder).optional(),
  author: z.lazy(() => UserOrderByWithRelationInput).optional(),
  authorId: z.lazy(() => SortOrder).optional(),
  anotherEnum: z.lazy(() => SortOrder).optional(),
}).strict();

export const PostWhereUniqueInput: z.ZodType<Prisma.Prisma.PostWhereUniqueInput> = z.object({
  id: z.number().optional(),
}).strict();

export const PostOrderByWithAggregationInput: z.ZodType<Prisma.Prisma.PostOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrder).optional(),
  title: z.lazy(() => SortOrder).optional(),
  content: z.lazy(() => SortOrder).optional(),
  published: z.lazy(() => SortOrder).optional(),
  authorId: z.lazy(() => SortOrder).optional(),
  anotherEnum: z.lazy(() => SortOrder).optional(),
  _count: z.lazy(() => PostCountOrderByAggregateInput).optional(),
  _avg: z.lazy(() => PostAvgOrderByAggregateInput).optional(),
  _max: z.lazy(() => PostMaxOrderByAggregateInput).optional(),
  _min: z.lazy(() => PostMinOrderByAggregateInput).optional(),
  _sum: z.lazy(() => PostSumOrderByAggregateInput).optional(),
}).strict();

export const PostScalarWhereWithAggregatesInput: z.ZodType<Prisma.Prisma.PostScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => PostScalarWhereWithAggregatesInput), z.lazy(() => PostScalarWhereWithAggregatesInput).array()]).optional(),
  OR: z.lazy(() => PostScalarWhereWithAggregatesInput).array().optional(),
  NOT: z.union([z.lazy(() => PostScalarWhereWithAggregatesInput), z.lazy(() => PostScalarWhereWithAggregatesInput).array()]).optional(),
  id: z.union([z.lazy(() => IntWithAggregatesFilter), z.number()]).optional(),
  title: z.union([z.lazy(() => StringWithAggregatesFilter), z.string()]).optional(),
  content: z.union([z.lazy(() => StringNullableWithAggregatesFilter), z.string()]).optional().nullable(),
  published: z.union([z.lazy(() => BoolWithAggregatesFilter), z.boolean()]).optional(),
  authorId: z.union([z.lazy(() => StringWithAggregatesFilter), z.string()]).optional(),
  anotherEnum: z.lazy(() => EnumAnotherEnumNullableListFilter).optional(),
}).strict();

export const ProfileWhereInput: z.ZodType<Prisma.Prisma.ProfileWhereInput> = z.object({
  AND: z.union([z.lazy(() => ProfileWhereInput), z.lazy(() => ProfileWhereInput).array()]).optional(),
  OR: z.lazy(() => ProfileWhereInput).array().optional(),
  NOT: z.union([z.lazy(() => ProfileWhereInput), z.lazy(() => ProfileWhereInput).array()]).optional(),
  id: z.union([z.lazy(() => IntFilter), z.number()]).optional(),
  bio: z.union([z.lazy(() => StringFilter), z.string()]).optional(),
  user: z.union([z.lazy(() => UserRelationFilter), z.lazy(() => UserWhereInput)]).optional(),
  userId: z.union([z.lazy(() => StringFilter), z.string()]).optional(),
  role: z.lazy(() => EnumRoleNullableListFilter).optional(),
  second: z.union([z.lazy(() => EnumSecondEnumFilter), z.lazy(() => SecondEnum)]).optional(),
}).strict();

export const ProfileOrderByWithRelationInput: z.ZodType<Prisma.Prisma.ProfileOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrder).optional(),
  bio: z.lazy(() => SortOrder).optional(),
  user: z.lazy(() => UserOrderByWithRelationInput).optional(),
  userId: z.lazy(() => SortOrder).optional(),
  role: z.lazy(() => SortOrder).optional(),
  second: z.lazy(() => SortOrder).optional(),
}).strict();

export const ProfileWhereUniqueInput: z.ZodType<Prisma.Prisma.ProfileWhereUniqueInput> = z.object({
  id: z.number().optional(),
  userId: z.string().optional(),
}).strict();

export const ProfileOrderByWithAggregationInput: z.ZodType<Prisma.Prisma.ProfileOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrder).optional(),
  bio: z.lazy(() => SortOrder).optional(),
  userId: z.lazy(() => SortOrder).optional(),
  role: z.lazy(() => SortOrder).optional(),
  second: z.lazy(() => SortOrder).optional(),
  _count: z.lazy(() => ProfileCountOrderByAggregateInput).optional(),
  _avg: z.lazy(() => ProfileAvgOrderByAggregateInput).optional(),
  _max: z.lazy(() => ProfileMaxOrderByAggregateInput).optional(),
  _min: z.lazy(() => ProfileMinOrderByAggregateInput).optional(),
  _sum: z.lazy(() => ProfileSumOrderByAggregateInput).optional(),
}).strict();

export const ProfileScalarWhereWithAggregatesInput: z.ZodType<Prisma.Prisma.ProfileScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => ProfileScalarWhereWithAggregatesInput), z.lazy(() => ProfileScalarWhereWithAggregatesInput).array()]).optional(),
  OR: z.lazy(() => ProfileScalarWhereWithAggregatesInput).array().optional(),
  NOT: z.union([z.lazy(() => ProfileScalarWhereWithAggregatesInput), z.lazy(() => ProfileScalarWhereWithAggregatesInput).array()]).optional(),
  id: z.union([z.lazy(() => IntWithAggregatesFilter), z.number()]).optional(),
  bio: z.union([z.lazy(() => StringWithAggregatesFilter), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilter), z.string()]).optional(),
  role: z.lazy(() => EnumRoleNullableListFilter).optional(),
  second: z.union([z.lazy(() => EnumSecondEnumWithAggregatesFilter), z.lazy(() => SecondEnum)]).optional(),
}).strict();

export const TestCreateInput: z.ZodType<Prisma.Prisma.TestCreateInput> = z.object({
  id: z.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid().optional(),
  name: z.string({ required_error: "error", invalid_type_error: "error" }).optional().nullable(),
  value: z.lazy(() => MyValue),
  bic: z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }).optional().nullable(),
  intTwo: z.number(),
  int: z.number().optional().nullable(),
  floatOpt: z.number().optional().nullable(),
  float: z.number(),
  decimal: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }),
  decimalOpt: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional().nullable(),
  date: z.date().optional(),
  dateOpt: z.date().optional().nullable(),
  bigInt: z.bigint(),
  bigIntOpt: z.bigint().optional().nullable(),
  json: z.union([z.lazy(() => JsonNullValueInput), InputJsonValue]),
  jsonOpt: z.union([z.lazy(() => NullableJsonNullValueInput), InputJsonValue]).optional(),
  bytes: z.instanceof(Buffer),
  bytesOpt: z.instanceof(Buffer).optional().nullable(),
}).strict();

export const TestUncheckedCreateInput: z.ZodType<Prisma.Prisma.TestUncheckedCreateInput> = z.object({
  id: z.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid().optional(),
  name: z.string({ required_error: "error", invalid_type_error: "error" }).optional().nullable(),
  value: z.lazy(() => MyValue),
  bic: z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }).optional().nullable(),
  intTwo: z.number(),
  int: z.number().optional().nullable(),
  floatOpt: z.number().optional().nullable(),
  float: z.number(),
  decimal: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }),
  decimalOpt: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional().nullable(),
  date: z.date().optional(),
  dateOpt: z.date().optional().nullable(),
  bigInt: z.bigint(),
  bigIntOpt: z.bigint().optional().nullable(),
  json: z.union([z.lazy(() => JsonNullValueInput), InputJsonValue]),
  jsonOpt: z.union([z.lazy(() => NullableJsonNullValueInput), InputJsonValue]).optional(),
  bytes: z.instanceof(Buffer),
  bytesOpt: z.instanceof(Buffer).optional().nullable(),
}).strict();

export const TestUpdateInput: z.ZodType<Prisma.Prisma.TestUpdateInput> = z.object({
  id: z.union([z.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid(), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  name: z.union([z.string({ required_error: "error", invalid_type_error: "error" }), z.lazy(() => NullableStringFieldUpdateOperationsInput)]).optional().nullable(),
  value: z.union([z.lazy(() => MyValue), z.lazy(() => EnumMyValueFieldUpdateOperationsInput)]).optional(),
  bic: z.union([z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }), z.lazy(() => NullableStringFieldUpdateOperationsInput)]).optional().nullable(),
  intTwo: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInput)]).optional(),
  int: z.union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInput)]).optional().nullable(),
  floatOpt: z.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInput)]).optional().nullable(),
  float: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInput)]).optional(),
  decimal: z.union([z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => DecimalFieldUpdateOperationsInput)]).optional(),
  decimalOpt: z.union([z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => NullableDecimalFieldUpdateOperationsInput)]).optional().nullable(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInput)]).optional(),
  dateOpt: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInput)]).optional().nullable(),
  bigInt: z.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInput)]).optional(),
  bigIntOpt: z.union([z.bigint(), z.lazy(() => NullableBigIntFieldUpdateOperationsInput)]).optional().nullable(),
  json: z.union([z.lazy(() => JsonNullValueInput), InputJsonValue]).optional(),
  jsonOpt: z.union([z.lazy(() => NullableJsonNullValueInput), InputJsonValue]).optional(),
  bytes: z.union([z.instanceof(Buffer), z.lazy(() => BytesFieldUpdateOperationsInput)]).optional(),
  bytesOpt: z.union([z.instanceof(Buffer), z.lazy(() => NullableBytesFieldUpdateOperationsInput)]).optional().nullable(),
}).strict();

export const TestUncheckedUpdateInput: z.ZodType<Prisma.Prisma.TestUncheckedUpdateInput> = z.object({
  id: z.union([z.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid(), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  name: z.union([z.string({ required_error: "error", invalid_type_error: "error" }), z.lazy(() => NullableStringFieldUpdateOperationsInput)]).optional().nullable(),
  value: z.union([z.lazy(() => MyValue), z.lazy(() => EnumMyValueFieldUpdateOperationsInput)]).optional(),
  bic: z.union([z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }), z.lazy(() => NullableStringFieldUpdateOperationsInput)]).optional().nullable(),
  intTwo: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInput)]).optional(),
  int: z.union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInput)]).optional().nullable(),
  floatOpt: z.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInput)]).optional().nullable(),
  float: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInput)]).optional(),
  decimal: z.union([z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => DecimalFieldUpdateOperationsInput)]).optional(),
  decimalOpt: z.union([z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => NullableDecimalFieldUpdateOperationsInput)]).optional().nullable(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInput)]).optional(),
  dateOpt: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInput)]).optional().nullable(),
  bigInt: z.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInput)]).optional(),
  bigIntOpt: z.union([z.bigint(), z.lazy(() => NullableBigIntFieldUpdateOperationsInput)]).optional().nullable(),
  json: z.union([z.lazy(() => JsonNullValueInput), InputJsonValue]).optional(),
  jsonOpt: z.union([z.lazy(() => NullableJsonNullValueInput), InputJsonValue]).optional(),
  bytes: z.union([z.instanceof(Buffer), z.lazy(() => BytesFieldUpdateOperationsInput)]).optional(),
  bytesOpt: z.union([z.instanceof(Buffer), z.lazy(() => NullableBytesFieldUpdateOperationsInput)]).optional().nullable(),
}).strict();

export const TestCreateManyInput: z.ZodType<Prisma.Prisma.TestCreateManyInput> = z.object({
  id: z.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid().optional(),
  name: z.string({ required_error: "error", invalid_type_error: "error" }).optional().nullable(),
  value: z.lazy(() => MyValue),
  bic: z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }).optional().nullable(),
  intTwo: z.number(),
  int: z.number().optional().nullable(),
  floatOpt: z.number().optional().nullable(),
  float: z.number(),
  decimal: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }),
  decimalOpt: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional().nullable(),
  date: z.date().optional(),
  dateOpt: z.date().optional().nullable(),
  bigInt: z.bigint(),
  bigIntOpt: z.bigint().optional().nullable(),
  json: z.union([z.lazy(() => JsonNullValueInput), InputJsonValue]),
  jsonOpt: z.union([z.lazy(() => NullableJsonNullValueInput), InputJsonValue]).optional(),
  bytes: z.instanceof(Buffer),
  bytesOpt: z.instanceof(Buffer).optional().nullable(),
}).strict();

export const TestUpdateManyMutationInput: z.ZodType<Prisma.Prisma.TestUpdateManyMutationInput> = z.object({
  id: z.union([z.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid(), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  name: z.union([z.string({ required_error: "error", invalid_type_error: "error" }), z.lazy(() => NullableStringFieldUpdateOperationsInput)]).optional().nullable(),
  value: z.union([z.lazy(() => MyValue), z.lazy(() => EnumMyValueFieldUpdateOperationsInput)]).optional(),
  bic: z.union([z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }), z.lazy(() => NullableStringFieldUpdateOperationsInput)]).optional().nullable(),
  intTwo: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInput)]).optional(),
  int: z.union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInput)]).optional().nullable(),
  floatOpt: z.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInput)]).optional().nullable(),
  float: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInput)]).optional(),
  decimal: z.union([z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => DecimalFieldUpdateOperationsInput)]).optional(),
  decimalOpt: z.union([z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => NullableDecimalFieldUpdateOperationsInput)]).optional().nullable(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInput)]).optional(),
  dateOpt: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInput)]).optional().nullable(),
  bigInt: z.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInput)]).optional(),
  bigIntOpt: z.union([z.bigint(), z.lazy(() => NullableBigIntFieldUpdateOperationsInput)]).optional().nullable(),
  json: z.union([z.lazy(() => JsonNullValueInput), InputJsonValue]).optional(),
  jsonOpt: z.union([z.lazy(() => NullableJsonNullValueInput), InputJsonValue]).optional(),
  bytes: z.union([z.instanceof(Buffer), z.lazy(() => BytesFieldUpdateOperationsInput)]).optional(),
  bytesOpt: z.union([z.instanceof(Buffer), z.lazy(() => NullableBytesFieldUpdateOperationsInput)]).optional().nullable(),
}).strict();

export const TestUncheckedUpdateManyInput: z.ZodType<Prisma.Prisma.TestUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid(), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  name: z.union([z.string({ required_error: "error", invalid_type_error: "error" }), z.lazy(() => NullableStringFieldUpdateOperationsInput)]).optional().nullable(),
  value: z.union([z.lazy(() => MyValue), z.lazy(() => EnumMyValueFieldUpdateOperationsInput)]).optional(),
  bic: z.union([z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }), z.lazy(() => NullableStringFieldUpdateOperationsInput)]).optional().nullable(),
  intTwo: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInput)]).optional(),
  int: z.union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInput)]).optional().nullable(),
  floatOpt: z.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInput)]).optional().nullable(),
  float: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInput)]).optional(),
  decimal: z.union([z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => DecimalFieldUpdateOperationsInput)]).optional(),
  decimalOpt: z.union([z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => NullableDecimalFieldUpdateOperationsInput)]).optional().nullable(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInput)]).optional(),
  dateOpt: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInput)]).optional().nullable(),
  bigInt: z.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInput)]).optional(),
  bigIntOpt: z.union([z.bigint(), z.lazy(() => NullableBigIntFieldUpdateOperationsInput)]).optional().nullable(),
  json: z.union([z.lazy(() => JsonNullValueInput), InputJsonValue]).optional(),
  jsonOpt: z.union([z.lazy(() => NullableJsonNullValueInput), InputJsonValue]).optional(),
  bytes: z.union([z.instanceof(Buffer), z.lazy(() => BytesFieldUpdateOperationsInput)]).optional(),
  bytesOpt: z.union([z.instanceof(Buffer), z.lazy(() => NullableBytesFieldUpdateOperationsInput)]).optional().nullable(),
}).strict();

export const UserCreateInput: z.ZodType<Prisma.Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().min(1).max(100).optional().nullable(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInput).optional(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutUserInput).optional(),
  role: z.union([z.lazy(() => UserCreateroleInput), z.lazy(() => Role).array()]).optional(),
  enum: z.lazy(() => AnotherEnum).optional(),
}).strict();

export const UserUncheckedCreateInput: z.ZodType<Prisma.Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().min(1).max(100).optional().nullable(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInput).optional(),
  profile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutUserInput).optional(),
  role: z.union([z.lazy(() => UserCreateroleInput), z.lazy(() => Role).array()]).optional(),
  enum: z.lazy(() => AnotherEnum).optional(),
}).strict();

export const UserUpdateInput: z.ZodType<Prisma.Prisma.UserUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  email: z.union([z.string().email({ message: "Invalid email address" }), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  name: z.union([z.string().min(1).max(100), z.lazy(() => NullableStringFieldUpdateOperationsInput)]).optional().nullable(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInput).optional(),
  profile: z.lazy(() => ProfileUpdateOneWithoutUserNestedInput).optional(),
  role: z.union([z.lazy(() => UserUpdateroleInput), z.lazy(() => Role).array()]).optional(),
  enum: z.union([z.lazy(() => AnotherEnum), z.lazy(() => EnumAnotherEnumFieldUpdateOperationsInput)]).optional(),
}).strict();

export const UserUncheckedUpdateInput: z.ZodType<Prisma.Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  email: z.union([z.string().email({ message: "Invalid email address" }), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  name: z.union([z.string().min(1).max(100), z.lazy(() => NullableStringFieldUpdateOperationsInput)]).optional().nullable(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInput).optional(),
  profile: z.lazy(() => ProfileUncheckedUpdateOneWithoutUserNestedInput).optional(),
  role: z.union([z.lazy(() => UserUpdateroleInput), z.lazy(() => Role).array()]).optional(),
  enum: z.union([z.lazy(() => AnotherEnum), z.lazy(() => EnumAnotherEnumFieldUpdateOperationsInput)]).optional(),
}).strict();

export const UserCreateManyInput: z.ZodType<Prisma.Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().min(1).max(100).optional().nullable(),
  role: z.union([z.lazy(() => UserCreateroleInput), z.lazy(() => Role).array()]).optional(),
  enum: z.lazy(() => AnotherEnum).optional(),
}).strict();

export const UserUpdateManyMutationInput: z.ZodType<Prisma.Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  email: z.union([z.string().email({ message: "Invalid email address" }), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  name: z.union([z.string().min(1).max(100), z.lazy(() => NullableStringFieldUpdateOperationsInput)]).optional().nullable(),
  role: z.union([z.lazy(() => UserUpdateroleInput), z.lazy(() => Role).array()]).optional(),
  enum: z.union([z.lazy(() => AnotherEnum), z.lazy(() => EnumAnotherEnumFieldUpdateOperationsInput)]).optional(),
}).strict();

export const UserUncheckedUpdateManyInput: z.ZodType<Prisma.Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  email: z.union([z.string().email({ message: "Invalid email address" }), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  name: z.union([z.string().min(1).max(100), z.lazy(() => NullableStringFieldUpdateOperationsInput)]).optional().nullable(),
  role: z.union([z.lazy(() => UserUpdateroleInput), z.lazy(() => Role).array()]).optional(),
  enum: z.union([z.lazy(() => AnotherEnum), z.lazy(() => EnumAnotherEnumFieldUpdateOperationsInput)]).optional(),
}).strict();

export const PostCreateInput: z.ZodType<Prisma.Prisma.PostCreateInput> = z.object({
  title: z.string(),
  content: z.string().optional().nullable(),
  published: z.boolean().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInput),
  anotherEnum: z.union([z.lazy(() => PostCreateanotherEnumInput), z.lazy(() => AnotherEnum).array()]).optional(),
}).strict();

export const PostUncheckedCreateInput: z.ZodType<Prisma.Prisma.PostUncheckedCreateInput> = z.object({
  id: z.number().optional(),
  title: z.string(),
  content: z.string().optional().nullable(),
  published: z.boolean().optional(),
  authorId: z.string(),
  anotherEnum: z.union([z.lazy(() => PostCreateanotherEnumInput), z.lazy(() => AnotherEnum).array()]).optional(),
}).strict();

export const PostUpdateInput: z.ZodType<Prisma.Prisma.PostUpdateInput> = z.object({
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  content: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInput)]).optional().nullable(),
  published: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInput)]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutPostsNestedInput).optional(),
  anotherEnum: z.union([z.lazy(() => PostUpdateanotherEnumInput), z.lazy(() => AnotherEnum).array()]).optional(),
}).strict();

export const PostUncheckedUpdateInput: z.ZodType<Prisma.Prisma.PostUncheckedUpdateInput> = z.object({
  id: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInput)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  content: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInput)]).optional().nullable(),
  published: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInput)]).optional(),
  authorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  anotherEnum: z.union([z.lazy(() => PostUpdateanotherEnumInput), z.lazy(() => AnotherEnum).array()]).optional(),
}).strict();

export const PostCreateManyInput: z.ZodType<Prisma.Prisma.PostCreateManyInput> = z.object({
  id: z.number().optional(),
  title: z.string(),
  content: z.string().optional().nullable(),
  published: z.boolean().optional(),
  authorId: z.string(),
  anotherEnum: z.union([z.lazy(() => PostCreateanotherEnumInput), z.lazy(() => AnotherEnum).array()]).optional(),
}).strict();

export const PostUpdateManyMutationInput: z.ZodType<Prisma.Prisma.PostUpdateManyMutationInput> = z.object({
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  content: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInput)]).optional().nullable(),
  published: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInput)]).optional(),
  anotherEnum: z.union([z.lazy(() => PostUpdateanotherEnumInput), z.lazy(() => AnotherEnum).array()]).optional(),
}).strict();

export const PostUncheckedUpdateManyInput: z.ZodType<Prisma.Prisma.PostUncheckedUpdateManyInput> = z.object({
  id: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInput)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  content: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInput)]).optional().nullable(),
  published: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInput)]).optional(),
  authorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  anotherEnum: z.union([z.lazy(() => PostUpdateanotherEnumInput), z.lazy(() => AnotherEnum).array()]).optional(),
}).strict();

export const ProfileCreateInput: z.ZodType<Prisma.Prisma.ProfileCreateInput> = z.object({
  bio: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutProfileInput),
  role: z.union([z.lazy(() => ProfileCreateroleInput), z.lazy(() => Role).array()]).optional(),
  second: z.lazy(() => SecondEnum).optional(),
}).strict();

export const ProfileUncheckedCreateInput: z.ZodType<Prisma.Prisma.ProfileUncheckedCreateInput> = z.object({
  id: z.number().optional(),
  bio: z.string(),
  userId: z.string(),
  role: z.union([z.lazy(() => ProfileCreateroleInput), z.lazy(() => Role).array()]).optional(),
  second: z.lazy(() => SecondEnum).optional(),
}).strict();

export const ProfileUpdateInput: z.ZodType<Prisma.Prisma.ProfileUpdateInput> = z.object({
  bio: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutProfileNestedInput).optional(),
  role: z.union([z.lazy(() => ProfileUpdateroleInput), z.lazy(() => Role).array()]).optional(),
  second: z.union([z.lazy(() => SecondEnum), z.lazy(() => EnumSecondEnumFieldUpdateOperationsInput)]).optional(),
}).strict();

export const ProfileUncheckedUpdateInput: z.ZodType<Prisma.Prisma.ProfileUncheckedUpdateInput> = z.object({
  id: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInput)]).optional(),
  bio: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  role: z.union([z.lazy(() => ProfileUpdateroleInput), z.lazy(() => Role).array()]).optional(),
  second: z.union([z.lazy(() => SecondEnum), z.lazy(() => EnumSecondEnumFieldUpdateOperationsInput)]).optional(),
}).strict();

export const ProfileCreateManyInput: z.ZodType<Prisma.Prisma.ProfileCreateManyInput> = z.object({
  id: z.number().optional(),
  bio: z.string(),
  userId: z.string(),
  role: z.union([z.lazy(() => ProfileCreateroleInput), z.lazy(() => Role).array()]).optional(),
  second: z.lazy(() => SecondEnum).optional(),
}).strict();

export const ProfileUpdateManyMutationInput: z.ZodType<Prisma.Prisma.ProfileUpdateManyMutationInput> = z.object({
  bio: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  role: z.union([z.lazy(() => ProfileUpdateroleInput), z.lazy(() => Role).array()]).optional(),
  second: z.union([z.lazy(() => SecondEnum), z.lazy(() => EnumSecondEnumFieldUpdateOperationsInput)]).optional(),
}).strict();

export const ProfileUncheckedUpdateManyInput: z.ZodType<Prisma.Prisma.ProfileUncheckedUpdateManyInput> = z.object({
  id: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInput)]).optional(),
  bio: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  role: z.union([z.lazy(() => ProfileUpdateroleInput), z.lazy(() => Role).array()]).optional(),
  second: z.union([z.lazy(() => SecondEnum), z.lazy(() => EnumSecondEnumFieldUpdateOperationsInput)]).optional(),
}).strict();

export const StringFilter: z.ZodType<Prisma.Prisma.StringFilter> = z.object({
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
}).strict();

export const StringNullableFilter: z.ZodType<Prisma.Prisma.StringNullableFilter> = z.object({
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
  not: z.union([z.string(), z.lazy(() => NestedStringNullableFilter)]).optional().nullable(),
}).strict();

export const EnumMyValueFilter: z.ZodType<Prisma.Prisma.EnumMyValueFilter> = z.object({
  equals: z.lazy(() => MyValue).optional(),
  in: z.lazy(() => MyValue).array().optional(),
  notIn: z.lazy(() => MyValue).array().optional(),
  not: z.union([z.lazy(() => MyValue), z.lazy(() => NestedEnumMyValueFilter)]).optional(),
}).strict();

export const IntFilter: z.ZodType<Prisma.Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntFilter)]).optional(),
}).strict();

export const IntNullableFilter: z.ZodType<Prisma.Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntNullableFilter)]).optional().nullable(),
}).strict();

export const FloatNullableFilter: z.ZodType<Prisma.Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatNullableFilter)]).optional().nullable(),
}).strict();

export const FloatFilter: z.ZodType<Prisma.Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatFilter)]).optional(),
}).strict();

export const DecimalFilter: z.ZodType<Prisma.Prisma.DecimalFilter> = z.object({
  equals: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  in: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional(),
  notIn: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional(),
  lt: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => NestedDecimalFilter)]).optional(),
}).strict();

export const DecimalNullableFilter: z.ZodType<Prisma.Prisma.DecimalNullableFilter> = z.object({
  equals: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional().nullable(),
  in: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional().nullable(),
  notIn: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional().nullable(),
  lt: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => NestedDecimalNullableFilter)]).optional().nullable(),
}).strict();

export const DateTimeFilter: z.ZodType<Prisma.Prisma.DateTimeFilter> = z.object({
  equals: z.date().optional(),
  in: z.date().array().optional(),
  notIn: z.date().array().optional(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeFilter)]).optional(),
}).strict();

export const DateTimeNullableFilter: z.ZodType<Prisma.Prisma.DateTimeNullableFilter> = z.object({
  equals: z.date().optional().nullable(),
  in: z.date().array().optional().nullable(),
  notIn: z.date().array().optional().nullable(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeNullableFilter)]).optional().nullable(),
}).strict();

export const BigIntFilter: z.ZodType<Prisma.Prisma.BigIntFilter> = z.object({
  equals: z.bigint().optional(),
  in: z.bigint().array().optional(),
  notIn: z.bigint().array().optional(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([z.bigint(), z.lazy(() => NestedBigIntFilter)]).optional(),
}).strict();

export const BigIntNullableFilter: z.ZodType<Prisma.Prisma.BigIntNullableFilter> = z.object({
  equals: z.bigint().optional().nullable(),
  in: z.bigint().array().optional().nullable(),
  notIn: z.bigint().array().optional().nullable(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([z.bigint(), z.lazy(() => NestedBigIntNullableFilter)]).optional().nullable(),
}).strict();

export const JsonFilter: z.ZodType<Prisma.Prisma.JsonFilter> = z.object({
  equals: z.union([InputJsonValue, z.lazy(() => JsonNullValueFilter)]).optional(),
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
  not: z.union([InputJsonValue, z.lazy(() => JsonNullValueFilter)]).optional(),
}).strict();

export const JsonNullableFilter: z.ZodType<Prisma.Prisma.JsonNullableFilter> = z.object({
  equals: z.union([InputJsonValue, z.lazy(() => JsonNullValueFilter)]).optional(),
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
  not: z.union([InputJsonValue, z.lazy(() => JsonNullValueFilter)]).optional(),
}).strict();

export const BytesFilter: z.ZodType<Prisma.Prisma.BytesFilter> = z.object({
  equals: z.instanceof(Buffer).optional(),
  in: z.instanceof(Buffer).array().optional(),
  notIn: z.instanceof(Buffer).array().optional(),
  not: z.union([z.instanceof(Buffer), z.lazy(() => NestedBytesFilter)]).optional(),
}).strict();

export const BytesNullableFilter: z.ZodType<Prisma.Prisma.BytesNullableFilter> = z.object({
  equals: z.instanceof(Buffer).optional().nullable(),
  in: z.instanceof(Buffer).array().optional().nullable(),
  notIn: z.instanceof(Buffer).array().optional().nullable(),
  not: z.union([z.instanceof(Buffer), z.lazy(() => NestedBytesNullableFilter)]).optional().nullable(),
}).strict();

export const TestCountOrderByAggregateInput: z.ZodType<Prisma.Prisma.TestCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrder).optional(),
  name: z.lazy(() => SortOrder).optional(),
  value: z.lazy(() => SortOrder).optional(),
  bic: z.lazy(() => SortOrder).optional(),
  intTwo: z.lazy(() => SortOrder).optional(),
  int: z.lazy(() => SortOrder).optional(),
  floatOpt: z.lazy(() => SortOrder).optional(),
  float: z.lazy(() => SortOrder).optional(),
  decimal: z.lazy(() => SortOrder).optional(),
  decimalOpt: z.lazy(() => SortOrder).optional(),
  date: z.lazy(() => SortOrder).optional(),
  dateOpt: z.lazy(() => SortOrder).optional(),
  bigInt: z.lazy(() => SortOrder).optional(),
  bigIntOpt: z.lazy(() => SortOrder).optional(),
  json: z.lazy(() => SortOrder).optional(),
  jsonOpt: z.lazy(() => SortOrder).optional(),
  bytes: z.lazy(() => SortOrder).optional(),
  bytesOpt: z.lazy(() => SortOrder).optional(),
}).strict();

export const TestAvgOrderByAggregateInput: z.ZodType<Prisma.Prisma.TestAvgOrderByAggregateInput> = z.object({
  intTwo: z.lazy(() => SortOrder).optional(),
  int: z.lazy(() => SortOrder).optional(),
  floatOpt: z.lazy(() => SortOrder).optional(),
  float: z.lazy(() => SortOrder).optional(),
  decimal: z.lazy(() => SortOrder).optional(),
  decimalOpt: z.lazy(() => SortOrder).optional(),
  bigInt: z.lazy(() => SortOrder).optional(),
  bigIntOpt: z.lazy(() => SortOrder).optional(),
}).strict();

export const TestMaxOrderByAggregateInput: z.ZodType<Prisma.Prisma.TestMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrder).optional(),
  name: z.lazy(() => SortOrder).optional(),
  value: z.lazy(() => SortOrder).optional(),
  bic: z.lazy(() => SortOrder).optional(),
  intTwo: z.lazy(() => SortOrder).optional(),
  int: z.lazy(() => SortOrder).optional(),
  floatOpt: z.lazy(() => SortOrder).optional(),
  float: z.lazy(() => SortOrder).optional(),
  decimal: z.lazy(() => SortOrder).optional(),
  decimalOpt: z.lazy(() => SortOrder).optional(),
  date: z.lazy(() => SortOrder).optional(),
  dateOpt: z.lazy(() => SortOrder).optional(),
  bigInt: z.lazy(() => SortOrder).optional(),
  bigIntOpt: z.lazy(() => SortOrder).optional(),
  bytes: z.lazy(() => SortOrder).optional(),
  bytesOpt: z.lazy(() => SortOrder).optional(),
}).strict();

export const TestMinOrderByAggregateInput: z.ZodType<Prisma.Prisma.TestMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrder).optional(),
  name: z.lazy(() => SortOrder).optional(),
  value: z.lazy(() => SortOrder).optional(),
  bic: z.lazy(() => SortOrder).optional(),
  intTwo: z.lazy(() => SortOrder).optional(),
  int: z.lazy(() => SortOrder).optional(),
  floatOpt: z.lazy(() => SortOrder).optional(),
  float: z.lazy(() => SortOrder).optional(),
  decimal: z.lazy(() => SortOrder).optional(),
  decimalOpt: z.lazy(() => SortOrder).optional(),
  date: z.lazy(() => SortOrder).optional(),
  dateOpt: z.lazy(() => SortOrder).optional(),
  bigInt: z.lazy(() => SortOrder).optional(),
  bigIntOpt: z.lazy(() => SortOrder).optional(),
  bytes: z.lazy(() => SortOrder).optional(),
  bytesOpt: z.lazy(() => SortOrder).optional(),
}).strict();

export const TestSumOrderByAggregateInput: z.ZodType<Prisma.Prisma.TestSumOrderByAggregateInput> = z.object({
  intTwo: z.lazy(() => SortOrder).optional(),
  int: z.lazy(() => SortOrder).optional(),
  floatOpt: z.lazy(() => SortOrder).optional(),
  float: z.lazy(() => SortOrder).optional(),
  decimal: z.lazy(() => SortOrder).optional(),
  decimalOpt: z.lazy(() => SortOrder).optional(),
  bigInt: z.lazy(() => SortOrder).optional(),
  bigIntOpt: z.lazy(() => SortOrder).optional(),
}).strict();

export const StringWithAggregatesFilter: z.ZodType<Prisma.Prisma.StringWithAggregatesFilter> = z.object({
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
  not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilter)]).optional(),
  _count: z.lazy(() => NestedIntFilter).optional(),
  _min: z.lazy(() => NestedStringFilter).optional(),
  _max: z.lazy(() => NestedStringFilter).optional(),
}).strict();

export const StringNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.StringNullableWithAggregatesFilter> = z.object({
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
  not: z.union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilter)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilter).optional(),
  _min: z.lazy(() => NestedStringNullableFilter).optional(),
  _max: z.lazy(() => NestedStringNullableFilter).optional(),
}).strict();

export const EnumMyValueWithAggregatesFilter: z.ZodType<Prisma.Prisma.EnumMyValueWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MyValue).optional(),
  in: z.lazy(() => MyValue).array().optional(),
  notIn: z.lazy(() => MyValue).array().optional(),
  not: z.union([z.lazy(() => MyValue), z.lazy(() => NestedEnumMyValueWithAggregatesFilter)]).optional(),
  _count: z.lazy(() => NestedIntFilter).optional(),
  _min: z.lazy(() => NestedEnumMyValueFilter).optional(),
  _max: z.lazy(() => NestedEnumMyValueFilter).optional(),
}).strict();

export const IntWithAggregatesFilter: z.ZodType<Prisma.Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntWithAggregatesFilter)]).optional(),
  _count: z.lazy(() => NestedIntFilter).optional(),
  _avg: z.lazy(() => NestedFloatFilter).optional(),
  _sum: z.lazy(() => NestedIntFilter).optional(),
  _min: z.lazy(() => NestedIntFilter).optional(),
  _max: z.lazy(() => NestedIntFilter).optional(),
}).strict();

export const IntNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntNullableWithAggregatesFilter)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilter).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilter).optional(),
  _sum: z.lazy(() => NestedIntNullableFilter).optional(),
  _min: z.lazy(() => NestedIntNullableFilter).optional(),
  _max: z.lazy(() => NestedIntNullableFilter).optional(),
}).strict();

export const FloatNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatNullableWithAggregatesFilter)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilter).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilter).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilter).optional(),
  _min: z.lazy(() => NestedFloatNullableFilter).optional(),
  _max: z.lazy(() => NestedFloatNullableFilter).optional(),
}).strict();

export const FloatWithAggregatesFilter: z.ZodType<Prisma.Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatWithAggregatesFilter)]).optional(),
  _count: z.lazy(() => NestedIntFilter).optional(),
  _avg: z.lazy(() => NestedFloatFilter).optional(),
  _sum: z.lazy(() => NestedFloatFilter).optional(),
  _min: z.lazy(() => NestedFloatFilter).optional(),
  _max: z.lazy(() => NestedFloatFilter).optional(),
}).strict();

export const DecimalWithAggregatesFilter: z.ZodType<Prisma.Prisma.DecimalWithAggregatesFilter> = z.object({
  equals: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  in: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional(),
  notIn: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional(),
  lt: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => NestedDecimalWithAggregatesFilter)]).optional(),
  _count: z.lazy(() => NestedIntFilter).optional(),
  _avg: z.lazy(() => NestedDecimalFilter).optional(),
  _sum: z.lazy(() => NestedDecimalFilter).optional(),
  _min: z.lazy(() => NestedDecimalFilter).optional(),
  _max: z.lazy(() => NestedDecimalFilter).optional(),
}).strict();

export const DecimalNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.DecimalNullableWithAggregatesFilter> = z.object({
  equals: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional().nullable(),
  in: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional().nullable(),
  notIn: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional().nullable(),
  lt: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => NestedDecimalNullableWithAggregatesFilter)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilter).optional(),
  _avg: z.lazy(() => NestedDecimalNullableFilter).optional(),
  _sum: z.lazy(() => NestedDecimalNullableFilter).optional(),
  _min: z.lazy(() => NestedDecimalNullableFilter).optional(),
  _max: z.lazy(() => NestedDecimalNullableFilter).optional(),
}).strict();

export const DateTimeWithAggregatesFilter: z.ZodType<Prisma.Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.date().optional(),
  in: z.date().array().optional(),
  notIn: z.date().array().optional(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeWithAggregatesFilter)]).optional(),
  _count: z.lazy(() => NestedIntFilter).optional(),
  _min: z.lazy(() => NestedDateTimeFilter).optional(),
  _max: z.lazy(() => NestedDateTimeFilter).optional(),
}).strict();

export const DateTimeNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.date().optional().nullable(),
  in: z.date().array().optional().nullable(),
  notIn: z.date().array().optional().nullable(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeNullableWithAggregatesFilter)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilter).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilter).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilter).optional(),
}).strict();

export const BigIntWithAggregatesFilter: z.ZodType<Prisma.Prisma.BigIntWithAggregatesFilter> = z.object({
  equals: z.bigint().optional(),
  in: z.bigint().array().optional(),
  notIn: z.bigint().array().optional(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([z.bigint(), z.lazy(() => NestedBigIntWithAggregatesFilter)]).optional(),
  _count: z.lazy(() => NestedIntFilter).optional(),
  _avg: z.lazy(() => NestedFloatFilter).optional(),
  _sum: z.lazy(() => NestedBigIntFilter).optional(),
  _min: z.lazy(() => NestedBigIntFilter).optional(),
  _max: z.lazy(() => NestedBigIntFilter).optional(),
}).strict();

export const BigIntNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.BigIntNullableWithAggregatesFilter> = z.object({
  equals: z.bigint().optional().nullable(),
  in: z.bigint().array().optional().nullable(),
  notIn: z.bigint().array().optional().nullable(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([z.bigint(), z.lazy(() => NestedBigIntNullableWithAggregatesFilter)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilter).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilter).optional(),
  _sum: z.lazy(() => NestedBigIntNullableFilter).optional(),
  _min: z.lazy(() => NestedBigIntNullableFilter).optional(),
  _max: z.lazy(() => NestedBigIntNullableFilter).optional(),
}).strict();

export const JsonWithAggregatesFilter: z.ZodType<Prisma.Prisma.JsonWithAggregatesFilter> = z.object({
  equals: z.union([InputJsonValue, z.lazy(() => JsonNullValueFilter)]).optional(),
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
  not: z.union([InputJsonValue, z.lazy(() => JsonNullValueFilter)]).optional(),
  _count: z.lazy(() => NestedIntFilter).optional(),
  _min: z.lazy(() => NestedJsonFilter).optional(),
  _max: z.lazy(() => NestedJsonFilter).optional(),
}).strict();

export const JsonNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.JsonNullableWithAggregatesFilter> = z.object({
  equals: z.union([InputJsonValue, z.lazy(() => JsonNullValueFilter)]).optional(),
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
  not: z.union([InputJsonValue, z.lazy(() => JsonNullValueFilter)]).optional(),
  _count: z.lazy(() => NestedIntNullableFilter).optional(),
  _min: z.lazy(() => NestedJsonNullableFilter).optional(),
  _max: z.lazy(() => NestedJsonNullableFilter).optional(),
}).strict();

export const BytesWithAggregatesFilter: z.ZodType<Prisma.Prisma.BytesWithAggregatesFilter> = z.object({
  equals: z.instanceof(Buffer).optional(),
  in: z.instanceof(Buffer).array().optional(),
  notIn: z.instanceof(Buffer).array().optional(),
  not: z.union([z.instanceof(Buffer), z.lazy(() => NestedBytesWithAggregatesFilter)]).optional(),
  _count: z.lazy(() => NestedIntFilter).optional(),
  _min: z.lazy(() => NestedBytesFilter).optional(),
  _max: z.lazy(() => NestedBytesFilter).optional(),
}).strict();

export const BytesNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.BytesNullableWithAggregatesFilter> = z.object({
  equals: z.instanceof(Buffer).optional().nullable(),
  in: z.instanceof(Buffer).array().optional().nullable(),
  notIn: z.instanceof(Buffer).array().optional().nullable(),
  not: z.union([z.instanceof(Buffer), z.lazy(() => NestedBytesNullableWithAggregatesFilter)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilter).optional(),
  _min: z.lazy(() => NestedBytesNullableFilter).optional(),
  _max: z.lazy(() => NestedBytesNullableFilter).optional(),
}).strict();

export const PostListRelationFilter: z.ZodType<Prisma.Prisma.PostListRelationFilter> = z.object({
  every: z.lazy(() => PostWhereInput).optional(),
  some: z.lazy(() => PostWhereInput).optional(),
  none: z.lazy(() => PostWhereInput).optional(),
}).strict();

export const ProfileRelationFilter: z.ZodType<Prisma.Prisma.ProfileRelationFilter> = z.object({
  is: z.lazy(() => ProfileWhereInput).optional().nullable(),
  isNot: z.lazy(() => ProfileWhereInput).optional().nullable(),
}).strict();

export const EnumRoleNullableListFilter: z.ZodType<Prisma.Prisma.EnumRoleNullableListFilter> = z.object({
  equals: z.lazy(() => Role).array().optional().nullable(),
  has: z.lazy(() => Role).optional().nullable(),
  hasEvery: z.lazy(() => Role).array().optional(),
  hasSome: z.lazy(() => Role).array().optional(),
  isEmpty: z.boolean().optional(),
}).strict();

export const EnumAnotherEnumFilter: z.ZodType<Prisma.Prisma.EnumAnotherEnumFilter> = z.object({
  equals: z.lazy(() => AnotherEnum).optional(),
  in: z.lazy(() => AnotherEnum).array().optional(),
  notIn: z.lazy(() => AnotherEnum).array().optional(),
  not: z.union([z.lazy(() => AnotherEnum), z.lazy(() => NestedEnumAnotherEnumFilter)]).optional(),
}).strict();

export const PostOrderByRelationAggregateInput: z.ZodType<Prisma.Prisma.PostOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrder).optional(),
}).strict();

export const UserCountOrderByAggregateInput: z.ZodType<Prisma.Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrder).optional(),
  email: z.lazy(() => SortOrder).optional(),
  name: z.lazy(() => SortOrder).optional(),
  role: z.lazy(() => SortOrder).optional(),
  enum: z.lazy(() => SortOrder).optional(),
}).strict();

export const UserMaxOrderByAggregateInput: z.ZodType<Prisma.Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrder).optional(),
  email: z.lazy(() => SortOrder).optional(),
  name: z.lazy(() => SortOrder).optional(),
  enum: z.lazy(() => SortOrder).optional(),
}).strict();

export const UserMinOrderByAggregateInput: z.ZodType<Prisma.Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrder).optional(),
  email: z.lazy(() => SortOrder).optional(),
  name: z.lazy(() => SortOrder).optional(),
  enum: z.lazy(() => SortOrder).optional(),
}).strict();

export const EnumAnotherEnumWithAggregatesFilter: z.ZodType<Prisma.Prisma.EnumAnotherEnumWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AnotherEnum).optional(),
  in: z.lazy(() => AnotherEnum).array().optional(),
  notIn: z.lazy(() => AnotherEnum).array().optional(),
  not: z.union([z.lazy(() => AnotherEnum), z.lazy(() => NestedEnumAnotherEnumWithAggregatesFilter)]).optional(),
  _count: z.lazy(() => NestedIntFilter).optional(),
  _min: z.lazy(() => NestedEnumAnotherEnumFilter).optional(),
  _max: z.lazy(() => NestedEnumAnotherEnumFilter).optional(),
}).strict();

export const BoolFilter: z.ZodType<Prisma.Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([z.boolean(), z.lazy(() => NestedBoolFilter)]).optional(),
}).strict();

export const UserRelationFilter: z.ZodType<Prisma.Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInput).optional(),
  isNot: z.lazy(() => UserWhereInput).optional(),
}).strict();

export const EnumAnotherEnumNullableListFilter: z.ZodType<Prisma.Prisma.EnumAnotherEnumNullableListFilter> = z.object({
  equals: z.lazy(() => AnotherEnum).array().optional().nullable(),
  has: z.lazy(() => AnotherEnum).optional().nullable(),
  hasEvery: z.lazy(() => AnotherEnum).array().optional(),
  hasSome: z.lazy(() => AnotherEnum).array().optional(),
  isEmpty: z.boolean().optional(),
}).strict();

export const PostCountOrderByAggregateInput: z.ZodType<Prisma.Prisma.PostCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrder).optional(),
  title: z.lazy(() => SortOrder).optional(),
  content: z.lazy(() => SortOrder).optional(),
  published: z.lazy(() => SortOrder).optional(),
  authorId: z.lazy(() => SortOrder).optional(),
  anotherEnum: z.lazy(() => SortOrder).optional(),
}).strict();

export const PostAvgOrderByAggregateInput: z.ZodType<Prisma.Prisma.PostAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrder).optional(),
}).strict();

export const PostMaxOrderByAggregateInput: z.ZodType<Prisma.Prisma.PostMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrder).optional(),
  title: z.lazy(() => SortOrder).optional(),
  content: z.lazy(() => SortOrder).optional(),
  published: z.lazy(() => SortOrder).optional(),
  authorId: z.lazy(() => SortOrder).optional(),
}).strict();

export const PostMinOrderByAggregateInput: z.ZodType<Prisma.Prisma.PostMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrder).optional(),
  title: z.lazy(() => SortOrder).optional(),
  content: z.lazy(() => SortOrder).optional(),
  published: z.lazy(() => SortOrder).optional(),
  authorId: z.lazy(() => SortOrder).optional(),
}).strict();

export const PostSumOrderByAggregateInput: z.ZodType<Prisma.Prisma.PostSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrder).optional(),
}).strict();

export const BoolWithAggregatesFilter: z.ZodType<Prisma.Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilter)]).optional(),
  _count: z.lazy(() => NestedIntFilter).optional(),
  _min: z.lazy(() => NestedBoolFilter).optional(),
  _max: z.lazy(() => NestedBoolFilter).optional(),
}).strict();

export const EnumSecondEnumFilter: z.ZodType<Prisma.Prisma.EnumSecondEnumFilter> = z.object({
  equals: z.lazy(() => SecondEnum).optional(),
  in: z.lazy(() => SecondEnum).array().optional(),
  notIn: z.lazy(() => SecondEnum).array().optional(),
  not: z.union([z.lazy(() => SecondEnum), z.lazy(() => NestedEnumSecondEnumFilter)]).optional(),
}).strict();

export const ProfileCountOrderByAggregateInput: z.ZodType<Prisma.Prisma.ProfileCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrder).optional(),
  bio: z.lazy(() => SortOrder).optional(),
  userId: z.lazy(() => SortOrder).optional(),
  role: z.lazy(() => SortOrder).optional(),
  second: z.lazy(() => SortOrder).optional(),
}).strict();

export const ProfileAvgOrderByAggregateInput: z.ZodType<Prisma.Prisma.ProfileAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrder).optional(),
}).strict();

export const ProfileMaxOrderByAggregateInput: z.ZodType<Prisma.Prisma.ProfileMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrder).optional(),
  bio: z.lazy(() => SortOrder).optional(),
  userId: z.lazy(() => SortOrder).optional(),
  second: z.lazy(() => SortOrder).optional(),
}).strict();

export const ProfileMinOrderByAggregateInput: z.ZodType<Prisma.Prisma.ProfileMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrder).optional(),
  bio: z.lazy(() => SortOrder).optional(),
  userId: z.lazy(() => SortOrder).optional(),
  second: z.lazy(() => SortOrder).optional(),
}).strict();

export const ProfileSumOrderByAggregateInput: z.ZodType<Prisma.Prisma.ProfileSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrder).optional(),
}).strict();

export const EnumSecondEnumWithAggregatesFilter: z.ZodType<Prisma.Prisma.EnumSecondEnumWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SecondEnum).optional(),
  in: z.lazy(() => SecondEnum).array().optional(),
  notIn: z.lazy(() => SecondEnum).array().optional(),
  not: z.union([z.lazy(() => SecondEnum), z.lazy(() => NestedEnumSecondEnumWithAggregatesFilter)]).optional(),
  _count: z.lazy(() => NestedIntFilter).optional(),
  _min: z.lazy(() => NestedEnumSecondEnumFilter).optional(),
  _max: z.lazy(() => NestedEnumSecondEnumFilter).optional(),
}).strict();

export const StringFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable(),
}).strict();

export const EnumMyValueFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.EnumMyValueFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => MyValue).optional(),
}).strict();

export const IntFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
}).strict();

export const NullableFloatFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
}).strict();

export const FloatFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
}).strict();

export const DecimalFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.DecimalFieldUpdateOperationsInput> = z.object({
  set: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  increment: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  decrement: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  multiply: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  divide: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
}).strict();

export const NullableDecimalFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.NullableDecimalFieldUpdateOperationsInput> = z.object({
  set: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional().nullable(),
  increment: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  decrement: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  multiply: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  divide: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
}).strict();

export const DateTimeFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.date().optional(),
}).strict();

export const NullableDateTimeFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.date().optional().nullable(),
}).strict();

export const BigIntFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.BigIntFieldUpdateOperationsInput> = z.object({
  set: z.bigint().optional(),
  increment: z.bigint().optional(),
  decrement: z.bigint().optional(),
  multiply: z.bigint().optional(),
  divide: z.bigint().optional(),
}).strict();

export const NullableBigIntFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.NullableBigIntFieldUpdateOperationsInput> = z.object({
  set: z.bigint().optional().nullable(),
  increment: z.bigint().optional(),
  decrement: z.bigint().optional(),
  multiply: z.bigint().optional(),
  divide: z.bigint().optional(),
}).strict();

export const BytesFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.BytesFieldUpdateOperationsInput> = z.object({
  set: z.instanceof(Buffer).optional(),
}).strict();

export const NullableBytesFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.NullableBytesFieldUpdateOperationsInput> = z.object({
  set: z.instanceof(Buffer).optional().nullable(),
}).strict();

export const PostCreateNestedManyWithoutAuthorInput: z.ZodType<Prisma.Prisma.PostCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([z.lazy(() => PostCreateWithoutAuthorInput), z.lazy(() => PostCreateWithoutAuthorInput).array(), z.lazy(() => PostUncheckedCreateWithoutAuthorInput), z.lazy(() => PostUncheckedCreateWithoutAuthorInput).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PostCreateOrConnectWithoutAuthorInput), z.lazy(() => PostCreateOrConnectWithoutAuthorInput).array()]).optional(),
  createMany: z.lazy(() => PostCreateManyAuthorInputEnvelope).optional(),
  connect: z.union([z.lazy(() => PostWhereUniqueInput), z.lazy(() => PostWhereUniqueInput).array()]).optional(),
}).strict();

export const ProfileCreateNestedOneWithoutUserInput: z.ZodType<Prisma.Prisma.ProfileCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([z.lazy(() => ProfileCreateWithoutUserInput), z.lazy(() => ProfileUncheckedCreateWithoutUserInput)]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutUserInput).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInput).optional(),
}).strict();

export const UserCreateroleInput: z.ZodType<Prisma.Prisma.UserCreateroleInput> = z.object({
  set: z.lazy(() => Role).array(),
}).strict();

export const PostUncheckedCreateNestedManyWithoutAuthorInput: z.ZodType<Prisma.Prisma.PostUncheckedCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([z.lazy(() => PostCreateWithoutAuthorInput), z.lazy(() => PostCreateWithoutAuthorInput).array(), z.lazy(() => PostUncheckedCreateWithoutAuthorInput), z.lazy(() => PostUncheckedCreateWithoutAuthorInput).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PostCreateOrConnectWithoutAuthorInput), z.lazy(() => PostCreateOrConnectWithoutAuthorInput).array()]).optional(),
  createMany: z.lazy(() => PostCreateManyAuthorInputEnvelope).optional(),
  connect: z.union([z.lazy(() => PostWhereUniqueInput), z.lazy(() => PostWhereUniqueInput).array()]).optional(),
}).strict();

export const ProfileUncheckedCreateNestedOneWithoutUserInput: z.ZodType<Prisma.Prisma.ProfileUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([z.lazy(() => ProfileCreateWithoutUserInput), z.lazy(() => ProfileUncheckedCreateWithoutUserInput)]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutUserInput).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInput).optional(),
}).strict();

export const PostUpdateManyWithoutAuthorNestedInput: z.ZodType<Prisma.Prisma.PostUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([z.lazy(() => PostCreateWithoutAuthorInput), z.lazy(() => PostCreateWithoutAuthorInput).array(), z.lazy(() => PostUncheckedCreateWithoutAuthorInput), z.lazy(() => PostUncheckedCreateWithoutAuthorInput).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PostCreateOrConnectWithoutAuthorInput), z.lazy(() => PostCreateOrConnectWithoutAuthorInput).array()]).optional(),
  upsert: z.union([z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInput), z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInput).array()]).optional(),
  createMany: z.lazy(() => PostCreateManyAuthorInputEnvelope).optional(),
  set: z.union([z.lazy(() => PostWhereUniqueInput), z.lazy(() => PostWhereUniqueInput).array()]).optional(),
  disconnect: z.union([z.lazy(() => PostWhereUniqueInput), z.lazy(() => PostWhereUniqueInput).array()]).optional(),
  delete: z.union([z.lazy(() => PostWhereUniqueInput), z.lazy(() => PostWhereUniqueInput).array()]).optional(),
  connect: z.union([z.lazy(() => PostWhereUniqueInput), z.lazy(() => PostWhereUniqueInput).array()]).optional(),
  update: z.union([z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInput), z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInput).array()]).optional(),
  updateMany: z.union([z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInput), z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInput).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PostScalarWhereInput), z.lazy(() => PostScalarWhereInput).array()]).optional(),
}).strict();

export const ProfileUpdateOneWithoutUserNestedInput: z.ZodType<Prisma.Prisma.ProfileUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([z.lazy(() => ProfileCreateWithoutUserInput), z.lazy(() => ProfileUncheckedCreateWithoutUserInput)]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutUserInput).optional(),
  upsert: z.lazy(() => ProfileUpsertWithoutUserInput).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => ProfileWhereUniqueInput).optional(),
  update: z.union([z.lazy(() => ProfileUpdateWithoutUserInput), z.lazy(() => ProfileUncheckedUpdateWithoutUserInput)]).optional(),
}).strict();

export const UserUpdateroleInput: z.ZodType<Prisma.Prisma.UserUpdateroleInput> = z.object({
  set: z.lazy(() => Role).array().optional(),
  push: z.union([z.lazy(() => Role), z.lazy(() => Role).array()]).optional(),
}).strict();

export const EnumAnotherEnumFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.EnumAnotherEnumFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => AnotherEnum).optional(),
}).strict();

export const PostUncheckedUpdateManyWithoutAuthorNestedInput: z.ZodType<Prisma.Prisma.PostUncheckedUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([z.lazy(() => PostCreateWithoutAuthorInput), z.lazy(() => PostCreateWithoutAuthorInput).array(), z.lazy(() => PostUncheckedCreateWithoutAuthorInput), z.lazy(() => PostUncheckedCreateWithoutAuthorInput).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PostCreateOrConnectWithoutAuthorInput), z.lazy(() => PostCreateOrConnectWithoutAuthorInput).array()]).optional(),
  upsert: z.union([z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInput), z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInput).array()]).optional(),
  createMany: z.lazy(() => PostCreateManyAuthorInputEnvelope).optional(),
  set: z.union([z.lazy(() => PostWhereUniqueInput), z.lazy(() => PostWhereUniqueInput).array()]).optional(),
  disconnect: z.union([z.lazy(() => PostWhereUniqueInput), z.lazy(() => PostWhereUniqueInput).array()]).optional(),
  delete: z.union([z.lazy(() => PostWhereUniqueInput), z.lazy(() => PostWhereUniqueInput).array()]).optional(),
  connect: z.union([z.lazy(() => PostWhereUniqueInput), z.lazy(() => PostWhereUniqueInput).array()]).optional(),
  update: z.union([z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInput), z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInput).array()]).optional(),
  updateMany: z.union([z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInput), z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInput).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PostScalarWhereInput), z.lazy(() => PostScalarWhereInput).array()]).optional(),
}).strict();

export const ProfileUncheckedUpdateOneWithoutUserNestedInput: z.ZodType<Prisma.Prisma.ProfileUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([z.lazy(() => ProfileCreateWithoutUserInput), z.lazy(() => ProfileUncheckedCreateWithoutUserInput)]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutUserInput).optional(),
  upsert: z.lazy(() => ProfileUpsertWithoutUserInput).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => ProfileWhereUniqueInput).optional(),
  update: z.union([z.lazy(() => ProfileUpdateWithoutUserInput), z.lazy(() => ProfileUncheckedUpdateWithoutUserInput)]).optional(),
}).strict();

export const UserCreateNestedOneWithoutPostsInput: z.ZodType<Prisma.Prisma.UserCreateNestedOneWithoutPostsInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutPostsInput), z.lazy(() => UserUncheckedCreateWithoutPostsInput)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPostsInput).optional(),
  connect: z.lazy(() => UserWhereUniqueInput).optional(),
}).strict();

export const PostCreateanotherEnumInput: z.ZodType<Prisma.Prisma.PostCreateanotherEnumInput> = z.object({
  set: z.lazy(() => AnotherEnum).array(),
}).strict();

export const BoolFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional(),
}).strict();

export const UserUpdateOneRequiredWithoutPostsNestedInput: z.ZodType<Prisma.Prisma.UserUpdateOneRequiredWithoutPostsNestedInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutPostsInput), z.lazy(() => UserUncheckedCreateWithoutPostsInput)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPostsInput).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPostsInput).optional(),
  connect: z.lazy(() => UserWhereUniqueInput).optional(),
  update: z.union([z.lazy(() => UserUpdateWithoutPostsInput), z.lazy(() => UserUncheckedUpdateWithoutPostsInput)]).optional(),
}).strict();

export const PostUpdateanotherEnumInput: z.ZodType<Prisma.Prisma.PostUpdateanotherEnumInput> = z.object({
  set: z.lazy(() => AnotherEnum).array().optional(),
  push: z.union([z.lazy(() => AnotherEnum), z.lazy(() => AnotherEnum).array()]).optional(),
}).strict();

export const UserCreateNestedOneWithoutProfileInput: z.ZodType<Prisma.Prisma.UserCreateNestedOneWithoutProfileInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutProfileInput), z.lazy(() => UserUncheckedCreateWithoutProfileInput)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProfileInput).optional(),
  connect: z.lazy(() => UserWhereUniqueInput).optional(),
}).strict();

export const ProfileCreateroleInput: z.ZodType<Prisma.Prisma.ProfileCreateroleInput> = z.object({
  set: z.lazy(() => Role).array(),
}).strict();

export const UserUpdateOneRequiredWithoutProfileNestedInput: z.ZodType<Prisma.Prisma.UserUpdateOneRequiredWithoutProfileNestedInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutProfileInput), z.lazy(() => UserUncheckedCreateWithoutProfileInput)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProfileInput).optional(),
  upsert: z.lazy(() => UserUpsertWithoutProfileInput).optional(),
  connect: z.lazy(() => UserWhereUniqueInput).optional(),
  update: z.union([z.lazy(() => UserUpdateWithoutProfileInput), z.lazy(() => UserUncheckedUpdateWithoutProfileInput)]).optional(),
}).strict();

export const ProfileUpdateroleInput: z.ZodType<Prisma.Prisma.ProfileUpdateroleInput> = z.object({
  set: z.lazy(() => Role).array().optional(),
  push: z.union([z.lazy(() => Role), z.lazy(() => Role).array()]).optional(),
}).strict();

export const EnumSecondEnumFieldUpdateOperationsInput: z.ZodType<Prisma.Prisma.EnumSecondEnumFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => SecondEnum).optional(),
}).strict();

export const NestedStringFilter: z.ZodType<Prisma.Prisma.NestedStringFilter> = z.object({
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
}).strict();

export const NestedStringNullableFilter: z.ZodType<Prisma.Prisma.NestedStringNullableFilter> = z.object({
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
  not: z.union([z.string(), z.lazy(() => NestedStringNullableFilter)]).optional().nullable(),
}).strict();

export const NestedEnumMyValueFilter: z.ZodType<Prisma.Prisma.NestedEnumMyValueFilter> = z.object({
  equals: z.lazy(() => MyValue).optional(),
  in: z.lazy(() => MyValue).array().optional(),
  notIn: z.lazy(() => MyValue).array().optional(),
  not: z.union([z.lazy(() => MyValue), z.lazy(() => NestedEnumMyValueFilter)]).optional(),
}).strict();

export const NestedIntFilter: z.ZodType<Prisma.Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntFilter)]).optional(),
}).strict();

export const NestedIntNullableFilter: z.ZodType<Prisma.Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntNullableFilter)]).optional().nullable(),
}).strict();

export const NestedFloatNullableFilter: z.ZodType<Prisma.Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatNullableFilter)]).optional().nullable(),
}).strict();

export const NestedFloatFilter: z.ZodType<Prisma.Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatFilter)]).optional(),
}).strict();

export const NestedDecimalFilter: z.ZodType<Prisma.Prisma.NestedDecimalFilter> = z.object({
  equals: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  in: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional(),
  notIn: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional(),
  lt: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => NestedDecimalFilter)]).optional(),
}).strict();

export const NestedDecimalNullableFilter: z.ZodType<Prisma.Prisma.NestedDecimalNullableFilter> = z.object({
  equals: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional().nullable(),
  in: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional().nullable(),
  notIn: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional().nullable(),
  lt: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => NestedDecimalNullableFilter)]).optional().nullable(),
}).strict();

export const NestedDateTimeFilter: z.ZodType<Prisma.Prisma.NestedDateTimeFilter> = z.object({
  equals: z.date().optional(),
  in: z.date().array().optional(),
  notIn: z.date().array().optional(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeFilter)]).optional(),
}).strict();

export const NestedDateTimeNullableFilter: z.ZodType<Prisma.Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.date().optional().nullable(),
  in: z.date().array().optional().nullable(),
  notIn: z.date().array().optional().nullable(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeNullableFilter)]).optional().nullable(),
}).strict();

export const NestedBigIntFilter: z.ZodType<Prisma.Prisma.NestedBigIntFilter> = z.object({
  equals: z.bigint().optional(),
  in: z.bigint().array().optional(),
  notIn: z.bigint().array().optional(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([z.bigint(), z.lazy(() => NestedBigIntFilter)]).optional(),
}).strict();

export const NestedBigIntNullableFilter: z.ZodType<Prisma.Prisma.NestedBigIntNullableFilter> = z.object({
  equals: z.bigint().optional().nullable(),
  in: z.bigint().array().optional().nullable(),
  notIn: z.bigint().array().optional().nullable(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([z.bigint(), z.lazy(() => NestedBigIntNullableFilter)]).optional().nullable(),
}).strict();

export const NestedBytesFilter: z.ZodType<Prisma.Prisma.NestedBytesFilter> = z.object({
  equals: z.instanceof(Buffer).optional(),
  in: z.instanceof(Buffer).array().optional(),
  notIn: z.instanceof(Buffer).array().optional(),
  not: z.union([z.instanceof(Buffer), z.lazy(() => NestedBytesFilter)]).optional(),
}).strict();

export const NestedBytesNullableFilter: z.ZodType<Prisma.Prisma.NestedBytesNullableFilter> = z.object({
  equals: z.instanceof(Buffer).optional().nullable(),
  in: z.instanceof(Buffer).array().optional().nullable(),
  notIn: z.instanceof(Buffer).array().optional().nullable(),
  not: z.union([z.instanceof(Buffer), z.lazy(() => NestedBytesNullableFilter)]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedStringWithAggregatesFilter> = z.object({
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
  not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilter)]).optional(),
  _count: z.lazy(() => NestedIntFilter).optional(),
  _min: z.lazy(() => NestedStringFilter).optional(),
  _max: z.lazy(() => NestedStringFilter).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
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
  not: z.union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilter)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilter).optional(),
  _min: z.lazy(() => NestedStringNullableFilter).optional(),
  _max: z.lazy(() => NestedStringNullableFilter).optional(),
}).strict();

export const NestedEnumMyValueWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedEnumMyValueWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MyValue).optional(),
  in: z.lazy(() => MyValue).array().optional(),
  notIn: z.lazy(() => MyValue).array().optional(),
  not: z.union([z.lazy(() => MyValue), z.lazy(() => NestedEnumMyValueWithAggregatesFilter)]).optional(),
  _count: z.lazy(() => NestedIntFilter).optional(),
  _min: z.lazy(() => NestedEnumMyValueFilter).optional(),
  _max: z.lazy(() => NestedEnumMyValueFilter).optional(),
}).strict();

export const NestedIntWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntWithAggregatesFilter)]).optional(),
  _count: z.lazy(() => NestedIntFilter).optional(),
  _avg: z.lazy(() => NestedFloatFilter).optional(),
  _sum: z.lazy(() => NestedIntFilter).optional(),
  _min: z.lazy(() => NestedIntFilter).optional(),
  _max: z.lazy(() => NestedIntFilter).optional(),
}).strict();

export const NestedIntNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntNullableWithAggregatesFilter)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilter).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilter).optional(),
  _sum: z.lazy(() => NestedIntNullableFilter).optional(),
  _min: z.lazy(() => NestedIntNullableFilter).optional(),
  _max: z.lazy(() => NestedIntNullableFilter).optional(),
}).strict();

export const NestedFloatNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatNullableWithAggregatesFilter)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilter).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilter).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilter).optional(),
  _min: z.lazy(() => NestedFloatNullableFilter).optional(),
  _max: z.lazy(() => NestedFloatNullableFilter).optional(),
}).strict();

export const NestedFloatWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatWithAggregatesFilter)]).optional(),
  _count: z.lazy(() => NestedIntFilter).optional(),
  _avg: z.lazy(() => NestedFloatFilter).optional(),
  _sum: z.lazy(() => NestedFloatFilter).optional(),
  _min: z.lazy(() => NestedFloatFilter).optional(),
  _max: z.lazy(() => NestedFloatFilter).optional(),
}).strict();

export const NestedDecimalWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedDecimalWithAggregatesFilter> = z.object({
  equals: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  in: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional(),
  notIn: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional(),
  lt: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => NestedDecimalWithAggregatesFilter)]).optional(),
  _count: z.lazy(() => NestedIntFilter).optional(),
  _avg: z.lazy(() => NestedDecimalFilter).optional(),
  _sum: z.lazy(() => NestedDecimalFilter).optional(),
  _min: z.lazy(() => NestedDecimalFilter).optional(),
  _max: z.lazy(() => NestedDecimalFilter).optional(),
}).strict();

export const NestedDecimalNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedDecimalNullableWithAggregatesFilter> = z.object({
  equals: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional().nullable(),
  in: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional().nullable(),
  notIn: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).array().optional().nullable(),
  lt: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => NestedDecimalNullableWithAggregatesFilter)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilter).optional(),
  _avg: z.lazy(() => NestedDecimalNullableFilter).optional(),
  _sum: z.lazy(() => NestedDecimalNullableFilter).optional(),
  _min: z.lazy(() => NestedDecimalNullableFilter).optional(),
  _max: z.lazy(() => NestedDecimalNullableFilter).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.date().optional(),
  in: z.date().array().optional(),
  notIn: z.date().array().optional(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeWithAggregatesFilter)]).optional(),
  _count: z.lazy(() => NestedIntFilter).optional(),
  _min: z.lazy(() => NestedDateTimeFilter).optional(),
  _max: z.lazy(() => NestedDateTimeFilter).optional(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.date().optional().nullable(),
  in: z.date().array().optional().nullable(),
  notIn: z.date().array().optional().nullable(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeNullableWithAggregatesFilter)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilter).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilter).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilter).optional(),
}).strict();

export const NestedBigIntWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedBigIntWithAggregatesFilter> = z.object({
  equals: z.bigint().optional(),
  in: z.bigint().array().optional(),
  notIn: z.bigint().array().optional(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([z.bigint(), z.lazy(() => NestedBigIntWithAggregatesFilter)]).optional(),
  _count: z.lazy(() => NestedIntFilter).optional(),
  _avg: z.lazy(() => NestedFloatFilter).optional(),
  _sum: z.lazy(() => NestedBigIntFilter).optional(),
  _min: z.lazy(() => NestedBigIntFilter).optional(),
  _max: z.lazy(() => NestedBigIntFilter).optional(),
}).strict();

export const NestedBigIntNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedBigIntNullableWithAggregatesFilter> = z.object({
  equals: z.bigint().optional().nullable(),
  in: z.bigint().array().optional().nullable(),
  notIn: z.bigint().array().optional().nullable(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([z.bigint(), z.lazy(() => NestedBigIntNullableWithAggregatesFilter)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilter).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilter).optional(),
  _sum: z.lazy(() => NestedBigIntNullableFilter).optional(),
  _min: z.lazy(() => NestedBigIntNullableFilter).optional(),
  _max: z.lazy(() => NestedBigIntNullableFilter).optional(),
}).strict();

export const NestedJsonFilter: z.ZodType<Prisma.Prisma.NestedJsonFilter> = z.object({
  equals: z.union([InputJsonValue, z.lazy(() => JsonNullValueFilter)]).optional(),
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
  not: z.union([InputJsonValue, z.lazy(() => JsonNullValueFilter)]).optional(),
}).strict();

export const NestedJsonNullableFilter: z.ZodType<Prisma.Prisma.NestedJsonNullableFilter> = z.object({
  equals: z.union([InputJsonValue, z.lazy(() => JsonNullValueFilter)]).optional(),
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
  not: z.union([InputJsonValue, z.lazy(() => JsonNullValueFilter)]).optional(),
}).strict();

export const NestedBytesWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedBytesWithAggregatesFilter> = z.object({
  equals: z.instanceof(Buffer).optional(),
  in: z.instanceof(Buffer).array().optional(),
  notIn: z.instanceof(Buffer).array().optional(),
  not: z.union([z.instanceof(Buffer), z.lazy(() => NestedBytesWithAggregatesFilter)]).optional(),
  _count: z.lazy(() => NestedIntFilter).optional(),
  _min: z.lazy(() => NestedBytesFilter).optional(),
  _max: z.lazy(() => NestedBytesFilter).optional(),
}).strict();

export const NestedBytesNullableWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedBytesNullableWithAggregatesFilter> = z.object({
  equals: z.instanceof(Buffer).optional().nullable(),
  in: z.instanceof(Buffer).array().optional().nullable(),
  notIn: z.instanceof(Buffer).array().optional().nullable(),
  not: z.union([z.instanceof(Buffer), z.lazy(() => NestedBytesNullableWithAggregatesFilter)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilter).optional(),
  _min: z.lazy(() => NestedBytesNullableFilter).optional(),
  _max: z.lazy(() => NestedBytesNullableFilter).optional(),
}).strict();

export const NestedEnumAnotherEnumFilter: z.ZodType<Prisma.Prisma.NestedEnumAnotherEnumFilter> = z.object({
  equals: z.lazy(() => AnotherEnum).optional(),
  in: z.lazy(() => AnotherEnum).array().optional(),
  notIn: z.lazy(() => AnotherEnum).array().optional(),
  not: z.union([z.lazy(() => AnotherEnum), z.lazy(() => NestedEnumAnotherEnumFilter)]).optional(),
}).strict();

export const NestedEnumAnotherEnumWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedEnumAnotherEnumWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AnotherEnum).optional(),
  in: z.lazy(() => AnotherEnum).array().optional(),
  notIn: z.lazy(() => AnotherEnum).array().optional(),
  not: z.union([z.lazy(() => AnotherEnum), z.lazy(() => NestedEnumAnotherEnumWithAggregatesFilter)]).optional(),
  _count: z.lazy(() => NestedIntFilter).optional(),
  _min: z.lazy(() => NestedEnumAnotherEnumFilter).optional(),
  _max: z.lazy(() => NestedEnumAnotherEnumFilter).optional(),
}).strict();

export const NestedBoolFilter: z.ZodType<Prisma.Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([z.boolean(), z.lazy(() => NestedBoolFilter)]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilter)]).optional(),
  _count: z.lazy(() => NestedIntFilter).optional(),
  _min: z.lazy(() => NestedBoolFilter).optional(),
  _max: z.lazy(() => NestedBoolFilter).optional(),
}).strict();

export const NestedEnumSecondEnumFilter: z.ZodType<Prisma.Prisma.NestedEnumSecondEnumFilter> = z.object({
  equals: z.lazy(() => SecondEnum).optional(),
  in: z.lazy(() => SecondEnum).array().optional(),
  notIn: z.lazy(() => SecondEnum).array().optional(),
  not: z.union([z.lazy(() => SecondEnum), z.lazy(() => NestedEnumSecondEnumFilter)]).optional(),
}).strict();

export const NestedEnumSecondEnumWithAggregatesFilter: z.ZodType<Prisma.Prisma.NestedEnumSecondEnumWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SecondEnum).optional(),
  in: z.lazy(() => SecondEnum).array().optional(),
  notIn: z.lazy(() => SecondEnum).array().optional(),
  not: z.union([z.lazy(() => SecondEnum), z.lazy(() => NestedEnumSecondEnumWithAggregatesFilter)]).optional(),
  _count: z.lazy(() => NestedIntFilter).optional(),
  _min: z.lazy(() => NestedEnumSecondEnumFilter).optional(),
  _max: z.lazy(() => NestedEnumSecondEnumFilter).optional(),
}).strict();

export const PostCreateWithoutAuthorInput: z.ZodType<Prisma.Prisma.PostCreateWithoutAuthorInput> = z.object({
  title: z.string(),
  content: z.string().optional().nullable(),
  published: z.boolean().optional(),
  anotherEnum: z.union([z.lazy(() => PostCreateanotherEnumInput), z.lazy(() => AnotherEnum).array()]).optional(),
}).strict();

export const PostUncheckedCreateWithoutAuthorInput: z.ZodType<Prisma.Prisma.PostUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.number().optional(),
  title: z.string(),
  content: z.string().optional().nullable(),
  published: z.boolean().optional(),
  anotherEnum: z.union([z.lazy(() => PostCreateanotherEnumInput), z.lazy(() => AnotherEnum).array()]).optional(),
}).strict();

export const PostCreateOrConnectWithoutAuthorInput: z.ZodType<Prisma.Prisma.PostCreateOrConnectWithoutAuthorInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInput),
  create: z.union([z.lazy(() => PostCreateWithoutAuthorInput), z.lazy(() => PostUncheckedCreateWithoutAuthorInput)]),
}).strict();

export const PostCreateManyAuthorInputEnvelope: z.ZodType<Prisma.Prisma.PostCreateManyAuthorInputEnvelope> = z.object({
  data: z.lazy(() => PostCreateManyAuthorInput).array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ProfileCreateWithoutUserInput: z.ZodType<Prisma.Prisma.ProfileCreateWithoutUserInput> = z.object({
  bio: z.string(),
  role: z.union([z.lazy(() => ProfileCreateroleInput), z.lazy(() => Role).array()]).optional(),
  second: z.lazy(() => SecondEnum).optional(),
}).strict();

export const ProfileUncheckedCreateWithoutUserInput: z.ZodType<Prisma.Prisma.ProfileUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().optional(),
  bio: z.string(),
  role: z.union([z.lazy(() => ProfileCreateroleInput), z.lazy(() => Role).array()]).optional(),
  second: z.lazy(() => SecondEnum).optional(),
}).strict();

export const ProfileCreateOrConnectWithoutUserInput: z.ZodType<Prisma.Prisma.ProfileCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ProfileWhereUniqueInput),
  create: z.union([z.lazy(() => ProfileCreateWithoutUserInput), z.lazy(() => ProfileUncheckedCreateWithoutUserInput)]),
}).strict();

export const PostUpsertWithWhereUniqueWithoutAuthorInput: z.ZodType<Prisma.Prisma.PostUpsertWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInput),
  update: z.union([z.lazy(() => PostUpdateWithoutAuthorInput), z.lazy(() => PostUncheckedUpdateWithoutAuthorInput)]),
  create: z.union([z.lazy(() => PostCreateWithoutAuthorInput), z.lazy(() => PostUncheckedCreateWithoutAuthorInput)]),
}).strict();

export const PostUpdateWithWhereUniqueWithoutAuthorInput: z.ZodType<Prisma.Prisma.PostUpdateWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInput),
  data: z.union([z.lazy(() => PostUpdateWithoutAuthorInput), z.lazy(() => PostUncheckedUpdateWithoutAuthorInput)]),
}).strict();

export const PostUpdateManyWithWhereWithoutAuthorInput: z.ZodType<Prisma.Prisma.PostUpdateManyWithWhereWithoutAuthorInput> = z.object({
  where: z.lazy(() => PostScalarWhereInput),
  data: z.union([z.lazy(() => PostUpdateManyMutationInput), z.lazy(() => PostUncheckedUpdateManyWithoutPostsInput)]),
}).strict();

export const PostScalarWhereInput: z.ZodType<Prisma.Prisma.PostScalarWhereInput> = z.object({
  AND: z.union([z.lazy(() => PostScalarWhereInput), z.lazy(() => PostScalarWhereInput).array()]).optional(),
  OR: z.lazy(() => PostScalarWhereInput).array().optional(),
  NOT: z.union([z.lazy(() => PostScalarWhereInput), z.lazy(() => PostScalarWhereInput).array()]).optional(),
  id: z.union([z.lazy(() => IntFilter), z.number()]).optional(),
  title: z.union([z.lazy(() => StringFilter), z.string()]).optional(),
  content: z.union([z.lazy(() => StringNullableFilter), z.string()]).optional().nullable(),
  published: z.union([z.lazy(() => BoolFilter), z.boolean()]).optional(),
  authorId: z.union([z.lazy(() => StringFilter), z.string()]).optional(),
  anotherEnum: z.lazy(() => EnumAnotherEnumNullableListFilter).optional(),
}).strict();

export const ProfileUpsertWithoutUserInput: z.ZodType<Prisma.Prisma.ProfileUpsertWithoutUserInput> = z.object({
  update: z.union([z.lazy(() => ProfileUpdateWithoutUserInput), z.lazy(() => ProfileUncheckedUpdateWithoutUserInput)]),
  create: z.union([z.lazy(() => ProfileCreateWithoutUserInput), z.lazy(() => ProfileUncheckedCreateWithoutUserInput)]),
}).strict();

export const ProfileUpdateWithoutUserInput: z.ZodType<Prisma.Prisma.ProfileUpdateWithoutUserInput> = z.object({
  bio: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  role: z.union([z.lazy(() => ProfileUpdateroleInput), z.lazy(() => Role).array()]).optional(),
  second: z.union([z.lazy(() => SecondEnum), z.lazy(() => EnumSecondEnumFieldUpdateOperationsInput)]).optional(),
}).strict();

export const ProfileUncheckedUpdateWithoutUserInput: z.ZodType<Prisma.Prisma.ProfileUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInput)]).optional(),
  bio: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  role: z.union([z.lazy(() => ProfileUpdateroleInput), z.lazy(() => Role).array()]).optional(),
  second: z.union([z.lazy(() => SecondEnum), z.lazy(() => EnumSecondEnumFieldUpdateOperationsInput)]).optional(),
}).strict();

export const UserCreateWithoutPostsInput: z.ZodType<Prisma.Prisma.UserCreateWithoutPostsInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutUserInput).optional(),
  role: z.union([z.lazy(() => UserCreateroleInput), z.lazy(() => Role).array()]).optional(),
  enum: z.lazy(() => AnotherEnum).optional(),
}).strict();

export const UserUncheckedCreateWithoutPostsInput: z.ZodType<Prisma.Prisma.UserUncheckedCreateWithoutPostsInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  profile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutUserInput).optional(),
  role: z.union([z.lazy(() => UserCreateroleInput), z.lazy(() => Role).array()]).optional(),
  enum: z.lazy(() => AnotherEnum).optional(),
}).strict();

export const UserCreateOrConnectWithoutPostsInput: z.ZodType<Prisma.Prisma.UserCreateOrConnectWithoutPostsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInput),
  create: z.union([z.lazy(() => UserCreateWithoutPostsInput), z.lazy(() => UserUncheckedCreateWithoutPostsInput)]),
}).strict();

export const UserUpsertWithoutPostsInput: z.ZodType<Prisma.Prisma.UserUpsertWithoutPostsInput> = z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutPostsInput), z.lazy(() => UserUncheckedUpdateWithoutPostsInput)]),
  create: z.union([z.lazy(() => UserCreateWithoutPostsInput), z.lazy(() => UserUncheckedCreateWithoutPostsInput)]),
}).strict();

export const UserUpdateWithoutPostsInput: z.ZodType<Prisma.Prisma.UserUpdateWithoutPostsInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInput)]).optional().nullable(),
  profile: z.lazy(() => ProfileUpdateOneWithoutUserNestedInput).optional(),
  role: z.union([z.lazy(() => UserUpdateroleInput), z.lazy(() => Role).array()]).optional(),
  enum: z.union([z.lazy(() => AnotherEnum), z.lazy(() => EnumAnotherEnumFieldUpdateOperationsInput)]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutPostsInput: z.ZodType<Prisma.Prisma.UserUncheckedUpdateWithoutPostsInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInput)]).optional().nullable(),
  profile: z.lazy(() => ProfileUncheckedUpdateOneWithoutUserNestedInput).optional(),
  role: z.union([z.lazy(() => UserUpdateroleInput), z.lazy(() => Role).array()]).optional(),
  enum: z.union([z.lazy(() => AnotherEnum), z.lazy(() => EnumAnotherEnumFieldUpdateOperationsInput)]).optional(),
}).strict();

export const UserCreateWithoutProfileInput: z.ZodType<Prisma.Prisma.UserCreateWithoutProfileInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInput).optional(),
  role: z.union([z.lazy(() => UserCreateroleInput), z.lazy(() => Role).array()]).optional(),
  enum: z.lazy(() => AnotherEnum).optional(),
}).strict();

export const UserUncheckedCreateWithoutProfileInput: z.ZodType<Prisma.Prisma.UserUncheckedCreateWithoutProfileInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInput).optional(),
  role: z.union([z.lazy(() => UserCreateroleInput), z.lazy(() => Role).array()]).optional(),
  enum: z.lazy(() => AnotherEnum).optional(),
}).strict();

export const UserCreateOrConnectWithoutProfileInput: z.ZodType<Prisma.Prisma.UserCreateOrConnectWithoutProfileInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInput),
  create: z.union([z.lazy(() => UserCreateWithoutProfileInput), z.lazy(() => UserUncheckedCreateWithoutProfileInput)]),
}).strict();

export const UserUpsertWithoutProfileInput: z.ZodType<Prisma.Prisma.UserUpsertWithoutProfileInput> = z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutProfileInput), z.lazy(() => UserUncheckedUpdateWithoutProfileInput)]),
  create: z.union([z.lazy(() => UserCreateWithoutProfileInput), z.lazy(() => UserUncheckedCreateWithoutProfileInput)]),
}).strict();

export const UserUpdateWithoutProfileInput: z.ZodType<Prisma.Prisma.UserUpdateWithoutProfileInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInput)]).optional().nullable(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInput).optional(),
  role: z.union([z.lazy(() => UserUpdateroleInput), z.lazy(() => Role).array()]).optional(),
  enum: z.union([z.lazy(() => AnotherEnum), z.lazy(() => EnumAnotherEnumFieldUpdateOperationsInput)]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutProfileInput: z.ZodType<Prisma.Prisma.UserUncheckedUpdateWithoutProfileInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInput)]).optional().nullable(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInput).optional(),
  role: z.union([z.lazy(() => UserUpdateroleInput), z.lazy(() => Role).array()]).optional(),
  enum: z.union([z.lazy(() => AnotherEnum), z.lazy(() => EnumAnotherEnumFieldUpdateOperationsInput)]).optional(),
}).strict();

export const PostCreateManyAuthorInput: z.ZodType<Prisma.Prisma.PostCreateManyAuthorInput> = z.object({
  id: z.number().optional(),
  title: z.string(),
  content: z.string().optional().nullable(),
  published: z.boolean().optional(),
  anotherEnum: z.union([z.lazy(() => PostCreateanotherEnumInput), z.lazy(() => AnotherEnum).array()]).optional(),
}).strict();

export const PostUpdateWithoutAuthorInput: z.ZodType<Prisma.Prisma.PostUpdateWithoutAuthorInput> = z.object({
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  content: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInput)]).optional().nullable(),
  published: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInput)]).optional(),
  anotherEnum: z.union([z.lazy(() => PostUpdateanotherEnumInput), z.lazy(() => AnotherEnum).array()]).optional(),
}).strict();

export const PostUncheckedUpdateWithoutAuthorInput: z.ZodType<Prisma.Prisma.PostUncheckedUpdateWithoutAuthorInput> = z.object({
  id: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInput)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  content: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInput)]).optional().nullable(),
  published: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInput)]).optional(),
  anotherEnum: z.union([z.lazy(() => PostUpdateanotherEnumInput), z.lazy(() => AnotherEnum).array()]).optional(),
}).strict();

export const PostUncheckedUpdateManyWithoutPostsInput: z.ZodType<Prisma.Prisma.PostUncheckedUpdateManyWithoutPostsInput> = z.object({
  id: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInput)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInput)]).optional(),
  content: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInput)]).optional().nullable(),
  published: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInput)]).optional(),
  anotherEnum: z.union([z.lazy(() => PostUpdateanotherEnumInput), z.lazy(() => AnotherEnum).array()]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const TestFindFirstArgs: z.ZodType<Prisma.Prisma.TestFindFirstArgs> = z.object({
  select: z.lazy(() => TestSelect).optional(),
  where: TestWhereInput.optional(),
  orderBy: z.union([TestOrderByWithRelationInput.array(), TestOrderByWithRelationInput]).optional(),
  cursor: TestWhereUniqueInput.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TestScalarFieldEnum.array().optional(),
}).strict();

export const TestFindManyArgs: z.ZodType<Prisma.Prisma.TestFindManyArgs> = z.object({
  select: z.lazy(() => TestSelect).optional(),
  where: TestWhereInput.optional(),
  orderBy: z.union([TestOrderByWithRelationInput.array(), TestOrderByWithRelationInput]).optional(),
  cursor: TestWhereUniqueInput.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TestScalarFieldEnum.array().optional(),
}).strict();

export const TestAggregateArgs: z.ZodType<Prisma.Prisma.TestAggregateArgs> = z.object({
  select: z.lazy(() => TestSelect).optional(),
  where: TestWhereInput.optional(),
  orderBy: z.union([TestOrderByWithRelationInput.array(), TestOrderByWithRelationInput]).optional(),
  cursor: TestWhereUniqueInput.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const TestGroupByArgs: z.ZodType<Prisma.Prisma.TestGroupByArgs> = z.object({
  select: z.lazy(() => TestSelect).optional(),
  where: TestWhereInput.optional(),
  orderBy: z.union([TestOrderByWithAggregationInput.array(), TestOrderByWithAggregationInput]).optional(),
  by: TestScalarFieldEnum.array(),
  having: TestScalarWhereWithAggregatesInput.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const TestFindUniqueArgs: z.ZodType<Prisma.Prisma.TestFindUniqueArgs> = z.object({
  select: z.lazy(() => TestSelect).optional(),
  where: TestWhereUniqueInput,
}).strict();

export const UserFindFirstArgs: z.ZodType<Prisma.Prisma.UserFindFirstArgs> = z.object({
  select: z.lazy(() => UserSelect).optional(),
  include: z.lazy(() => UserInclude).optional(),
  where: UserWhereInput.optional(),
  orderBy: z.union([UserOrderByWithRelationInput.array(), UserOrderByWithRelationInput]).optional(),
  cursor: UserWhereUniqueInput.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnum.array().optional(),
}).strict();

export const UserFindManyArgs: z.ZodType<Prisma.Prisma.UserFindManyArgs> = z.object({
  select: z.lazy(() => UserSelect).optional(),
  include: z.lazy(() => UserInclude).optional(),
  where: UserWhereInput.optional(),
  orderBy: z.union([UserOrderByWithRelationInput.array(), UserOrderByWithRelationInput]).optional(),
  cursor: UserWhereUniqueInput.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnum.array().optional(),
}).strict();

export const UserAggregateArgs: z.ZodType<Prisma.Prisma.UserAggregateArgs> = z.object({
  select: z.lazy(() => UserSelect).optional(),
  include: z.lazy(() => UserInclude).optional(),
  where: UserWhereInput.optional(),
  orderBy: z.union([UserOrderByWithRelationInput.array(), UserOrderByWithRelationInput]).optional(),
  cursor: UserWhereUniqueInput.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserGroupByArgs: z.ZodType<Prisma.Prisma.UserGroupByArgs> = z.object({
  select: z.lazy(() => UserSelect).optional(),
  include: z.lazy(() => UserInclude).optional(),
  where: UserWhereInput.optional(),
  orderBy: z.union([UserOrderByWithAggregationInput.array(), UserOrderByWithAggregationInput]).optional(),
  by: UserScalarFieldEnum.array(),
  having: UserScalarWhereWithAggregatesInput.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserFindUniqueArgs: z.ZodType<Prisma.Prisma.UserFindUniqueArgs> = z.object({
  select: z.lazy(() => UserSelect).optional(),
  include: z.lazy(() => UserInclude).optional(),
  where: UserWhereUniqueInput,
}).strict();

export const PostFindFirstArgs: z.ZodType<Prisma.Prisma.PostFindFirstArgs> = z.object({
  select: z.lazy(() => PostSelect).optional(),
  include: z.lazy(() => PostInclude).optional(),
  where: PostWhereInput.optional(),
  orderBy: z.union([PostOrderByWithRelationInput.array(), PostOrderByWithRelationInput]).optional(),
  cursor: PostWhereUniqueInput.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PostScalarFieldEnum.array().optional(),
}).strict();

export const PostFindManyArgs: z.ZodType<Prisma.Prisma.PostFindManyArgs> = z.object({
  select: z.lazy(() => PostSelect).optional(),
  include: z.lazy(() => PostInclude).optional(),
  where: PostWhereInput.optional(),
  orderBy: z.union([PostOrderByWithRelationInput.array(), PostOrderByWithRelationInput]).optional(),
  cursor: PostWhereUniqueInput.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PostScalarFieldEnum.array().optional(),
}).strict();

export const PostAggregateArgs: z.ZodType<Prisma.Prisma.PostAggregateArgs> = z.object({
  select: z.lazy(() => PostSelect).optional(),
  include: z.lazy(() => PostInclude).optional(),
  where: PostWhereInput.optional(),
  orderBy: z.union([PostOrderByWithRelationInput.array(), PostOrderByWithRelationInput]).optional(),
  cursor: PostWhereUniqueInput.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const PostGroupByArgs: z.ZodType<Prisma.Prisma.PostGroupByArgs> = z.object({
  select: z.lazy(() => PostSelect).optional(),
  include: z.lazy(() => PostInclude).optional(),
  where: PostWhereInput.optional(),
  orderBy: z.union([PostOrderByWithAggregationInput.array(), PostOrderByWithAggregationInput]).optional(),
  by: PostScalarFieldEnum.array(),
  having: PostScalarWhereWithAggregatesInput.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const PostFindUniqueArgs: z.ZodType<Prisma.Prisma.PostFindUniqueArgs> = z.object({
  select: z.lazy(() => PostSelect).optional(),
  include: z.lazy(() => PostInclude).optional(),
  where: PostWhereUniqueInput,
}).strict();

export const ProfileFindFirstArgs: z.ZodType<Prisma.Prisma.ProfileFindFirstArgs> = z.object({
  select: z.lazy(() => ProfileSelect).optional(),
  include: z.lazy(() => ProfileInclude).optional(),
  where: ProfileWhereInput.optional(),
  orderBy: z.union([ProfileOrderByWithRelationInput.array(), ProfileOrderByWithRelationInput]).optional(),
  cursor: ProfileWhereUniqueInput.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ProfileScalarFieldEnum.array().optional(),
}).strict();

export const ProfileFindManyArgs: z.ZodType<Prisma.Prisma.ProfileFindManyArgs> = z.object({
  select: z.lazy(() => ProfileSelect).optional(),
  include: z.lazy(() => ProfileInclude).optional(),
  where: ProfileWhereInput.optional(),
  orderBy: z.union([ProfileOrderByWithRelationInput.array(), ProfileOrderByWithRelationInput]).optional(),
  cursor: ProfileWhereUniqueInput.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ProfileScalarFieldEnum.array().optional(),
}).strict();

export const ProfileAggregateArgs: z.ZodType<Prisma.Prisma.ProfileAggregateArgs> = z.object({
  select: z.lazy(() => ProfileSelect).optional(),
  include: z.lazy(() => ProfileInclude).optional(),
  where: ProfileWhereInput.optional(),
  orderBy: z.union([ProfileOrderByWithRelationInput.array(), ProfileOrderByWithRelationInput]).optional(),
  cursor: ProfileWhereUniqueInput.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ProfileGroupByArgs: z.ZodType<Prisma.Prisma.ProfileGroupByArgs> = z.object({
  select: z.lazy(() => ProfileSelect).optional(),
  include: z.lazy(() => ProfileInclude).optional(),
  where: ProfileWhereInput.optional(),
  orderBy: z.union([ProfileOrderByWithAggregationInput.array(), ProfileOrderByWithAggregationInput]).optional(),
  by: ProfileScalarFieldEnum.array(),
  having: ProfileScalarWhereWithAggregatesInput.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ProfileFindUniqueArgs: z.ZodType<Prisma.Prisma.ProfileFindUniqueArgs> = z.object({
  select: z.lazy(() => ProfileSelect).optional(),
  include: z.lazy(() => ProfileInclude).optional(),
  where: ProfileWhereUniqueInput,
}).strict();

export const TestCreateArgs: z.ZodType<Prisma.Prisma.TestCreateArgs> = z.object({
  select: z.lazy(() => TestSelect).optional(),
  data: z.union([TestCreateInput, TestUncheckedCreateInput]),
}).strict();

export const TestUpsertArgs: z.ZodType<Prisma.Prisma.TestUpsertArgs> = z.object({
  select: z.lazy(() => TestSelect).optional(),
  where: TestWhereUniqueInput,
  create: z.union([TestCreateInput, TestUncheckedCreateInput]),
  update: z.union([TestUpdateInput, TestUncheckedUpdateInput]),
}).strict();

export const TestCreateManyArgs: z.ZodType<Prisma.Prisma.TestCreateManyArgs> = z.object({
  select: z.lazy(() => TestSelect).optional(),
  data: TestCreateManyInput.array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const TestDeleteArgs: z.ZodType<Prisma.Prisma.TestDeleteArgs> = z.object({
  select: z.lazy(() => TestSelect).optional(),
  where: TestWhereUniqueInput,
}).strict();

export const TestUpdateArgs: z.ZodType<Prisma.Prisma.TestUpdateArgs> = z.object({
  select: z.lazy(() => TestSelect).optional(),
  data: z.union([TestUpdateInput, TestUncheckedUpdateInput]),
  where: TestWhereUniqueInput,
}).strict();

export const TestUpdateManyArgs: z.ZodType<Prisma.Prisma.TestUpdateManyArgs> = z.object({
  select: z.lazy(() => TestSelect).optional(),
  data: z.union([TestUpdateManyMutationInput, TestUncheckedUpdateManyInput]),
  where: TestWhereInput.optional(),
}).strict();

export const TestDeleteManyArgs: z.ZodType<Prisma.Prisma.TestDeleteManyArgs> = z.object({
  select: z.lazy(() => TestSelect).optional(),
  where: TestWhereInput.optional(),
}).strict();

export const UserCreateArgs: z.ZodType<Prisma.Prisma.UserCreateArgs> = z.object({
  select: z.lazy(() => UserSelect).optional(),
  include: z.lazy(() => UserInclude).optional(),
  data: z.union([UserCreateInput, UserUncheckedCreateInput]),
}).strict();

export const UserUpsertArgs: z.ZodType<Prisma.Prisma.UserUpsertArgs> = z.object({
  select: z.lazy(() => UserSelect).optional(),
  include: z.lazy(() => UserInclude).optional(),
  where: UserWhereUniqueInput,
  create: z.union([UserCreateInput, UserUncheckedCreateInput]),
  update: z.union([UserUpdateInput, UserUncheckedUpdateInput]),
}).strict();

export const UserCreateManyArgs: z.ZodType<Prisma.Prisma.UserCreateManyArgs> = z.object({
  select: z.lazy(() => UserSelect).optional(),
  include: z.lazy(() => UserInclude).optional(),
  data: UserCreateManyInput.array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserDeleteArgs: z.ZodType<Prisma.Prisma.UserDeleteArgs> = z.object({
  select: z.lazy(() => UserSelect).optional(),
  include: z.lazy(() => UserInclude).optional(),
  where: UserWhereUniqueInput,
}).strict();

export const UserUpdateArgs: z.ZodType<Prisma.Prisma.UserUpdateArgs> = z.object({
  select: z.lazy(() => UserSelect).optional(),
  include: z.lazy(() => UserInclude).optional(),
  data: z.union([UserUpdateInput, UserUncheckedUpdateInput]),
  where: UserWhereUniqueInput,
}).strict();

export const UserUpdateManyArgs: z.ZodType<Prisma.Prisma.UserUpdateManyArgs> = z.object({
  select: z.lazy(() => UserSelect).optional(),
  include: z.lazy(() => UserInclude).optional(),
  data: z.union([UserUpdateManyMutationInput, UserUncheckedUpdateManyInput]),
  where: UserWhereInput.optional(),
}).strict();

export const UserDeleteManyArgs: z.ZodType<Prisma.Prisma.UserDeleteManyArgs> = z.object({
  select: z.lazy(() => UserSelect).optional(),
  include: z.lazy(() => UserInclude).optional(),
  where: UserWhereInput.optional(),
}).strict();

export const PostCreateArgs: z.ZodType<Prisma.Prisma.PostCreateArgs> = z.object({
  select: z.lazy(() => PostSelect).optional(),
  include: z.lazy(() => PostInclude).optional(),
  data: z.union([PostCreateInput, PostUncheckedCreateInput]),
}).strict();

export const PostUpsertArgs: z.ZodType<Prisma.Prisma.PostUpsertArgs> = z.object({
  select: z.lazy(() => PostSelect).optional(),
  include: z.lazy(() => PostInclude).optional(),
  where: PostWhereUniqueInput,
  create: z.union([PostCreateInput, PostUncheckedCreateInput]),
  update: z.union([PostUpdateInput, PostUncheckedUpdateInput]),
}).strict();

export const PostCreateManyArgs: z.ZodType<Prisma.Prisma.PostCreateManyArgs> = z.object({
  select: z.lazy(() => PostSelect).optional(),
  include: z.lazy(() => PostInclude).optional(),
  data: PostCreateManyInput.array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const PostDeleteArgs: z.ZodType<Prisma.Prisma.PostDeleteArgs> = z.object({
  select: z.lazy(() => PostSelect).optional(),
  include: z.lazy(() => PostInclude).optional(),
  where: PostWhereUniqueInput,
}).strict();

export const PostUpdateArgs: z.ZodType<Prisma.Prisma.PostUpdateArgs> = z.object({
  select: z.lazy(() => PostSelect).optional(),
  include: z.lazy(() => PostInclude).optional(),
  data: z.union([PostUpdateInput, PostUncheckedUpdateInput]),
  where: PostWhereUniqueInput,
}).strict();

export const PostUpdateManyArgs: z.ZodType<Prisma.Prisma.PostUpdateManyArgs> = z.object({
  select: z.lazy(() => PostSelect).optional(),
  include: z.lazy(() => PostInclude).optional(),
  data: z.union([PostUpdateManyMutationInput, PostUncheckedUpdateManyInput]),
  where: PostWhereInput.optional(),
}).strict();

export const PostDeleteManyArgs: z.ZodType<Prisma.Prisma.PostDeleteManyArgs> = z.object({
  select: z.lazy(() => PostSelect).optional(),
  include: z.lazy(() => PostInclude).optional(),
  where: PostWhereInput.optional(),
}).strict();

export const ProfileCreateArgs: z.ZodType<Prisma.Prisma.ProfileCreateArgs> = z.object({
  select: z.lazy(() => ProfileSelect).optional(),
  include: z.lazy(() => ProfileInclude).optional(),
  data: z.union([ProfileCreateInput, ProfileUncheckedCreateInput]),
}).strict();

export const ProfileUpsertArgs: z.ZodType<Prisma.Prisma.ProfileUpsertArgs> = z.object({
  select: z.lazy(() => ProfileSelect).optional(),
  include: z.lazy(() => ProfileInclude).optional(),
  where: ProfileWhereUniqueInput,
  create: z.union([ProfileCreateInput, ProfileUncheckedCreateInput]),
  update: z.union([ProfileUpdateInput, ProfileUncheckedUpdateInput]),
}).strict();

export const ProfileCreateManyArgs: z.ZodType<Prisma.Prisma.ProfileCreateManyArgs> = z.object({
  select: z.lazy(() => ProfileSelect).optional(),
  include: z.lazy(() => ProfileInclude).optional(),
  data: ProfileCreateManyInput.array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ProfileDeleteArgs: z.ZodType<Prisma.Prisma.ProfileDeleteArgs> = z.object({
  select: z.lazy(() => ProfileSelect).optional(),
  include: z.lazy(() => ProfileInclude).optional(),
  where: ProfileWhereUniqueInput,
}).strict();

export const ProfileUpdateArgs: z.ZodType<Prisma.Prisma.ProfileUpdateArgs> = z.object({
  select: z.lazy(() => ProfileSelect).optional(),
  include: z.lazy(() => ProfileInclude).optional(),
  data: z.union([ProfileUpdateInput, ProfileUncheckedUpdateInput]),
  where: ProfileWhereUniqueInput,
}).strict();

export const ProfileUpdateManyArgs: z.ZodType<Prisma.Prisma.ProfileUpdateManyArgs> = z.object({
  select: z.lazy(() => ProfileSelect).optional(),
  include: z.lazy(() => ProfileInclude).optional(),
  data: z.union([ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput]),
  where: ProfileWhereInput.optional(),
}).strict();

export const ProfileDeleteManyArgs: z.ZodType<Prisma.Prisma.ProfileDeleteManyArgs> = z.object({
  select: z.lazy(() => ProfileSelect).optional(),
  include: z.lazy(() => ProfileInclude).optional(),
  where: ProfileWhereInput.optional(),
}).strict();
