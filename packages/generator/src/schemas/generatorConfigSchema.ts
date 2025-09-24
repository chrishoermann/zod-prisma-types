import { VersionSchema } from '../utils/getPackageVersion';
import { z } from 'zod';

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
  useExactOptionalPropertyTypes: z
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

  /**
   * SubPath for the input type schemas in multiple file mode.
   * `inputTypeSchemas`
   */
  inputTypePath: z.string().optional().default('inputTypeSchemas'), // currently only used internally

  /**
   * SubPath for the output type schemas in multiple file mode.
   *`outputTypeSchemas`
   */
  outputTypePath: z.string().optional().default('outputTypeSchemas'), // currently only used internally

  /**
   * Version of prisma client to determine certain implementation details
   */
  prismaVersion: VersionSchema.optional(),

  /**
   * Version of zod to determine certain implementation details
   */
  zodVersion: VersionSchema.optional(),

  /**
   * Whether decimal.js is installed to determine certain implementation details
   */
  decimalJSInstalled: z.boolean().default(false),

  isPrismaClientGenerator: z.boolean().default(false),

  /**
   * Path to the prisma client runtime library
   *
   * !!!!
   * needs to be updated for prisma client version 6.0.0 and later
   * because the client is not generated into node modules by default anymore
   * !!!!
   */
  prismaLibraryPath: z
    .string()
    .optional()
    .default('@prisma/client/runtime/library'),

  /**
   * Path where the generated schemas will be stored.
   * This is read from the generator options where it is specified via the `output` option.
   * e.g. `./generated/zod`
   */
  outputPath: z
    .object({
      fromEnvVar: z.string().nullable(),
      value: z.string({ message: 'No output path specified' }),
    })
    .transform((val) => val.value),
});

export type GeneratorConfig = z.infer<typeof configSchema>;
