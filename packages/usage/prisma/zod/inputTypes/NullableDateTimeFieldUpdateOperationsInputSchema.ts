import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.date().optional().nullable(),
}).strict()