import { z } from 'zod';

////////////////////////////////////////////////
// SCHEMA
/////////////////////////////////////////////////

export const configSchema = z.object({
  useMultipleFiles: z
    .string()
    .optional()
    .default('false')
    .transform((val) => val === 'true'),
  /**
   * @deprecated will be deprecaten in v2.0.0 - imports will then be added directly on the model in the prisma schema
   */
  createInputTypes: z
    .string()
    .optional()
    .default('true')
    .transform((val) => val === 'true'),
  createModelTypes: z
    .string()
    .optional()
    .default('true')
    .transform((val) => val === 'true'),
  createOptionalDefaultValuesTypes: z
    .string()
    .optional()
    .default('false')
    .transform((val) => val === 'true'),
  addInputTypeValidation: z
    .string()
    .optional()
    .default('true')
    .transform((val) => val === 'true'),
  useDefaultValidators: z
    .string()
    .optional()
    .default('true')
    .transform((val) => val === 'true'),
  prismaClientPath: z.string().default('@prisma/client'),
  inputTypePath: z.string().default('inputTypeSchemas'), // currently only used internally
  outputTypePath: z.string().default('outputTypeSchemas'), // currently only used internally
});

export type GeneratorConfig = z.infer<typeof configSchema>;
