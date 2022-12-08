import { DMMF } from '@prisma/generator-helper';
import { Dictionary } from '@prisma/internals';
import z from 'zod';

import { ExtendedDMMFDatamodel } from './extendedDMMFDatamodel';
import { ExtendedDMMFMappings } from './extendedDMMFMappings';
import { ExtendedDMMFSchema } from './extendedDMMFSchema';

/////////////////////////////////////////////////
// GENERATOR CONFIG
/////////////////////////////////////////////////

export const configSchema = z.object({
  useValidatorJs: z
    .string()
    .default('false')
    .transform((val) => val === 'true')
    .optional(),
  useDecimalJs: z
    .string()
    .default('true')
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

export type ConfigSchema = z.infer<NonNullable<typeof configSchema>>;

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMF implements DMMF.Document {
  readonly datamodel: ExtendedDMMFDatamodel;
  readonly schema: ExtendedDMMFSchema;
  readonly mappings: DMMF.Mappings;
  readonly config: ConfigSchema;

  constructor(dmmf: DMMF.Document, config: Dictionary<string>) {
    this.datamodel = this._getExtendedDatamodel(dmmf);
    this.schema = this._getExtendedSchema(dmmf);
    this.mappings = this._getExtendedMappings(dmmf);
    this.config = this._getExtendedConfig(config);
  }

  private _getExtendedDatamodel(dmmf: DMMF.Document) {
    return new ExtendedDMMFDatamodel(dmmf.datamodel);
  }

  private _getExtendedSchema(dmmf: DMMF.Document) {
    return new ExtendedDMMFSchema(dmmf.schema, this.datamodel);
  }

  private _getExtendedMappings(dmmf: DMMF.Document) {
    return new ExtendedDMMFMappings(dmmf.mappings);
  }

  private _getExtendedConfig(config: Dictionary<string>): ConfigSchema {
    const parsedConfig = configSchema.parse(config);

    return {
      useValidatorJs:
        parsedConfig['useValidatorJs'] !== undefined
          ? Boolean(parsedConfig['useValidatorJs'])
          : false,
      useDecimalJs:
        parsedConfig['useDecimalJs'] !== undefined
          ? Boolean(parsedConfig['useDecimalJs'])
          : true,
      imports: parsedConfig['imports'] || [],
      createInputTypes:
        parsedConfig['createInputTypes'] !== undefined
          ? Boolean(parsedConfig['createInputTypes'])
          : true,
      addInputTypeValidation:
        parsedConfig['addInputTypeValidation'] !== undefined
          ? Boolean(parsedConfig['addInputTypeValidation'])
          : true,
      tsConfigFilePath: parsedConfig['tsConfigFilePath'] || undefined,
    };
  }

  useValidatorJs() {
    return Boolean(this.config.useValidatorJs);
  }

  useDecimalJs() {
    return Boolean(this.config.useDecimalJs);
  }

  createInputTypes() {
    return Boolean(this.config.createInputTypes);
  }

  addInputTypeValidation() {
    return Boolean(this.config.addInputTypeValidation);
  }

  hasCustomImports() {
    return Boolean(this.config.imports);
  }
}
