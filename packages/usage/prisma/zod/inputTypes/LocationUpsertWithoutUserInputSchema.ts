import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { LocationUpdateWithoutUserInputSchema } from './LocationUpdateWithoutUserInputSchema';
import { LocationUncheckedUpdateWithoutUserInputSchema } from './LocationUncheckedUpdateWithoutUserInputSchema';
import { LocationCreateWithoutUserInputSchema } from './LocationCreateWithoutUserInputSchema';
import { LocationUncheckedCreateWithoutUserInputSchema } from './LocationUncheckedCreateWithoutUserInputSchema';

export const LocationUpsertWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.LocationUpsertWithoutUserInput> = z.object({
	update: z.union([  ]),	create: z.union([  ]),}).strict();
