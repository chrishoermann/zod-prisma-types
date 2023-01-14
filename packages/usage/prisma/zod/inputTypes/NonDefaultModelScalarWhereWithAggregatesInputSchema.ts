import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NonDefaultModelScalarWhereWithAggregatesInputSchema } from './NonDefaultModelScalarWhereWithAggregatesInputSchema';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';

export const NonDefaultModelScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.NonDefaultModelScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => NonDefaultModelScalarWhereWithAggregatesInputSchema),z.lazy(() => NonDefaultModelScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => NonDefaultModelScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NonDefaultModelScalarWhereWithAggregatesInputSchema),z.lazy(() => NonDefaultModelScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  string: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict()