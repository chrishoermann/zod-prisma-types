import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const ModelWithOmitFieldsOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithOmitFieldsOrderByWithRelationInput> = z.object({
	id: 	string: 	omitField: 	omitRequired: }).strict();