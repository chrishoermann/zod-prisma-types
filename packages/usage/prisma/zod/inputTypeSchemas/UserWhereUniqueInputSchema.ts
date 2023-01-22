import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().optional(),
  email: z.string().optional(),
}).strict()

export default UserWhereUniqueInputSchema
