import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { ModelWithCommentsWhereInputSchema } from './ModelWithCommentsWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';

export const ModelWithCommentsWhereInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithCommentsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ModelWithCommentsWhereInputSchema),z.lazy(() => ModelWithCommentsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ModelWithCommentsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ModelWithCommentsWhereInputSchema),z.lazy(() => ModelWithCommentsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  string: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  omitField: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  omitRequired: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict()