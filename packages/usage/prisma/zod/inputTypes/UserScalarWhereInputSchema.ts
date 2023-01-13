import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { UserScalarWhereInputSchema } from './UserScalarWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { EnumRoleNullableListFilterSchema } from './EnumRoleNullableListFilterSchema';
import { EnumAnotherEnumFilterSchema } from './EnumAnotherEnumFilterSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';
import { StringNullableListFilterSchema } from './StringNullableListFilterSchema';
import { FloatFilterSchema } from './FloatFilterSchema';

export const UserScalarWhereInputSchema: z.ZodType<PrismaClient.Prisma.UserScalarWhereInput> = z.object({
	AND: z.union([  ]).optional(),	OR: 	NOT: z.union([  ]).optional(),	id: z.union([ z.string().optional() ]).optional(),	email: z.union([ z.string().optional() ]).optional(),	name: z.union([ z.string().optional().nullable() ]).optional().nullable(),	role: 	enum: z.union([  ]).optional(),	scalarList: 	lat: z.union([ z.number().optional() ]).optional(),	lng: z.union([ z.number().optional() ]).optional(),}).strict();
