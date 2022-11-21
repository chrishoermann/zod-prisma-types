/* eslint-disable @typescript-eslint/no-explicit-any */
import { DMMF } from '@prisma/generator-helper';

import { ExtendedDatamodel } from './extendedDatamodel';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMF implements DMMF.Document {
  datamodel: ExtendedDatamodel;
  schema: DMMF.Schema;
  mappings: DMMF.Mappings;

  constructor(dmmf: DMMF.Document) {
    this.datamodel = this.getExtendedDatamodel(dmmf);
    this.schema = dmmf.schema;
    this.mappings = dmmf.mappings;
  }

  private getExtendedDatamodel(dmmf: DMMF.Document) {
    return new ExtendedDatamodel(dmmf.datamodel);
  }
}
