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
    this.datamodel = this.getExtendedDatamodel(dmmf);
    this.schema = this.getExtendedSchema(dmmf);
    this.mappings = this.getExtendedMappings(dmmf);
  }

  private getExtendedDatamodel(dmmf: DMMF.Document) {
    return new ExtendedDatamodel(dmmf.datamodel);
  }

  private getExtendedSchema(dmmf: DMMF.Document) {
    return new ExtendedDMMFSchema(dmmf.schema, this.datamodel);
  }

  private getExtendedMappings(dmmf: DMMF.Document) {
    return new ExtendedDMMFMappings(dmmf.mappings);
  }
}
