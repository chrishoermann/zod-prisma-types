import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { MYValueSchema } from './MYValueSchema';
import { EnumMYValueFieldUpdateOperationsInputSchema } from './EnumMYValueFieldUpdateOperationsInputSchema';

export const MODELWithUpperCaseUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseUncheckedUpdateManyInput> = z.object({
	id: z.union([ z.number().int().optional(), 
 ]).optional(),	STRING: z.union([ z.string().optional(), 
 ]).optional(),	MYValue: z.union([  ]).optional(),}).strict();
