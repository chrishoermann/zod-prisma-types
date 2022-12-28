import { z } from "zod";
import * as PrismaClient from "@prisma/client";
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

export const LocationScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.LocationScalarFieldEnum);

export const MODELWithUpperCaseScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.MODELWithUpperCaseScalarFieldEnum);

export const ModelWithCommentsScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.ModelWithCommentsScalarFieldEnum);

export const ModelWithOmitFieldsScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.ModelWithOmitFieldsScalarFieldEnum);

export const MyPrismaScalarsTypeScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.MyPrismaScalarsTypeScalarFieldEnum);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull', 'JsonNull',]).transform((v) => transformJsonNull(v));

export const PostScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.PostScalarFieldEnum);

export const ProfileScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.ProfileScalarFieldEnum);

export const QueryModeSchema = z.nativeEnum(PrismaClient.Prisma.QueryMode);

export const SortOrderSchema = z.nativeEnum(PrismaClient.Prisma.SortOrder);

export const TransactionIsolationLevelSchema = z.nativeEnum(PrismaClient.Prisma.TransactionIsolationLevel);

export const UserScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.UserScalarFieldEnum);

// CUSTOM ENUMS
//------------------------------------------------------

export const MYValueSchema = z.nativeEnum(PrismaClient.MYValue);

export const RoleSchema = z.nativeEnum(PrismaClient.Role);

export const SecondEnumSchema = z.nativeEnum(PrismaClient.SecondEnum);

export const AnotherEnumSchema = z.nativeEnum(PrismaClient.AnotherEnum);

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

// MODEL WITH UPPER CASE
//------------------------------------------------------

export const MODELWithUpperCaseSchema = z.object({
  MYValue: MYValueSchema,
  id: z.number(),
  STRING: z.string(),
});

export const MODELWithUpperCaseOptionalDefaultsSchema = MODELWithUpperCaseSchema.merge(
  z.object({
    id: z.number(),
  })
);

// MODEL WITH OMIT FIELDS
//------------------------------------------------------

export const ModelWithOmitFieldsSchema = z.object({
  id: z.number(),
  string: z.string().nullish(),
  // omitted: omitField: z.string().nullish(),
  // omitted: omitRequired: z.string(),
});

export const ModelWithOmitFieldsOptionalDefaultsSchema = ModelWithOmitFieldsSchema.merge(
  z.object({
    id: z.number(),
  })
);

// MODEL WITH COMMENTS
//------------------------------------------------------

/**
 * comment line one
 * comment line two
 */
export const ModelWithCommentsSchema = z.object({
  id: z.number(),
  /**
   * comment before validator
   * comment after validator
   */
  string: z.string().min(4).max(10).nullish(),
  // omitted: omitField: z.string().nullish(),
  // omitted: omitRequired: z.string(),
});

/**
 * comment line one
 * comment line two
 */
export const ModelWithCommentsOptionalDefaultsSchema = ModelWithCommentsSchema.merge(
  z.object({
    id: z.number(),
  })
);

// MY PRISMA SCALARS TYPE
//------------------------------------------------------

export const MyPrismaScalarsTypeSchema = z.object({
  id: z.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid(),
  /**
   * Some comment about string
   */
  string: z.string().min(3, { message: "min error" }).max(10, { message: "max error" }).nullish(),
  bic: z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }).nullish(),
  float: z.number().lt(10, { message: "lt error" }).gt(5, { message: "gt error" }),
  floatOpt: z.number().nullish(),
  int: z.number(),
  intOpt: z.number().nullish(),
  decimal: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Field "decimal" must be a Decimal', path: ['Models', 'MyPrismaScalarsType'] }),
  decimalOpt: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Field "decimalOpt" must be a Decimal', path: ['Models', 'MyPrismaScalarsType'] }).nullish(),
  date: z.date(),
  dateOpt: z.date({ invalid_type_error: "wrong date type" }).nullish(),
  bigIntOpt: z.bigint().nullish(),
  json: z.lazy(() => InputJsonValue).refine((val) => myFunction(val), { message: 'Is not valid' }),
  jsonOpt: NullableJsonValue.optional(),
  bytes: z.instanceof(Buffer).refine((val) => val ? true : false, { message: 'Value is not valid' }),
  bytesOpt: z.instanceof(Buffer).nullish(),
  custom: z.string().refine((val) => myFunction(val), { message: 'Is not valid' }).nullish(),
  // omitted: exclude: z.string().nullish(),
});

export const MyPrismaScalarsTypeOptionalDefaultsSchema = MyPrismaScalarsTypeSchema.merge(
  z.object({
    id: z.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid(),
    date: z.date(),
  })
);

// JSON MODEL
//------------------------------------------------------

export const JsonModelSchema = z.object({
  id: z.number(),
  json: InputJsonValue,
  jsonOpt: NullableJsonValue.optional(),
});

export const JsonModelOptionalDefaultsSchema = JsonModelSchema.merge(
  z.object({
    id: z.number(),
  })
);

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
  scalarList: z.string().array(),
  lat: z.number(),
  lng: z.number(),
});

export const UserOptionalDefaultsSchema = UserSchema.merge(
  z.object({
    role: RoleSchema.array(),
    enum: AnotherEnumSchema,
    id: z.string().cuid(),
  })
);

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

export const PostOptionalDefaultsSchema = PostSchema.merge(
  z.object({
    id: z.number(),
    published: z.boolean(),
  })
);

// PROFILE
//------------------------------------------------------

export const ProfileSchema = z.object({
  role: RoleSchema.array(),
  second: SecondEnumSchema,
  id: z.number(),
  bio: z.string(),
  userId: z.string(),
});

export const ProfileOptionalDefaultsSchema = ProfileSchema.merge(
  z.object({
    role: RoleSchema.array(),
    second: SecondEnumSchema,
    id: z.number(),
  })
);

// LOCATION
//------------------------------------------------------

export const LocationSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

