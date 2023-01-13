import { z } from "zod";
import { InputJsonValue, NullableJsonValue } from "../helpers";

export const JsonModelSchema = z.object({
  id: z.number().int(),
  json: InputJsonValue,
  jsonOpt: NullableJsonValue.optional(),
});

export const JsonModelOptionalDefaultsSchema = JsonModelSchema.merge(
  z.object({
    id: z.number().int().optional(),
  })
);
