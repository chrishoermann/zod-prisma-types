import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from '../enums';

export const PostMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.PostMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  published: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
}).strict()