import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { ProfileWhereInputSchema } from './ProfileWhereInputSchema';

export const ProfileRelationFilterSchema: z.ZodType<Prisma.ProfileRelationFilter> = z.object({
  is: z.lazy(() => ProfileWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ProfileWhereInputSchema).optional().nullable(),
}).strict()

export default ProfileRelationFilterSchema
