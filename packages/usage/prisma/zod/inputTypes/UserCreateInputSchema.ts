import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { PostCreateNestedManyWithoutAuthorInputSchema } from './PostCreateNestedManyWithoutAuthorInputSchema';
import { ProfileCreateNestedOneWithoutUserInputSchema } from './ProfileCreateNestedOneWithoutUserInputSchema';
import { UserCreateroleInputSchema } from './UserCreateroleInputSchema';
import { RoleSchema } from './RoleSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';
import { UserCreatescalarListInputSchema } from './UserCreatescalarListInputSchema';
import { LocationCreateNestedOneWithoutUserInputSchema } from './LocationCreateNestedOneWithoutUserInputSchema';

export const UserCreateInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().min(1).max(100).optional().nullable(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutUserInputSchema).optional(),
  role: z.union([ z.lazy(() => UserCreateroleInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
  enum: z.lazy(() => AnotherEnumSchema).optional(),
  scalarList: z.union([ z.lazy(() => UserCreatescalarListInputSchema),z.string().array() ]).optional(),
  location: z.lazy(() => LocationCreateNestedOneWithoutUserInputSchema).optional(),
}).strict()