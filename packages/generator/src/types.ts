import { CodeBlockWriter, StatementStructures, WriterFunction } from 'ts-morph';

import { ExtendedDMMF, ExtendedDMMFSchemaArgInputType } from './classes';

export type StatementsArray = Statement[];
export type Statement = string | WriterFunction | StatementStructures;
export type GetStatements = (datamodel: ExtendedDMMF) => Statement[];

export interface ValidatorFunctionOptions {
  key: string;
  pattern: string;
}

export type ValidatorFunction = (options: ValidatorFunctionOptions) => string;

export type KeyValueMap<TKey extends string, TValue> = {
  [key in TKey]: TValue;
};

export type ZodValidatorTypeMap = KeyValueMap<
  ZodValidatorType,
  PrismaScalarType[]
>;

export type PrismaScalarTypeMap<T> = KeyValueMap<PrismaScalarType, T>;

export type ValidatorFunctionMap = KeyValueMap<
  ZodValidatorType,
  ValidatorFunction
>;

export type ZodPrimitiveType =
  | 'string'
  | 'number'
  | 'bigint'
  | 'boolean'
  | 'date'
  | 'symbol'
  | 'undefined'
  | 'null'
  | 'void'
  | 'unknown'
  | 'never'
  | 'any';

export type ZodValidatorType = Extract<
  ZodPrimitiveType,
  'string' | 'number' | 'date'
>;

export type ZodScalarType = Extract<
  ZodPrimitiveType,
  'string' | 'number' | 'date' | 'boolean' | 'bigint' | 'unknown'
>;
// | 'JsonValue'; // allow jsonSchema as a type

export type PrismaScalarType =
  | 'String'
  | 'Boolean'
  | 'Int'
  | 'BigInt'
  | 'Float'
  | 'Decimal'
  | 'DateTime'
  | 'Json'
  | 'Bytes';

// "Json" | "Bytes" are handled seperately in the generator functions
export type ZodPrismaScalarType = Exclude<
  PrismaScalarType,
  'Json' | 'Bytes' | 'Decimal'
>;

export type ZodStringValidatorKeys =
  | 'min'
  | 'max'
  | 'length'
  | 'email'
  | 'url'
  | 'uuid'
  | 'cuid'
  | 'regex'
  | 'startsWith'
  | 'endsWith'
  | 'trim'
  | 'datetime';

export type ZodNumberValidatorKeys =
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'int'
  | 'positive'
  | 'nonpositive'
  | 'negative'
  | 'nonnegative'
  | 'multipleOf'
  | 'finite';

export type ZodDateValidatorKeys = 'min' | 'max';

export type WriteBaseFilterTypesFunction = (options?: {
  nullable?: boolean;
  aggregates?: boolean;
}) => (writer: CodeBlockWriter) => void;

export type PrismaAction =
  | 'findUnique'
  | 'findMany'
  | 'findFirst'
  | 'createOne'
  | 'createMany'
  | 'updateOne'
  | 'updateMany'
  | 'upsertOne'
  | 'deleteOne'
  | 'deleteMany'
  | 'executeRaw'
  | 'aggregate'
  | 'count'
  | 'groupBy';

export interface WriteTypeOptions {
  inputType: ExtendedDMMFSchemaArgInputType;
  isOptional?: boolean;
  isNullable?: boolean;
  writeLazy?: boolean;
  writeComma?: boolean;
  zodValidatorString?: string;
  zodCustomErrors?: string;
}

export type WriteTypeFunction<
  TOptions extends WriteTypeOptions = WriteTypeOptions,
> = (writer: CodeBlockWriter, options: TOptions) => CodeBlockWriter | undefined;
