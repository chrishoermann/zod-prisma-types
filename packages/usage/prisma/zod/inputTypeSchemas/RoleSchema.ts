import { z } from 'zod'
import { Role } from '@prisma/client'

export const RoleSchema = z.nativeEnum(Role)

export type RoleType = `${z.infer<typeof RoleSchema>}`

export default RoleSchema
