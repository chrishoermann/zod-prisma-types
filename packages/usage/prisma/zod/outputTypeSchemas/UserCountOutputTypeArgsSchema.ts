import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { UserCountOutputTypeSelectSchema } from './UserCountOutputTypeSelectSchema'

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeArgs> = z.object({{
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict()

export default UserCountOutputTypeSelectSchema
