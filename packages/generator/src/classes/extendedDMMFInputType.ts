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
  name: DMMF.InputType['name'];
  constraints: DMMF.InputType['constraints'];
  meta: DMMF.InputType['meta'];
  fields: ExtendedDMMFSchemaArg[];
  fieldMap: DMMF.InputType['fieldMap'];
  matchingModel?: ExtendedDMMFModel;
  isJsonField: boolean;
  isBytesField: boolean;

  constructor(type: DMMF.InputType, model?: ExtendedDMMFModel) {
    super(type.name);
    this.matchingModel = model;
    this.name = type.name;
    this.constraints = type.constraints;
    this.meta = type.meta;
    this.fields = this._setFields(type.fields);
    this.fieldMap = type.fieldMap;
    this.isJsonField = this._setIsJsonField();
    this.isBytesField = this._setIsBytesField();
  }

  private _setFields(fields: DMMF.SchemaArg[]) {
    return fields.map((field) => {
      // validators should only be written in create and update types.
      // this prevents validation in e.g. search queries in "where inputs",
      // where strings like email addresses can be incomplete.
      const isMatch = this.name.match(PRISMA_FUNCTION_TYPES_WITH_VALIDATORS);

      return new ExtendedDMMFSchemaArg({
        ...field,
        zodValidatorString: isMatch
          ? this._getZodValidatorString(field.name)
          : undefined,
        zodCustomErrors: isMatch
          ? this._getZodCustomErrorsString(field.name)
          : undefined,
      });
    });
  }

  private _setIsJsonField() {
    const isJsonField = this.fields.some((field) => field.isJsonType);
    if (isJsonField) return true;
    return false;
  }

  private _setIsBytesField() {
    const isBytesField = this.fields.some((field) => field.isBytesType);
    if (isBytesField) return true;
    return false;
  }

  private _getZodValidatorString(fieldName: string) {
    const field = this.matchingModel?.fields.find((field) => {
      return field.name === fieldName;
    });
    return field?.zodValidatorString;
  }

  private _getZodCustomErrorsString(fieldName: string) {
    const field = this.matchingModel?.fields.find(
      (field) => field.name === fieldName,
    );
    return field?.zodCustomErrors;
  }
}
