import { PrismaVersionSchema } from '../utils';
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
  writeBarrelFiles: z
    .string()
    .optional()
    .default('true')
    .transform((val) => val === 'true'),
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
  createRelationValuesTypes: z
    .string()
    .optional()
    .default('false')
    .transform((val) => val === 'true'),
  createPartialTypes: z
    .string()
    .optional()
    .default('false')
    .transform((val) => val === 'true'),
  addInputTypeValidation: z
    .string()
    .optional()
    .default('true')
    .transform((val) => val === 'true'),
  addIncludeType: z
    .string()
    .optional()
    .default('true')
    .transform((val) => val === 'true'),
  addSelectType: z
    .string()
    .optional()
    .default('true')
    .transform((val) => val === 'true'),
  validateWhereUniqueInput: z
    .string()
    .optional()
    .default('true')
    .transform((val) => val === 'true'),
  useDefaultValidators: z
    .string()
    .optional()
    .default('true')
    .transform((val) => val === 'true'),
  coerceDate: z
    .string()
    .optional()
    .default('true')
    .transform((val) => val === 'true'),
  writeNullishInModelTypes: z
    .string()
    .optional()
    .default('false')
    .transform((val) => val === 'true'),
  /**
   * @deprecated This option is deprecated. Zod implemented a fix for this issue.
   */
  useTypeAssertions: z
    .string()
    .optional()
    .default('false')
    .transform((val) => val === 'true'),
  prismaClientPath: z.string().default('@prisma/client'),
  provider: z.string().optional(),
  isMongoDb: z
    .string()
    .optional()
    .default('false')
    .transform((val) => val === 'true'),
  inputTypePath: z.string().optional().default('inputTypeSchemas'), // currently only used internally
  outputTypePath: z.string().optional().default('outputTypeSchemas'), // currently only used internally
  prismaVersion: PrismaVersionSchema.optional(),
  decimalJSInstalled: z.boolean().default(false),
  isPrismaClientGenerator: z.boolean().default(false),
  prismaLibraryPath: z
    .string()
    .optional()
    .default('@prisma/client/runtime/library'),
});

export type GeneratorConfig = z.infer<typeof configSchema>;
