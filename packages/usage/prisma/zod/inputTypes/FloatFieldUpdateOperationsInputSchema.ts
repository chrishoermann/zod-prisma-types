import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.FloatFieldUpdateOperationsInput> = z.object({
	set: z.number().optional(),
	increment: z.number().optional(),
	decrement: z.number().optional(),
	multiply: z.number().optional(),
	divide: z.number().optional(),
}).strict();
