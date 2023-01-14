import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { ProfileWhereInputSchema } from './ProfileWhereInputSchema';

export const ProfileRelationFilterSchema: z.ZodType<PrismaClient.Prisma.ProfileRelationFilter> = z.object({
  is: z.lazy(() => ProfileWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ProfileWhereInputSchema).optional().nullable(),
}).strict()