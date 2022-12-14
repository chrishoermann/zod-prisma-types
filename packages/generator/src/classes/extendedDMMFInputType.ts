import { DMMF } from '@prisma/generator-helper';

import { ExtendedDMMFDatamodel, ExtendedDMMFField, GeneratorConfig } from '.';
import { PRISMA_FUNCTION_TYPES_WITH_VALIDATORS } from '../constants/regex';
import { ExtendedDMMFModel } from './extendedDMMFModel';
import {
  ExtendedDMMFSchemaArg,
  ZodValidatorOptions,
} from './extendedDMMFSchemaArg';
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
  readonly omitFields: string[] = [];

  constructor(
    readonly generatorConfig: GeneratorConfig,
    type: DMMF.InputType,
    datamodel: ExtendedDMMFDatamodel,
  ) {
    super(type.name);
    this.generatorConfig = generatorConfig;
    this.name = type.name;
    this.linkedModel = this._setLinkedModel(datamodel);
    this.constraints = type.constraints;
    this.meta = type.meta;
    this.fields = this._setFields(type.fields);
    this.fieldMap = type.fieldMap;
    this.isJsonField = this._setIsJsonField();
    this.isBytesField = this._setIsBytesField();
    this.isDecimalField = this._setIsDecimalField();
    this.omitFields = this._setOmitFields();
  }

  /**
   * Finds the datamodel that matches the input type.
   * This way the documentation ,validator strings and other information
   * from the datamodel can be added to the input types.
   */
  private _setLinkedModel(datamodel: ExtendedDMMFDatamodel) {
    return datamodel.models.find((model) => {
      return this.name.match(model.name);
    });
  }

  private _setFields(fields: DMMF.SchemaArg[]) {
    return fields.map((field) => {
      const linkedField = this.linkedModel?.fields.find(
        (modelField) => modelField.name === field.name,
      );

      // validators and omitField should only be written for create and update types.
      // this prevents validation in e.g. search queries in "where inputs",
      // where strings like email addresses can be incomplete.
      const optionalValidators: ZodValidatorOptions | undefined =
        this._fieldIsPrismaFunctionType()
          ? {
              zodValidatorString: this._getZodValidatorString(field.name),
              zodCustomErrors: this._getZodCustomErrorsString(field.name),
              zodCustomValidatorString: this._getZodCustomValidatorString(
                field.name,
              ),
              zodOmitField: this._getZodOmitField(linkedField),
            }
          : undefined;

      return new ExtendedDMMFSchemaArg(
        this.generatorConfig,
        { ...field, ...optionalValidators },
        linkedField,
      );
    });
  }

  private _fieldIsPrismaFunctionType() {
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

  private _getZodCustomValidatorString(fieldName: string) {
    return this.linkedModel?.fields.find((field) => field.name === fieldName)
      ?.zodCustomValidatorString;
  }

  private _getZodOmitField(linkedField?: ExtendedDMMFField) {
    if (!linkedField) return undefined;

    const shouldOmitField =
      linkedField.zodOmitField === 'input' ||
      linkedField.zodOmitField === 'all';

    // If the field is required, it should not be omitted.
    // Currently, the generator does not throw an error if a required field is marked to be omitted
    // but logs a message to the console. This behaviour needs to be changed in the future
    // To support omitting required fields in the future,
    // all created arg types need to be aware of the omitted fields and
    // then write use the correct type for e.g. "data" and "upsert" inputs.
    // if (shouldOmitField && linkedField.isRequired) {
    //   console.log(
    //     '\x1b[33m',
    //     `Field '${linkedField.name}' on '${linkedField.modelName}' is required! It is NOT omitted in '${this.name}Schema'. `,
    //     '\x1b[37m',
    //   );
    //   return undefined;
    // }

    // return !linkedField.isRequired && shouldOmitField;
    return shouldOmitField;
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

  /**
   * Filters all fields that should be omitted in the input type.
   * This is used to create the "Omit" ts-type for the input type.
   * @returns an array of field names that should be omitted in the input type
   */
  private _setOmitFields() {
    return this.fields
      .filter((field) => field.zodOmitField)
      .map((field) => field.name);
  }

  hasOmitFields() {
    return this.omitFields.length > 0;
  }

  getOmitFieldsUnion() {
    return this.omitFields.map((field) => `"${field}"`).join(' | ');
  }
}
