import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { IntFilterSchema } from './IntFilterSchema';
import { DecimalFilterSchema } from './DecimalFilterSchema';
import { DecimalNullableFilterSchema } from './DecimalNullableFilterSchema';

export const DecimalModelWhereInputSchema: z.ZodType<PrismaClient.Prisma.DecimalModelWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DecimalModelWhereInputSchema),z.lazy(() => DecimalModelWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DecimalModelWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DecimalModelWhereInputSchema),z.lazy(() => DecimalModelWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  decimal: z.union([ z.lazy(() => DecimalFilterSchema),z.union([z.number(),z.string(),z.instanceof(PrismaClient.Prisma.Decimal),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  decimalOpt: z.union([ z.lazy(() => DecimalNullableFilterSchema),z.union([z.number(),z.string(),z.instanceof(PrismaClient.Prisma.Decimal),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
}).strict()