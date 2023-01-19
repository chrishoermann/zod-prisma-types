import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { UserOrderByWithRelationInputSchema } from './UserOrderByWithRelationInputSchema';

export const ProfileOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.ProfileOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  second: z.lazy(() => SortOrderSchema).optional(),
}).strict()