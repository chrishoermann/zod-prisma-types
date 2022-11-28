import { z } from 'zod';
import { UserCreateInputObjectSchema } from './objects/UserCreateInput.schema';

export const UserCreateOneSchema = z.object({
  data: UserCreateInputObjectSchema,
});
