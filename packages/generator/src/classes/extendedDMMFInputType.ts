import { DMMF } from '@prisma/generator-helper';

import { ExtendedDMMFModel } from './extendedDMMFModel';
import { ExtendedDMMFSchemaArg } from './extendedDMMFSchemaArg';
import { FormattedNames } from './formattedNames';
// import { ExtendedDatamodel } from '.';

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

  constructor(type: DMMF.InputType, model?: ExtendedDMMFModel) {
    super(type.name);
    this.matchingModel = model;
    this.name = type.name;
    this.constraints = type.constraints;
    this.meta = type.meta;
    this.fields = this.setFields(type.fields);
    this.fieldMap = type.fieldMap;
  }

  private setFields(fields: DMMF.SchemaArg[]) {
    return fields.map((field) => {
      // validators should only be written in create and update types.
      // this prevents validation in e.g. search queries in "where inputs",
      // where strings can be incomplete
      const isMatch = this.name.match(
        /CreateInput|CreateMany|UpdateInput|UpdateMany/,
      );

      return new ExtendedDMMFSchemaArg({
        ...field,
        zodValidatorString: isMatch
          ? this.getZodValidatorString(field.name)
          : undefined,
        zodCustomErrors: isMatch
          ? this.getZodCustomErrorsString(field.name)
          : undefined,
      });
    });
  }

  getZodValidatorString(fieldName: string) {
    const field = this.matchingModel?.fields.find((field) => {
      return field.name === fieldName;
    });
    return field?.zodValidatorString;
  }

  getZodCustomErrorsString(fieldName: string) {
    const field = this.matchingModel?.fields.find(
      (field) => field.name === fieldName,
    );
    return field?.zodCustomErrors;
  }
}
