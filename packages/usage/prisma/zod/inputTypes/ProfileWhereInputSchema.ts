import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { ProfileWhereInputSchema } from './ProfileWhereInputSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { UserRelationFilterSchema } from './UserRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { EnumRoleNullableListFilterSchema } from './EnumRoleNullableListFilterSchema';
import { EnumSecondEnumFilterSchema } from './EnumSecondEnumFilterSchema';
import { SecondEnumSchema } from './SecondEnumSchema';

export const ProfileWhereInputSchema: z.ZodType<PrismaClient.Prisma.ProfileWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProfileWhereInputSchema),z.lazy(() => ProfileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileWhereInputSchema),z.lazy(() => ProfileWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  bio: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.lazy(() => EnumRoleNullableListFilterSchema).optional(),
  second: z.union([ z.lazy(() => EnumSecondEnumFilterSchema),z.lazy(() => SecondEnumSchema) ]).optional(),
}).strict()