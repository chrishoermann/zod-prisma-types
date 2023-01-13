import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const NullableDecimalFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.NullableDecimalFieldUpdateOperationsInput> = z.object({
	set: 	increment: 	decrement: 	multiply: 	divide: }).strict();
