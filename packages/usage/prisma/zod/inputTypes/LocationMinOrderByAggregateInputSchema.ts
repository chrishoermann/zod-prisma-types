import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const LocationMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.LocationMinOrderByAggregateInput> = z.object({
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
}).strict()