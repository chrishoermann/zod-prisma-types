import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { MyPrismaScalarsTypeScalarWhereWithAggregatesInputSchema } from './MyPrismaScalarsTypeScalarWhereWithAggregatesInputSchema';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';
import { FloatWithAggregatesFilterSchema } from './FloatWithAggregatesFilterSchema';
import { FloatNullableWithAggregatesFilterSchema } from './FloatNullableWithAggregatesFilterSchema';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';
import { IntNullableWithAggregatesFilterSchema } from './IntNullableWithAggregatesFilterSchema';
import { DecimalWithAggregatesFilterSchema } from './DecimalWithAggregatesFilterSchema';
import { DecimalNullableWithAggregatesFilterSchema } from './DecimalNullableWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';
import { DateTimeNullableWithAggregatesFilterSchema } from './DateTimeNullableWithAggregatesFilterSchema';
import { BigIntNullableWithAggregatesFilterSchema } from './BigIntNullableWithAggregatesFilterSchema';
import { JsonWithAggregatesFilterSchema } from './JsonWithAggregatesFilterSchema';
import { JsonNullableWithAggregatesFilterSchema } from './JsonNullableWithAggregatesFilterSchema';
import { BytesWithAggregatesFilterSchema } from './BytesWithAggregatesFilterSchema';
import { BytesNullableWithAggregatesFilterSchema } from './BytesNullableWithAggregatesFilterSchema';

export const MyPrismaScalarsTypeScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MyPrismaScalarsTypeScalarWhereWithAggregatesInputSchema),z.lazy(() => MyPrismaScalarsTypeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MyPrismaScalarsTypeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MyPrismaScalarsTypeScalarWhereWithAggregatesInputSchema),z.lazy(() => MyPrismaScalarsTypeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  string: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  bic: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  float: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  floatOpt: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  int: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  intOpt: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  decimal: z.union([ z.lazy(() => DecimalWithAggregatesFilterSchema),z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }) ]).optional(),
  decimalOpt: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema),z.number().refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.date() ]).optional(),
  dateOpt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.date() ]).optional().nullable(),
  bigIntOpt: z.union([ z.lazy(() => BigIntNullableWithAggregatesFilterSchema),z.bigint() ]).optional().nullable(),
  json: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  jsonOpt: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  bytes: z.union([ z.lazy(() => BytesWithAggregatesFilterSchema),z.instanceof(Buffer) ]).optional(),
  bytesOpt: z.union([ z.lazy(() => BytesNullableWithAggregatesFilterSchema),z.instanceof(Buffer) ]).optional().nullable(),
  custom: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  exclude: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.date() ]).optional(),
}).strict()