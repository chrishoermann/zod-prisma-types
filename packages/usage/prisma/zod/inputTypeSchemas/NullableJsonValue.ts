import { z } from 'zod'
import transformJsonNull from './transformJsonNull'
import JsonValue from './JsonValue'

export const NullableJsonValue = z
  .union([JsonValue, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v))

export default NullableJsonValue
