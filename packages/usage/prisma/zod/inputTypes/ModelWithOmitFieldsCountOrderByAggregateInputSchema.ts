import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const ModelWithOmitFieldsCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithOmitFieldsCountOrderByAggregateInput> = z.object({
	id: 	string: 	omitField: 	omitRequired: }).strict();
