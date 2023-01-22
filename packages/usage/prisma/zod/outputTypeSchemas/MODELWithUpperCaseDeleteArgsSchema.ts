import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { MODELWithUpperCaseSelectSchema } from '../inputTypeSchemas/MODELWithUpperCaseSelectSchema'
import { MODELWithUpperCaseWhereUniqueInputSchema } from '../inputTypeSchemas/MODELWithUpperCaseWhereUniqueInputSchema'

export const MODELWithUpperCaseDeleteArgsSchema: z.ZodType<Prisma.MODELWithUpperCaseDeleteArgs> = z.object({
  select: MODELWithUpperCaseSelectSchema.optional(),
  where: MODELWithUpperCaseWhereUniqueInputSchema,
}).strict()

export default MODELWithUpperCaseDeleteArgsSchema
