import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { JsonNullValueInputSchema } from './JsonNullValueInputSchema';
import { InputJsonValue } from './InputJsonValue';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';

export const JsonModelUncheckedUpdateInputSchema: z.ZodType<Prisma.JsonModelUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  json: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  jsonOpt: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict()

export default JsonModelUncheckedUpdateInputSchema
