import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';
import { DecimalWithAggregatesFilterSchema } from './DecimalWithAggregatesFilterSchema';
import { DecimalNullableWithAggregatesFilterSchema } from './DecimalNullableWithAggregatesFilterSchema';

export const DecimalModelScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.DecimalModelScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DecimalModelScalarWhereWithAggregatesInputSchema),z.lazy(() => DecimalModelScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DecimalModelScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DecimalModelScalarWhereWithAggregatesInputSchema),z.lazy(() => DecimalModelScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  decimal: z.union([ z.lazy(() => DecimalWithAggregatesFilterSchema),z.union([z.number(),z.string(),z.instanceof(PrismaClient.Prisma.Decimal),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  decimalOpt: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema),z.union([z.number(),z.string(),z.instanceof(PrismaClient.Prisma.Decimal),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
}).strict()