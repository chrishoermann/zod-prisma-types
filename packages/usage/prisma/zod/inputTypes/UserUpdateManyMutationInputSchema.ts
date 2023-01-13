import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { UserUpdateroleInputSchema } from './UserUpdateroleInputSchema';
import { RoleSchema } from './RoleSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';
import { EnumAnotherEnumFieldUpdateOperationsInputSchema } from './EnumAnotherEnumFieldUpdateOperationsInputSchema';
import { UserUpdatescalarListInputSchema } from './UserUpdatescalarListInputSchema';

export const UserUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateManyMutationInput> = z.object({
	id: z.union([ z.string().cuid().optional(), 
 ]).optional(),	email: z.union([ z.string().email({ message: "Invalid email address" }).optional(), 
 ]).optional(),	name: z.union([ z.string().min(1).max(100).optional().nullable(), 
 ]).optional().nullable(),	role: z.union([  ]).optional(),	enum: z.union([  ]).optional(),	scalarList: z.union([ z.string().array().optional() ]).optional(),}).strict();
