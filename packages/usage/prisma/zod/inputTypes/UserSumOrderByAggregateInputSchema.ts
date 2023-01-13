import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const UserSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.UserSumOrderByAggregateInput> = z.object({
	lat: 	lng: }).strict();
