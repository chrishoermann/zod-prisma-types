import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { PostUncheckedCreateNestedManyWithoutAuthorInputSchema } from './PostUncheckedCreateNestedManyWithoutAuthorInputSchema';
import { ProfileUncheckedCreateNestedOneWithoutUserInputSchema } from './ProfileUncheckedCreateNestedOneWithoutUserInputSchema';
import { UserCreateroleInputSchema } from './UserCreateroleInputSchema';
import { RoleSchema } from './RoleSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';
import { UserCreatescalarListInputSchema } from './UserCreatescalarListInputSchema';

export const UserUncheckedCreateWithoutLocationInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedCreateWithoutLocationInput> = z.object({
	id: z.string().optional(),
	email: z.string(),
	name: z.string().optional().nullable(),
	posts: 	profile: 	role: z.union([  ]).optional(),	enum: 	scalarList: z.union([ z.string().array().optional() ]).optional(),}).strict();
