import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from '../enums';

export const ModelWithCommentsMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithCommentsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  string: z.lazy(() => SortOrderSchema).optional(),
  omitField: z.lazy(() => SortOrderSchema).optional(),
  omitRequired: z.lazy(() => SortOrderSchema).optional(),
}).strict()