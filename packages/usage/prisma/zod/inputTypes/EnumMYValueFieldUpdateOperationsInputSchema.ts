import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { MYValueSchema } from './MYValueSchema';

export const EnumMYValueFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.EnumMYValueFieldUpdateOperationsInput> = z.object({
	set: }).strict();
