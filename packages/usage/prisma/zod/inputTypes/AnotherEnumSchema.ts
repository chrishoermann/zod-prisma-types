import { z } from 'zod'
import { AnotherEnum } from '@prisma/client'

export const AnotherEnumSchema = z.nativeEnum(AnotherEnum)
