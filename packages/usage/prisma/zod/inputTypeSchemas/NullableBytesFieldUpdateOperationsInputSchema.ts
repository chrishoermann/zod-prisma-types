import { z } from 'zod';
import { Prisma } from '@prisma/client';

export const NullableBytesFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBytesFieldUpdateOperationsInput> = z.object({
  set: z.instanceof(Buffer).optional().nullable(),
}).strict()

export default NullableBytesFieldUpdateOperationsInputSchema
