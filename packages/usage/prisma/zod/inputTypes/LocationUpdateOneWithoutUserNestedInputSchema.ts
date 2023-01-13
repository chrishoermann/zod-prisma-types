import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { LocationCreateWithoutUserInputSchema } from './LocationCreateWithoutUserInputSchema';
import { LocationUncheckedCreateWithoutUserInputSchema } from './LocationUncheckedCreateWithoutUserInputSchema';
import { LocationCreateOrConnectWithoutUserInputSchema } from './LocationCreateOrConnectWithoutUserInputSchema';
import { LocationUpsertWithoutUserInputSchema } from './LocationUpsertWithoutUserInputSchema';
import { LocationWhereUniqueInputSchema } from './LocationWhereUniqueInputSchema';
import { LocationUpdateWithoutUserInputSchema } from './LocationUpdateWithoutUserInputSchema';
import { LocationUncheckedUpdateWithoutUserInputSchema } from './LocationUncheckedUpdateWithoutUserInputSchema';

export const LocationUpdateOneWithoutUserNestedInputSchema: z.ZodType<PrismaClient.Prisma.LocationUpdateOneWithoutUserNestedInput> = z.object({
	create: z.union([  ]).optional(),	connectOrCreate: 	upsert: 	disconnect: z.boolean().optional(),
	delete: z.boolean().optional(),
	connect: 	update: z.union([  ]).optional(),}).strict();
