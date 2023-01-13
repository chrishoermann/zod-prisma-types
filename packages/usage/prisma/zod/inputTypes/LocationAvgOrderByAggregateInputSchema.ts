import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const LocationAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.LocationAvgOrderByAggregateInput> = z.object({
	lat: 	lng: }).strict();
