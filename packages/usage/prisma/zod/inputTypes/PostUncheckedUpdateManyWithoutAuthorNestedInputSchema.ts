import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { PostCreateWithoutAuthorInputSchema } from './PostCreateWithoutAuthorInputSchema';
import { PostUncheckedCreateWithoutAuthorInputSchema } from './PostUncheckedCreateWithoutAuthorInputSchema';
import { PostCreateOrConnectWithoutAuthorInputSchema } from './PostCreateOrConnectWithoutAuthorInputSchema';
import { PostUpsertWithWhereUniqueWithoutAuthorInputSchema } from './PostUpsertWithWhereUniqueWithoutAuthorInputSchema';
import { PostCreateManyAuthorInputEnvelopeSchema } from './PostCreateManyAuthorInputEnvelopeSchema';
import { PostWhereUniqueInputSchema } from './PostWhereUniqueInputSchema';
import { PostUpdateWithWhereUniqueWithoutAuthorInputSchema } from './PostUpdateWithWhereUniqueWithoutAuthorInputSchema';
import { PostUpdateManyWithWhereWithoutAuthorInputSchema } from './PostUpdateManyWithWhereWithoutAuthorInputSchema';
import { PostScalarWhereInputSchema } from './PostScalarWhereInputSchema';

export const PostUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<PrismaClient.Prisma.PostUncheckedUpdateManyWithoutAuthorNestedInput> = z.object({
	create: z.union([  ]).optional(),	connectOrCreate: z.union([  ]).optional(),	upsert: z.union([  ]).optional(),	createMany: 	set: z.union([  ]).optional(),	disconnect: z.union([  ]).optional(),	delete: z.union([  ]).optional(),	connect: z.union([  ]).optional(),	update: z.union([  ]).optional(),	updateMany: z.union([  ]).optional(),	deleteMany: z.union([  ]).optional(),}).strict();
