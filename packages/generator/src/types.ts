import { SourceFile, StatementStructures, WriterFunction } from 'ts-morph';

import { ExtendedDatamodel } from './classes/extendedDmmf';

export type StatementsArray = Statement[];
export type Statement = string | WriterFunction | StatementStructures;
export type GetStatements = (
  datamodel: ExtendedDatamodel,
  source: SourceFile,
) => void;

export interface ValidatorFunctionOptions {
  validatorKey: string;
  validatorPattern: string;
}

export type ValidatorFunction = (options: ValidatorFunctionOptions) => string;

export type ValidatorMap<K extends string, T> = {
  [key in K]: T;
};

export type ZodValidatorTypeMap = ValidatorMap<
  ZodValidatorType,
  PrismaScalarType[]
>;

export type PrismaScalarTypeMap<T> = ValidatorMap<PrismaScalarType, T>;

export type ValidatorFunctionMap = ValidatorMap<
  ZodValidatorType,
  ValidatorFunction
>;

export type ZodValidatorType = 'string' | 'number' | 'date';

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
