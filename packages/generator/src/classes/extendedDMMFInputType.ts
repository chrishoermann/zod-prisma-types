import { DMMF } from '@prisma/generator-helper';

import { ExtendedDMMFDatamodel, ExtendedDMMFField } from '.';
import { ExtendedDMMFModel } from './extendedDMMFModel';
import {
  ExtendedDMMFSchemaArg,
  ZodValidatorOptions,
} from './extendedDMMFSchemaArg';
import { FormattedNames } from './formattedNames';
import {
  PRISMA_FUNCTION_TYPES_WITH_VALIDATORS,
  PRISMA_FUNCTION_TYPES_WITH_VALIDATORS_WHERE_UNIQUE,
} from '../constants/regex';
import { GeneratorConfig } from '../schemas';

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
  readonly imports: Set<string>;

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
    this.imports = this._setImports();
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
    if (
      !this.generatorConfig.useMultipleFiles ||
      this.generatorConfig.validateWhereUniqueInput
    ) {
      return PRISMA_FUNCTION_TYPES_WITH_VALIDATORS_WHERE_UNIQUE.test(this.name);
    }
    return PRISMA_FUNCTION_TYPES_WITH_VALIDATORS.test(this.name);
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

  private _setImports() {
    const fieldImports = this.fields
      .map((field) => field.getImports(this.name))
      .flat();

    if (this._fieldIsPrismaFunctionType() && this.linkedModel?.customImports) {
      fieldImports.push(...this.linkedModel.customImports);
    }

    return new Set(fieldImports);
  }

  hasOmitFields() {
    return this.omitFields.length > 0;
  }

  getOmitFieldsUnion() {
    return this.omitFields.map((field) => `"${field}"`).join(' | ');
  }
}
