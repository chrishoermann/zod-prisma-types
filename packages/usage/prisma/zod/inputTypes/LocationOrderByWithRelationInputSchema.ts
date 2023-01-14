import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from '../enums';
import { UserOrderByRelationAggregateInputSchema } from './UserOrderByRelationAggregateInputSchema';

export const LocationOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.LocationOrderByWithRelationInput> = z.object({
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
  User: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional(),
}).strict()