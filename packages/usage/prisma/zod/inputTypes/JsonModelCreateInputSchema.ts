import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { JsonNullValueInputSchema } from './JsonNullValueInputSchema';
import { InputJsonValue } from '../helpers';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';

export const JsonModelCreateInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelCreateInput> = z.object({
  json: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  jsonOpt: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict()