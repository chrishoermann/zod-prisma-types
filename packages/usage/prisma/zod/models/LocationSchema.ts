import { z } from "zod";

export const LocationSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});
