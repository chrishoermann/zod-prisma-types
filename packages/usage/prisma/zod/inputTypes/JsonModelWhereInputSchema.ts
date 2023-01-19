import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { IntFilterSchema } from './IntFilterSchema';
import { JsonFilterSchema } from './JsonFilterSchema';
import { JsonNullableFilterSchema } from './JsonNullableFilterSchema';

export const JsonModelWhereInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelWhereInput> = z.object({
  AND: z.union([ z.lazy(() => JsonModelWhereInputSchema),z.lazy(() => JsonModelWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => JsonModelWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JsonModelWhereInputSchema),z.lazy(() => JsonModelWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  json: z.lazy(() => JsonFilterSchema).optional(),
  jsonOpt: z.lazy(() => JsonNullableFilterSchema).optional(),
}).strict()