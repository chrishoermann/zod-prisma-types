import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const NullableBigIntFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.NullableBigIntFieldUpdateOperationsInput> = z.object({
	set: z.bigint().optional().nullable(),
	increment: z.bigint().optional(),
	decrement: z.bigint().optional(),
	multiply: z.bigint().optional(),
	divide: z.bigint().optional(),
}).strict();
