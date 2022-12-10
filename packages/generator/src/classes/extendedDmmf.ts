import { DMMF } from '@prisma/generator-helper';
import { Dictionary } from '@prisma/internals';

import { ExtendedDMMFDatamodel } from './extendedDMMFDatamodel';
import { ExtendedDMMFMappings } from './extendedDMMFMappings';
import { ExtendedDMMFSchema } from './extendedDMMFSchema';
import { GeneratorConfig } from './generatorConfig';

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
    return new GeneratorConfig(config);
  }

  useValidatorJs() {
    return Boolean(this.generatorConfig.useValidatorJs);
  }

  useDecimalJs() {
    return Boolean(this.generatorConfig.useDecimalJs);
  }

  useDecimalAsNumber() {
    return Boolean(this.generatorConfig.decimalAsNumber);
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
