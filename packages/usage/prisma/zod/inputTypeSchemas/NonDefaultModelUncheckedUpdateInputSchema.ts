import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';

export const NonDefaultModelUncheckedUpdateInputSchema: z.ZodType<Prisma.NonDefaultModelUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  string: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict()

export default NonDefaultModelUncheckedUpdateInputSchema
