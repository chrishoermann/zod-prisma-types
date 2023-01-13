import { z } from "zod";
import { transformJsonNull } from "../helpers";

export const NullableJsonNullValueInputSchema = z.enum(['DbNull', 'JsonNull',]).transform((v) => transformJsonNull(v));
