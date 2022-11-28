import { z } from 'zod';
import { MyValueSchema } from '../enums/MyValue.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumMyValueFieldUpdateOperationsInput> = z
  .object({
    set: z.lazy(() => MyValueSchema).optional(),
  })
  .strict();

export const EnumMyValueFieldUpdateOperationsInputObjectSchema = Schema;
