import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';
import { EnumRoleNullableListFilterSchema } from './EnumRoleNullableListFilterSchema';
import { EnumAnotherEnumWithAggregatesFilterSchema } from './EnumAnotherEnumWithAggregatesFilterSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';
import { StringNullableListFilterSchema } from './StringNullableListFilterSchema';
import { FloatWithAggregatesFilterSchema } from './FloatWithAggregatesFilterSchema';

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  role: z.lazy(() => EnumRoleNullableListFilterSchema).optional(),
  enum: z.union([ z.lazy(() => EnumAnotherEnumWithAggregatesFilterSchema),z.lazy(() => AnotherEnumSchema) ]).optional(),
  scalarList: z.lazy(() => StringNullableListFilterSchema).optional(),
  lat: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  lng: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict()

export default UserScalarWhereWithAggregatesInputSchema
