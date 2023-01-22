import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { MyPrismaScalarsTypeSelectSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeSelectSchema'
import { MyPrismaScalarsTypeWhereUniqueInputSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeWhereUniqueInputSchema'

export const MyPrismaScalarsTypeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MyPrismaScalarsTypeFindUniqueOrThrowArgs> = z.object({
  select: MyPrismaScalarsTypeSelectSchema.optional(),
  where: MyPrismaScalarsTypeWhereUniqueInputSchema,
}).strict()

export default MyPrismaScalarsTypeFindUniqueOrThrowArgsSchema
