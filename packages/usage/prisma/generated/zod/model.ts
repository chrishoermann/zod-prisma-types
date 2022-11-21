import * as Prisma from "@prisma/client";
import { z } from "zod";

/////////////////////////////////////////
// USER MODEL
/////////////////////////////////////////

export const UserCreateInputScalarType = z.object({
  id: z.string().optional(),
  name: z.string(),
  intTwo: z.number(),
  int: z.number().optional(),
});

export const UserCreateInputScalarAndEnumType = UserCreateInputScalarType.extend({
});

export const UserCreateInputType: z.ZodType<Prisma.Prisma.UserCreateInput> = UserCreateInputScalarType.extend({
  id: z.string().optional(),
  name: z.string(),
  intTwo: z.number(),
  int: z.number().optional(),
});
