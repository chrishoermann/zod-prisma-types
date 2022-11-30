import {
  KeyValueMap,
  PrismaScalarType,
  ZodPrismaScalarType,
  ZodScalarType,
  ZodValidatorType,
} from '../types';

/////////////////////////////////////////////////
// CONSTANTS
/////////////////////////////////////////////////

/**
 * Map zod validators to their corresponding prisma scalar types.
 *
 * E.g. when `@zod.string.max(10)` is used on a prisma `String` type,
 * the map is used to determine if the zod validator is valid
 * for this specific scalar type.
 *
 * @example myPrismaField: String ///@zod.string.max(10) -> valid
 * @example myPrismaField: Int ///@zod.string.max(10) -> invalid
 */
export const VALIDATOR_TYPE_MAP: KeyValueMap<
  ZodValidatorType,
  PrismaScalarType[]
> = {
  string: ['String'],
  number: ['Float', 'Int', 'Decimal'],
  date: ['DateTime'],
  // bigint: ['BigInt'],
};

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
    Json: 'unknown',
    Bytes: 'unknown',
  };
