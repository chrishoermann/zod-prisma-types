import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { UserScalarWhereInputSchema } from './UserScalarWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { EnumRoleNullableListFilterSchema } from './EnumRoleNullableListFilterSchema';
import { EnumAnotherEnumFilterSchema } from './EnumAnotherEnumFilterSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';
import { StringNullableListFilterSchema } from './StringNullableListFilterSchema';
import { FloatFilterSchema } from './FloatFilterSchema';

export const UserScalarWhereInputSchema: z.ZodType<PrismaClient.Prisma.UserScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  role: z.lazy(() => EnumRoleNullableListFilterSchema).optional(),
  enum: z.union([ z.lazy(() => EnumAnotherEnumFilterSchema),z.lazy(() => AnotherEnumSchema) ]).optional(),
  scalarList: z.lazy(() => StringNullableListFilterSchema).optional(),
  lat: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  lng: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
}).strict()