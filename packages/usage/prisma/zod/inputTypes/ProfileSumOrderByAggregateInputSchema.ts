import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from '../enums';

export const ProfileSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ProfileSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
}).strict()