import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const MODELWithUpperCaseSelectSchema: z.ZodType<Prisma.MODELWithUpperCaseSelect> = z.object({
  id: z.boolean().optional(),
  STRING: z.boolean().optional(),
  MYValue: z.boolean().optional(),
}).strict()

export default MODELWithUpperCaseSelectSchema
