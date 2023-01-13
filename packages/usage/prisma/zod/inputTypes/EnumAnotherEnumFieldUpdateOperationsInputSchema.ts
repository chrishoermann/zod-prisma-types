import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { AnotherEnumSchema } from './AnotherEnumSchema';

export const EnumAnotherEnumFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.EnumAnotherEnumFieldUpdateOperationsInput> = z.object({
	set: }).strict();
