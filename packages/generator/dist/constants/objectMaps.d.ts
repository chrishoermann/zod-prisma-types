import { FormattedNames } from '../classes/formattedNames';
import { KeyValueMap, PrismaAction, PrismaScalarType, ZodDateValidatorKeys, ZodNumberValidatorKeys, ZodPrismaScalarType, ZodScalarType, ZodStringValidatorKeys, ZodValidatorType } from '../types';
export declare const VALIDATOR_TYPE_MAP: KeyValueMap<ZodValidatorType, PrismaScalarType[]>;
export declare const PRISMA_TYPE_MAP: KeyValueMap<ZodPrismaScalarType, ZodScalarType>;
export type RegexMap<TKeys extends string> = KeyValueMap<TKeys, RegExp>;
export declare const STRING_VALIDATOR_REGEX_MAP: RegexMap<ZodStringValidatorKeys>;
export declare const NUMBER_VALIDATOR_REGEX_MAP: RegexMap<ZodNumberValidatorKeys>;
export declare const DATE_VALIDATOR_REGEX_MAP: RegexMap<ZodDateValidatorKeys>;
export type FilterdPrismaAction = Exclude<PrismaAction, 'executeRaw' | 'queryRaw' | 'count'>;
export declare const PRISMA_ACTION_ARG_MAP: KeyValueMap<FilterdPrismaAction, FormattedNames>;
export declare const PRISMA_ACTION_ARRAY: FilterdPrismaAction[];
//# sourceMappingURL=objectMaps.d.ts.map