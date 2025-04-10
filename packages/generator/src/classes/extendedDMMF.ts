import type DMMF from '@prisma/dmmf';

import { ExtendedDMMFDatamodel } from './extendedDMMFDatamodel';
import { ExtendedDMMFMappings } from './extendedDMMFMappings';
import { ExtendedDMMFSchema } from './extendedDMMFSchema';
import type { GeneratorConfig } from '../schemas';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMF implements DMMF.Document {
  readonly generatorConfig: GeneratorConfig;
  readonly datamodel: ExtendedDMMFDatamodel;
  readonly schema: ExtendedDMMFSchema;
  readonly mappings: DMMF.Mappings;
  readonly imports: Set<string>;
  readonly customImports: Set<string>;

  constructor(dmmf: DMMF.Document, config: GeneratorConfig) {
    this.generatorConfig = this._setGeneratorConfig(config);
    this.datamodel = this._getExtendedDatamodel(dmmf);
    this.schema = this._getExtendedSchema(dmmf);
    this.mappings = this._getExtendedMappings(dmmf);
    this.imports = this._getImports();
    this.customImports = this._getModelImports();
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

  private _getImports() {
    return new Set(
      this.datamodel.models.map((model) => [...model.imports]).flat(),
    );
  }

  private _getModelImports() {
    return new Set(
      this.datamodel.models.map((model) => [...model.modelImports]).flat(),
    );
  }

  private _getExtendedMappings(dmmf: DMMF.Document) {
    return new ExtendedDMMFMappings(this.generatorConfig, dmmf.mappings);
  }

  private _setGeneratorConfig(config: GeneratorConfig): GeneratorConfig {
    return config;
  }
}
