import { DMMF } from '@prisma/generator-helper';

import { PRISMA_FUNCTION_TYPES_WITH_VALIDATORS } from '../constants/regex';
import { ExtendedDMMFModel } from './extendedDMMFModel';
import { ExtendedDMMFSchemaArg } from './extendedDMMFSchemaArg';
import { FormattedNames } from './formattedNames';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFInputType
  extends FormattedNames
  implements DMMF.InputType
{
  readonly name: DMMF.InputType['name'];
  readonly constraints: DMMF.InputType['constraints'];
  readonly meta: DMMF.InputType['meta'];
  readonly fields: ExtendedDMMFSchemaArg[];
  readonly fieldMap: DMMF.InputType['fieldMap'];
  readonly linkedModel?: ExtendedDMMFModel;
  readonly isJsonField: boolean;
  readonly isBytesField: boolean;
  readonly isDecimalField: boolean;

  constructor(type: DMMF.InputType, model?: ExtendedDMMFModel) {
    super(type.name);
    this.linkedModel = model;
    this.name = type.name;
    this.constraints = type.constraints;
    this.meta = type.meta;
    this.fields = this._setFields(type.fields);
    this.fieldMap = type.fieldMap;
    this.isJsonField = this._setIsJsonField();
    this.isBytesField = this._setIsBytesField();
    this.isDecimalField = this._setIsDecimalField();
  }

  private _setFields(fields: DMMF.SchemaArg[]) {
    return fields.map((field) => {
      // validators should only be written for create and update types.
      // this prevents validation in e.g. search queries in "where inputs",
      // where strings like email addresses can be incomplete.
      const optionalValidators = this._fieldIsPrismaFunction()
        ? {
            zodValidatorString: this._getZodValidatorString(field.name),
            zodCustomErrors: this._getZodCustomErrorsString(field.name),
          }
        : undefined;

      return new ExtendedDMMFSchemaArg({ ...field, ...optionalValidators });
    });
  }

  private _fieldIsPrismaFunction() {
    return this.name.match(PRISMA_FUNCTION_TYPES_WITH_VALIDATORS);
  }

  private _getZodValidatorString(fieldName: string) {
    return this.linkedModel?.fields.find((field) => field.name === fieldName)
      ?.zodValidatorString;
  }

  private _getZodCustomErrorsString(fieldName: string) {
    return this.linkedModel?.fields.find((field) => field.name === fieldName)
      ?.zodCustomErrors;
  }

  private _setIsJsonField() {
    return this.fields.some((field) => field.isJsonType);
  }

  private _setIsBytesField() {
    return this.fields.some((field) => field.isBytesType);
  }

  private _setIsDecimalField() {
    return this.fields.some((field) => field.isDecimalType);
  }
}
