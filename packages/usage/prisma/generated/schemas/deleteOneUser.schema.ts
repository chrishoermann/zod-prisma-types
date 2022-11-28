import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './objects/UserWhereUniqueInput.schema';

export const UserDeleteOneSchema = z.object({
  where: UserWhereUniqueInputObjectSchema,
});
