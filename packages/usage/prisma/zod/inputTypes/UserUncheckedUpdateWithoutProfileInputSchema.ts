import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { PostUncheckedUpdateManyWithoutAuthorNestedInputSchema } from './PostUncheckedUpdateManyWithoutAuthorNestedInputSchema';
import { UserUpdateroleInputSchema } from './UserUpdateroleInputSchema';
import { RoleSchema } from './RoleSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';
import { EnumAnotherEnumFieldUpdateOperationsInputSchema } from './EnumAnotherEnumFieldUpdateOperationsInputSchema';
import { UserUpdatescalarListInputSchema } from './UserUpdatescalarListInputSchema';
import { FloatFieldUpdateOperationsInputSchema } from './FloatFieldUpdateOperationsInputSchema';

export const UserUncheckedUpdateWithoutProfileInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedUpdateWithoutProfileInput> = z.object({
	id: z.union([ z.string().optional(), 
 ]).optional(),	email: z.union([ z.string().optional(), 
 ]).optional(),	name: z.union([ z.string().optional().nullable(), 
 ]).optional().nullable(),	posts: 	role: z.union([  ]).optional(),	enum: z.union([  ]).optional(),	scalarList: z.union([ z.string().array().optional() ]).optional(),	lat: z.union([ z.number().optional(), 
 ]).optional(),	lng: z.union([ z.number().optional(), 
 ]).optional(),}).strict();
