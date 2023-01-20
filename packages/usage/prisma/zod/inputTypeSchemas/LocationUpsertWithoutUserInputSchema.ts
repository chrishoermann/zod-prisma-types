import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { LocationUpdateWithoutUserInputSchema } from './LocationUpdateWithoutUserInputSchema';
import { LocationUncheckedUpdateWithoutUserInputSchema } from './LocationUncheckedUpdateWithoutUserInputSchema';
import { LocationCreateWithoutUserInputSchema } from './LocationCreateWithoutUserInputSchema';
import { LocationUncheckedCreateWithoutUserInputSchema } from './LocationUncheckedCreateWithoutUserInputSchema';

export const LocationUpsertWithoutUserInputSchema: z.ZodType<Prisma.LocationUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => LocationUpdateWithoutUserInputSchema),z.lazy(() => LocationUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => LocationCreateWithoutUserInputSchema),z.lazy(() => LocationUncheckedCreateWithoutUserInputSchema) ]),
}).strict()

export default LocationUpsertWithoutUserInputSchema
