import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const ProfileScalarFieldEnumSchema = z.nativeEnum(Prisma.ProfileScalarFieldEnum)

export type ProfileScalarFieldEnumType = `z.infer<typeof ProfileScalarFieldEnumSchema>`

export default ProfileScalarFieldEnumSchema
