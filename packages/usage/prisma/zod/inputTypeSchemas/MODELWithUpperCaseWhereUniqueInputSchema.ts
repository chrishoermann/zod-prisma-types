import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const MODELWithUpperCaseWhereUniqueInputSchema: z.ZodType<Prisma.MODELWithUpperCaseWhereUniqueInput> = z.object({
  id: z.number().optional(),
}).strict()

export default MODELWithUpperCaseWhereUniqueInputSchema
