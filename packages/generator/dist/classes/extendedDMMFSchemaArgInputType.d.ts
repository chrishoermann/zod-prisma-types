import { DMMF } from '@prisma/generator-helper';
export declare class ExtendedDMMFSchemaArgInputType
  implements DMMF.SchemaArgInputType
{
  readonly isJsonType: boolean;
  readonly isBytesType: boolean;
  readonly isDecimalType: boolean;
  readonly isNullType: boolean;
  readonly isList: DMMF.SchemaArgInputType['isList'];
  readonly type: DMMF.SchemaArgInputType['type'];
  readonly location: DMMF.SchemaArgInputType['location'];
  readonly namespace?: DMMF.SchemaArgInputType['namespace'];
  constructor(arg: DMMF.SchemaArgInputType);
  private _setIsJsonType;
  private _setIsBytesType;
  private _setIsDecimalType;
  private _setIsNullType;
  getZodScalarType: () => import('../types').ZodScalarType | undefined;
  getZodNonScalarType: () => DMMF.ArgType | undefined;
  getZodNullType: () => 'null' | undefined;
  isStringType: (type?: DMMF.ArgType) => type is string;
  isSchemaEnum: (type?: DMMF.ArgType) => type is DMMF.SchemaEnum;
  isInputType: (type?: DMMF.ArgType) => type is DMMF.InputType;
  isSpecialType: () => boolean;
}
//# sourceMappingURL=extendedDMMFSchemaArgInputType.d.ts.map
