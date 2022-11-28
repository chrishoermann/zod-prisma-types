import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './objects/UserWhereUniqueInput.schema';
import { UserCreateInputObjectSchema } from './objects/UserCreateInput.schema';
import { UserUpdateInputObjectSchema } from './objects/UserUpdateInput.schema';

export const UserUpsertSchema = z.object({
  where: UserWhereUniqueInputObjectSchema,
  create: UserCreateInputObjectSchema,
  update: UserUpdateInputObjectSchema,
});
