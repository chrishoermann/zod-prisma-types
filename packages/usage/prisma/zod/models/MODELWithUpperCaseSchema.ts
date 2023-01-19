import { z } from "zod";
import { MYValueSchema } from '../inputTypes/MYValueSchema';

export const MODELWithUpperCaseSchema = z.object({
  MYValue: MYValueSchema,
  id: z.number().int(),
  STRING: z.string(),
});

export const MODELWithUpperCaseOptionalDefaultsSchema = MODELWithUpperCaseSchema.merge(
  z.object({
    id: z.number().int().optional(),
  })
);
