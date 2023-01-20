import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { JsonNullValueInputSchema } from './JsonNullValueInputSchema';
import { InputJsonValue } from './InputJsonValue';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';

export const JsonModelCreateInputSchema: z.ZodType<Prisma.JsonModelCreateInput> = z.object({
  json: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  jsonOpt: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict()

export default JsonModelCreateInputSchema
