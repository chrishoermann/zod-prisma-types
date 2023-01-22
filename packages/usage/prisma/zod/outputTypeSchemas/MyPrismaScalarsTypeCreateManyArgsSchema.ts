import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { MyPrismaScalarsTypeCreateManyInputSchema } from '../inputTypeSchemas/MyPrismaScalarsTypeCreateManyInputSchema'

export const MyPrismaScalarsTypeCreateManyArgsSchema: z.ZodType<Omit<Prisma.MyPrismaScalarsTypeCreateManyArgs, "data"> & { skipDuplicates?: z.infer<typeof BooleanSchema>  }> = z.object({
  data: MyPrismaScalarsTypeCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default MyPrismaScalarsTypeCreateManyArgsSchema
