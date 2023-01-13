import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const ModelWithCommentsOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithCommentsOrderByWithRelationInput> = z.object({
	id: 	string: 	omitField: 	omitRequired: }).strict();
