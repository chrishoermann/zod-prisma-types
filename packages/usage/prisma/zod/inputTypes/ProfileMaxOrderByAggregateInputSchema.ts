import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const ProfileMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ProfileMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  second: z.lazy(() => SortOrderSchema).optional(),
}).strict()