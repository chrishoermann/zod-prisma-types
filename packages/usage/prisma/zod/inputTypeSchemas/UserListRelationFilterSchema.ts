import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserListRelationFilterSchema: z.ZodType<Prisma.UserListRelationFilter> = z.object({
  every: z.lazy(() => UserWhereInputSchema).optional(),
  some: z.lazy(() => UserWhereInputSchema).optional(),
  none: z.lazy(() => UserWhereInputSchema).optional(),
}).strict()

export default UserListRelationFilterSchema
