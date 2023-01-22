import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { LocationCreateWithoutUserInputSchema } from './LocationCreateWithoutUserInputSchema';
import { LocationUncheckedCreateWithoutUserInputSchema } from './LocationUncheckedCreateWithoutUserInputSchema';
import { LocationCreateOrConnectWithoutUserInputSchema } from './LocationCreateOrConnectWithoutUserInputSchema';
import { LocationWhereUniqueInputSchema } from './LocationWhereUniqueInputSchema';

export const LocationCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.LocationCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutUserInputSchema),z.lazy(() => LocationUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LocationCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => LocationWhereUniqueInputSchema).optional(),
}).strict()

export default LocationCreateNestedOneWithoutUserInputSchema
