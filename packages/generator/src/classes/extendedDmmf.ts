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
  import: z
    .string()
    .transform((val) =>
      val
        .split(')')
        .map((v) => v.replace(/import\(|.import\(/, ''))
        .filter((v) => v !== ''),
    )
    .optional(),
});

export type ConfigSchema = z.infer<typeof configSchema>;

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

  private _getExtendedConfig(config: Dictionary<string>) {
    const parsedConfig = configSchema.parse(config);
    return {
      useValidatorJs: Boolean(parsedConfig['useValidatorJs']),
      useDecimalJs: Boolean(parsedConfig['useDecimalJs']),
      import: parsedConfig['import'],
    };
  }

  useValidatorJs() {
    return Boolean(this.config.useValidatorJs);
  }

  useDecimalJs() {
    return Boolean(this.config.useDecimalJs);
  }

  hasCustomImports() {
    return Boolean(this.config.import);
  }
}
