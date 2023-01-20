import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { LocationCreateWithoutUserInputSchema } from './LocationCreateWithoutUserInputSchema';
import { LocationUncheckedCreateWithoutUserInputSchema } from './LocationUncheckedCreateWithoutUserInputSchema';
import { LocationCreateOrConnectWithoutUserInputSchema } from './LocationCreateOrConnectWithoutUserInputSchema';
import { LocationUpsertWithoutUserInputSchema } from './LocationUpsertWithoutUserInputSchema';
import { LocationWhereUniqueInputSchema } from './LocationWhereUniqueInputSchema';
import { LocationUpdateWithoutUserInputSchema } from './LocationUpdateWithoutUserInputSchema';
import { LocationUncheckedUpdateWithoutUserInputSchema } from './LocationUncheckedUpdateWithoutUserInputSchema';

export const LocationUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.LocationUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutUserInputSchema),z.lazy(() => LocationUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LocationCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => LocationUpsertWithoutUserInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => LocationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => LocationUpdateWithoutUserInputSchema),z.lazy(() => LocationUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict()

export default LocationUpdateOneWithoutUserNestedInputSchema
