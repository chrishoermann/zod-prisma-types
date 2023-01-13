import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { PostUncheckedUpdateManyWithoutAuthorNestedInputSchema } from './PostUncheckedUpdateManyWithoutAuthorNestedInputSchema';
import { ProfileUncheckedUpdateOneWithoutUserNestedInputSchema } from './ProfileUncheckedUpdateOneWithoutUserNestedInputSchema';
import { UserUpdateroleInputSchema } from './UserUpdateroleInputSchema';
import { RoleSchema } from './RoleSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';
import { EnumAnotherEnumFieldUpdateOperationsInputSchema } from './EnumAnotherEnumFieldUpdateOperationsInputSchema';
import { UserUpdatescalarListInputSchema } from './UserUpdatescalarListInputSchema';
import { FloatFieldUpdateOperationsInputSchema } from './FloatFieldUpdateOperationsInputSchema';

export const UserUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedUpdateInput> = z.object({
	id: z.union([ z.string().cuid().optional(), 
 ]).optional(),	email: z.union([ z.string().email({ message: "Invalid email address" }).optional(), 
 ]).optional(),	name: z.union([ z.string().min(1).max(100).optional().nullable(), 
 ]).optional().nullable(),	posts: 	profile: 	role: z.union([  ]).optional(),	enum: z.union([  ]).optional(),	scalarList: z.union([ z.string().array().optional() ]).optional(),	lat: z.union([ z.number().optional(), 
 ]).optional(),	lng: z.union([ z.number().optional(), 
 ]).optional(),}).strict();
