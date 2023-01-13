import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { MYValueSchema } from './MYValueSchema';
import { EnumMYValueFieldUpdateOperationsInputSchema } from './EnumMYValueFieldUpdateOperationsInputSchema';

export const MODELWithUpperCaseUpdateInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseUpdateInput> = z.object({
	STRING: z.union([ z.string().optional(), 
 ]).optional(),	MYValue: z.union([  ]).optional(),}).strict();