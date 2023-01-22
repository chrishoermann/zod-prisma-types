import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { LocationWhereUniqueInputSchema } from './LocationWhereUniqueInputSchema';
import { LocationCreateWithoutUserInputSchema } from './LocationCreateWithoutUserInputSchema';
import { LocationUncheckedCreateWithoutUserInputSchema } from './LocationUncheckedCreateWithoutUserInputSchema';

export const LocationCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.LocationCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => LocationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LocationCreateWithoutUserInputSchema),z.lazy(() => LocationUncheckedCreateWithoutUserInputSchema) ]),
}).strict()

export default LocationCreateOrConnectWithoutUserInputSchema
