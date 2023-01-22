import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const MyPrismaScalarsTypeSelectSchema: z.ZodType<Prisma.MyPrismaScalarsTypeSelect> = z.object({
  id: z.boolean().optional(),
  string: z.boolean().optional(),
  bic: z.boolean().optional(),
  float: z.boolean().optional(),
  floatOpt: z.boolean().optional(),
  int: z.boolean().optional(),
  intOpt: z.boolean().optional(),
  decimal: z.boolean().optional(),
  decimalOpt: z.boolean().optional(),
  date: z.boolean().optional(),
  dateOpt: z.boolean().optional(),
  bigIntOpt: z.boolean().optional(),
  json: z.boolean().optional(),
  jsonOpt: z.boolean().optional(),
  bytes: z.boolean().optional(),
  bytesOpt: z.boolean().optional(),
  custom: z.boolean().optional(),
  exclude: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

export default MyPrismaScalarsTypeSelectSchema
