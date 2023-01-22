import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { MyPrismaScalarsTypeSelectSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeSelectSchema'
import { MyPrismaScalarsTypeWhereUniqueInputSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeWhereUniqueInputSchema'

export const MyPrismaScalarsTypeDeleteArgsSchema: z.ZodType<Prisma.MyPrismaScalarsTypeDeleteArgs> = z.object({
  select: MyPrismaScalarsTypeSelectSchema.optional(),
  where: MyPrismaScalarsTypeWhereUniqueInputSchema,
}).strict()

export default MyPrismaScalarsTypeDeleteArgsSchema
