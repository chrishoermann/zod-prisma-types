import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const JsonModelCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelCountOrderByAggregateInput> = z.object({
	id: 	json: 	jsonOpt: }).strict();
