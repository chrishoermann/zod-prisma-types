import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';

export const ModelWithOmitFieldsUpdateInputSchema: z.ZodType<Omit<PrismaClient.Prisma.ModelWithOmitFieldsUpdateInput, "omitField" | "omitRequired">> = z.object({
	id: z.union([ z.string().cuid().optional(), 
 ]).optional(),	string: z.union([ z.string().optional().nullable(), 
 ]).optional().nullable(),	// omitted: omitField: z.union([ z.string().optional().nullable(), 
 ]).optional().nullable(),	// omitted: omitRequired: z.union([ z.string().optional(), 
 ]).optional(),}).strict();
