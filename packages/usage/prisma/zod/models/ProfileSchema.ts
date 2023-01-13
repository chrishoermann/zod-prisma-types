import { z } from "zod";
import { RoleSchema } from '../enums/RoleSchema';
import { SecondEnumSchema } from '../enums/SecondEnumSchema';

export const ProfileSchema = z.object({
  role: RoleSchema.array(),
  second: SecondEnumSchema,
  id: z.number().int(),
  bio: z.string(),
  userId: z.string(),
});

export const ProfileOptionalDefaultsSchema = ProfileSchema.merge(
  z.object({
    role: RoleSchema.array().optional(),
    second: SecondEnumSchema.optional(),
    id: z.number().int().optional(),
  })
);
