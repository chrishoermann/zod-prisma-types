import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { IntFilterSchema } from './IntFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';

export const NonDefaultModelWhereInputSchema: z.ZodType<PrismaClient.Prisma.NonDefaultModelWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NonDefaultModelWhereInputSchema),z.lazy(() => NonDefaultModelWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NonDefaultModelWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NonDefaultModelWhereInputSchema),z.lazy(() => NonDefaultModelWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  string: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict()