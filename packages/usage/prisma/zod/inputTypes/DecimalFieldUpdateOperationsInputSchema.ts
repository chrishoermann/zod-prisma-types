import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const DecimalFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.DecimalFieldUpdateOperationsInput> = z.object({
	set: 	increment: 	decrement: 	multiply: 	divide: }).strict();
