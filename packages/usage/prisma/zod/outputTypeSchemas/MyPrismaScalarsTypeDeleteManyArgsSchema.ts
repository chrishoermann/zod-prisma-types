import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { MyPrismaScalarsTypeWhereInputSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeWhereInputSchema'

export const MyPrismaScalarsTypeDeleteManyArgsSchema: z.ZodType<Prisma.MyPrismaScalarsTypeDeleteManyArgs> = z.object({
  where: MyPrismaScalarsTypeWhereInputSchema.optional(),
}).strict()

export default MyPrismaScalarsTypeDeleteManyArgsSchema
