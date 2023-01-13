import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const LocationCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.LocationCountOrderByAggregateInput> = z.object({
	lat: 	lng: }).strict();
