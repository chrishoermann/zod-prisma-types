import { z } from 'zod';
import { UserUpdateInputObjectSchema } from './objects/UserUpdateInput.schema';
import { UserWhereUniqueInputObjectSchema } from './objects/UserWhereUniqueInput.schema';

export const UserUpdateOneSchema = z.object({
  data: UserUpdateInputObjectSchema,
  where: UserWhereUniqueInputObjectSchema,
});
