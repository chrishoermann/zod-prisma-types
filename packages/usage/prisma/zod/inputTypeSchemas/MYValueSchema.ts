import { z } from 'zod'
import { MYValue } from '@prisma/client'

export const MYValueSchema = z.nativeEnum(MYValue)

export default MYValueSchema
