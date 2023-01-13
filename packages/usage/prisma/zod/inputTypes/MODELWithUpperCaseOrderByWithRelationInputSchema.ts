import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const MODELWithUpperCaseOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseOrderByWithRelationInput> = z.object({
	id: 	STRING: 	MYValue: }).strict();
