import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const NonDefaultModelMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.NonDefaultModelMaxOrderByAggregateInput> = z.object({
	id: 	string: }).strict();
