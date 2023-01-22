import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { UserSelectSchema } from '../inputTypeSchemas/UserSelectSchema'
import { UserIncludeSchema } from '../inputTypeSchemas/UserIncludeSchema'

export const UserArgsSchema: z.ZodType<Prisma.UserArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict()

export default UserSelectSchema
