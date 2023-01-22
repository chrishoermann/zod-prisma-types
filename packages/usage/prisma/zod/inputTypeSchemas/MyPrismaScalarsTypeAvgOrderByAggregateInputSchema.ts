import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { SortOrderSchema } from './SortOrderSchema';

export const MyPrismaScalarsTypeAvgOrderByAggregateInputSchema: z.ZodType<Prisma.MyPrismaScalarsTypeAvgOrderByAggregateInput> = z.object({
  float: z.lazy(() => SortOrderSchema).optional(),
  floatOpt: z.lazy(() => SortOrderSchema).optional(),
  int: z.lazy(() => SortOrderSchema).optional(),
  intOpt: z.lazy(() => SortOrderSchema).optional(),
  decimal: z.lazy(() => SortOrderSchema).optional(),
  decimalOpt: z.lazy(() => SortOrderSchema).optional(),
  bigIntOpt: z.lazy(() => SortOrderSchema).optional(),
}).strict()

export default MyPrismaScalarsTypeAvgOrderByAggregateInputSchema
