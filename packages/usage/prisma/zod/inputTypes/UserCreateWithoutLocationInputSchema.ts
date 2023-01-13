import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { PostCreateNestedManyWithoutAuthorInputSchema } from './PostCreateNestedManyWithoutAuthorInputSchema';
import { ProfileCreateNestedOneWithoutUserInputSchema } from './ProfileCreateNestedOneWithoutUserInputSchema';
import { UserCreateroleInputSchema } from './UserCreateroleInputSchema';
import { RoleSchema } from './RoleSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';
import { UserCreatescalarListInputSchema } from './UserCreatescalarListInputSchema';

export const UserCreateWithoutLocationInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateWithoutLocationInput> = z.object({
	id: z.string().optional(),
	email: z.string(),
	name: z.string().optional().nullable(),
	posts: 	profile: 	role: z.union([  ]).optional(),	enum: 	scalarList: z.union([ z.string().array().optional() ]).optional(),}).strict();
