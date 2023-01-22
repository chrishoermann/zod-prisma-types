import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { PostFindManyArgsSchema } from '../outputTypeSchemas/PostFindManyArgsSchema'
import { ProfileArgsSchema } from '../outputTypeSchemas/ProfileArgsSchema'
import { LocationArgsSchema } from '../outputTypeSchemas/LocationArgsSchema'
import { UserCountOutputTypeArgsSchema } from '../outputTypeSchemas/UserCountOutputTypeArgsSchema'

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  posts: z.union([z.boolean(),z.lazy(() => PostFindManyArgsSchema)]).optional(),
  profile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
  location: z.union([z.boolean(),z.lazy(() => LocationArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default UserIncludeSchema
