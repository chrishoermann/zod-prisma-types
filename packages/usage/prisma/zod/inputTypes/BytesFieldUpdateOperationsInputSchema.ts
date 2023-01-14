import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const BytesFieldUpdateOperationsInputSchema: z.ZodType<PrismaClient.Prisma.BytesFieldUpdateOperationsInput> = z.object({
  set: z.instanceof(Buffer).optional(),
}).strict()