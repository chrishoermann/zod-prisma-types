import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { JsonNullValueInputSchema } from './JsonNullValueInputSchema';
import { InputJsonValue } from './InputJsonValue';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';

export const JsonModelUncheckedCreateInputSchema: z.ZodType<Prisma.JsonModelUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  json: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  jsonOpt: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict()

export default JsonModelUncheckedCreateInputSchema
