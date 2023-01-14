import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { ProfileUncheckedUpdateOneWithoutUserNestedInputSchema } from './ProfileUncheckedUpdateOneWithoutUserNestedInputSchema';
import { UserUpdateroleInputSchema } from './UserUpdateroleInputSchema';
import { RoleSchema } from './RoleSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';
import { EnumAnotherEnumFieldUpdateOperationsInputSchema } from './EnumAnotherEnumFieldUpdateOperationsInputSchema';
import { UserUpdatescalarListInputSchema } from './UserUpdatescalarListInputSchema';
import { FloatFieldUpdateOperationsInputSchema } from './FloatFieldUpdateOperationsInputSchema';

export const UserUncheckedUpdateWithoutPostsInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedUpdateWithoutPostsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profile: z.lazy(() => ProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  role: z.union([ z.lazy(() => UserUpdateroleInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
  enum: z.union([ z.lazy(() => AnotherEnumSchema),z.lazy(() => EnumAnotherEnumFieldUpdateOperationsInputSchema) ]).optional(),
  scalarList: z.union([ z.lazy(() => UserUpdatescalarListInputSchema),z.string().array() ]).optional(),
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict()