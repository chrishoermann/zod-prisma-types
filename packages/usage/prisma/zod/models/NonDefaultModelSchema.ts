import { z } from "zod";

export const NonDefaultModelSchema = z.object({
  id: z.number().int(),
  string: z.string(),
});
