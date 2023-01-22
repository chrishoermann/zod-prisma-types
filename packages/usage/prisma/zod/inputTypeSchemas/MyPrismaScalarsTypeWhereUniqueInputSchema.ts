import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const MyPrismaScalarsTypeWhereUniqueInputSchema: z.ZodType<Prisma.MyPrismaScalarsTypeWhereUniqueInput> = z.object({
  id: z.string().optional(),
}).strict()

export default MyPrismaScalarsTypeWhereUniqueInputSchema
