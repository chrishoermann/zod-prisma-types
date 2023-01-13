import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const ModelWithOmitFieldsMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithOmitFieldsMaxOrderByAggregateInput> = z.object({
	id: 	string: 	omitField: 	omitRequired: }).strict();
