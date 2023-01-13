import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';

export const NonDefaultModelUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.NonDefaultModelUncheckedUpdateInput> = z.object({
	id: z.union([ z.number().int().optional(), 
 ]).optional(),	string: z.union([ z.string().optional(), 
 ]).optional(),}).strict();