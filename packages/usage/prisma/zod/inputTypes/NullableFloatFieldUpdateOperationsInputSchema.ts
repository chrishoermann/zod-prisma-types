import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
	set: z.number().optional().nullable(),
	increment: z.number().optional(),
	decrement: z.number().optional(),
	multiply: z.number().optional(),
	divide: z.number().optional(),
}).strict();
