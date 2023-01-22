import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { MYValueSchema } from './MYValueSchema';

export const MODELWithUpperCaseUncheckedCreateInputSchema: z.ZodType<Prisma.MODELWithUpperCaseUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  STRING: z.string(),
  MYValue: z.lazy(() => MYValueSchema),
}).strict()

export default MODELWithUpperCaseUncheckedCreateInputSchema
