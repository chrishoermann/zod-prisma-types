import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { PostScalarWhereWithAggregatesInputSchema } from './PostScalarWhereWithAggregatesInputSchema';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';
import { BoolWithAggregatesFilterSchema } from './BoolWithAggregatesFilterSchema';
import { EnumAnotherEnumNullableListFilterSchema } from './EnumAnotherEnumNullableListFilterSchema';

export const PostScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.PostScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PostScalarWhereWithAggregatesInputSchema),z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostScalarWhereWithAggregatesInputSchema),z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  published: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  authorId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  anotherEnum: z.lazy(() => EnumAnotherEnumNullableListFilterSchema).optional(),
}).strict()