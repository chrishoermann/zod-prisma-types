import { DMMF } from '@prisma/generator-helper';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFMappings implements DMMF.Mappings {
  readonly modelOperations: DMMF.ModelMapping[];
  readonly otherOperations: {
    readonly read: string[];
    readonly write: string[];
  };

  constructor(mappings: DMMF.Mappings) {
    this.modelOperations = mappings.modelOperations;
    this.otherOperations = mappings.otherOperations;
  }
}
