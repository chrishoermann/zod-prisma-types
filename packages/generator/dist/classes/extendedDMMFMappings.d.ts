import { DMMF } from '@prisma/generator-helper';
export declare class ExtendedDMMFMappings implements DMMF.Mappings {
  readonly modelOperations: DMMF.ModelMapping[];
  readonly otherOperations: {
    readonly read: string[];
    readonly write: string[];
  };
  constructor(mappings: DMMF.Mappings);
}
//# sourceMappingURL=extendedDMMFMappings.d.ts.map
