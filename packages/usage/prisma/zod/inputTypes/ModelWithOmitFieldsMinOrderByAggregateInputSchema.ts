import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const ModelWithOmitFieldsMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithOmitFieldsMinOrderByAggregateInput> = z.object({
	id: 	string: 	omitField: 	omitRequired: }).strict();
