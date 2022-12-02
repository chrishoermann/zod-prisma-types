import { DMMF } from '@prisma/generator-helper';
import { ExtendedDMMFSchemaArgInputType } from '.';
import { FormattedNames } from './formattedNames';
export interface ExtendedDMMFSchemaArgOptions extends DMMF.SchemaArg {
    zodValidatorString?: string;
    zodCustomErrors?: string;
}
export declare class ExtendedDMMFSchemaArg extends FormattedNames implements DMMF.SchemaArg {
    readonly name: DMMF.SchemaArg['name'];
    readonly comment?: DMMF.SchemaArg['comment'];
    readonly isNullable: DMMF.SchemaArg['isNullable'];
    readonly isRequired: DMMF.SchemaArg['isRequired'];
    readonly inputTypes: ExtendedDMMFSchemaArgInputType[];
    readonly deprecation?: DMMF.SchemaArg['deprecation'];
    readonly zodValidatorString?: string;
    readonly zodCustomErrors?: string;
    readonly hasSingleType: boolean;
    readonly hasMultipleTypes: boolean;
    readonly isOptional: boolean;
    readonly isJsonType: boolean;
    readonly isBytesType: boolean;
    readonly isDecimalType: boolean;
    constructor(arg: ExtendedDMMFSchemaArgOptions);
    private _setInputTypes;
    private _setHasSingleType;
    private _setHasMultipleTypes;
    private _setIsOptional;
    private _setIsJsonType;
    private _setIsBytesType;
    private _setIsDecimalType;
}
//# sourceMappingURL=extendedDMMFSchemaArg.d.ts.map