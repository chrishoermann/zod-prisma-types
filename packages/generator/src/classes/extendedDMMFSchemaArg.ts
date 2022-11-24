import { DMMF } from '@prisma/generator-helper';

import { ExtendedDMMFSchemaArgInputType } from '.';
import { FormattedNames } from './formattedNames';

export interface ExtendedDMMFSchemaArgOptions extends DMMF.SchemaArg {
  zodValidatorString?: string;
  zodCustomErrors?: string;
}

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFSchemaArg
  extends FormattedNames
  implements DMMF.SchemaArg
{
  name: DMMF.SchemaArg['name'];
  comment?: DMMF.SchemaArg['comment'];
  isNullable: DMMF.SchemaArg['isNullable'];
  isRequired: DMMF.SchemaArg['isRequired'];
  inputTypes: ExtendedDMMFSchemaArgInputType[];
  deprecation?: DMMF.SchemaArg['deprecation'];
  zodValidatorString?: string;
  zodCustomErrors?: string;
  hasSingleType: boolean;
  hasMultipleTypes: boolean;
  isOptional: boolean;

  constructor(arg: ExtendedDMMFSchemaArgOptions) {
    super(arg.name);
    this.name = arg.name;
    this.comment = arg.comment;
    this.isNullable = arg.isNullable;
    this.isRequired = arg.isRequired;
    this.inputTypes = this.setInputTypes(arg.inputTypes);
    this.deprecation = arg.deprecation;
    this.zodValidatorString = arg.zodValidatorString;
    this.zodCustomErrors = arg.zodCustomErrors;
    this.hasSingleType = this.setHasSingleType();
    this.hasMultipleTypes = this.setHasMultipleTypes();
    this.isOptional = this.setIsOptional();
  }

  private setInputTypes = (inputTypes: DMMF.SchemaArgInputType[]) => {
    return inputTypes.map((inputType) => {
      return new ExtendedDMMFSchemaArgInputType(inputType);
    });
  };

  private setHasSingleType() {
    return this.inputTypes.length === 1;
  }

  private setHasMultipleTypes() {
    return this.inputTypes.length > 1;
  }

  private setIsOptional() {
    return !this.isRequired;
  }
}
