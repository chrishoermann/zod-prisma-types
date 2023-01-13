import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const UserAvgOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.UserAvgOrderByAggregateInput> = z.object({
	lat: 	lng: }).strict();
