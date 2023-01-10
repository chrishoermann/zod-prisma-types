import { transformJsonNull } from "../helpers";
import { z } from "zod";

export const NullableJsonNullValueInputSchema = z.enum(['DbNull', 'JsonNull',]).transform((v) => transformJsonNull(v));
