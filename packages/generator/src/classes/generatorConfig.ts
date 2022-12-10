import { Dictionary } from '@prisma/generator-helper';
import { z } from 'zod';

/////////////////////////////////////////////////
// CONSTANTS
/////////////////////////////////////////////////

export const CONFIG_SCHEMA_DEFAULTS = {
  useValidatorJs: false,
  useDecimalJs: false,
  decimalAsNumber: false,
  imports: [],
  createInputTypes: true,
  addInputTypeValidation: true,
};

/////////////////////////////////////////////////
// SCHEMA
/////////////////////////////////////////////////

export const configSchema = z.object({
  useValidatorJs: z
    .string()
    .default('false')
    .transform((val) => val === 'true')
    .optional(),
  useDecimalJs: z
    .string()
    .default('false')
    .transform((val) => val === 'true')
    .optional(),
  decimalAsNumber: z
    .string()
    .default('false')
    .transform((val) => val === 'true')
    .optional(),
  imports: z
    .string()
    .transform((val) =>
      val
        .split(')')
        .map((v) => v.replace(/import\(|.import\(/, ''))
        .filter((v) => v !== ''),
    )
    .optional(),
  createInputTypes: z
    .string()
    .default('true')
    .transform((val) => val === 'true')
    .optional(),
  addInputTypeValidation: z
    .string()
    .default('true')
    .transform((val) => val === 'true')
    .optional(),
  tsConfigFilePath: z.string().optional(),
});

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class GeneratorConfig {
  useValidatorJs: boolean;
  useDecimalJs: boolean;
  decimalAsNumber: boolean;
  imports: string[];
  createInputTypes: boolean;
  addInputTypeValidation: boolean;
  tsConfigFilePath?: string;

  constructor(config: Dictionary<string>) {
    const configSchema = this._getConfigSchema(config);

    this.useValidatorJs = configSchema.useValidatorJs;
    this.useDecimalJs = configSchema.useDecimalJs;
    this.decimalAsNumber = configSchema.decimalAsNumber;
    this.imports = configSchema.imports;
    this.createInputTypes = configSchema.createInputTypes;
    this.addInputTypeValidation = configSchema.addInputTypeValidation;
    this.tsConfigFilePath = configSchema.tsConfigFilePath;
  }

  private _getConfigSchema(config: Dictionary<string>) {
    return {
      ...CONFIG_SCHEMA_DEFAULTS,
      ...configSchema.parse(config),
    };
  }
}
