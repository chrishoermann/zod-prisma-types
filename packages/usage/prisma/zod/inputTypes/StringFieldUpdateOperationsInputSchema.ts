import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const StringFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional(),
}).strict()