import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from '../enums';

export const LocationCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.LocationCountOrderByAggregateInput> = z.object({
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
}).strict()