import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';

export const WithDefaultValidatorsUpdateInputSchema: z.ZodType<PrismaClient.Prisma.WithDefaultValidatorsUpdateInput> = z.object({
	id: z.union([ z.string().cuid().optional(), 
 ]).optional(),	idTwo: z.union([ z.string().optional(), 
 ]).optional(),	integer: z.union([ z.number().int().optional(), 
 ]).optional(),}).strict();
