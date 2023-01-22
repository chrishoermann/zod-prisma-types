import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { MODELWithUpperCaseWhereInputSchema } from '../inputTypeSchemas/MODELWithUpperCaseWhereInputSchema'

export const MODELWithUpperCaseDeleteManyArgsSchema: z.ZodType<Prisma.MODELWithUpperCaseDeleteManyArgs> = z.object({
  where: MODELWithUpperCaseWhereInputSchema.optional(),
}).strict()

export default MODELWithUpperCaseDeleteManyArgsSchema
