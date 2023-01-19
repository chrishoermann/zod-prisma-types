import { z } from "zod";
import { RoleSchema } from '../inputTypes/RoleSchema';
import { SecondEnumSchema } from '../inputTypes/SecondEnumSchema';

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
