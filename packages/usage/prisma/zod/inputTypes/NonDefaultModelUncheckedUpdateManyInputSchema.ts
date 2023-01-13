import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';

export const NonDefaultModelUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.NonDefaultModelUncheckedUpdateManyInput> = z.object({
	id: z.union([ z.number().int().optional(), 
 ]).optional(),	string: z.union([ z.string().optional(), 
 ]).optional(),}).strict();
