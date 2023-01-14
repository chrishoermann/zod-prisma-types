import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { MyPrismaScalarsTypeWhereInputSchema } from './MyPrismaScalarsTypeWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { FloatFilterSchema } from './FloatFilterSchema';
import { FloatNullableFilterSchema } from './FloatNullableFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { IntNullableFilterSchema } from './IntNullableFilterSchema';
import { DecimalFilterSchema } from './DecimalFilterSchema';
import { DecimalNullableFilterSchema } from './DecimalNullableFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { BigIntNullableFilterSchema } from './BigIntNullableFilterSchema';
import { JsonFilterSchema } from './JsonFilterSchema';
import { JsonNullableFilterSchema } from './JsonNullableFilterSchema';
import { BytesFilterSchema } from './BytesFilterSchema';
import { BytesNullableFilterSchema } from './BytesNullableFilterSchema';

export const MyPrismaScalarsTypeWhereInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MyPrismaScalarsTypeWhereInputSchema),z.lazy(() => MyPrismaScalarsTypeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MyPrismaScalarsTypeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MyPrismaScalarsTypeWhereInputSchema),z.lazy(() => MyPrismaScalarsTypeWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  string: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  bic: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  float: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  floatOpt: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  int: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  intOpt: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  decimal: z.union([ z.lazy(() => DecimalFilterSchema),z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }) ]).optional(),
  decimalOpt: z.union([ z.lazy(() => DecimalNullableFilterSchema),z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  dateOpt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.date() ]).optional().nullable(),
  bigIntOpt: z.union([ z.lazy(() => BigIntNullableFilterSchema),z.bigint() ]).optional().nullable(),
  json: z.lazy(() => JsonFilterSchema).optional(),
  jsonOpt: z.lazy(() => JsonNullableFilterSchema).optional(),
  bytes: z.union([ z.lazy(() => BytesFilterSchema),z.instanceof(Buffer) ]).optional(),
  bytesOpt: z.union([ z.lazy(() => BytesNullableFilterSchema),z.instanceof(Buffer) ]).optional().nullable(),
  custom: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  exclude: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
}).strict()