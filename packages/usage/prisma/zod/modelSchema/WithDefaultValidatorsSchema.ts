import { z } from 'zod'

export const WithDefaultValidatorsSchema = z.object({
  id: z.string().cuid(),
  idTwo: z.string(),
  integer: z.number().int(),
})

export const WithDefaultValidatorsOptionalDefaultsSchema = WithDefaultValidatorsSchema.merge(z.object({
  id: z.string().cuid().optional(),
  idTwo: z.string().optional(),
}))