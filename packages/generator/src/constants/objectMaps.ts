import { FormattedNames } from '../classes/formattedNames';
import {
  PrismaAction,
  PrismaActionPrimitives,
  PrismaScalarType,
  ZodCustomErrorKey,
  ZodPrismaScalarType,
  ZodScalarType,
  ZodValidatorType,
} from '../types';

/////////////////////////////////////////////////
// VALIDATOR TYPE MAP
/////////////////////////////////////////////////

/**
 * @deprecated
 * Map all `validators` that can be used in the documentation of the prisma.schema
 * to the prisma scalar types on which this `validator` is allowed.
 *
 * E.g. when `@zod.string.max(10)` is used on a prisma `String` type,
 * the map is used to determine if the zod validator is valid
 * for this specific scalar type.
 *
 * @example myPrismaField: String ///@zod.string.max(10) -> valid
 * @example myPrismaField: Boolean ///@zod.custom(..some custom implementation) -> valid
 * @example myPrismaField: Int ///@zod.string.max(10) -> invalid throws error during generation
 */
export const PRISMA_TO_VALIDATOR_TYPE_MAP: Record<
  ZodValidatorType | 'custom',
  PrismaScalarType[]
> = {
  string: ['String'],
  number: ['Float', 'Int'],
  bigint: ['BigInt'],
  date: ['DateTime'],
  custom: [
    'String',
    'Boolean',
    'Int',
    'BigInt',
    'Float',
    'Decimal',
    'DateTime',
    'Json',
    'Bytes',
  ],
};

/////////////////////////////////////////////////
// PRISMA TYPE MAP
/////////////////////////////////////////////////

/**
 * Map prisma scalar types to their corresponding zod validators.
 */
export const PRISMA_TO_ZOD_TYPE_MAP: Record<
  ZodPrismaScalarType,
  ZodScalarType
> = {
  String: 'string',
  Boolean: 'boolean',
  DateTime: 'date',
  Int: 'number',
  BigInt: 'bigint',
  Float: 'number',
};

/////////////////////////////////////////////////
// ZOD VALID ERROR KEYS
/////////////////////////////////////////////////

/**
 * @deprecated
 */
export const ZOD_VALID_ERROR_KEYS: ZodCustomErrorKey[] = [
  'invalid_type_error',
  'required_error',
  'error',
  'description',
];

/////////////////////////////////////////////
// PRISMA ACTION MAP
/////////////////////////////////////////////

export type FilterdPrismaAction = Exclude<
  PrismaAction,
  'executeRaw' | 'queryRaw' | 'count'
>;

export type FilterdPrismaActionPrimitive = Exclude<
  PrismaActionPrimitives,
  'executeRaw' | 'queryRaw' | 'count'
>;

/**
 * Map is used to get the right naming for the prisma action
 * according to the prisma schema.
 * @example type UserFindUnique // becomes const UserFindUnique = ...
 */
export const PRISMA_ACTION_ARG_MAP: Record<
  FilterdPrismaAction,
  FormattedNames
> = {
  findUnique: new FormattedNames('findUnique'),
  findUniqueOrThrow: new FormattedNames('findUniqueOrThrow'),
  findMany: new FormattedNames('findMany'),
  findFirst: new FormattedNames('findFirst'),
  findFirstOrThrow: new FormattedNames('findFirstOrThrow'),
  createOne: new FormattedNames('create'),
  createMany: new FormattedNames('createMany'),
  createManyAndReturn: new FormattedNames('createManyAndReturn'),
  updateManyAndReturn: new FormattedNames('updateManyAndReturn'),
  updateOne: new FormattedNames('update'),
  updateMany: new FormattedNames('updateMany'),
  upsertOne: new FormattedNames('upsert'),
  deleteOne: new FormattedNames('delete'),
  deleteMany: new FormattedNames('deleteMany'),
  aggregate: new FormattedNames('aggregate'),
  groupBy: new FormattedNames('groupBy'),
};

/**
 * This array contains all prisma actions for which
 * we want to generate a zod input schema.
 */
export const PRISMA_ACTION_ARRAY: FilterdPrismaActionPrimitive[][] = [
  ['findUnique', 'OrThrow'],
  ['findUnique'],
  ['findMany'],
  ['findFirst', 'OrThrow'],
  ['findFirst'],
  ['createOne'],
  ['createMany', 'AndReturn'],
  ['createMany'],
  ['updateOne'],
  ['updateMany', 'AndReturn'],
  ['updateMany'],
  ['upsertOne'],
  ['deleteOne'],
  ['deleteMany'],
  ['aggregate'],
  ['groupBy'],
];

/**
 * This array is used match the types of the prisma actions
 * to the correct prisma action name used in the prisma DMMF
 */

export const PRISMA_ACTION_MATCHER_ARRAY: PrismaActionMatcher[] = [
  [['findUnique', 'OrThrow'], 'findUniqueOrThrow'],
  [['findUnique'], 'findUnique'],
  [['findMany'], 'findMany'],
  [['findFirst', 'OrThrow'], 'findFirstOrThrow'],
  [['findFirst'], 'findFirst'],
  [['createOne'], 'createOne'],
  [['createMany', 'AndReturn'], 'createManyAndReturn'],
  [['updateMany', 'AndReturn'], 'updateManyAndReturn'],
  [['createMany'], 'createMany'],
  [['updateOne'], 'updateOne'],
  [['updateMany'], 'updateMany'],
  [['upsertOne'], 'upsertOne'],
  [['deleteOne'], 'deleteOne'],
  [['deleteMany'], 'deleteMany'],
  [['aggregate'], 'aggregate'],
  [['groupBy'], 'groupBy'],
];

export type PrismaActionMatcher = [
  FilterdPrismaActionPrimitive[],
  FilterdPrismaAction,
];
