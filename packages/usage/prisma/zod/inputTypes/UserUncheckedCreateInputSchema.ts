import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { PostUncheckedCreateNestedManyWithoutAuthorInputSchema } from './PostUncheckedCreateNestedManyWithoutAuthorInputSchema';
import { ProfileUncheckedCreateNestedOneWithoutUserInputSchema } from './ProfileUncheckedCreateNestedOneWithoutUserInputSchema';
import { UserCreateroleInputSchema } from './UserCreateroleInputSchema';
import { RoleSchema } from './RoleSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';
import { UserCreatescalarListInputSchema } from './UserCreatescalarListInputSchema';

export const UserUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedCreateInput> = z.object({
	id: z.string().cuid().optional(),
	email: z.string().email({ message: "Invalid email address" }),
	name: z.string().min(1).max(100).optional().nullable(),
	posts: 	profile: 	role: z.union([  ]).optional(),	enum: 	scalarList: z.union([ z.string().array().optional() ]).optional(),	lat: z.number(),
	lng: z.number(),
}).strict();
