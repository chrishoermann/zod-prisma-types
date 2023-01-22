import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { JsonNullValueInputSchema } from './JsonNullValueInputSchema';
import { InputJsonValue } from './InputJsonValue';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';

export const JsonModelUpdateInputSchema: z.ZodType<Prisma.JsonModelUpdateInput> = z.object({
  json: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  jsonOpt: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict()

export default JsonModelUpdateInputSchema
