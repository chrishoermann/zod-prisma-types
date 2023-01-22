import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({{
  posts: z.boolean().optional(),
}).strict()

export default UserCountOutputTypeSelectSchema
