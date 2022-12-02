import { DMMF } from '@prisma/generator-helper';
import {
  ValidatorFunctionMap,
  ValidatorFunctionOptions,
  KeyValueMap,
  ZodValidatorTypeMap,
} from '../types';
import { FormattedNames } from './formattedNames';
export interface Validator {
  customErrors?: string;
  pattern?: string;
}
export declare const VALIDATOR_TYPE_MAP: ZodValidatorTypeMap;
export declare const validateRegexInMap: <TKeys extends string>(
  regexMap: KeyValueMap<TKeys, RegExp>,
  { pattern, key }: ValidatorFunctionOptions,
) => string;
export declare const VALIDATOR_MAP: ValidatorFunctionMap;
export declare class DMMFField extends FormattedNames implements DMMF.Field {
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
  readonly modelName: string;
  private _validatorRegexMatch?;
  private _zodValidatorType?;
  readonly clearedDocumentation?: string;
  readonly zodValidatorString?: string;
  readonly zodCustomErrors?: string;
  constructor(field: DMMF.Field, modelName: string);
  private _setValidatorRegexMatch;
  private _setZodValidatorType;
  private _setClearedDocumentation;
  private _isZodValidatorType;
  private _setZodCustomErrors;
  private _setZodValidatorString;
}
//# sourceMappingURL=DMMFField.d.ts.map