export const LocationOptionalDefaultsSchema = LocationSchema.merge(
  z.object({
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
}).strict();

// MODEL WITH OMIT FIELDS
//------------------------------------------------------

export const ModelWithOmitFieldsSelectSchema: z.ZodType<PrismaClient.Prisma.ModelWithOmitFieldsSelect> = z.object({
  id: z.boolean().optional(),
  string: z.boolean().optional(),
  omitField: z.boolean().optional(),
  omitRequired: z.boolean().optional(),
}).strict();

// MODEL WITH COMMENTS
//------------------------------------------------------

export const ModelWithCommentsSelectSchema: z.ZodType<PrismaClient.Prisma.ModelWithCommentsSelect> = z.object({
  id: z.boolean().optional(),
  string: z.boolean().optional(),
  omitField: z.boolean().optional(),
  omitRequired: z.boolean().optional(),
}).strict();

// MY PRISMA SCALARS TYPE
//------------------------------------------------------

export const MyPrismaScalarsTypeSelectSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeSelect> = z.object({
  id: z.boolean().optional(),
  string: z.boolean().optional(),
  bic: z.boolean().optional(),
  float: z.boolean().optional(),
  floatOpt: z.boolean().optional(),
  int: z.boolean().optional(),
  intOpt: z.boolean().optional(),
  decimal: z.boolean().optional(),
  decimalOpt: z.boolean().optional(),
  date: z.boolean().optional(),
  dateOpt: z.boolean().optional(),
  bigIntOpt: z.boolean().optional(),
  json: z.boolean().optional(),
  jsonOpt: z.boolean().optional(),
  bytes: z.boolean().optional(),
  bytesOpt: z.boolean().optional(),
  custom: z.boolean().optional(),
  exclude: z.boolean().optional(),
}).strict();

// JSON MODEL
//------------------------------------------------------

export const JsonModelSelectSchema: z.ZodType<PrismaClient.Prisma.JsonModelSelect> = z.object({
  id: z.boolean().optional(),
  json: z.boolean().optional(),
  jsonOpt: z.boolean().optional(),
}).strict();

// USER
//------------------------------------------------------

export const UserArgsSchema: z.ZodType<PrismaClient.Prisma.UserArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserIncludeSchema: z.ZodType<PrismaClient.Prisma.UserInclude> = z.object({
  posts: z.union([z.boolean(), z.lazy(() => PostFindManyArgsSchema)]).optional(),
  profile: z.union([z.boolean(), z.lazy(() => ProfileArgsSchema)]).optional(),
  location: z.union([z.boolean(), z.lazy(() => LocationArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<PrismaClient.Prisma.UserCountOutputTypeArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<PrismaClient.Prisma.UserCountOutputTypeSelect> = z.object({
  posts: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<PrismaClient.Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  posts: z.union([z.boolean(), z.lazy(() => PostFindManyArgsSchema)]).optional(),
  profile: z.union([z.boolean(), z.lazy(() => ProfileArgsSchema)]).optional(),
  role: z.boolean().optional(),
  enum: z.boolean().optional(),
  scalarList: z.boolean().optional(),
  lat: z.boolean().optional(),
  lng: z.boolean().optional(),
  location: z.union([z.boolean(), z.lazy(() => LocationArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict();

// POST
//------------------------------------------------------

export const PostArgsSchema: z.ZodType<PrismaClient.Prisma.PostArgs> = z.object({
  select: z.lazy(() => PostSelectSchema).optional(),
  include: z.lazy(() => PostIncludeSchema).optional(),
}).strict();

export const PostIncludeSchema: z.ZodType<PrismaClient.Prisma.PostInclude> = z.object({
  author: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const PostSelectSchema: z.ZodType<PrismaClient.Prisma.PostSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  content: z.boolean().optional(),
  published: z.boolean().optional(),
  author: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  authorId: z.boolean().optional(),
  anotherEnum: z.boolean().optional(),
}).strict();

// PROFILE
//------------------------------------------------------

export const ProfileArgsSchema: z.ZodType<PrismaClient.Prisma.ProfileArgs> = z.object({
  select: z.lazy(() => ProfileSelectSchema).optional(),
  include: z.lazy(() => ProfileIncludeSchema).optional(),
}).strict();

export const ProfileIncludeSchema: z.ZodType<PrismaClient.Prisma.ProfileInclude> = z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const ProfileSelectSchema: z.ZodType<PrismaClient.Prisma.ProfileSelect> = z.object({
  id: z.boolean().optional(),
  bio: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  userId: z.boolean().optional(),
  role: z.boolean().optional(),
  second: z.boolean().optional(),
}).strict();

// LOCATION
//------------------------------------------------------

export const LocationArgsSchema: z.ZodType<PrismaClient.Prisma.LocationArgs> = z.object({
  select: z.lazy(() => LocationSelectSchema).optional(),
  include: z.lazy(() => LocationIncludeSchema).optional(),
}).strict();

export const LocationIncludeSchema: z.ZodType<PrismaClient.Prisma.LocationInclude> = z.object({
  User: z.union([z.boolean(), z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => LocationCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const LocationCountOutputTypeArgsSchema: z.ZodType<PrismaClient.Prisma.LocationCountOutputTypeArgs> = z.object({
  select: z.lazy(() => LocationCountOutputTypeSelectSchema).nullish(),
}).strict();

export const LocationCountOutputTypeSelectSchema: z.ZodType<PrismaClient.Prisma.LocationCountOutputTypeSelect> = z.object({
  User: z.boolean().optional(),
}).strict();

export const LocationSelectSchema: z.ZodType<PrismaClient.Prisma.LocationSelect> = z.object({
  lat: z.boolean().optional(),
  lng: z.boolean().optional(),
  User: z.union([z.boolean(), z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => LocationCountOutputTypeArgsSchema)]).optional(),
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
}).strict();

export const MODELWithUpperCaseOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  STRING: z.lazy(() => SortOrderSchema).optional(),
  MYValue: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const MODELWithUpperCaseWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseWhereUniqueInput> = z.object({
  id: z.number().optional(),
}).strict();

export const MODELWithUpperCaseOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  STRING: z.lazy(() => SortOrderSchema).optional(),
  MYValue: z.lazy(() => SortOrderSchema).optional(),
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
}).strict();

export const ModelWithOmitFieldsWhereInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithOmitFieldsWhereInput> = z.object({
  AND: z.union([z.lazy(() => ModelWithOmitFieldsWhereInputSchema), z.lazy(() => ModelWithOmitFieldsWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => ModelWithOmitFieldsWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => ModelWithOmitFieldsWhereInputSchema), z.lazy(() => ModelWithOmitFieldsWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  string: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  omitField: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  omitRequired: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
}).strict();

export const ModelWithOmitFieldsOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithOmitFieldsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  string: z.lazy(() => SortOrderSchema).optional(),
  omitField: z.lazy(() => SortOrderSchema).optional(),
  omitRequired: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ModelWithOmitFieldsWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithOmitFieldsWhereUniqueInput> = z.object({
  id: z.number().optional(),
}).strict();

export const ModelWithOmitFieldsOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithOmitFieldsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  string: z.lazy(() => SortOrderSchema).optional(),
  omitField: z.lazy(() => SortOrderSchema).optional(),
  omitRequired: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ModelWithOmitFieldsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ModelWithOmitFieldsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ModelWithOmitFieldsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ModelWithOmitFieldsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ModelWithOmitFieldsSumOrderByAggregateInputSchema).optional(),
}).strict();

export const ModelWithOmitFieldsScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithOmitFieldsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => ModelWithOmitFieldsScalarWhereWithAggregatesInputSchema), z.lazy(() => ModelWithOmitFieldsScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => ModelWithOmitFieldsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => ModelWithOmitFieldsScalarWhereWithAggregatesInputSchema), z.lazy(() => ModelWithOmitFieldsScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
  string: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  omitField: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  omitRequired: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
}).strict();

export const ModelWithCommentsWhereInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithCommentsWhereInput> = z.object({
  AND: z.union([z.lazy(() => ModelWithCommentsWhereInputSchema), z.lazy(() => ModelWithCommentsWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => ModelWithCommentsWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => ModelWithCommentsWhereInputSchema), z.lazy(() => ModelWithCommentsWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  string: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  omitField: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  omitRequired: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
}).strict();

export const ModelWithCommentsOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithCommentsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  string: z.lazy(() => SortOrderSchema).optional(),
  omitField: z.lazy(() => SortOrderSchema).optional(),
  omitRequired: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ModelWithCommentsWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithCommentsWhereUniqueInput> = z.object({
  id: z.number().optional(),
}).strict();

export const ModelWithCommentsOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithCommentsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  string: z.lazy(() => SortOrderSchema).optional(),
  omitField: z.lazy(() => SortOrderSchema).optional(),
  omitRequired: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ModelWithCommentsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ModelWithCommentsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ModelWithCommentsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ModelWithCommentsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ModelWithCommentsSumOrderByAggregateInputSchema).optional(),
}).strict();

export const ModelWithCommentsScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithCommentsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => ModelWithCommentsScalarWhereWithAggregatesInputSchema), z.lazy(() => ModelWithCommentsScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => ModelWithCommentsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => ModelWithCommentsScalarWhereWithAggregatesInputSchema), z.lazy(() => ModelWithCommentsScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
  string: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  omitField: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  omitRequired: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
}).strict();

export const MyPrismaScalarsTypeWhereInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeWhereInput> = z.object({
  AND: z.union([z.lazy(() => MyPrismaScalarsTypeWhereInputSchema), z.lazy(() => MyPrismaScalarsTypeWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => MyPrismaScalarsTypeWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => MyPrismaScalarsTypeWhereInputSchema), z.lazy(() => MyPrismaScalarsTypeWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  string: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  bic: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  float: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  floatOpt: z.union([z.lazy(() => FloatNullableFilterSchema), z.number()]).optional().nullable(),
  int: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  intOpt: z.union([z.lazy(() => IntNullableFilterSchema), z.number()]).optional().nullable(),
  decimal: z.union([z.lazy(() => DecimalFilterSchema), z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' })]).optional(),
  decimalOpt: z.union([z.lazy(() => DecimalNullableFilterSchema), z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' })]).optional().nullable(),
  date: z.union([z.lazy(() => DateTimeFilterSchema), z.date()]).optional(),
  dateOpt: z.union([z.lazy(() => DateTimeNullableFilterSchema), z.date()]).optional().nullable(),
  bigIntOpt: z.union([z.lazy(() => BigIntNullableFilterSchema), z.bigint()]).optional().nullable(),
  json: z.lazy(() => JsonFilterSchema).optional(),
  jsonOpt: z.lazy(() => JsonNullableFilterSchema).optional(),
  bytes: z.union([z.lazy(() => BytesFilterSchema), z.instanceof(Buffer)]).optional(),
  bytesOpt: z.union([z.lazy(() => BytesNullableFilterSchema), z.instanceof(Buffer)]).optional().nullable(),
  custom: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  exclude: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
}).strict();

export const MyPrismaScalarsTypeOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  string: z.lazy(() => SortOrderSchema).optional(),
  bic: z.lazy(() => SortOrderSchema).optional(),
  float: z.lazy(() => SortOrderSchema).optional(),
  floatOpt: z.lazy(() => SortOrderSchema).optional(),
  int: z.lazy(() => SortOrderSchema).optional(),
  intOpt: z.lazy(() => SortOrderSchema).optional(),
  decimal: z.lazy(() => SortOrderSchema).optional(),
  decimalOpt: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  dateOpt: z.lazy(() => SortOrderSchema).optional(),
  bigIntOpt: z.lazy(() => SortOrderSchema).optional(),
  json: z.lazy(() => SortOrderSchema).optional(),
  jsonOpt: z.lazy(() => SortOrderSchema).optional(),
  bytes: z.lazy(() => SortOrderSchema).optional(),
  bytesOpt: z.lazy(() => SortOrderSchema).optional(),
  custom: z.lazy(() => SortOrderSchema).optional(),
  exclude: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const MyPrismaScalarsTypeWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeWhereUniqueInput> = z.object({
  id: z.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid().optional(),
}).strict();

export const MyPrismaScalarsTypeOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  string: z.lazy(() => SortOrderSchema).optional(),
  bic: z.lazy(() => SortOrderSchema).optional(),
  float: z.lazy(() => SortOrderSchema).optional(),
  floatOpt: z.lazy(() => SortOrderSchema).optional(),
  int: z.lazy(() => SortOrderSchema).optional(),
  intOpt: z.lazy(() => SortOrderSchema).optional(),
  decimal: z.lazy(() => SortOrderSchema).optional(),
  decimalOpt: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  dateOpt: z.lazy(() => SortOrderSchema).optional(),
  bigIntOpt: z.lazy(() => SortOrderSchema).optional(),
  json: z.lazy(() => SortOrderSchema).optional(),
  jsonOpt: z.lazy(() => SortOrderSchema).optional(),
  bytes: z.lazy(() => SortOrderSchema).optional(),
  bytesOpt: z.lazy(() => SortOrderSchema).optional(),
  custom: z.lazy(() => SortOrderSchema).optional(),
  exclude: z.lazy(() => SortOrderSchema).optional(),
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
  floatOpt: z.union([z.lazy(() => FloatNullableWithAggregatesFilterSchema), z.number()]).optional().nullable(),
  int: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
  intOpt: z.union([z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number()]).optional().nullable(),
  decimal: z.union([z.lazy(() => DecimalWithAggregatesFilterSchema), z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' })]).optional(),
  decimalOpt: z.union([z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' })]).optional().nullable(),
  date: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.date()]).optional(),
  dateOpt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.date()]).optional().nullable(),
  bigIntOpt: z.union([z.lazy(() => BigIntNullableWithAggregatesFilterSchema), z.bigint()]).optional().nullable(),
  json: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  jsonOpt: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  bytes: z.union([z.lazy(() => BytesWithAggregatesFilterSchema), z.instanceof(Buffer)]).optional(),
  bytesOpt: z.union([z.lazy(() => BytesNullableWithAggregatesFilterSchema), z.instanceof(Buffer)]).optional().nullable(),
  custom: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  exclude: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
}).strict();

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
  scalarList: z.lazy(() => StringNullableListFilterSchema).optional(),
  lat: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  lng: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  location: z.union([z.lazy(() => LocationRelationFilterSchema), z.lazy(() => LocationWhereInputSchema)]).optional().nullable(),
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  posts: z.lazy(() => PostOrderByRelationAggregateInputSchema).optional(),
  profile: z.lazy(() => ProfileOrderByWithRelationInputSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  enum: z.lazy(() => SortOrderSchema).optional(),
  scalarList: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => LocationOrderByWithRelationInputSchema).optional(),
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
}).strict();

export const UserOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  enum: z.lazy(() => SortOrderSchema).optional(),
  scalarList: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional(),
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
  scalarList: z.lazy(() => StringNullableListFilterSchema).optional(),
  lat: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
  lng: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
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

export const LocationWhereInputSchema: z.ZodType<PrismaClient.Prisma.LocationWhereInput> = z.object({
  AND: z.union([z.lazy(() => LocationWhereInputSchema), z.lazy(() => LocationWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => LocationWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => LocationWhereInputSchema), z.lazy(() => LocationWhereInputSchema).array()]).optional(),
  lat: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  lng: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  User: z.lazy(() => UserListRelationFilterSchema).optional(),
}).strict();

export const LocationOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.LocationOrderByWithRelationInput> = z.object({
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
  User: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const LocationWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.LocationWhereUniqueInput> = z.object({
  lat_lng: z.lazy(() => LocationLatLngCompoundUniqueInputSchema).optional(),
}).strict();

export const LocationOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.LocationOrderByWithAggregationInput> = z.object({
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LocationCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => LocationAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LocationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LocationMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => LocationSumOrderByAggregateInputSchema).optional(),
}).strict();

export const LocationScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.LocationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => LocationScalarWhereWithAggregatesInputSchema), z.lazy(() => LocationScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => LocationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => LocationScalarWhereWithAggregatesInputSchema), z.lazy(() => LocationScalarWhereWithAggregatesInputSchema).array()]).optional(),
  lat: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
  lng: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
}).strict();

export const MODELWithUpperCaseCreateInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseCreateInput> = z.object({
  STRING: z.string(),
  MYValue: z.lazy(() => MYValueSchema),
}).strict();

export const MODELWithUpperCaseUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseUncheckedCreateInput> = z.object({
  id: z.number().optional(),
  STRING: z.string(),
  MYValue: z.lazy(() => MYValueSchema),
}).strict();

export const MODELWithUpperCaseUpdateInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseUpdateInput> = z.object({
  STRING: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  MYValue: z.union([z.lazy(() => MYValueSchema), z.lazy(() => EnumMYValueFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const MODELWithUpperCaseUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseUncheckedUpdateInput> = z.object({
  id: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  STRING: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  MYValue: z.union([z.lazy(() => MYValueSchema), z.lazy(() => EnumMYValueFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const MODELWithUpperCaseCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseCreateManyInput> = z.object({
  id: z.number().optional(),
  STRING: z.string(),
  MYValue: z.lazy(() => MYValueSchema),
}).strict();

export const MODELWithUpperCaseUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseUpdateManyMutationInput> = z.object({
  STRING: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  MYValue: z.union([z.lazy(() => MYValueSchema), z.lazy(() => EnumMYValueFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const MODELWithUpperCaseUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseUncheckedUpdateManyInput> = z.object({
  id: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  STRING: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  MYValue: z.union([z.lazy(() => MYValueSchema), z.lazy(() => EnumMYValueFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const ModelWithOmitFieldsCreateInputSchema: z.ZodType<Omit<PrismaClient.Prisma.ModelWithOmitFieldsCreateInput, "omitField" | "omitRequired">> = z.object({
  string: z.string().optional().nullable(),
  // omitted: omitField: z.string().optional().nullable(),
  // omitted: omitRequired: z.string(),
}).strict();

export const ModelWithOmitFieldsUncheckedCreateInputSchema: z.ZodType<Omit<PrismaClient.Prisma.ModelWithOmitFieldsUncheckedCreateInput, "omitField" | "omitRequired">> = z.object({
  id: z.number().optional(),
  string: z.string().optional().nullable(),
  // omitted: omitField: z.string().optional().nullable(),
  // omitted: omitRequired: z.string(),
}).strict();

export const ModelWithOmitFieldsUpdateInputSchema: z.ZodType<Omit<PrismaClient.Prisma.ModelWithOmitFieldsUpdateInput, "omitField" | "omitRequired">> = z.object({
  string: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  // omitted: omitField: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  // omitted: omitRequired: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ModelWithOmitFieldsUncheckedUpdateInputSchema: z.ZodType<Omit<PrismaClient.Prisma.ModelWithOmitFieldsUncheckedUpdateInput, "omitField" | "omitRequired">> = z.object({
  id: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  string: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  // omitted: omitField: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  // omitted: omitRequired: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ModelWithOmitFieldsCreateManyInputSchema: z.ZodType<Omit<PrismaClient.Prisma.ModelWithOmitFieldsCreateManyInput, "omitField" | "omitRequired">> = z.object({
  id: z.number().optional(),
  string: z.string().optional().nullable(),
  // omitted: omitField: z.string().optional().nullable(),
  // omitted: omitRequired: z.string(),
}).strict();

export const ModelWithOmitFieldsUpdateManyMutationInputSchema: z.ZodType<Omit<PrismaClient.Prisma.ModelWithOmitFieldsUpdateManyMutationInput, "omitField" | "omitRequired">> = z.object({
  string: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  // omitted: omitField: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  // omitted: omitRequired: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ModelWithOmitFieldsUncheckedUpdateManyInputSchema: z.ZodType<Omit<PrismaClient.Prisma.ModelWithOmitFieldsUncheckedUpdateManyInput, "omitField" | "omitRequired">> = z.object({
  id: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  string: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  // omitted: omitField: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  // omitted: omitRequired: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ModelWithCommentsCreateInputSchema: z.ZodType<Omit<PrismaClient.Prisma.ModelWithCommentsCreateInput, "omitField" | "omitRequired">> = z.object({
  string: z.string().min(4).max(10).optional().nullable(),
  // omitted: omitField: z.string().optional().nullable(),
  // omitted: omitRequired: z.string(),
}).strict();

export const ModelWithCommentsUncheckedCreateInputSchema: z.ZodType<Omit<PrismaClient.Prisma.ModelWithCommentsUncheckedCreateInput, "omitField" | "omitRequired">> = z.object({
  id: z.number().optional(),
  string: z.string().min(4).max(10).optional().nullable(),
  // omitted: omitField: z.string().optional().nullable(),
  // omitted: omitRequired: z.string(),
}).strict();

export const ModelWithCommentsUpdateInputSchema: z.ZodType<Omit<PrismaClient.Prisma.ModelWithCommentsUpdateInput, "omitField" | "omitRequired">> = z.object({
  string: z.union([z.string().min(4).max(10), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  // omitted: omitField: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  // omitted: omitRequired: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ModelWithCommentsUncheckedUpdateInputSchema: z.ZodType<Omit<PrismaClient.Prisma.ModelWithCommentsUncheckedUpdateInput, "omitField" | "omitRequired">> = z.object({
  id: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  string: z.union([z.string().min(4).max(10), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  // omitted: omitField: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  // omitted: omitRequired: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ModelWithCommentsCreateManyInputSchema: z.ZodType<Omit<PrismaClient.Prisma.ModelWithCommentsCreateManyInput, "omitField" | "omitRequired">> = z.object({
  id: z.number().optional(),
  string: z.string().min(4).max(10).optional().nullable(),
  // omitted: omitField: z.string().optional().nullable(),
  // omitted: omitRequired: z.string(),
}).strict();

export const ModelWithCommentsUpdateManyMutationInputSchema: z.ZodType<Omit<PrismaClient.Prisma.ModelWithCommentsUpdateManyMutationInput, "omitField" | "omitRequired">> = z.object({
  string: z.union([z.string().min(4).max(10), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  // omitted: omitField: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  // omitted: omitRequired: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ModelWithCommentsUncheckedUpdateManyInputSchema: z.ZodType<Omit<PrismaClient.Prisma.ModelWithCommentsUncheckedUpdateManyInput, "omitField" | "omitRequired">> = z.object({
  id: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  string: z.union([z.string().min(4).max(10), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  // omitted: omitField: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  // omitted: omitRequired: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MyPrismaScalarsTypeCreateInputSchema: z.ZodType<Omit<PrismaClient.Prisma.MyPrismaScalarsTypeCreateInput, "exclude">> = z.object({
  id: z.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid().optional(),
  string: z.string().min(3, { message: "min error" }).max(10, { message: "max error" }).optional().nullable(),
  bic: z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }).optional().nullable(),
  float: z.number().lt(10, { message: "lt error" }).gt(5, { message: "gt error" }),
  floatOpt: z.number().optional().nullable(),
  int: z.number(),
  intOpt: z.number().optional().nullable(),
  decimal: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }),
  decimalOpt: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional().nullable(),
  date: z.date().optional(),
  dateOpt: z.date({ invalid_type_error: "wrong date type" }).optional().nullable(),
  bigIntOpt: z.bigint().optional().nullable(),
  json: z.union([z.lazy(() => JsonNullValueInputSchema), z.lazy(() => InputJsonValue).refine((val) => myFunction(val), { message: 'Is not valid' })]),
  jsonOpt: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  bytes: z.instanceof(Buffer).refine((val) => val ? true : false, { message: 'Value is not valid' }),
  bytesOpt: z.instanceof(Buffer).optional().nullable(),
  custom: z.string().refine((val) => myFunction(val), { message: 'Is not valid' }).optional().nullable(),
  // omitted: exclude: z.string().optional().nullable(),
}).strict();

export const MyPrismaScalarsTypeUncheckedCreateInputSchema: z.ZodType<Omit<PrismaClient.Prisma.MyPrismaScalarsTypeUncheckedCreateInput, "exclude">> = z.object({
  id: z.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid().optional(),
  string: z.string().min(3, { message: "min error" }).max(10, { message: "max error" }).optional().nullable(),
  bic: z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }).optional().nullable(),
  float: z.number().lt(10, { message: "lt error" }).gt(5, { message: "gt error" }),
  floatOpt: z.number().optional().nullable(),
  int: z.number(),
  intOpt: z.number().optional().nullable(),
  decimal: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }),
  decimalOpt: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional().nullable(),
  date: z.date().optional(),
  dateOpt: z.date({ invalid_type_error: "wrong date type" }).optional().nullable(),
  bigIntOpt: z.bigint().optional().nullable(),
  json: z.union([z.lazy(() => JsonNullValueInputSchema), z.lazy(() => InputJsonValue).refine((val) => myFunction(val), { message: 'Is not valid' })]),
  jsonOpt: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  bytes: z.instanceof(Buffer).refine((val) => val ? true : false, { message: 'Value is not valid' }),
  bytesOpt: z.instanceof(Buffer).optional().nullable(),
  custom: z.string().refine((val) => myFunction(val), { message: 'Is not valid' }).optional().nullable(),
  // omitted: exclude: z.string().optional().nullable(),
}).strict();

export const MyPrismaScalarsTypeUpdateInputSchema: z.ZodType<Omit<PrismaClient.Prisma.MyPrismaScalarsTypeUpdateInput, "exclude">> = z.object({
  id: z.union([z.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  string: z.union([z.string().min(3, { message: "min error" }).max(10, { message: "max error" }), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  bic: z.union([z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  float: z.union([z.number().lt(10, { message: "lt error" }).gt(5, { message: "gt error" }), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  floatOpt: z.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)]).optional().nullable(),
  int: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  intOpt: z.union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  decimal: z.union([z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => DecimalFieldUpdateOperationsInputSchema)]).optional(),
  decimalOpt: z.union([z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema)]).optional().nullable(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  dateOpt: z.union([z.date({ invalid_type_error: "wrong date type" }), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  bigIntOpt: z.union([z.bigint(), z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  json: z.union([z.lazy(() => JsonNullValueInputSchema), z.lazy(() => InputJsonValue).refine((val) => myFunction(val), { message: 'Is not valid' })]).optional(),
  jsonOpt: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  bytes: z.union([z.instanceof(Buffer).refine((val) => val ? true : false, { message: 'Value is not valid' }), z.lazy(() => BytesFieldUpdateOperationsInputSchema)]).optional(),
  bytesOpt: z.union([z.instanceof(Buffer), z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema)]).optional().nullable(),
  custom: z.union([z.string().refine((val) => myFunction(val), { message: 'Is not valid' }), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  // omitted: exclude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MyPrismaScalarsTypeUncheckedUpdateInputSchema: z.ZodType<Omit<PrismaClient.Prisma.MyPrismaScalarsTypeUncheckedUpdateInput, "exclude">> = z.object({
  id: z.union([z.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  string: z.union([z.string().min(3, { message: "min error" }).max(10, { message: "max error" }), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  bic: z.union([z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  float: z.union([z.number().lt(10, { message: "lt error" }).gt(5, { message: "gt error" }), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  floatOpt: z.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)]).optional().nullable(),
  int: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  intOpt: z.union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  decimal: z.union([z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => DecimalFieldUpdateOperationsInputSchema)]).optional(),
  decimalOpt: z.union([z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema)]).optional().nullable(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  dateOpt: z.union([z.date({ invalid_type_error: "wrong date type" }), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  bigIntOpt: z.union([z.bigint(), z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  json: z.union([z.lazy(() => JsonNullValueInputSchema), z.lazy(() => InputJsonValue).refine((val) => myFunction(val), { message: 'Is not valid' })]).optional(),
  jsonOpt: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  bytes: z.union([z.instanceof(Buffer).refine((val) => val ? true : false, { message: 'Value is not valid' }), z.lazy(() => BytesFieldUpdateOperationsInputSchema)]).optional(),
  bytesOpt: z.union([z.instanceof(Buffer), z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema)]).optional().nullable(),
  custom: z.union([z.string().refine((val) => myFunction(val), { message: 'Is not valid' }), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  // omitted: exclude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MyPrismaScalarsTypeCreateManyInputSchema: z.ZodType<Omit<PrismaClient.Prisma.MyPrismaScalarsTypeCreateManyInput, "exclude">> = z.object({
  id: z.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid().optional(),
  string: z.string().min(3, { message: "min error" }).max(10, { message: "max error" }).optional().nullable(),
  bic: z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }).optional().nullable(),
  float: z.number().lt(10, { message: "lt error" }).gt(5, { message: "gt error" }),
  floatOpt: z.number().optional().nullable(),
  int: z.number(),
  intOpt: z.number().optional().nullable(),
  decimal: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }),
  decimalOpt: z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }).optional().nullable(),
  date: z.date().optional(),
  dateOpt: z.date({ invalid_type_error: "wrong date type" }).optional().nullable(),
  bigIntOpt: z.bigint().optional().nullable(),
  json: z.union([z.lazy(() => JsonNullValueInputSchema), z.lazy(() => InputJsonValue).refine((val) => myFunction(val), { message: 'Is not valid' })]),
  jsonOpt: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  bytes: z.instanceof(Buffer).refine((val) => val ? true : false, { message: 'Value is not valid' }),
  bytesOpt: z.instanceof(Buffer).optional().nullable(),
  custom: z.string().refine((val) => myFunction(val), { message: 'Is not valid' }).optional().nullable(),
  // omitted: exclude: z.string().optional().nullable(),
}).strict();

export const MyPrismaScalarsTypeUpdateManyMutationInputSchema: z.ZodType<Omit<PrismaClient.Prisma.MyPrismaScalarsTypeUpdateManyMutationInput, "exclude">> = z.object({
  id: z.union([z.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  string: z.union([z.string().min(3, { message: "min error" }).max(10, { message: "max error" }), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  bic: z.union([z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  float: z.union([z.number().lt(10, { message: "lt error" }).gt(5, { message: "gt error" }), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  floatOpt: z.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)]).optional().nullable(),
  int: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  intOpt: z.union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  decimal: z.union([z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => DecimalFieldUpdateOperationsInputSchema)]).optional(),
  decimalOpt: z.union([z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema)]).optional().nullable(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  dateOpt: z.union([z.date({ invalid_type_error: "wrong date type" }), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  bigIntOpt: z.union([z.bigint(), z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  json: z.union([z.lazy(() => JsonNullValueInputSchema), z.lazy(() => InputJsonValue).refine((val) => myFunction(val), { message: 'Is not valid' })]).optional(),
  jsonOpt: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  bytes: z.union([z.instanceof(Buffer).refine((val) => val ? true : false, { message: 'Value is not valid' }), z.lazy(() => BytesFieldUpdateOperationsInputSchema)]).optional(),
  bytesOpt: z.union([z.instanceof(Buffer), z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema)]).optional().nullable(),
  custom: z.union([z.string().refine((val) => myFunction(val), { message: 'Is not valid' }), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  // omitted: exclude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MyPrismaScalarsTypeUncheckedUpdateManyInputSchema: z.ZodType<Omit<PrismaClient.Prisma.MyPrismaScalarsTypeUncheckedUpdateManyInput, "exclude">> = z.object({
  id: z.union([z.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  string: z.union([z.string().min(3, { message: "min error" }).max(10, { message: "max error" }), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  bic: z.union([z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  float: z.union([z.number().lt(10, { message: "lt error" }).gt(5, { message: "gt error" }), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  floatOpt: z.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)]).optional().nullable(),
  int: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  intOpt: z.union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  decimal: z.union([z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => DecimalFieldUpdateOperationsInputSchema)]).optional(),
  decimalOpt: z.union([z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }), z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema)]).optional().nullable(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  dateOpt: z.union([z.date({ invalid_type_error: "wrong date type" }), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  bigIntOpt: z.union([z.bigint(), z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  json: z.union([z.lazy(() => JsonNullValueInputSchema), z.lazy(() => InputJsonValue).refine((val) => myFunction(val), { message: 'Is not valid' })]).optional(),
  jsonOpt: z.union([z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValue]).optional(),
  bytes: z.union([z.instanceof(Buffer).refine((val) => val ? true : false, { message: 'Value is not valid' }), z.lazy(() => BytesFieldUpdateOperationsInputSchema)]).optional(),
  bytesOpt: z.union([z.instanceof(Buffer), z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema)]).optional().nullable(),
  custom: z.union([z.string().refine((val) => myFunction(val), { message: 'Is not valid' }), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  // omitted: exclude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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

export const UserCreateInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().min(1).max(100).optional().nullable(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutUserInputSchema).optional(),
  role: z.union([z.lazy(() => UserCreateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.lazy(() => AnotherEnumSchema).optional(),
  scalarList: z.union([z.lazy(() => UserCreatescalarListInputSchema), z.string().array()]).optional(),
  location: z.lazy(() => LocationCreateNestedOneWithoutUserInputSchema).optional(),
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().min(1).max(100).optional().nullable(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  profile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  role: z.union([z.lazy(() => UserCreateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.lazy(() => AnotherEnumSchema).optional(),
  scalarList: z.union([z.lazy(() => UserCreatescalarListInputSchema), z.string().array()]).optional(),
  lat: z.number(),
  lng: z.number(),
}).strict();

export const UserUpdateInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string().email({ message: "Invalid email address" }), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string().min(1).max(100), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  profile: z.lazy(() => ProfileUpdateOneWithoutUserNestedInputSchema).optional(),
  role: z.union([z.lazy(() => UserUpdateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.union([z.lazy(() => AnotherEnumSchema), z.lazy(() => EnumAnotherEnumFieldUpdateOperationsInputSchema)]).optional(),
  scalarList: z.union([z.lazy(() => UserUpdatescalarListInputSchema), z.string().array()]).optional(),
  location: z.lazy(() => LocationUpdateOneWithoutUserNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string().email({ message: "Invalid email address" }), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string().min(1).max(100), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  profile: z.lazy(() => ProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  role: z.union([z.lazy(() => UserUpdateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.union([z.lazy(() => AnotherEnumSchema), z.lazy(() => EnumAnotherEnumFieldUpdateOperationsInputSchema)]).optional(),
  scalarList: z.union([z.lazy(() => UserUpdatescalarListInputSchema), z.string().array()]).optional(),
  lat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  lng: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const UserCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().min(1).max(100).optional().nullable(),
  role: z.union([z.lazy(() => UserCreateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.lazy(() => AnotherEnumSchema).optional(),
  scalarList: z.union([z.lazy(() => UserCreatescalarListInputSchema), z.string().array()]).optional(),
  lat: z.number(),
  lng: z.number(),
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string().email({ message: "Invalid email address" }), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string().min(1).max(100), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  role: z.union([z.lazy(() => UserUpdateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.union([z.lazy(() => AnotherEnumSchema), z.lazy(() => EnumAnotherEnumFieldUpdateOperationsInputSchema)]).optional(),
  scalarList: z.union([z.lazy(() => UserUpdatescalarListInputSchema), z.string().array()]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string().email({ message: "Invalid email address" }), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string().min(1).max(100), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  role: z.union([z.lazy(() => UserUpdateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.union([z.lazy(() => AnotherEnumSchema), z.lazy(() => EnumAnotherEnumFieldUpdateOperationsInputSchema)]).optional(),
  scalarList: z.union([z.lazy(() => UserUpdatescalarListInputSchema), z.string().array()]).optional(),
  lat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  lng: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
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

export const LocationCreateInputSchema: z.ZodType<PrismaClient.Prisma.LocationCreateInput> = z.object({
  lat: z.number(),
  lng: z.number(),
  User: z.lazy(() => UserCreateNestedManyWithoutLocationInputSchema).optional(),
}).strict();

export const LocationUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.LocationUncheckedCreateInput> = z.object({
  lat: z.number(),
  lng: z.number(),
  User: z.lazy(() => UserUncheckedCreateNestedManyWithoutLocationInputSchema).optional(),
}).strict();

export const LocationUpdateInputSchema: z.ZodType<PrismaClient.Prisma.LocationUpdateInput> = z.object({
  lat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  lng: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  User: z.lazy(() => UserUpdateManyWithoutLocationNestedInputSchema).optional(),
}).strict();

export const LocationUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.LocationUncheckedUpdateInput> = z.object({
  lat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  lng: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  User: z.lazy(() => UserUncheckedUpdateManyWithoutLocationNestedInputSchema).optional(),
}).strict();

export const LocationCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.LocationCreateManyInput> = z.object({
  lat: z.number(),
  lng: z.number(),
}).strict();

export const LocationUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.LocationUpdateManyMutationInput> = z.object({
  lat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  lng: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const LocationUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.LocationUncheckedUpdateManyInput> = z.object({
  lat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  lng: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
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

export const MODELWithUpperCaseCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  STRING: z.lazy(() => SortOrderSchema).optional(),
  MYValue: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const MODELWithUpperCaseAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const MODELWithUpperCaseMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  STRING: z.lazy(() => SortOrderSchema).optional(),
  MYValue: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const MODELWithUpperCaseMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  STRING: z.lazy(() => SortOrderSchema).optional(),
  MYValue: z.lazy(() => SortOrderSchema).optional(),
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

export const ModelWithOmitFieldsCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithOmitFieldsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  string: z.lazy(() => SortOrderSchema).optional(),
  omitField: z.lazy(() => SortOrderSchema).optional(),
  omitRequired: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ModelWithOmitFieldsAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithOmitFieldsAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ModelWithOmitFieldsMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithOmitFieldsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  string: z.lazy(() => SortOrderSchema).optional(),
  omitField: z.lazy(() => SortOrderSchema).optional(),
  omitRequired: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ModelWithOmitFieldsMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithOmitFieldsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  string: z.lazy(() => SortOrderSchema).optional(),
  omitField: z.lazy(() => SortOrderSchema).optional(),
  omitRequired: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ModelWithOmitFieldsSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithOmitFieldsSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
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

export const ModelWithCommentsCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithCommentsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  string: z.lazy(() => SortOrderSchema).optional(),
  omitField: z.lazy(() => SortOrderSchema).optional(),
  omitRequired: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ModelWithCommentsAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithCommentsAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ModelWithCommentsMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithCommentsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  string: z.lazy(() => SortOrderSchema).optional(),
  omitField: z.lazy(() => SortOrderSchema).optional(),
  omitRequired: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ModelWithCommentsMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithCommentsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  string: z.lazy(() => SortOrderSchema).optional(),
  omitField: z.lazy(() => SortOrderSchema).optional(),
  omitRequired: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ModelWithCommentsSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithCommentsSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
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

export const MyPrismaScalarsTypeCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  string: z.lazy(() => SortOrderSchema).optional(),
  bic: z.lazy(() => SortOrderSchema).optional(),
  float: z.lazy(() => SortOrderSchema).optional(),
  floatOpt: z.lazy(() => SortOrderSchema).optional(),
  int: z.lazy(() => SortOrderSchema).optional(),
  intOpt: z.lazy(() => SortOrderSchema).optional(),
  decimal: z.lazy(() => SortOrderSchema).optional(),
  decimalOpt: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  dateOpt: z.lazy(() => SortOrderSchema).optional(),
  bigIntOpt: z.lazy(() => SortOrderSchema).optional(),
  json: z.lazy(() => SortOrderSchema).optional(),
  jsonOpt: z.lazy(() => SortOrderSchema).optional(),
  bytes: z.lazy(() => SortOrderSchema).optional(),
  bytesOpt: z.lazy(() => SortOrderSchema).optional(),
  custom: z.lazy(() => SortOrderSchema).optional(),
  exclude: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const MyPrismaScalarsTypeAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeAvgOrderByAggregateInput> = z.object({
  float: z.lazy(() => SortOrderSchema).optional(),
  floatOpt: z.lazy(() => SortOrderSchema).optional(),
  int: z.lazy(() => SortOrderSchema).optional(),
  intOpt: z.lazy(() => SortOrderSchema).optional(),
  decimal: z.lazy(() => SortOrderSchema).optional(),
  decimalOpt: z.lazy(() => SortOrderSchema).optional(),
  bigIntOpt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const MyPrismaScalarsTypeMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  string: z.lazy(() => SortOrderSchema).optional(),
  bic: z.lazy(() => SortOrderSchema).optional(),
  float: z.lazy(() => SortOrderSchema).optional(),
  floatOpt: z.lazy(() => SortOrderSchema).optional(),
  int: z.lazy(() => SortOrderSchema).optional(),
  intOpt: z.lazy(() => SortOrderSchema).optional(),
  decimal: z.lazy(() => SortOrderSchema).optional(),
  decimalOpt: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  dateOpt: z.lazy(() => SortOrderSchema).optional(),
  bigIntOpt: z.lazy(() => SortOrderSchema).optional(),
  bytes: z.lazy(() => SortOrderSchema).optional(),
  bytesOpt: z.lazy(() => SortOrderSchema).optional(),
  custom: z.lazy(() => SortOrderSchema).optional(),
  exclude: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const MyPrismaScalarsTypeMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  string: z.lazy(() => SortOrderSchema).optional(),
  bic: z.lazy(() => SortOrderSchema).optional(),
  float: z.lazy(() => SortOrderSchema).optional(),
  floatOpt: z.lazy(() => SortOrderSchema).optional(),
  int: z.lazy(() => SortOrderSchema).optional(),
  intOpt: z.lazy(() => SortOrderSchema).optional(),
  decimal: z.lazy(() => SortOrderSchema).optional(),
  decimalOpt: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  dateOpt: z.lazy(() => SortOrderSchema).optional(),
  bigIntOpt: z.lazy(() => SortOrderSchema).optional(),
  bytes: z.lazy(() => SortOrderSchema).optional(),
  bytesOpt: z.lazy(() => SortOrderSchema).optional(),
  custom: z.lazy(() => SortOrderSchema).optional(),
  exclude: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const MyPrismaScalarsTypeSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeSumOrderByAggregateInput> = z.object({
  float: z.lazy(() => SortOrderSchema).optional(),
  floatOpt: z.lazy(() => SortOrderSchema).optional(),
  int: z.lazy(() => SortOrderSchema).optional(),
  intOpt: z.lazy(() => SortOrderSchema).optional(),
  decimal: z.lazy(() => SortOrderSchema).optional(),
  decimalOpt: z.lazy(() => SortOrderSchema).optional(),
  bigIntOpt: z.lazy(() => SortOrderSchema).optional(),
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

export const StringNullableListFilterSchema: z.ZodType<PrismaClient.Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional(),
}).strict();

export const LocationRelationFilterSchema: z.ZodType<PrismaClient.Prisma.LocationRelationFilter> = z.object({
  is: z.lazy(() => LocationWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => LocationWhereInputSchema).optional().nullable(),
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
  scalarList: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.UserAvgOrderByAggregateInput> = z.object({
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enum: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enum: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.UserSumOrderByAggregateInput> = z.object({
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
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

export const UserListRelationFilterSchema: z.ZodType<PrismaClient.Prisma.UserListRelationFilter> = z.object({
  every: z.lazy(() => UserWhereInputSchema).optional(),
  some: z.lazy(() => UserWhereInputSchema).optional(),
  none: z.lazy(() => UserWhereInputSchema).optional(),
}).strict();

export const UserOrderByRelationAggregateInputSchema: z.ZodType<PrismaClient.Prisma.UserOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const LocationLatLngCompoundUniqueInputSchema: z.ZodType<PrismaClient.Prisma.LocationLatLngCompoundUniqueInput> = z.object({
  lat: z.number(),
  lng: z.number(),
}).strict();

export const LocationCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.LocationCountOrderByAggregateInput> = z.object({
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const LocationAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.LocationAvgOrderByAggregateInput> = z.object({
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const LocationMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.LocationMaxOrderByAggregateInput> = z.object({
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const LocationMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.LocationMinOrderByAggregateInput> = z.object({
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const LocationSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.LocationSumOrderByAggregateInput> = z.object({
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional(),
}).strict();

export const EnumMYValueFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.EnumMYValueFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => MYValueSchema).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable(),
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
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

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
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

export const UserCreatescalarListInputSchema: z.ZodType<PrismaClient.Prisma.UserCreatescalarListInput> = z.object({
  set: z.string().array(),
}).strict();

export const LocationCreateNestedOneWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.LocationCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([z.lazy(() => LocationCreateWithoutUserInputSchema), z.lazy(() => LocationUncheckedCreateWithoutUserInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => LocationCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => LocationWhereUniqueInputSchema).optional(),
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

export const UserUpdatescalarListInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdatescalarListInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([z.string(), z.string().array()]).optional(),
}).strict();

export const LocationUpdateOneWithoutUserNestedInputSchema: z.ZodType<PrismaClient.Prisma.LocationUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([z.lazy(() => LocationCreateWithoutUserInputSchema), z.lazy(() => LocationUncheckedCreateWithoutUserInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => LocationCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => LocationUpsertWithoutUserInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => LocationWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => LocationUpdateWithoutUserInputSchema), z.lazy(() => LocationUncheckedUpdateWithoutUserInputSchema)]).optional(),
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

export const UserCreateNestedManyWithoutLocationInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateNestedManyWithoutLocationInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutLocationInputSchema), z.lazy(() => UserCreateWithoutLocationInputSchema).array(), z.lazy(() => UserUncheckedCreateWithoutLocationInputSchema), z.lazy(() => UserUncheckedCreateWithoutLocationInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => UserCreateOrConnectWithoutLocationInputSchema), z.lazy(() => UserCreateOrConnectWithoutLocationInputSchema).array()]).optional(),
  createMany: z.lazy(() => UserCreateManyLocationInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const UserUncheckedCreateNestedManyWithoutLocationInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedCreateNestedManyWithoutLocationInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutLocationInputSchema), z.lazy(() => UserCreateWithoutLocationInputSchema).array(), z.lazy(() => UserUncheckedCreateWithoutLocationInputSchema), z.lazy(() => UserUncheckedCreateWithoutLocationInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => UserCreateOrConnectWithoutLocationInputSchema), z.lazy(() => UserCreateOrConnectWithoutLocationInputSchema).array()]).optional(),
  createMany: z.lazy(() => UserCreateManyLocationInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array()]).optional(),
}).strict();

export const UserUpdateManyWithoutLocationNestedInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateManyWithoutLocationNestedInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutLocationInputSchema), z.lazy(() => UserCreateWithoutLocationInputSchema).array(), z.lazy(() => UserUncheckedCreateWithoutLocationInputSchema), z.lazy(() => UserUncheckedCreateWithoutLocationInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => UserCreateOrConnectWithoutLocationInputSchema), z.lazy(() => UserCreateOrConnectWithoutLocationInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => UserUpsertWithWhereUniqueWithoutLocationInputSchema), z.lazy(() => UserUpsertWithWhereUniqueWithoutLocationInputSchema).array()]).optional(),
  createMany: z.lazy(() => UserCreateManyLocationInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => UserUpdateWithWhereUniqueWithoutLocationInputSchema), z.lazy(() => UserUpdateWithWhereUniqueWithoutLocationInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => UserUpdateManyWithWhereWithoutLocationInputSchema), z.lazy(() => UserUpdateManyWithWhereWithoutLocationInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => UserScalarWhereInputSchema), z.lazy(() => UserScalarWhereInputSchema).array()]).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutLocationNestedInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedUpdateManyWithoutLocationNestedInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutLocationInputSchema), z.lazy(() => UserCreateWithoutLocationInputSchema).array(), z.lazy(() => UserUncheckedCreateWithoutLocationInputSchema), z.lazy(() => UserUncheckedCreateWithoutLocationInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => UserCreateOrConnectWithoutLocationInputSchema), z.lazy(() => UserCreateOrConnectWithoutLocationInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => UserUpsertWithWhereUniqueWithoutLocationInputSchema), z.lazy(() => UserUpsertWithWhereUniqueWithoutLocationInputSchema).array()]).optional(),
  createMany: z.lazy(() => UserCreateManyLocationInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => UserUpdateWithWhereUniqueWithoutLocationInputSchema), z.lazy(() => UserUpdateWithWhereUniqueWithoutLocationInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => UserUpdateManyWithWhereWithoutLocationInputSchema), z.lazy(() => UserUpdateManyWithWhereWithoutLocationInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => UserScalarWhereInputSchema), z.lazy(() => UserScalarWhereInputSchema).array()]).optional(),
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

export const LocationCreateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.LocationCreateWithoutUserInput> = z.object({
  lat: z.number(),
  lng: z.number(),
}).strict();

export const LocationUncheckedCreateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.LocationUncheckedCreateWithoutUserInput> = z.object({
  lat: z.number(),
  lng: z.number(),
}).strict();

export const LocationCreateOrConnectWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.LocationCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => LocationWhereUniqueInputSchema),
  create: z.union([z.lazy(() => LocationCreateWithoutUserInputSchema), z.lazy(() => LocationUncheckedCreateWithoutUserInputSchema)]),
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

export const LocationUpsertWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.LocationUpsertWithoutUserInput> = z.object({
  update: z.union([z.lazy(() => LocationUpdateWithoutUserInputSchema), z.lazy(() => LocationUncheckedUpdateWithoutUserInputSchema)]),
  create: z.union([z.lazy(() => LocationCreateWithoutUserInputSchema), z.lazy(() => LocationUncheckedCreateWithoutUserInputSchema)]),
}).strict();

export const LocationUpdateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.LocationUpdateWithoutUserInput> = z.object({
  lat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  lng: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const LocationUncheckedUpdateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.LocationUncheckedUpdateWithoutUserInput> = z.object({
  lat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  lng: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const UserCreateWithoutPostsInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateWithoutPostsInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutUserInputSchema).optional(),
  role: z.union([z.lazy(() => UserCreateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.lazy(() => AnotherEnumSchema).optional(),
  scalarList: z.union([z.lazy(() => UserCreatescalarListInputSchema), z.string().array()]).optional(),
  location: z.lazy(() => LocationCreateNestedOneWithoutUserInputSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutPostsInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedCreateWithoutPostsInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  profile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  role: z.union([z.lazy(() => UserCreateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.lazy(() => AnotherEnumSchema).optional(),
  scalarList: z.union([z.lazy(() => UserCreatescalarListInputSchema), z.string().array()]).optional(),
  lat: z.number(),
  lng: z.number(),
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
  scalarList: z.union([z.lazy(() => UserUpdatescalarListInputSchema), z.string().array()]).optional(),
  location: z.lazy(() => LocationUpdateOneWithoutUserNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateWithoutPostsInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedUpdateWithoutPostsInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  profile: z.lazy(() => ProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  role: z.union([z.lazy(() => UserUpdateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.union([z.lazy(() => AnotherEnumSchema), z.lazy(() => EnumAnotherEnumFieldUpdateOperationsInputSchema)]).optional(),
  scalarList: z.union([z.lazy(() => UserUpdatescalarListInputSchema), z.string().array()]).optional(),
  lat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  lng: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const UserCreateWithoutProfileInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateWithoutProfileInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  role: z.union([z.lazy(() => UserCreateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.lazy(() => AnotherEnumSchema).optional(),
  scalarList: z.union([z.lazy(() => UserCreatescalarListInputSchema), z.string().array()]).optional(),
  location: z.lazy(() => LocationCreateNestedOneWithoutUserInputSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutProfileInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedCreateWithoutProfileInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  role: z.union([z.lazy(() => UserCreateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.lazy(() => AnotherEnumSchema).optional(),
  scalarList: z.union([z.lazy(() => UserCreatescalarListInputSchema), z.string().array()]).optional(),
  lat: z.number(),
  lng: z.number(),
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
  scalarList: z.union([z.lazy(() => UserUpdatescalarListInputSchema), z.string().array()]).optional(),
  location: z.lazy(() => LocationUpdateOneWithoutUserNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateWithoutProfileInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedUpdateWithoutProfileInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  role: z.union([z.lazy(() => UserUpdateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.union([z.lazy(() => AnotherEnumSchema), z.lazy(() => EnumAnotherEnumFieldUpdateOperationsInputSchema)]).optional(),
  scalarList: z.union([z.lazy(() => UserUpdatescalarListInputSchema), z.string().array()]).optional(),
  lat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  lng: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
}).strict();

export const UserCreateWithoutLocationInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateWithoutLocationInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutUserInputSchema).optional(),
  role: z.union([z.lazy(() => UserCreateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.lazy(() => AnotherEnumSchema).optional(),
  scalarList: z.union([z.lazy(() => UserCreatescalarListInputSchema), z.string().array()]).optional(),
}).strict();

export const UserUncheckedCreateWithoutLocationInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedCreateWithoutLocationInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  profile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  role: z.union([z.lazy(() => UserCreateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.lazy(() => AnotherEnumSchema).optional(),
  scalarList: z.union([z.lazy(() => UserCreatescalarListInputSchema), z.string().array()]).optional(),
}).strict();

export const UserCreateOrConnectWithoutLocationInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateOrConnectWithoutLocationInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([z.lazy(() => UserCreateWithoutLocationInputSchema), z.lazy(() => UserUncheckedCreateWithoutLocationInputSchema)]),
}).strict();

export const UserCreateManyLocationInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.UserCreateManyLocationInputEnvelope> = z.object({
  data: z.lazy(() => UserCreateManyLocationInputSchema).array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserUpsertWithWhereUniqueWithoutLocationInputSchema: z.ZodType<PrismaClient.Prisma.UserUpsertWithWhereUniqueWithoutLocationInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([z.lazy(() => UserUpdateWithoutLocationInputSchema), z.lazy(() => UserUncheckedUpdateWithoutLocationInputSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutLocationInputSchema), z.lazy(() => UserUncheckedCreateWithoutLocationInputSchema)]),
}).strict();

export const UserUpdateWithWhereUniqueWithoutLocationInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateWithWhereUniqueWithoutLocationInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([z.lazy(() => UserUpdateWithoutLocationInputSchema), z.lazy(() => UserUncheckedUpdateWithoutLocationInputSchema)]),
}).strict();

export const UserUpdateManyWithWhereWithoutLocationInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateManyWithWhereWithoutLocationInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([z.lazy(() => UserUpdateManyMutationInputSchema), z.lazy(() => UserUncheckedUpdateManyWithoutUserInputSchema)]),
}).strict();

export const UserScalarWhereInputSchema: z.ZodType<PrismaClient.Prisma.UserScalarWhereInput> = z.object({
  AND: z.union([z.lazy(() => UserScalarWhereInputSchema), z.lazy(() => UserScalarWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => UserScalarWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => UserScalarWhereInputSchema), z.lazy(() => UserScalarWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  role: z.lazy(() => EnumRoleNullableListFilterSchema).optional(),
  enum: z.union([z.lazy(() => EnumAnotherEnumFilterSchema), z.lazy(() => AnotherEnumSchema)]).optional(),
  scalarList: z.lazy(() => StringNullableListFilterSchema).optional(),
  lat: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  lng: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
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

export const UserCreateManyLocationInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateManyLocationInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().min(1).max(100).optional().nullable(),
  role: z.union([z.lazy(() => UserCreateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.lazy(() => AnotherEnumSchema).optional(),
  scalarList: z.union([z.lazy(() => UserCreatescalarListInputSchema), z.string().array()]).optional(),
}).strict();

export const UserUpdateWithoutLocationInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateWithoutLocationInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  profile: z.lazy(() => ProfileUpdateOneWithoutUserNestedInputSchema).optional(),
  role: z.union([z.lazy(() => UserUpdateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.union([z.lazy(() => AnotherEnumSchema), z.lazy(() => EnumAnotherEnumFieldUpdateOperationsInputSchema)]).optional(),
  scalarList: z.union([z.lazy(() => UserUpdatescalarListInputSchema), z.string().array()]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutLocationInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedUpdateWithoutLocationInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  profile: z.lazy(() => ProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  role: z.union([z.lazy(() => UserUpdateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.union([z.lazy(() => AnotherEnumSchema), z.lazy(() => EnumAnotherEnumFieldUpdateOperationsInputSchema)]).optional(),
  scalarList: z.union([z.lazy(() => UserUpdatescalarListInputSchema), z.string().array()]).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string().email({ message: "Invalid email address" }), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string().min(1).max(100), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  role: z.union([z.lazy(() => UserUpdateroleInputSchema), z.lazy(() => RoleSchema).array()]).optional(),
  enum: z.union([z.lazy(() => AnotherEnumSchema), z.lazy(() => EnumAnotherEnumFieldUpdateOperationsInputSchema)]).optional(),
  scalarList: z.union([z.lazy(() => UserUpdatescalarListInputSchema), z.string().array()]).optional(),
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

export const ModelWithOmitFieldsFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.ModelWithOmitFieldsFindFirstArgs> = z.object({
  select: ModelWithOmitFieldsSelectSchema.optional(),
  where: ModelWithOmitFieldsWhereInputSchema.optional(),
  orderBy: z.union([ModelWithOmitFieldsOrderByWithRelationInputSchema.array(), ModelWithOmitFieldsOrderByWithRelationInputSchema]).optional(),
  cursor: ModelWithOmitFieldsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ModelWithOmitFieldsScalarFieldEnumSchema.array().optional(),
}).strict();

export const ModelWithOmitFieldsFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.ModelWithOmitFieldsFindFirstOrThrowArgs> = z.object({
  select: ModelWithOmitFieldsSelectSchema.optional(),
  where: ModelWithOmitFieldsWhereInputSchema.optional(),
  orderBy: z.union([ModelWithOmitFieldsOrderByWithRelationInputSchema.array(), ModelWithOmitFieldsOrderByWithRelationInputSchema]).optional(),
  cursor: ModelWithOmitFieldsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ModelWithOmitFieldsScalarFieldEnumSchema.array().optional(),
}).strict();

export const ModelWithOmitFieldsFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.ModelWithOmitFieldsFindManyArgs> = z.object({
  select: ModelWithOmitFieldsSelectSchema.optional(),
  where: ModelWithOmitFieldsWhereInputSchema.optional(),
  orderBy: z.union([ModelWithOmitFieldsOrderByWithRelationInputSchema.array(), ModelWithOmitFieldsOrderByWithRelationInputSchema]).optional(),
  cursor: ModelWithOmitFieldsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ModelWithOmitFieldsScalarFieldEnumSchema.array().optional(),
}).strict();

export const ModelWithOmitFieldsAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.ModelWithOmitFieldsAggregateArgs> = z.object({
  select: ModelWithOmitFieldsSelectSchema.optional(),
  where: ModelWithOmitFieldsWhereInputSchema.optional(),
  orderBy: z.union([ModelWithOmitFieldsOrderByWithRelationInputSchema.array(), ModelWithOmitFieldsOrderByWithRelationInputSchema]).optional(),
  cursor: ModelWithOmitFieldsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ModelWithOmitFieldsGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.ModelWithOmitFieldsGroupByArgs> = z.object({
  select: ModelWithOmitFieldsSelectSchema.optional(),
  where: ModelWithOmitFieldsWhereInputSchema.optional(),
  orderBy: z.union([ModelWithOmitFieldsOrderByWithAggregationInputSchema.array(), ModelWithOmitFieldsOrderByWithAggregationInputSchema]).optional(),
  by: ModelWithOmitFieldsScalarFieldEnumSchema.array(),
  having: ModelWithOmitFieldsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ModelWithOmitFieldsFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.ModelWithOmitFieldsFindUniqueArgs> = z.object({
  select: ModelWithOmitFieldsSelectSchema.optional(),
  where: ModelWithOmitFieldsWhereUniqueInputSchema,
}).strict();

export const ModelWithOmitFieldsFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.ModelWithOmitFieldsFindUniqueOrThrowArgs> = z.object({
  select: ModelWithOmitFieldsSelectSchema.optional(),
  where: ModelWithOmitFieldsWhereUniqueInputSchema,
}).strict();

export const ModelWithCommentsFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.ModelWithCommentsFindFirstArgs> = z.object({
  select: ModelWithCommentsSelectSchema.optional(),
  where: ModelWithCommentsWhereInputSchema.optional(),
  orderBy: z.union([ModelWithCommentsOrderByWithRelationInputSchema.array(), ModelWithCommentsOrderByWithRelationInputSchema]).optional(),
  cursor: ModelWithCommentsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ModelWithCommentsScalarFieldEnumSchema.array().optional(),
}).strict();

export const ModelWithCommentsFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.ModelWithCommentsFindFirstOrThrowArgs> = z.object({
  select: ModelWithCommentsSelectSchema.optional(),
  where: ModelWithCommentsWhereInputSchema.optional(),
  orderBy: z.union([ModelWithCommentsOrderByWithRelationInputSchema.array(), ModelWithCommentsOrderByWithRelationInputSchema]).optional(),
  cursor: ModelWithCommentsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ModelWithCommentsScalarFieldEnumSchema.array().optional(),
}).strict();

export const ModelWithCommentsFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.ModelWithCommentsFindManyArgs> = z.object({
  select: ModelWithCommentsSelectSchema.optional(),
  where: ModelWithCommentsWhereInputSchema.optional(),
  orderBy: z.union([ModelWithCommentsOrderByWithRelationInputSchema.array(), ModelWithCommentsOrderByWithRelationInputSchema]).optional(),
  cursor: ModelWithCommentsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ModelWithCommentsScalarFieldEnumSchema.array().optional(),
}).strict();

export const ModelWithCommentsAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.ModelWithCommentsAggregateArgs> = z.object({
  select: ModelWithCommentsSelectSchema.optional(),
  where: ModelWithCommentsWhereInputSchema.optional(),
  orderBy: z.union([ModelWithCommentsOrderByWithRelationInputSchema.array(), ModelWithCommentsOrderByWithRelationInputSchema]).optional(),
  cursor: ModelWithCommentsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ModelWithCommentsGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.ModelWithCommentsGroupByArgs> = z.object({
  select: ModelWithCommentsSelectSchema.optional(),
  where: ModelWithCommentsWhereInputSchema.optional(),
  orderBy: z.union([ModelWithCommentsOrderByWithAggregationInputSchema.array(), ModelWithCommentsOrderByWithAggregationInputSchema]).optional(),
  by: ModelWithCommentsScalarFieldEnumSchema.array(),
  having: ModelWithCommentsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ModelWithCommentsFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.ModelWithCommentsFindUniqueArgs> = z.object({
  select: ModelWithCommentsSelectSchema.optional(),
  where: ModelWithCommentsWhereUniqueInputSchema,
}).strict();

export const ModelWithCommentsFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.ModelWithCommentsFindUniqueOrThrowArgs> = z.object({
  select: ModelWithCommentsSelectSchema.optional(),
  where: ModelWithCommentsWhereUniqueInputSchema,
}).strict();

export const MyPrismaScalarsTypeFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeFindFirstArgs> = z.object({
  select: MyPrismaScalarsTypeSelectSchema.optional(),
  where: MyPrismaScalarsTypeWhereInputSchema.optional(),
  orderBy: z.union([MyPrismaScalarsTypeOrderByWithRelationInputSchema.array(), MyPrismaScalarsTypeOrderByWithRelationInputSchema]).optional(),
  cursor: MyPrismaScalarsTypeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: MyPrismaScalarsTypeScalarFieldEnumSchema.array().optional(),
}).strict();

export const MyPrismaScalarsTypeFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeFindFirstOrThrowArgs> = z.object({
  select: MyPrismaScalarsTypeSelectSchema.optional(),
  where: MyPrismaScalarsTypeWhereInputSchema.optional(),
  orderBy: z.union([MyPrismaScalarsTypeOrderByWithRelationInputSchema.array(), MyPrismaScalarsTypeOrderByWithRelationInputSchema]).optional(),
  cursor: MyPrismaScalarsTypeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: MyPrismaScalarsTypeScalarFieldEnumSchema.array().optional(),
}).strict();

export const MyPrismaScalarsTypeFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeFindManyArgs> = z.object({
  select: MyPrismaScalarsTypeSelectSchema.optional(),
  where: MyPrismaScalarsTypeWhereInputSchema.optional(),
  orderBy: z.union([MyPrismaScalarsTypeOrderByWithRelationInputSchema.array(), MyPrismaScalarsTypeOrderByWithRelationInputSchema]).optional(),
  cursor: MyPrismaScalarsTypeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: MyPrismaScalarsTypeScalarFieldEnumSchema.array().optional(),
}).strict();

export const MyPrismaScalarsTypeAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeAggregateArgs> = z.object({
  select: MyPrismaScalarsTypeSelectSchema.optional(),
  where: MyPrismaScalarsTypeWhereInputSchema.optional(),
  orderBy: z.union([MyPrismaScalarsTypeOrderByWithRelationInputSchema.array(), MyPrismaScalarsTypeOrderByWithRelationInputSchema]).optional(),
  cursor: MyPrismaScalarsTypeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const MyPrismaScalarsTypeGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeGroupByArgs> = z.object({
  select: MyPrismaScalarsTypeSelectSchema.optional(),
  where: MyPrismaScalarsTypeWhereInputSchema.optional(),
  orderBy: z.union([MyPrismaScalarsTypeOrderByWithAggregationInputSchema.array(), MyPrismaScalarsTypeOrderByWithAggregationInputSchema]).optional(),
  by: MyPrismaScalarsTypeScalarFieldEnumSchema.array(),
  having: MyPrismaScalarsTypeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const MyPrismaScalarsTypeFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeFindUniqueArgs> = z.object({
  select: MyPrismaScalarsTypeSelectSchema.optional(),
  where: MyPrismaScalarsTypeWhereUniqueInputSchema,
}).strict();

export const MyPrismaScalarsTypeFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeFindUniqueOrThrowArgs> = z.object({
  select: MyPrismaScalarsTypeSelectSchema.optional(),
  where: MyPrismaScalarsTypeWhereUniqueInputSchema,
}).strict();

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

export const UserFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict();

export const UserFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict();

export const UserFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict();

export const UserAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.UserAggregateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.UserGroupByArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([UserOrderByWithAggregationInputSchema.array(), UserOrderByWithAggregationInputSchema]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict();

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict();

export const PostFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.PostFindFirstArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([PostOrderByWithRelationInputSchema.array(), PostOrderByWithRelationInputSchema]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PostScalarFieldEnumSchema.array().optional(),
}).strict();

export const PostFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.PostFindFirstOrThrowArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([PostOrderByWithRelationInputSchema.array(), PostOrderByWithRelationInputSchema]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PostScalarFieldEnumSchema.array().optional(),
}).strict();

export const PostFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.PostFindManyArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([PostOrderByWithRelationInputSchema.array(), PostOrderByWithRelationInputSchema]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PostScalarFieldEnumSchema.array().optional(),
}).strict();

export const PostAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.PostAggregateArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([PostOrderByWithRelationInputSchema.array(), PostOrderByWithRelationInputSchema]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const PostGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.PostGroupByArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([PostOrderByWithAggregationInputSchema.array(), PostOrderByWithAggregationInputSchema]).optional(),
  by: PostScalarFieldEnumSchema.array(),
  having: PostScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const PostFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.PostFindUniqueArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
}).strict();

export const PostFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.PostFindUniqueOrThrowArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
}).strict();

export const ProfileFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.ProfileFindFirstArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereInputSchema.optional(),
  orderBy: z.union([ProfileOrderByWithRelationInputSchema.array(), ProfileOrderByWithRelationInputSchema]).optional(),
  cursor: ProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ProfileScalarFieldEnumSchema.array().optional(),
}).strict();

export const ProfileFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.ProfileFindFirstOrThrowArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereInputSchema.optional(),
  orderBy: z.union([ProfileOrderByWithRelationInputSchema.array(), ProfileOrderByWithRelationInputSchema]).optional(),
  cursor: ProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ProfileScalarFieldEnumSchema.array().optional(),
}).strict();

export const ProfileFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.ProfileFindManyArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereInputSchema.optional(),
  orderBy: z.union([ProfileOrderByWithRelationInputSchema.array(), ProfileOrderByWithRelationInputSchema]).optional(),
  cursor: ProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ProfileScalarFieldEnumSchema.array().optional(),
}).strict();

export const ProfileAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.ProfileAggregateArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereInputSchema.optional(),
  orderBy: z.union([ProfileOrderByWithRelationInputSchema.array(), ProfileOrderByWithRelationInputSchema]).optional(),
  cursor: ProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ProfileGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.ProfileGroupByArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereInputSchema.optional(),
  orderBy: z.union([ProfileOrderByWithAggregationInputSchema.array(), ProfileOrderByWithAggregationInputSchema]).optional(),
  by: ProfileScalarFieldEnumSchema.array(),
  having: ProfileScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ProfileFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.ProfileFindUniqueArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereUniqueInputSchema,
}).strict();

export const ProfileFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.ProfileFindUniqueOrThrowArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereUniqueInputSchema,
}).strict();

export const LocationFindFirstArgsSchema: z.ZodType<PrismaClient.Prisma.LocationFindFirstArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([LocationOrderByWithRelationInputSchema.array(), LocationOrderByWithRelationInputSchema]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: LocationScalarFieldEnumSchema.array().optional(),
}).strict();

export const LocationFindFirstOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.LocationFindFirstOrThrowArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([LocationOrderByWithRelationInputSchema.array(), LocationOrderByWithRelationInputSchema]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: LocationScalarFieldEnumSchema.array().optional(),
}).strict();

export const LocationFindManyArgsSchema: z.ZodType<PrismaClient.Prisma.LocationFindManyArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([LocationOrderByWithRelationInputSchema.array(), LocationOrderByWithRelationInputSchema]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: LocationScalarFieldEnumSchema.array().optional(),
}).strict();

export const LocationAggregateArgsSchema: z.ZodType<PrismaClient.Prisma.LocationAggregateArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([LocationOrderByWithRelationInputSchema.array(), LocationOrderByWithRelationInputSchema]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const LocationGroupByArgsSchema: z.ZodType<PrismaClient.Prisma.LocationGroupByArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([LocationOrderByWithAggregationInputSchema.array(), LocationOrderByWithAggregationInputSchema]).optional(),
  by: LocationScalarFieldEnumSchema.array(),
  having: LocationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const LocationFindUniqueArgsSchema: z.ZodType<PrismaClient.Prisma.LocationFindUniqueArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
}).strict();

export const LocationFindUniqueOrThrowArgsSchema: z.ZodType<PrismaClient.Prisma.LocationFindUniqueOrThrowArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
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

export const ModelWithOmitFieldsCreateArgsSchema: z.ZodType<Omit<PrismaClient.Prisma.ModelWithOmitFieldsCreateArgs, "data"> & { data: z.infer<typeof ModelWithOmitFieldsCreateInputSchema> | z.infer<typeof ModelWithOmitFieldsUncheckedCreateInputSchema> }> = z.object({
  select: ModelWithOmitFieldsSelectSchema.optional(),
  data: z.union([ModelWithOmitFieldsCreateInputSchema, ModelWithOmitFieldsUncheckedCreateInputSchema]),
}).strict();

export const ModelWithOmitFieldsUpsertArgsSchema: z.ZodType<Omit<PrismaClient.Prisma.ModelWithOmitFieldsUpsertArgs, "create" | "update"> & { create: z.infer<typeof ModelWithOmitFieldsCreateInputSchema> | z.infer<typeof ModelWithOmitFieldsUncheckedCreateInputSchema>, update: z.infer<typeof ModelWithOmitFieldsUpdateInputSchema> | z.infer<typeof ModelWithOmitFieldsUncheckedUpdateInputSchema> }> = z.object({
  select: ModelWithOmitFieldsSelectSchema.optional(),
  where: ModelWithOmitFieldsWhereUniqueInputSchema,
  create: z.union([ModelWithOmitFieldsCreateInputSchema, ModelWithOmitFieldsUncheckedCreateInputSchema]),
  update: z.union([ModelWithOmitFieldsUpdateInputSchema, ModelWithOmitFieldsUncheckedUpdateInputSchema]),
}).strict();

export const ModelWithOmitFieldsCreateManyArgsSchema: z.ZodType<Omit<PrismaClient.Prisma.ModelWithOmitFieldsCreateManyArgs, "data"> & {
  data: z.infer<typeof ModelWithOmitFieldsCreateManyInputSchema>[]
}> = z.object({
  data: ModelWithOmitFieldsCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ModelWithOmitFieldsDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.ModelWithOmitFieldsDeleteArgs> = z.object({
  select: ModelWithOmitFieldsSelectSchema.optional(),
  where: ModelWithOmitFieldsWhereUniqueInputSchema,
}).strict();

export const ModelWithOmitFieldsUpdateArgsSchema: z.ZodType<Omit<PrismaClient.Prisma.ModelWithOmitFieldsUpdateArgs, "data"> & { data: z.infer<typeof ModelWithOmitFieldsUpdateInputSchema> | z.infer<typeof ModelWithOmitFieldsUncheckedUpdateInputSchema>, }> = z.object({
  select: ModelWithOmitFieldsSelectSchema.optional(),
  data: z.union([ModelWithOmitFieldsUpdateInputSchema, ModelWithOmitFieldsUncheckedUpdateInputSchema]),
  where: ModelWithOmitFieldsWhereUniqueInputSchema,
}).strict();

export const ModelWithOmitFieldsUpdateManyArgsSchema: z.ZodType<Omit<PrismaClient.Prisma.ModelWithOmitFieldsUpdateManyArgs, "data"> & { data: z.infer<typeof ModelWithOmitFieldsUpdateManyMutationInputSchema> | z.infer<typeof ModelWithOmitFieldsUncheckedUpdateManyInputSchema>, }> = z.object({
  data: z.union([ModelWithOmitFieldsUpdateManyMutationInputSchema, ModelWithOmitFieldsUncheckedUpdateManyInputSchema]),
  where: ModelWithOmitFieldsWhereInputSchema.optional(),
}).strict();

export const ModelWithOmitFieldsDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.ModelWithOmitFieldsDeleteManyArgs> = z.object({
  where: ModelWithOmitFieldsWhereInputSchema.optional(),
}).strict();

export const ModelWithCommentsCreateArgsSchema: z.ZodType<Omit<PrismaClient.Prisma.ModelWithCommentsCreateArgs, "data"> & { data: z.infer<typeof ModelWithCommentsCreateInputSchema> | z.infer<typeof ModelWithCommentsUncheckedCreateInputSchema> }> = z.object({
  select: ModelWithCommentsSelectSchema.optional(),
  data: z.union([ModelWithCommentsCreateInputSchema, ModelWithCommentsUncheckedCreateInputSchema]),
}).strict();

export const ModelWithCommentsUpsertArgsSchema: z.ZodType<Omit<PrismaClient.Prisma.ModelWithCommentsUpsertArgs, "create" | "update"> & { create: z.infer<typeof ModelWithCommentsCreateInputSchema> | z.infer<typeof ModelWithCommentsUncheckedCreateInputSchema>, update: z.infer<typeof ModelWithCommentsUpdateInputSchema> | z.infer<typeof ModelWithCommentsUncheckedUpdateInputSchema> }> = z.object({
  select: ModelWithCommentsSelectSchema.optional(),
  where: ModelWithCommentsWhereUniqueInputSchema,
  create: z.union([ModelWithCommentsCreateInputSchema, ModelWithCommentsUncheckedCreateInputSchema]),
  update: z.union([ModelWithCommentsUpdateInputSchema, ModelWithCommentsUncheckedUpdateInputSchema]),
}).strict();

export const ModelWithCommentsCreateManyArgsSchema: z.ZodType<Omit<PrismaClient.Prisma.ModelWithCommentsCreateManyArgs, "data"> & {
  data: z.infer<typeof ModelWithCommentsCreateManyInputSchema>[]
}> = z.object({
  data: ModelWithCommentsCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ModelWithCommentsDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.ModelWithCommentsDeleteArgs> = z.object({
  select: ModelWithCommentsSelectSchema.optional(),
  where: ModelWithCommentsWhereUniqueInputSchema,
}).strict();

export const ModelWithCommentsUpdateArgsSchema: z.ZodType<Omit<PrismaClient.Prisma.ModelWithCommentsUpdateArgs, "data"> & { data: z.infer<typeof ModelWithCommentsUpdateInputSchema> | z.infer<typeof ModelWithCommentsUncheckedUpdateInputSchema>, }> = z.object({
  select: ModelWithCommentsSelectSchema.optional(),
  data: z.union([ModelWithCommentsUpdateInputSchema, ModelWithCommentsUncheckedUpdateInputSchema]),
  where: ModelWithCommentsWhereUniqueInputSchema,
}).strict();

export const ModelWithCommentsUpdateManyArgsSchema: z.ZodType<Omit<PrismaClient.Prisma.ModelWithCommentsUpdateManyArgs, "data"> & { data: z.infer<typeof ModelWithCommentsUpdateManyMutationInputSchema> | z.infer<typeof ModelWithCommentsUncheckedUpdateManyInputSchema>, }> = z.object({
  data: z.union([ModelWithCommentsUpdateManyMutationInputSchema, ModelWithCommentsUncheckedUpdateManyInputSchema]),
  where: ModelWithCommentsWhereInputSchema.optional(),
}).strict();

export const ModelWithCommentsDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.ModelWithCommentsDeleteManyArgs> = z.object({
  where: ModelWithCommentsWhereInputSchema.optional(),
}).strict();

export const MyPrismaScalarsTypeCreateArgsSchema: z.ZodType<Omit<PrismaClient.Prisma.MyPrismaScalarsTypeCreateArgs, "data"> & { data: z.infer<typeof MyPrismaScalarsTypeCreateInputSchema> | z.infer<typeof MyPrismaScalarsTypeUncheckedCreateInputSchema> }> = z.object({
  select: MyPrismaScalarsTypeSelectSchema.optional(),
  data: z.union([MyPrismaScalarsTypeCreateInputSchema, MyPrismaScalarsTypeUncheckedCreateInputSchema]),
}).strict();

export const MyPrismaScalarsTypeUpsertArgsSchema: z.ZodType<Omit<PrismaClient.Prisma.MyPrismaScalarsTypeUpsertArgs, "create" | "update"> & { create: z.infer<typeof MyPrismaScalarsTypeCreateInputSchema> | z.infer<typeof MyPrismaScalarsTypeUncheckedCreateInputSchema>, update: z.infer<typeof MyPrismaScalarsTypeUpdateInputSchema> | z.infer<typeof MyPrismaScalarsTypeUncheckedUpdateInputSchema> }> = z.object({
  select: MyPrismaScalarsTypeSelectSchema.optional(),
  where: MyPrismaScalarsTypeWhereUniqueInputSchema,
  create: z.union([MyPrismaScalarsTypeCreateInputSchema, MyPrismaScalarsTypeUncheckedCreateInputSchema]),
  update: z.union([MyPrismaScalarsTypeUpdateInputSchema, MyPrismaScalarsTypeUncheckedUpdateInputSchema]),
}).strict();

export const MyPrismaScalarsTypeCreateManyArgsSchema: z.ZodType<Omit<PrismaClient.Prisma.MyPrismaScalarsTypeCreateManyArgs, "data"> & {
  data: z.infer<typeof MyPrismaScalarsTypeCreateManyInputSchema>[]
}> = z.object({
  data: MyPrismaScalarsTypeCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const MyPrismaScalarsTypeDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeDeleteArgs> = z.object({
  select: MyPrismaScalarsTypeSelectSchema.optional(),
  where: MyPrismaScalarsTypeWhereUniqueInputSchema,
}).strict();

export const MyPrismaScalarsTypeUpdateArgsSchema: z.ZodType<Omit<PrismaClient.Prisma.MyPrismaScalarsTypeUpdateArgs, "data"> & { data: z.infer<typeof MyPrismaScalarsTypeUpdateInputSchema> | z.infer<typeof MyPrismaScalarsTypeUncheckedUpdateInputSchema>, }> = z.object({
  select: MyPrismaScalarsTypeSelectSchema.optional(),
  data: z.union([MyPrismaScalarsTypeUpdateInputSchema, MyPrismaScalarsTypeUncheckedUpdateInputSchema]),
  where: MyPrismaScalarsTypeWhereUniqueInputSchema,
}).strict();

export const MyPrismaScalarsTypeUpdateManyArgsSchema: z.ZodType<Omit<PrismaClient.Prisma.MyPrismaScalarsTypeUpdateManyArgs, "data"> & { data: z.infer<typeof MyPrismaScalarsTypeUpdateManyMutationInputSchema> | z.infer<typeof MyPrismaScalarsTypeUncheckedUpdateManyInputSchema>, }> = z.object({
  data: z.union([MyPrismaScalarsTypeUpdateManyMutationInputSchema, MyPrismaScalarsTypeUncheckedUpdateManyInputSchema]),
  where: MyPrismaScalarsTypeWhereInputSchema.optional(),
}).strict();

export const MyPrismaScalarsTypeDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeDeleteManyArgs> = z.object({
  where: MyPrismaScalarsTypeWhereInputSchema.optional(),
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

export const UserCreateArgsSchema: z.ZodType<PrismaClient.Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
}).strict();

export const UserUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
  update: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
}).strict();

export const UserCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.UserCreateManyArgs> = z.object({
  data: UserCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict();

export const UserUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
  where: UserWhereUniqueInputSchema,
}).strict();

export const UserUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema]),
  where: UserWhereInputSchema.optional(),
}).strict();

export const UserDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict();

export const PostCreateArgsSchema: z.ZodType<PrismaClient.Prisma.PostCreateArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  data: z.union([PostCreateInputSchema, PostUncheckedCreateInputSchema]),
}).strict();

export const PostUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.PostUpsertArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
  create: z.union([PostCreateInputSchema, PostUncheckedCreateInputSchema]),
  update: z.union([PostUpdateInputSchema, PostUncheckedUpdateInputSchema]),
}).strict();

export const PostCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.PostCreateManyArgs> = z.object({
  data: PostCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const PostDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.PostDeleteArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
}).strict();

export const PostUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.PostUpdateArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  data: z.union([PostUpdateInputSchema, PostUncheckedUpdateInputSchema]),
  where: PostWhereUniqueInputSchema,
}).strict();

export const PostUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.PostUpdateManyArgs> = z.object({
  data: z.union([PostUpdateManyMutationInputSchema, PostUncheckedUpdateManyInputSchema]),
  where: PostWhereInputSchema.optional(),
}).strict();

export const PostDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.PostDeleteManyArgs> = z.object({
  where: PostWhereInputSchema.optional(),
}).strict();

export const ProfileCreateArgsSchema: z.ZodType<PrismaClient.Prisma.ProfileCreateArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  data: z.union([ProfileCreateInputSchema, ProfileUncheckedCreateInputSchema]),
}).strict();

export const ProfileUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.ProfileUpsertArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereUniqueInputSchema,
  create: z.union([ProfileCreateInputSchema, ProfileUncheckedCreateInputSchema]),
  update: z.union([ProfileUpdateInputSchema, ProfileUncheckedUpdateInputSchema]),
}).strict();

export const ProfileCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.ProfileCreateManyArgs> = z.object({
  data: ProfileCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ProfileDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.ProfileDeleteArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereUniqueInputSchema,
}).strict();

export const ProfileUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.ProfileUpdateArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  data: z.union([ProfileUpdateInputSchema, ProfileUncheckedUpdateInputSchema]),
  where: ProfileWhereUniqueInputSchema,
}).strict();

export const ProfileUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.ProfileUpdateManyArgs> = z.object({
  data: z.union([ProfileUpdateManyMutationInputSchema, ProfileUncheckedUpdateManyInputSchema]),
  where: ProfileWhereInputSchema.optional(),
}).strict();

export const ProfileDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.ProfileDeleteManyArgs> = z.object({
  where: ProfileWhereInputSchema.optional(),
}).strict();

export const LocationCreateArgsSchema: z.ZodType<PrismaClient.Prisma.LocationCreateArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  data: z.union([LocationCreateInputSchema, LocationUncheckedCreateInputSchema]),
}).strict();

export const LocationUpsertArgsSchema: z.ZodType<PrismaClient.Prisma.LocationUpsertArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
  create: z.union([LocationCreateInputSchema, LocationUncheckedCreateInputSchema]),
  update: z.union([LocationUpdateInputSchema, LocationUncheckedUpdateInputSchema]),
}).strict();

export const LocationCreateManyArgsSchema: z.ZodType<PrismaClient.Prisma.LocationCreateManyArgs> = z.object({
  data: LocationCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const LocationDeleteArgsSchema: z.ZodType<PrismaClient.Prisma.LocationDeleteArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
}).strict();

export const LocationUpdateArgsSchema: z.ZodType<PrismaClient.Prisma.LocationUpdateArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  data: z.union([LocationUpdateInputSchema, LocationUncheckedUpdateInputSchema]),
  where: LocationWhereUniqueInputSchema,
}).strict();

export const LocationUpdateManyArgsSchema: z.ZodType<PrismaClient.Prisma.LocationUpdateManyArgs> = z.object({
  data: z.union([LocationUpdateManyMutationInputSchema, LocationUncheckedUpdateManyInputSchema]),
  where: LocationWhereInputSchema.optional(),
}).strict();

export const LocationDeleteManyArgsSchema: z.ZodType<PrismaClient.Prisma.LocationDeleteManyArgs> = z.object({
  where: LocationWhereInputSchema.optional(),
}).strict();
