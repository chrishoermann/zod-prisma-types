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
    .transform((val) => val === 'true')
    .optional(),
  useDecimalJs: z
    .string()
    .transform((val) => val === 'true')
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
  readonly hasDecimalField: boolean;

  constructor(dmmf: DMMF.Document, config: Dictionary<string>) {
    this.datamodel = this._getExtendedDatamodel(dmmf);
    this.schema = this._getExtendedSchema(dmmf);
    this.mappings = this._getExtendedMappings(dmmf);
    this.config = this._getExtendedConfig(config);
    this.hasDecimalField = this._setHasDecimalField();
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
    return configSchema.parse(config);
  }

  private _setHasDecimalField() {
    return this.datamodel.models.some((model) =>
      model.fields.some((field) => field.type === 'Decimal'),
    );
  }

  useValidatorJs() {
    return this.config.useValidatorJs;
  }

  useDecimalJs() {
    return this.hasDecimalField || this.config.useDecimalJs;
  }
}
