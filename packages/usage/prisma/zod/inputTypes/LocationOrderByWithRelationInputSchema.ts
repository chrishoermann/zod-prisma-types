import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { UserOrderByRelationAggregateInputSchema } from './UserOrderByRelationAggregateInputSchema';

export const LocationOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.LocationOrderByWithRelationInput> = z.object({
	lat: 	lng: 	User: }).strict();
