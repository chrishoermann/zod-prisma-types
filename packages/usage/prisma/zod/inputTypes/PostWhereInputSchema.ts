import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { PostWhereInputSchema } from './PostWhereInputSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { UserRelationFilterSchema } from './UserRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { EnumAnotherEnumNullableListFilterSchema } from './EnumAnotherEnumNullableListFilterSchema';

export const PostWhereInputSchema: z.ZodType<PrismaClient.Prisma.PostWhereInput> = z.object({
	AND: z.union([  ]).optional(),	OR: 	NOT: z.union([  ]).optional(),	id: z.union([ z.number().optional() ]).optional(),	title: z.union([ z.string().optional() ]).optional(),	content: z.union([ z.string().optional().nullable() ]).optional().nullable(),	published: z.union([ z.boolean().optional() ]).optional(),	author: z.union([  ]).optional(),	authorId: z.union([ z.string().optional() ]).optional(),	anotherEnum: }).strict();
