import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.date().optional().nullable(),
}).strict()

export default NullableDateTimeFieldUpdateOperationsInputSchema
