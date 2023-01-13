import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { PostScalarWhereInputSchema } from './PostScalarWhereInputSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { EnumAnotherEnumNullableListFilterSchema } from './EnumAnotherEnumNullableListFilterSchema';

export const PostScalarWhereInputSchema: z.ZodType<PrismaClient.Prisma.PostScalarWhereInput> = z.object({
	AND: z.union([  ]).optional(),	OR: 	NOT: z.union([  ]).optional(),	id: z.union([ z.number().optional() ]).optional(),	title: z.union([ z.string().optional() ]).optional(),	content: z.union([ z.string().optional().nullable() ]).optional().nullable(),	published: z.union([ z.boolean().optional() ]).optional(),	authorId: z.union([ z.string().optional() ]).optional(),	anotherEnum: }).strict();
