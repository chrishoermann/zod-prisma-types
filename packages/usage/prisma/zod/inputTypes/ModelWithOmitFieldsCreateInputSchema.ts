import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const ModelWithOmitFieldsCreateInputSchema: z.ZodType<Omit<PrismaClient.Prisma.ModelWithOmitFieldsCreateInput, "omitField" | "omitRequired">> = z.object({
	id: z.string().cuid().optional(),
	string: z.string().optional().nullable(),
	// omitted: omitField: z.string().optional().nullable(),
	// omitted: omitRequired: z.string(),
}).strict();
