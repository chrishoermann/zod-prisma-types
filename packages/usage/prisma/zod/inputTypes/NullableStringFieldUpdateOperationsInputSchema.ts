import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
	set: z.string().optional().nullable(),
}).strict();
