import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const JsonModelOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelOrderByWithRelationInput> = z.object({
	id: 	json: 	jsonOpt: }).strict();
