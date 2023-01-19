import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const ModelWithOmitFieldsMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithOmitFieldsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  string: z.lazy(() => SortOrderSchema).optional(),
  omitField: z.lazy(() => SortOrderSchema).optional(),
  omitRequired: z.lazy(() => SortOrderSchema).optional(),
}).strict()