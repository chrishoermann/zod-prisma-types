import { DMMF } from '@prisma/generator-helper';
import { GeneratorConfig } from '../../schemas';
import { ExtendedDMMFModelBase } from './01_extendedDMMFModelBase';

export class ExtendedDMMFModelFlags extends ExtendedDMMFModelBase {
  readonly hasRelationFields: boolean;
  readonly hasRequiredJsonFields: boolean;
  readonly hasOptionalJsonFields: boolean;
  readonly hasOmitFields: boolean;
  readonly hasDecimalFields: boolean;
  readonly hasOptionalDefaultFields: boolean;
  readonly writeOptionalDefaultValuesTypes: boolean;
  readonly writeRelationValueTypes: boolean;
  readonly writeOptionalDefaultsRelationValueTypes: boolean;
  readonly writePartialTypes: boolean;
  readonly writePartialRelationValueTypes: boolean;

  constructor(generatorConfig: GeneratorConfig, model: DMMF.Model) {
    super(generatorConfig, model);

    this.hasRelationFields = this._setHasRelationFields();
    this.hasRequiredJsonFields = this._setHasRequiredJsonFields();
    this.hasOptionalJsonFields = this._setHasOptionalJsonFields();
    this.hasDecimalFields = this._setHasDecimalFields();
    this.hasOptionalDefaultFields = this._setHasOptionalDefaultFields();
    this.hasOmitFields = this._setHasOmitFields();
    this.writeOptionalDefaultValuesTypes =
      this._setWriteOptionalDefaultValuesTypes();
    this.writeRelationValueTypes = this._setWriteRelationValueTypes();
    this.writeOptionalDefaultsRelationValueTypes =
      this._setWriteOptionalDefaultsRelationValueTypes();
    this.writePartialTypes = this._setWritePartialTypes();
    this.writePartialRelationValueTypes =
      this._writePartialRelationValueTypes();
  }

  private _setHasRelationFields() {
    return this.relationFields.length > 0;
  }

  private _setHasRequiredJsonFields() {
    return this.fields.some((field) => field.isJsonType && field.isRequired);
  }

  private _setHasOptionalJsonFields() {
    return this.fields.some((field) => field.isJsonType && !field.isRequired);
  }

  private _setHasDecimalFields() {
    return this.fields.some((field) => field.isDecimalType);
  }

  private _setHasOmitFields() {
    return this.fields.some((field) => field.isOmitField());
  }

  private _setHasOptionalDefaultFields() {
    return this.fields.some((field) => field.isOptionalDefaultField);
  }

  private _setWriteOptionalDefaultValuesTypes() {
    return (
      // Do NOT check for "this.hasOptionalDefaultFields"
      // A [model type]OptionalDefaultValues schema needs to be created for each model
      // so the schema can be imported even when no optional default values are present
      this.generatorConfig.createOptionalDefaultValuesTypes
    );
  }

  private _setWriteRelationValueTypes() {
    return (
      this.hasRelationFields && this.generatorConfig.createRelationValuesTypes
    );
  }

  private _setWriteOptionalDefaultsRelationValueTypes() {
    return this.writeRelationValueTypes && this.writeOptionalDefaultValuesTypes;
  }

  private _setWritePartialTypes() {
    return this.generatorConfig.createPartialTypes;
  }

  private _writePartialRelationValueTypes() {
    return this.writeRelationValueTypes && this.writePartialTypes;
  }
}
