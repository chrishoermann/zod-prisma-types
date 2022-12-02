import { DMMF } from '@prisma/generator-helper';
import { FormattedNames } from './formattedNames';
export declare class ExtendedDMMFSchemaEnum extends FormattedNames implements DMMF.SchemaEnum {
    readonly name: DMMF.SchemaEnum['name'];
    readonly values: DMMF.SchemaEnum['values'];
    readonly useNativeEnum: boolean;
    constructor(enumType: DMMF.SchemaEnum);
    private _setUseNativeEnum;
}
//# sourceMappingURL=extendedDMMFSchemaEnum.d.ts.map