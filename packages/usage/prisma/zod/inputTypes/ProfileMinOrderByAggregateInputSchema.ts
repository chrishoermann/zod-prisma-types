import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from '../enums';

export const ProfileMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ProfileMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  second: z.lazy(() => SortOrderSchema).optional(),
}).strict()