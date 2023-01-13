import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
	set: z.date().optional(),
}).strict();
