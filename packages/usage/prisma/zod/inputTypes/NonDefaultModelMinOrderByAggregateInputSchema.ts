import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const NonDefaultModelMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.NonDefaultModelMinOrderByAggregateInput> = z.object({
	id: 	string: }).strict();
