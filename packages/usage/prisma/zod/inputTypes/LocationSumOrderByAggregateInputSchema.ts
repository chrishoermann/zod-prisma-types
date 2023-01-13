import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const LocationSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.LocationSumOrderByAggregateInput> = z.object({
	lat: 	lng: }).strict();
