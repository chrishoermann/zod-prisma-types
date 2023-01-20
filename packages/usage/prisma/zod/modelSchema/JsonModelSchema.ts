import { z } from 'zod'
import { NullableJsonValue } from "../inputTypeSchemas/NullableJsonValue"
import { InputJsonValue } from "../inputTypeSchemas/InputJsonValue"

export const JsonModelSchema = z.object({
  id: z.number().int(),
  json: InputJsonValue,
  jsonOpt: NullableJsonValue.optional(),
})

export const JsonModelOptionalDefaultsSchema = JsonModelSchema.merge(z.object({
  id: z.number().int().optional(),
}))