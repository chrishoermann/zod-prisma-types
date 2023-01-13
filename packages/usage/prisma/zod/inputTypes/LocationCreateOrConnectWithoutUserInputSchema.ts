import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { LocationWhereUniqueInputSchema } from './LocationWhereUniqueInputSchema';
import { LocationCreateWithoutUserInputSchema } from './LocationCreateWithoutUserInputSchema';
import { LocationUncheckedCreateWithoutUserInputSchema } from './LocationUncheckedCreateWithoutUserInputSchema';

export const LocationCreateOrConnectWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.LocationCreateOrConnectWithoutUserInput> = z.object({
	where: 	create: z.union([  ]),}).strict();
