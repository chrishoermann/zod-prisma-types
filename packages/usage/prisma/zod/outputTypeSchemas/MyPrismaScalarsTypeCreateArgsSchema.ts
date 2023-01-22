import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { MyPrismaScalarsTypeSelectSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeSelectSchema'
import { MyPrismaScalarsTypeCreateInputSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeCreateInputSchema'
import { MyPrismaScalarsTypeUncheckedCreateInputSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeUncheckedCreateInputSchema'

export const MyPrismaScalarsTypeCreateArgsSchema: z.ZodType<Omit<Prisma.MyPrismaScalarsTypeCreateArgs, "data"> & {  }> = z.object({
  select: MyPrismaScalarsTypeSelectSchema.optional(),
  data: z.union([ MyPrismaScalarsTypeCreateInputSchema,MyPrismaScalarsTypeUncheckedCreateInputSchema ]),
}).strict()

export default MyPrismaScalarsTypeCreateArgsSchema
