import type DMMF from '@prisma/dmmf';
import type { ReadonlyDeep } from '@prisma/dmmf/dist/util';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFMappings implements DMMF.Mappings {
  readonly modelOperations: ReadonlyDeep<DMMF.ModelMapping[]>;
  readonly otherOperations: ReadonlyDeep<{
    readonly read: string[];
    readonly write: string[];
  }>;

  constructor(mappings: DMMF.Mappings) {
    this.modelOperations = mappings.modelOperations;
    this.otherOperations = mappings.otherOperations;
  }
}
