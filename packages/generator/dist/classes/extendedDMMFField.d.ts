import { DMMF } from '@prisma/generator-helper';
import { ZodValidatorType } from '../types';
import { FormattedNames } from './formattedNames';
export interface GetValidator {
  type: ZodValidatorType;
  pattern: string;
}
export declare class ExtendedDMMFField
  extends FormattedNames
  implements DMMF.Field
{
  readonly kind: DMMF.Field['kind'];
  readonly name: DMMF.Field['name'];
  readonly isRequired: DMMF.Field['isRequired'];
  readonly isList: DMMF.Field['isList'];
  readonly isUnique: DMMF.Field['isUnique'];
  readonly isId: DMMF.Field['isId'];
  readonly isReadOnly: DMMF.Field['isReadOnly'];
  readonly type: DMMF.Field['type'];
  readonly dbNames?: DMMF.Field['dbNames'];
  readonly isGenerated: DMMF.Field['isGenerated'];
  readonly hasDefaultValue: DMMF.Field['hasDefaultValue'];
  readonly default?: DMMF.Field['default'];
  readonly relationToFields?: DMMF.Field['relationToFields'];
  readonly relationOnDelete?: DMMF.Field['relationOnDelete'];
  readonly relationName?: DMMF.Field['relationName'];
  readonly documentation?: DMMF.Field['documentation'];
  readonly isNullable: boolean;
  readonly isJsonType: boolean;
  readonly isBytesType: boolean;
  readonly isDecimalType: boolean;
  readonly modelName: string;
  readonly errorLocation: string;
  private _validatorMap;
  readonly zodCustomErrors?: string;
  readonly zodValidatorString?: string;
  readonly zodCustomValidatorString?: string;
  readonly clearedDocumentation?: string;
  readonly zodType: string;
  constructor(field: DMMF.Field, modelName: string);
  private _setIsJsonType;
  private _setIsBytesType;
  private _setIsDecimalType;
  private _setIsNullable;
  private _setZodType;
  private _getZodTypeFromScalarType;
  private _setErrorLocation;
  private _getZodValidatorData;
  private _getValidatorRegexMatch;
  private _getValidatorType;
  private _getValidatorPattern;
  private _getZodCustomErrors;
  private _getZodCustomValidatorString;
  private _getZodValidatorString;
  private _getValidatorKeyFromPattern;
  private _validateRegexInMap;
  private _removeValidatorPatternFromDocs;
}
//# sourceMappingURL=extendedDMMFField.d.ts.map
