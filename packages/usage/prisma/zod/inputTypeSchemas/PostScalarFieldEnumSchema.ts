import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const PostScalarFieldEnumSchema = z.nativeEnum(Prisma.PostScalarFieldEnum)

export type PostScalarFieldEnumType = `z.infer<typeof PostScalarFieldEnumSchema>`

export default PostScalarFieldEnumSchema
