import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const PostOrderByRelationAggregateInputSchema: z.ZodType<PrismaClient.Prisma.PostOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict()