import { z } from 'zod';
import { Prisma } from '@prisma/client';

export const BytesFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BytesFieldUpdateOperationsInput> = z.object({
  set: z.instanceof(Buffer).optional(),
}).strict()

export default BytesFieldUpdateOperationsInputSchema
