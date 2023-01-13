import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';

export const ModelWithCommentsUncheckedUpdateInputSchema: z.ZodType<Omit<PrismaClient.Prisma.ModelWithCommentsUncheckedUpdateInput, "omitField" | "omitRequired">> = z.object({
	id: z.union([ z.string().uuid().optional(), 
 ]).optional(),	string: z.union([ z.string().min(4).max(10).optional().nullable(), 
 ]).optional().nullable(),	// omitted: omitField: z.union([ z.string().optional().nullable(), 
 ]).optional().nullable(),	// omitted: omitRequired: z.union([ z.string().optional(), 
 ]).optional(),}).strict();
