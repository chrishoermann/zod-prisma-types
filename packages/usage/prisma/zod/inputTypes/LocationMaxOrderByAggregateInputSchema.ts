import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const LocationMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.LocationMaxOrderByAggregateInput> = z.object({
	lat: 	lng: }).strict();
