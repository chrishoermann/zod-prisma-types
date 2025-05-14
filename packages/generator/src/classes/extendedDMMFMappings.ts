import { DMMF } from '@prisma/generator-helper';

import { GeneratorConfig } from '../schemas';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFMappings implements DMMF.Mappings {
  readonly modelOperations: Readonly<DMMF.ModelMapping[]>;
  readonly otherOperations: Readonly<{
    readonly read: string[];
    readonly write: string[];
  }>;

  constructor(
    readonly generatorConfig: GeneratorConfig,
    mappings: DMMF.Mappings,
  ) {
    this.modelOperations = mappings.modelOperations;
    this.otherOperations = mappings.otherOperations;
  }
}
