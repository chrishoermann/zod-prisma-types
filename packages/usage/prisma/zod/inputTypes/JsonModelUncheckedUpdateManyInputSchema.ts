import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { JsonNullValueInputSchema } from './JsonNullValueInputSchema';
import { InputJsonValue } from '../helpers';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';

export const JsonModelUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  json: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  jsonOpt: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict()