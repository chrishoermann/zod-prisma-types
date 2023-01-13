import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { PostUpdateManyWithoutAuthorNestedInputSchema } from './PostUpdateManyWithoutAuthorNestedInputSchema';
import { ProfileUpdateOneWithoutUserNestedInputSchema } from './ProfileUpdateOneWithoutUserNestedInputSchema';
import { UserUpdateroleInputSchema } from './UserUpdateroleInputSchema';
import { RoleSchema } from './RoleSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';
import { EnumAnotherEnumFieldUpdateOperationsInputSchema } from './EnumAnotherEnumFieldUpdateOperationsInputSchema';
import { UserUpdatescalarListInputSchema } from './UserUpdatescalarListInputSchema';

export const UserUpdateWithoutLocationInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateWithoutLocationInput> = z.object({
	id: z.union([ z.string().optional(), 
 ]).optional(),	email: z.union([ z.string().optional(), 
 ]).optional(),	name: z.union([ z.string().optional().nullable(), 
 ]).optional().nullable(),	posts: 	profile: 	role: z.union([  ]).optional(),	enum: z.union([  ]).optional(),	scalarList: z.union([ z.string().array().optional() ]).optional(),}).strict();
