import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { StringFilterSchema } from './StringFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';

export const WithDefaultValidatorsWhereInputSchema: z.ZodType<Prisma.WithDefaultValidatorsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WithDefaultValidatorsWhereInputSchema),z.lazy(() => WithDefaultValidatorsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WithDefaultValidatorsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WithDefaultValidatorsWhereInputSchema),z.lazy(() => WithDefaultValidatorsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  idTwo: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  integer: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict()

export default WithDefaultValidatorsWhereInputSchema
