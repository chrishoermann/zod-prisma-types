import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const UserMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enum: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
}).strict()