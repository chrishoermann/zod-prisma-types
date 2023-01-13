import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const ModelWithCommentsUncheckedCreateInputSchema: z.ZodType<Omit<PrismaClient.Prisma.ModelWithCommentsUncheckedCreateInput, "omitField" | "omitRequired">> = z.object({
	id: z.string().uuid().optional(),
	string: z.string().min(4).max(10).optional().nullable(),
	// omitted: omitField: z.string().optional().nullable(),
	// omitted: omitRequired: z.string(),
}).strict();
