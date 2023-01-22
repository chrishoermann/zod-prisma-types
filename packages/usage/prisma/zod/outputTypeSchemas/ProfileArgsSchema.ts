import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { ProfileSelectSchema } from '../inputTypeSchemas/ProfileSelectSchema'
import { ProfileIncludeSchema } from '../inputTypeSchemas/ProfileIncludeSchema'

export const ProfileArgsSchema: z.ZodType<Prisma.ProfileArgs> = z.object({
  select: z.lazy(() => ProfileSelectSchema).optional(),
  include: z.lazy(() => ProfileIncludeSchema).optional(),
}).strict()

export default ProfileSelectSchema
