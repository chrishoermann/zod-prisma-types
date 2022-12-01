/* eslint-disable @typescript-eslint/no-explicit-any */
import { DMMF } from '@prisma/generator-helper';

import { ExtendedDMMFMappings } from './extendedDMMFMappings';
import { ExtendedDMMFSchema } from './extendedDMMFSchema';
import { ExtendedDatamodel } from './extendedDatamodel';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMF implements DMMF.Document {
  datamodel: ExtendedDatamodel;
  schema: ExtendedDMMFSchema;
  mappings: DMMF.Mappings;

  constructor(dmmf: DMMF.Document) {
    this.datamodel = this._getExtendedDatamodel(dmmf);
    this.schema = this._getExtendedSchema(dmmf);
    this.mappings = this._getExtendedMappings(dmmf);
  }

  private _getExtendedDatamodel(dmmf: DMMF.Document) {
    return new ExtendedDatamodel(dmmf.datamodel);
  }

  private _getExtendedSchema(dmmf: DMMF.Document) {
    return new ExtendedDMMFSchema(dmmf.schema, this.datamodel);
  }

  private _getExtendedMappings(dmmf: DMMF.Document) {
    return new ExtendedDMMFMappings(dmmf.mappings);
  }
}
