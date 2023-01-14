import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { ProfileUncheckedCreateNestedOneWithoutUserInputSchema } from './ProfileUncheckedCreateNestedOneWithoutUserInputSchema';
import { UserCreateroleInputSchema } from './UserCreateroleInputSchema';
import { RoleSchema } from './RoleSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';
import { UserCreatescalarListInputSchema } from './UserCreatescalarListInputSchema';

export const UserUncheckedCreateWithoutPostsInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedCreateWithoutPostsInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  profile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  role: z.union([ z.lazy(() => UserCreateroleInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
  enum: z.lazy(() => AnotherEnumSchema).optional(),
  scalarList: z.union([ z.lazy(() => UserCreatescalarListInputSchema),z.string().array() ]).optional(),
  lat: z.number(),
  lng: z.number(),
}).strict()