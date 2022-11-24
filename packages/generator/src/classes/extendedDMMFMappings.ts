import { DMMF } from '@prisma/generator-helper';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFMappings implements DMMF.Mappings {
  modelOperations: DMMF.ModelMapping[];
  otherOperations: {
    read: string[];
    write: string[];
  };

  constructor(mappings: DMMF.Mappings) {
    this.modelOperations = mappings.modelOperations;
    this.otherOperations = mappings.otherOperations;
  }
}
