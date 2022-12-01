import { FormattedNames } from '../classes/formattedNames';
import {
  KeyValueMap,
  PrismaAction,
  PrismaScalarType,
  ZodDateValidatorKeys,
  ZodNumberValidatorKeys,
  ZodPrismaScalarType,
  ZodScalarType,
  ZodStringValidatorKeys,
  ZodValidatorType,
} from '../types';
import {
  STRING_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
  STRING_VALIDATOR_MESSAGE_REGEX,
  STRING_VALIDATOR_REGEX,
  STRING_VALIDATOR_STRING_AND_MESSAGE_REGEX,
  NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
  NUMBER_VALIDATOR_MESSAGE_REGEX,
  DATE_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
} from './regex';

/////////////////////////////////////////////////
// VALIDATOR TYPE MAP
/////////////////////////////////////////////////

/**
 * Map zod validators to their corresponding prisma scalar types.
 *
 * E.g. when `@zod.string.max(10)` is used on a prisma `String` type,
 * the map is used to determine if the zod validator is valid
 * for this specific scalar type.
 *
 * @example myPrismaField: String ///@zod.string.max(10) -> valid
 * @example myPrismaField: Int ///@zod.string.max(10) -> invalid throws error during generation
 */
export const VALIDATOR_TYPE_MAP: KeyValueMap<
  ZodValidatorType,
  PrismaScalarType[]
> = {
  string: ['String'],
  number: ['Float', 'Int', 'Decimal'],
  date: ['DateTime'],
};

/////////////////////////////////////////////////
// PRISMA TYPE MAP
/////////////////////////////////////////////////

/**
 * Map prisma scalar types to their corresponding zod validators.
 */
export const PRISMA_TYPE_MAP: KeyValueMap<ZodPrismaScalarType, ZodScalarType> =
  {
    String: 'string',
    Boolean: 'boolean',
    DateTime: 'date',
    Int: 'number',
    BigInt: 'bigint',
    Float: 'number',
    Decimal: 'number',
  };

/////////////////////////////////////////////
// REGEX MAPS
/////////////////////////////////////////////

export type RegexMap<TKeys extends string> = KeyValueMap<TKeys, RegExp>;

/**
 * Maps the right regex to the right validator key.
 *
 * Used to determine if a validator key is valid for a `string` type.
 * @example myPrismaField: String ///@zod.string.max(10) -> valid
 * @example myPrismaField: String ///@zod.string.positive() -> invalid throws error during generation
 */
export const STRING_VALIDATOR_REGEX_MAP: RegexMap<ZodStringValidatorKeys> = {
  min: STRING_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
  max: STRING_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
  length: STRING_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
  email: STRING_VALIDATOR_MESSAGE_REGEX,
  url: STRING_VALIDATOR_MESSAGE_REGEX,
  uuid: STRING_VALIDATOR_MESSAGE_REGEX,
  cuid: STRING_VALIDATOR_MESSAGE_REGEX,
  trim: STRING_VALIDATOR_MESSAGE_REGEX,
  datetime: STRING_VALIDATOR_MESSAGE_REGEX,
  regex: STRING_VALIDATOR_REGEX,
  startsWith: STRING_VALIDATOR_STRING_AND_MESSAGE_REGEX,
  endsWith: STRING_VALIDATOR_STRING_AND_MESSAGE_REGEX,
};

/**
 * Maps the right regex to the right validator key.
 *
 * Used to determine if a validator key is valid for a `number` type.
 * @example myPrismaField: Int ///@zod.number.gte(10) -> valid
 * @example myPrismaField: Int ///@zod.number.email() -> invalid throws error during generation
 */
export const NUMBER_VALIDATOR_REGEX_MAP: RegexMap<ZodNumberValidatorKeys> = {
  gt: NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
  gte: NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
  lt: NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
  lte: NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
  multipleOf: NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
  int: NUMBER_VALIDATOR_MESSAGE_REGEX,
  positive: NUMBER_VALIDATOR_MESSAGE_REGEX,
  nonpositive: NUMBER_VALIDATOR_MESSAGE_REGEX,
  negative: NUMBER_VALIDATOR_MESSAGE_REGEX,
  nonnegative: NUMBER_VALIDATOR_MESSAGE_REGEX,
  finite: NUMBER_VALIDATOR_MESSAGE_REGEX,
};

/**
 * Maps the right regex to the right validator key.
 *
 * Used to determine if a validator key is valid for a `date` type.
 * @example myPrismaField: Date ///@zod.date.min(new Date("1900-01-01") -> valid
 * @example myPrismaField: Date ///@zod.date.email() -> invalid throws error during generation
 */
export const DATE_VALIDATOR_REGEX_MAP: RegexMap<ZodDateValidatorKeys> = {
  min: DATE_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
  max: DATE_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
};

/////////////////////////////////////////////
// PRISMA ACTION MAP
/////////////////////////////////////////////

export type FilterdPrismaAction = Exclude<
  PrismaAction,
  'executeRaw' | 'queryRaw' | 'count'
>;

/**
 * Map is used to get the right naming for the prisma action
 * according to the prisma schema.
 * @example type UserFindUnique // becomes const UserFindUnique = ...
 */
export const PRISMA_ACTION_ARG_MAP: KeyValueMap<
  FilterdPrismaAction,
  FormattedNames
> = {
  findUnique: new FormattedNames('findUnique'),
  findMany: new FormattedNames('findMany'),
  findFirst: new FormattedNames('findFirst'),
  createOne: new FormattedNames('create'),
  createMany: new FormattedNames('createMany'),
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
export const PRISMA_ACTION_ARRAY: FilterdPrismaAction[] = [
  'findUnique',
  'findMany',
  'findFirst',
  'createOne',
  'createMany',
  'updateOne',
  'updateMany',
  'upsertOne',
  'deleteOne',
  'deleteMany',
  'aggregate',
  'groupBy',
];
