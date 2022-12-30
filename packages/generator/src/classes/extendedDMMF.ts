import { DMMF, Dictionary } from '@prisma/generator-helper';
import { z } from 'zod';

import { ExtendedDMMFDatamodel } from './extendedDMMFDatamodel';
import { ExtendedDMMFMappings } from './extendedDMMFMappings';
import { ExtendedDMMFSchema } from './extendedDMMFSchema';

/////////////////////////////////////////////////
// SCHEMA
/////////////////////////////////////////////////

export const configSchema = z.object({
  useInstanceOfForDecimal: z
    .string()
    .optional()
    .default('false')
    .transform((val) => val === 'true'),
  imports: z
    .string()
    .optional()
    .transform((val) =>
      val
        ? val
            .split(')')
            .map((v) => v.replace(/import\(|.import\(/, ''))
            .filter((v) => v !== '')
        : [],
    ),
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
  tsConfigFilePath: z.string().optional(),
  prismaClientPath: z.string().default('@prisma/client'),
});

export type GeneratorConfig = z.infer<typeof configSchema>;

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMF implements DMMF.Document {
  readonly generatorConfig: GeneratorConfig;
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

  private _setGeneratorConfig(config: Dictionary<string>): GeneratorConfig {
    return configSchema.parse(config);
  }

  useInstanceOfForDecimal() {
    return Boolean(this.generatorConfig.useInstanceOfForDecimal);
  }

  createInputTypes() {
    return Boolean(this.generatorConfig.createInputTypes);
  }

  addInputTypeValidation() {
    return Boolean(this.generatorConfig.addInputTypeValidation);
  }

  hasCustomImports() {
    return this.generatorConfig.imports.length > 0;
  }
}
