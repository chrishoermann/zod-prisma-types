import type DMMF from '@prisma/dmmf';

import { ExtendedDMMFDatamodel } from './extendedDMMFDatamodel';
import { ExtendedDMMFMappings } from './extendedDMMFMappings';
import { ExtendedDMMFSchema } from './extendedDMMFSchema';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMF implements DMMF.Document {
  readonly datamodel: ExtendedDMMFDatamodel;
  readonly schema: ExtendedDMMFSchema;
  readonly mappings: DMMF.Mappings;
  readonly imports: Set<string>;
  readonly customImports: Set<string>;

  constructor(dmmf: DMMF.Document) {
    this.datamodel = this._getExtendedDatamodel(dmmf);
    this.schema = this._getExtendedSchema(dmmf);
    this.mappings = this._getExtendedMappings(dmmf);
    this.imports = this._getImports();
    this.customImports = this._getModelImports();
  }

  private _getExtendedDatamodel({ datamodel }: DMMF.Document) {
    return new ExtendedDMMFDatamodel(datamodel);
  }

  private _getExtendedSchema(dmmf: DMMF.Document) {
    return new ExtendedDMMFSchema(dmmf.schema, this.datamodel);
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
    return new ExtendedDMMFMappings(dmmf.mappings);
  }
}

/////////////////////////////////////////////////
// SINGLETON
/////////////////////////////////////////////////

export class ExtendedDMMFSingleton {
  private static instance: ExtendedDMMF | null = null;

  private constructor() {
    throw new Error(
      'ExtendedDMMFSingleton is a singleton - use initialize() instead',
    );
  }

  public static initialize(dmmf: DMMF.Document): void {
    if (this.instance) {
      throw new Error('ExtendedDMMF already initialized');
    }
    this.instance = new ExtendedDMMF(dmmf);
  }

  public static getInstance(): ExtendedDMMF {
    if (!this.instance) {
      throw new Error('ExtendedDMMF not initialized');
    }
    return this.instance;
  }

  public static isInitialized(): boolean {
    return this.instance !== null;
  }

  public static reset(): void {
    this.instance = null;
  }
}

/////////////////////////////////////////////////
// CONVENIENCE FUNCTIONS
/////////////////////////////////////////////////

export const getExtendedDMMF = () => ExtendedDMMFSingleton.getInstance();
