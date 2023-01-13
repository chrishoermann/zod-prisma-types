import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { PostScalarWhereWithAggregatesInputSchema } from './PostScalarWhereWithAggregatesInputSchema';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';
import { BoolWithAggregatesFilterSchema } from './BoolWithAggregatesFilterSchema';
import { EnumAnotherEnumNullableListFilterSchema } from './EnumAnotherEnumNullableListFilterSchema';

export const PostScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.PostScalarWhereWithAggregatesInput> = z.object({
	AND: z.union([  ]).optional(),	OR: 	NOT: z.union([  ]).optional(),	id: z.union([ z.number().optional() ]).optional(),	title: z.union([ z.string().optional() ]).optional(),	content: z.union([ z.string().optional().nullable() ]).optional().nullable(),	published: z.union([ z.boolean().optional() ]).optional(),	authorId: z.union([ z.string().optional() ]).optional(),	anotherEnum: }).strict();
