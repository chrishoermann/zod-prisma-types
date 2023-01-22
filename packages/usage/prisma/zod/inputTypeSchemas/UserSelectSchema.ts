import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { PostFindManyArgsSchema } from '../outputTypeSchemas/PostFindManyArgsSchema'
import { ProfileArgsSchema } from '../outputTypeSchemas/ProfileArgsSchema'
import { LocationArgsSchema } from '../outputTypeSchemas/LocationArgsSchema'
import { UserCountOutputTypeArgsSchema } from '../outputTypeSchemas/UserCountOutputTypeArgsSchema'

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  posts: z.union([z.boolean(),z.lazy(() => PostFindManyArgsSchema)]).optional(),
  profile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
  role: z.boolean().optional(),
  enum: z.boolean().optional(),
  scalarList: z.boolean().optional(),
  lat: z.boolean().optional(),
  lng: z.boolean().optional(),
  location: z.union([z.boolean(),z.lazy(() => LocationArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default UserSelectSchema
