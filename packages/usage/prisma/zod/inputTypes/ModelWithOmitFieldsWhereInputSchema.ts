import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';

export const ModelWithOmitFieldsWhereInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithOmitFieldsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ModelWithOmitFieldsWhereInputSchema),z.lazy(() => ModelWithOmitFieldsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ModelWithOmitFieldsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ModelWithOmitFieldsWhereInputSchema),z.lazy(() => ModelWithOmitFieldsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  string: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  omitField: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  omitRequired: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict()