import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { MYValueSchema } from './MYValueSchema';

export const MODELWithUpperCaseCreateInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseCreateInput> = z.object({
	STRING: z.string(),
	MYValue: }).strict();
