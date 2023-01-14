import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { WithDefaultValidatorsWhereInputSchema } from './WithDefaultValidatorsWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';

export const WithDefaultValidatorsWhereInputSchema: z.ZodType<PrismaClient.Prisma.WithDefaultValidatorsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WithDefaultValidatorsWhereInputSchema),z.lazy(() => WithDefaultValidatorsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WithDefaultValidatorsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WithDefaultValidatorsWhereInputSchema),z.lazy(() => WithDefaultValidatorsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  idTwo: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  integer: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict()