import { z } from 'zod'
import { RoleSchema } from '../inputTypeSchemas/RoleSchema'
import { AnotherEnumSchema } from '../inputTypeSchemas/AnotherEnumSchema'

export const UserSchema = z.object({
  role: RoleSchema.array(),
  enum: AnotherEnumSchema,
  id: z.string().cuid(),
  email: z.string().email({ message: "Invalid email address" }),
  /**
   * some other comment
   * some message after
   */
  name: z.string().min(1).max(100).nullish(),
  scalarList: z.string().array(),
  lat: z.number(),
  lng: z.number(),
})

export const UserOptionalDefaultsSchema = UserSchema.merge(z.object({
  role: RoleSchema.array().optional(),
  enum: AnotherEnumSchema.optional(),
  id: z.string().cuid().optional(),
}))