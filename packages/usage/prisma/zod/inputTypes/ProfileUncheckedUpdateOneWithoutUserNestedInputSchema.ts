import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { ProfileCreateWithoutUserInputSchema } from './ProfileCreateWithoutUserInputSchema';
import { ProfileUncheckedCreateWithoutUserInputSchema } from './ProfileUncheckedCreateWithoutUserInputSchema';
import { ProfileCreateOrConnectWithoutUserInputSchema } from './ProfileCreateOrConnectWithoutUserInputSchema';
import { ProfileUpsertWithoutUserInputSchema } from './ProfileUpsertWithoutUserInputSchema';
import { ProfileWhereUniqueInputSchema } from './ProfileWhereUniqueInputSchema';
import { ProfileUpdateWithoutUserInputSchema } from './ProfileUpdateWithoutUserInputSchema';
import { ProfileUncheckedUpdateWithoutUserInputSchema } from './ProfileUncheckedUpdateWithoutUserInputSchema';

export const ProfileUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<PrismaClient.Prisma.ProfileUncheckedUpdateOneWithoutUserNestedInput> = z.object({
	create: z.union([  ]).optional(),	connectOrCreate: 	upsert: 	disconnect: z.boolean().optional(),
	delete: z.boolean().optional(),
	connect: 	update: z.union([  ]).optional(),}).strict();
