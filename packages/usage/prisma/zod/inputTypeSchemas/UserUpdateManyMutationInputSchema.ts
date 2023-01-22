import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { UserUpdateroleInputSchema } from './UserUpdateroleInputSchema';
import { RoleSchema } from './RoleSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';
import { EnumAnotherEnumFieldUpdateOperationsInputSchema } from './EnumAnotherEnumFieldUpdateOperationsInputSchema';
import { UserUpdatescalarListInputSchema } from './UserUpdatescalarListInputSchema';

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email({ message: "Invalid email address" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1).max(100),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => UserUpdateroleInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
  enum: z.union([ z.lazy(() => AnotherEnumSchema),z.lazy(() => EnumAnotherEnumFieldUpdateOperationsInputSchema) ]).optional(),
  scalarList: z.union([ z.lazy(() => UserUpdatescalarListInputSchema),z.string().array() ]).optional(),
}).strict()

export default UserUpdateManyMutationInputSchema
