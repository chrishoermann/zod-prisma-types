import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { MODELWithUpperCaseCreateManyInputSchema } from '../inputTypeSchemas/MODELWithUpperCaseCreateManyInputSchema'

export const MODELWithUpperCaseCreateManyArgsSchema: z.ZodType<Prisma.MODELWithUpperCaseCreateManyArgs> = z.object({
  data: MODELWithUpperCaseCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default MODELWithUpperCaseCreateManyArgsSchema
