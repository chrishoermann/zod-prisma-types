import { z } from 'zod'
import { AnotherEnumSchema } from '../inputTypeSchemas/AnotherEnumSchema'

export const PostSchema = z.object({
  anotherEnum: AnotherEnumSchema.array(),
  id: z.number().int(),
  title: z.string(),
  content: z.string().nullish(),
  published: z.boolean(),
  authorId: z.string(),
})

export const PostOptionalDefaultsSchema = PostSchema.merge(z.object({
  id: z.number().int().optional(),
  published: z.boolean().optional(),
}))