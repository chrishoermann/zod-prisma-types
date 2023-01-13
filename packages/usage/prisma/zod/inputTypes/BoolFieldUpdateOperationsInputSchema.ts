import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.BoolFieldUpdateOperationsInput> = z.object({
	set: z.boolean().optional(),
}).strict();
