import { z } from "zod";

export const ModelWithCommentsSchema = z.object({
  id: z.string().uuid(),
  /**
   * comment before validator
   * comment after validator
   */
  string: z.string().min(4).max(10).nullish(),
  // omitted: omitField: z.string().nullish(),
  // omitted: omitRequired: z.string(),
});

export const ModelWithCommentsOptionalDefaultsSchema = ModelWithCommentsSchema.merge(
  z.object({
    id: z.string().uuid().optional(),
  })
);
