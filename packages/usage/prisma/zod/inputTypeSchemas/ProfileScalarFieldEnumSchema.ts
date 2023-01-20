import { z } from 'zod'
import * as PrismaClient from '@prisma/client'

export const ProfileScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.ProfileScalarFieldEnum)

export default ProfileScalarFieldEnumSchema
