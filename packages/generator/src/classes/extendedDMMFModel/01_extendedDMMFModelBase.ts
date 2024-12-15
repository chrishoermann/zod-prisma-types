import { DMMF } from '@prisma/generator-helper';
import { GeneratorConfig } from '../../schemas';
import { FormattedNames } from '../formattedNames';
import {
  type ExtendedDMMFField,
  ExtendedDMMFFieldClass,
} from '../extendedDMMFField';

export class ExtendedDMMFModelBase
  extends FormattedNames
  implements DMMF.Model
{
  readonly generatorConfig: GeneratorConfig;

  readonly name: DMMF.Model['name'];
  readonly dbName: DMMF.Model['dbName'];
  readonly schema: DMMF.Model['schema'];
  readonly uniqueFields: DMMF.Model['uniqueFields'];
  readonly uniqueIndexes: DMMF.Model['uniqueIndexes'];
  readonly documentation?: DMMF.Model['documentation'];
  readonly primaryKey: DMMF.Model['primaryKey'];
  readonly isGenerated?: DMMF.Model['isGenerated'];

  readonly fields: ExtendedDMMFField[];
  readonly scalarFields: ExtendedDMMFField[];
  readonly relationFields: ExtendedDMMFField[];
  readonly enumFields: ExtendedDMMFField[];
  readonly filteredRelationFields: ExtendedDMMFField[];
  readonly optionalJsonFields: ExtendedDMMFField[];

  protected _errorLocation: string;

  constructor(generatorConfig: GeneratorConfig, model: DMMF.Model) {
    super(model.name);

    this.generatorConfig = generatorConfig;
    this.name = model.name;
    this.dbName = model.dbName;
    this.schema = model.schema;
    this.uniqueFields = model.uniqueFields;
    this.uniqueIndexes = model.uniqueIndexes;
    this.documentation = model.documentation;
    this.primaryKey = model.primaryKey;

    this.fields = this._getExtendedFields(model);
    this.scalarFields = this._setScalarFields();
    this.relationFields = this._setRelationFields();
    this.filteredRelationFields = this._setFilteredRelationFields();
    this.enumFields = this._setEnumfields();
    this.optionalJsonFields = this._setOptionalJsonFields();

    this._errorLocation = this._setErrorLocation();
  }

  private _getExtendedFields(model: DMMF.Model) {
    return model.fields.map(
      (field) =>
        new ExtendedDMMFFieldClass(field, this.generatorConfig, this.name),
    );
  }

  private _setScalarFields() {
    return this.fields.filter((field) => field.kind === 'scalar');
  }

  private _setRelationFields() {
    return this.fields.filter((field) => field.kind === 'object');
  }

  private _setEnumfields() {
    return this.fields.filter((field) => field.kind === 'enum');
  }

  // filterd relation fields are relation fields that are not self referencing
  // these are used to create the relation imports in the model
  private _setFilteredRelationFields() {
    return this.relationFields.filter((field) => field.type !== this.name);
  }

  private _setOptionalJsonFields() {
    return this.fields.filter((field) => field.isJsonType && !field.isRequired);
  }

  private _setErrorLocation() {
    return `[Error Location]: Model: '${this.name}'.`;
  }
}
