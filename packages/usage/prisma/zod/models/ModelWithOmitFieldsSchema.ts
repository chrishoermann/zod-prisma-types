import { z } from "zod";

export const ModelWithOmitFieldsSchema = z.object({
  id: z.string().cuid(),
  string: z.string().nullish(),
  // omitted: omitField: z.string().nullish(),
  // omitted: omitRequired: z.string(),
});

export const ModelWithOmitFieldsOptionalDefaultsSchema = ModelWithOmitFieldsSchema.merge(
  z.object({
    id: z.string().cuid().optional(),
  })
);
