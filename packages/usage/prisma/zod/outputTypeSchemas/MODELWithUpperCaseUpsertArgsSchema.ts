import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { MODELWithUpperCaseSelectSchema } from '../inputTypeSchemas/MODELWithUpperCaseSelectSchema'
import { MODELWithUpperCaseWhereUniqueInputSchema } from '../inputTypeSchemas/MODELWithUpperCaseWhereUniqueInputSchema'
import { MODELWithUpperCaseCreateInputSchema } from '../inputTypeSchemas/MODELWithUpperCaseCreateInputSchema'
import { MODELWithUpperCaseUncheckedCreateInputSchema } from '../inputTypeSchemas/MODELWithUpperCaseUncheckedCreateInputSchema'
import { MODELWithUpperCaseUpdateInputSchema } from '../inputTypeSchemas/MODELWithUpperCaseUpdateInputSchema'
import { MODELWithUpperCaseUncheckedUpdateInputSchema } from '../inputTypeSchemas/MODELWithUpperCaseUncheckedUpdateInputSchema'

export const MODELWithUpperCaseUpsertArgsSchema: z.ZodType<Prisma.MODELWithUpperCaseUpsertArgs> = z.object({
  select: MODELWithUpperCaseSelectSchema.optional(),
  where: MODELWithUpperCaseWhereUniqueInputSchema,
  create: z.union([ MODELWithUpperCaseCreateInputSchema,MODELWithUpperCaseUncheckedCreateInputSchema ]),
  update: z.union([ MODELWithUpperCaseUpdateInputSchema,MODELWithUpperCaseUncheckedUpdateInputSchema ]),
}).strict()

export default MODELWithUpperCaseUpsertArgsSchema
