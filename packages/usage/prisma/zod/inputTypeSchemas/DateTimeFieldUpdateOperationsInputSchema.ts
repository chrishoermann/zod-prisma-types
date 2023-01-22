import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.date().optional(),
}).strict()

export default DateTimeFieldUpdateOperationsInputSchema
