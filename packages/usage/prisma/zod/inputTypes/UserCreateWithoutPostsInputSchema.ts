import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { ProfileCreateNestedOneWithoutUserInputSchema } from './ProfileCreateNestedOneWithoutUserInputSchema';
import { UserCreateroleInputSchema } from './UserCreateroleInputSchema';
import { RoleSchema } from './RoleSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';
import { UserCreatescalarListInputSchema } from './UserCreatescalarListInputSchema';
import { LocationCreateNestedOneWithoutUserInputSchema } from './LocationCreateNestedOneWithoutUserInputSchema';

export const UserCreateWithoutPostsInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateWithoutPostsInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutUserInputSchema).optional(),
  role: z.union([ z.lazy(() => UserCreateroleInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
  enum: z.lazy(() => AnotherEnumSchema).optional(),
  scalarList: z.union([ z.lazy(() => UserCreatescalarListInputSchema),z.string().array() ]).optional(),
  location: z.lazy(() => LocationCreateNestedOneWithoutUserInputSchema).optional(),
}).strict()