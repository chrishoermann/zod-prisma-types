import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const UserScalarFieldEnumSchema = z.nativeEnum(Prisma.UserScalarFieldEnum)

export type UserScalarFieldEnumType = `z.infer<typeof UserScalarFieldEnumSchema>`

export default UserScalarFieldEnumSchema
