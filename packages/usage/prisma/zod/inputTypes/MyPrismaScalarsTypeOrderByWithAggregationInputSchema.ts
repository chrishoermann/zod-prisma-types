import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { MyPrismaScalarsTypeCountOrderByAggregateInputSchema } from './MyPrismaScalarsTypeCountOrderByAggregateInputSchema';
import { MyPrismaScalarsTypeAvgOrderByAggregateInputSchema } from './MyPrismaScalarsTypeAvgOrderByAggregateInputSchema';
import { MyPrismaScalarsTypeMaxOrderByAggregateInputSchema } from './MyPrismaScalarsTypeMaxOrderByAggregateInputSchema';
import { MyPrismaScalarsTypeMinOrderByAggregateInputSchema } from './MyPrismaScalarsTypeMinOrderByAggregateInputSchema';
import { MyPrismaScalarsTypeSumOrderByAggregateInputSchema } from './MyPrismaScalarsTypeSumOrderByAggregateInputSchema';

export const MyPrismaScalarsTypeOrderByWithAggregationInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  string: z.lazy(() => SortOrderSchema).optional(),
  bic: z.lazy(() => SortOrderSchema).optional(),
  float: z.lazy(() => SortOrderSchema).optional(),
  floatOpt: z.lazy(() => SortOrderSchema).optional(),
  int: z.lazy(() => SortOrderSchema).optional(),
  intOpt: z.lazy(() => SortOrderSchema).optional(),
  decimal: z.lazy(() => SortOrderSchema).optional(),
  decimalOpt: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  dateOpt: z.lazy(() => SortOrderSchema).optional(),
  bigIntOpt: z.lazy(() => SortOrderSchema).optional(),
  json: z.lazy(() => SortOrderSchema).optional(),
  jsonOpt: z.lazy(() => SortOrderSchema).optional(),
  bytes: z.lazy(() => SortOrderSchema).optional(),
  bytesOpt: z.lazy(() => SortOrderSchema).optional(),
  custom: z.lazy(() => SortOrderSchema).optional(),
  exclude: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MyPrismaScalarsTypeCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => MyPrismaScalarsTypeAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MyPrismaScalarsTypeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MyPrismaScalarsTypeMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => MyPrismaScalarsTypeSumOrderByAggregateInputSchema).optional(),
}).strict()