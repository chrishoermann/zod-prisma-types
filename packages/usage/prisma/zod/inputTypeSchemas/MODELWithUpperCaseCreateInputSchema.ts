import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { MYValueSchema } from './MYValueSchema';

export const MODELWithUpperCaseCreateInputSchema: z.ZodType<Prisma.MODELWithUpperCaseCreateInput> = z.object({
  STRING: z.string(),
  MYValue: z.lazy(() => MYValueSchema),
}).strict()

export default MODELWithUpperCaseCreateInputSchema
