import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z
  .object({
    intTwo: z.lazy(() => SortOrderSchema).optional(),
    int: z.lazy(() => SortOrderSchema).optional(),
    floatOpt: z.lazy(() => SortOrderSchema).optional(),
    float: z.lazy(() => SortOrderSchema).optional(),
    decimal: z.lazy(() => SortOrderSchema).optional(),
    decimalOpt: z.lazy(() => SortOrderSchema).optional(),
    bigInt: z.lazy(() => SortOrderSchema).optional(),
    bigIntOpt: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const UserSumOrderByAggregateInputObjectSchema = Schema;
