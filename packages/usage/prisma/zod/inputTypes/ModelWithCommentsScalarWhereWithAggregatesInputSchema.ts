import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';

export const ModelWithCommentsScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithCommentsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ModelWithCommentsScalarWhereWithAggregatesInputSchema),z.lazy(() => ModelWithCommentsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ModelWithCommentsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ModelWithCommentsScalarWhereWithAggregatesInputSchema),z.lazy(() => ModelWithCommentsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  string: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  omitField: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  omitRequired: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict()