import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { MYValueSchema } from './MYValueSchema';

export const MODELWithUpperCaseCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseCreateManyInput> = z.object({
	id: z.number().int().optional(),
	STRING: z.string(),
	MYValue: }).strict();
