import { z } from 'zod';
import { Prisma } from '@prisma/client';

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional(),
}).strict()

export default StringFieldUpdateOperationsInputSchema
