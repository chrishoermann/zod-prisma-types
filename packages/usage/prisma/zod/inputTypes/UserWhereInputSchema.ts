import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { PostListRelationFilterSchema } from './PostListRelationFilterSchema';
import { ProfileRelationFilterSchema } from './ProfileRelationFilterSchema';
import { ProfileWhereInputSchema } from './ProfileWhereInputSchema';
import { EnumRoleNullableListFilterSchema } from './EnumRoleNullableListFilterSchema';
import { EnumAnotherEnumFilterSchema } from './EnumAnotherEnumFilterSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';
import { StringNullableListFilterSchema } from './StringNullableListFilterSchema';
import { FloatFilterSchema } from './FloatFilterSchema';
import { LocationRelationFilterSchema } from './LocationRelationFilterSchema';
import { LocationWhereInputSchema } from './LocationWhereInputSchema';

export const UserWhereInputSchema: z.ZodType<PrismaClient.Prisma.UserWhereInput> = z.object({
	AND: z.union([  ]).optional(),	OR: 	NOT: z.union([  ]).optional(),	id: z.union([ z.string().optional() ]).optional(),	email: z.union([ z.string().optional() ]).optional(),	name: z.union([ z.string().optional().nullable() ]).optional().nullable(),	posts: 	profile: z.union([  ]).optional().nullable(),	role: 	enum: z.union([  ]).optional(),	scalarList: 	lat: z.union([ z.number().optional() ]).optional(),	lng: z.union([ z.number().optional() ]).optional(),	location: z.union([  ]).optional().nullable(),}).strict();
