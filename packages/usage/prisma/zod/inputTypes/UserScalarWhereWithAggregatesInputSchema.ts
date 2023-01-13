import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { UserScalarWhereWithAggregatesInputSchema } from './UserScalarWhereWithAggregatesInputSchema';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';
import { EnumRoleNullableListFilterSchema } from './EnumRoleNullableListFilterSchema';
import { EnumAnotherEnumWithAggregatesFilterSchema } from './EnumAnotherEnumWithAggregatesFilterSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';
import { StringNullableListFilterSchema } from './StringNullableListFilterSchema';
import { FloatWithAggregatesFilterSchema } from './FloatWithAggregatesFilterSchema';

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.UserScalarWhereWithAggregatesInput> = z.object({
	AND: z.union([  ]).optional(),	OR: 	NOT: z.union([  ]).optional(),	id: z.union([ z.string().optional() ]).optional(),	email: z.union([ z.string().optional() ]).optional(),	name: z.union([ z.string().optional().nullable() ]).optional().nullable(),	role: 	enum: z.union([  ]).optional(),	scalarList: 	lat: z.union([ z.number().optional() ]).optional(),	lng: z.union([ z.number().optional() ]).optional(),}).strict();
