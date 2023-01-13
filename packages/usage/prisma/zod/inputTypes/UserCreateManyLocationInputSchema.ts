import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { UserCreateroleInputSchema } from './UserCreateroleInputSchema';
import { RoleSchema } from './RoleSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';
import { UserCreatescalarListInputSchema } from './UserCreatescalarListInputSchema';

export const UserCreateManyLocationInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateManyLocationInput> = z.object({
	id: z.string().cuid().optional(),
	email: z.string().email({ message: "Invalid email address" }),
	name: z.string().min(1).max(100).optional().nullable(),
	role: z.union([  ]).optional(),	enum: 	scalarList: z.union([ z.string().array().optional() ]).optional(),}).strict();
