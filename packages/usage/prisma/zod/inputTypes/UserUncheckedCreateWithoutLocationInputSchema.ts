import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { PostUncheckedCreateNestedManyWithoutAuthorInputSchema } from './PostUncheckedCreateNestedManyWithoutAuthorInputSchema';
import { ProfileUncheckedCreateNestedOneWithoutUserInputSchema } from './ProfileUncheckedCreateNestedOneWithoutUserInputSchema';
import { UserCreateroleInputSchema } from './UserCreateroleInputSchema';
import { RoleSchema } from './RoleSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';
import { UserCreatescalarListInputSchema } from './UserCreatescalarListInputSchema';

export const UserUncheckedCreateWithoutLocationInputSchema: z.ZodType<PrismaClient.Prisma.UserUncheckedCreateWithoutLocationInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  profile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  role: z.union([ z.lazy(() => UserCreateroleInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
  enum: z.lazy(() => AnotherEnumSchema).optional(),
  scalarList: z.union([ z.lazy(() => UserCreatescalarListInputSchema),z.string().array() ]).optional(),
}).strict()