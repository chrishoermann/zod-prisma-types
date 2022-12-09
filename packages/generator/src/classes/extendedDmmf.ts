import { DMMF } from '@prisma/generator-helper';
import { Dictionary } from '@prisma/internals';
import z from 'zod';

import { ExtendedDMMFDatamodel } from './extendedDMMFDatamodel';
import { ExtendedDMMFMappings } from './extendedDMMFMappings';
import { ExtendedDMMFSchema } from './extendedDMMFSchema';

/////////////////////////////////////////////////
// GENERATOR CONFIG
/////////////////////////////////////////////////

export interface ConfigSchema {
  useValidatorJs: boolean;
  useDecimalJs: boolean;
  imports: string[];
  createInputTypes: boolean;
  addInputTypeValidation: boolean;
  tsConfigFilePath?: string;
}

export const CONFIG_SCHEMA_DEFAULTS: ConfigSchema = {
  useValidatorJs: false,
  useDecimalJs: true,
  imports: [],
  createInputTypes: true,
  addInputTypeValidation: true,
};

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

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMF implements DMMF.Document {
  readonly generatorConfig: ConfigSchema;
  readonly datamodel: ExtendedDMMFDatamodel;
  readonly schema: ExtendedDMMFSchema;
  readonly mappings: DMMF.Mappings;

  constructor(dmmf: DMMF.Document, config: Dictionary<string>) {
    this.generatorConfig = this._setGeneratorConfig(config);
    this.datamodel = this._getExtendedDatamodel(dmmf);
    this.schema = this._getExtendedSchema(dmmf);
    this.mappings = this._getExtendedMappings(dmmf);
  }

  private _getExtendedDatamodel({ datamodel }: DMMF.Document) {
    return new ExtendedDMMFDatamodel(this.generatorConfig, datamodel);
  }

  private _getExtendedSchema(dmmf: DMMF.Document) {
    return new ExtendedDMMFSchema(
      this.generatorConfig,
      dmmf.schema,
      this.datamodel,
    );
  }

  private _getExtendedMappings(dmmf: DMMF.Document) {
    return new ExtendedDMMFMappings(this.generatorConfig, dmmf.mappings);
  }

  private _setGeneratorConfig(config: Dictionary<string>): ConfigSchema {
    return {
      ...CONFIG_SCHEMA_DEFAULTS,
      ...configSchema.parse(config),
    };
  }

  useValidatorJs() {
    return Boolean(this.generatorConfig.useValidatorJs);
  }

  useDecimalJs() {
    return Boolean(this.generatorConfig.useDecimalJs);
  }

  createInputTypes() {
    return Boolean(this.generatorConfig.createInputTypes);
  }

  addInputTypeValidation() {
    return Boolean(this.generatorConfig.addInputTypeValidation);
  }

  hasCustomImports() {
    return Boolean(this.generatorConfig.imports);
  }
}
