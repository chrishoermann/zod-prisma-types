import { DMMF } from '@prisma/generator-helper';
import { ExtendedDMMFDatamodel } from './extendedDMMFDatamodel';
import { ExtendedDMMFSchema } from './extendedDMMFSchema';
export declare class ExtendedDMMF implements DMMF.Document {
    readonly datamodel: ExtendedDMMFDatamodel;
    readonly schema: ExtendedDMMFSchema;
    readonly mappings: DMMF.Mappings;
    constructor(dmmf: DMMF.Document);
    private _getExtendedDatamodel;
    private _getExtendedSchema;
    private _getExtendedMappings;
}
//# sourceMappingURL=extendedDMMF.d.ts.map