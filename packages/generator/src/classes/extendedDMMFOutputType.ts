import { DMMF } from '@prisma/generator-helper';

import { ExtendedDMMFModel, GeneratorConfig } from '.';
import { PRISMA_ACTION_ARRAY } from '../constants/objectMaps';
import { ExtendedDMMFDatamodel } from './extendedDMMFDatamodel';
import { ExtendedDMMFSchemaField } from './extendedDMMFSchemaField';
import { FormattedNames } from './formattedNames';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFOutputType
  extends FormattedNames
  implements DMMF.OutputType
{
  readonly name: DMMF.OutputType['name'];
  readonly fields: ExtendedDMMFSchemaField[];
  readonly fieldMap?: DMMF.OutputType['fieldMap'];
  readonly prismaActionFields: ExtendedDMMFSchemaField[];
  readonly prismaOtherFields: ExtendedDMMFSchemaField[];
  readonly linkedModel?: ExtendedDMMFModel;

  constructor(
    readonly generatorConfig: GeneratorConfig,
    type: DMMF.OutputType,
    datamodel: ExtendedDMMFDatamodel,
  ) {
    super(type.name);
    this.generatorConfig = generatorConfig;
    this.name = type.name;

    this.fields = this._setFields(type.fields, datamodel);
    this.prismaActionFields = this._setFields(type.fields, datamodel, 'ACTION');
    this.prismaOtherFields = this._setFields(type.fields, datamodel, 'OTHER');

    this.linkedModel = datamodel.models.find((model) => {
      return type.name.match(model.name);
    });

    this.fieldMap = type.fieldMap;
  }

  private _setFields(
    fields: DMMF.SchemaField[],
    datamodel: ExtendedDMMFDatamodel,
    fieldCategory: 'ALL' | 'ACTION' | 'OTHER' = 'ALL',
  ) {
    if (fieldCategory === 'ACTION') {
      return (
        fields
          // filter all fields that are not in the PRISMA_ACTION_ARRAY
          // and those fields that end with "OrThrow" because they
          // use the same input types as the non "OrThrow" version
          .filter(
            (field) =>
              PRISMA_ACTION_ARRAY.find((elem) => field.name.includes(elem)),
            // !field.name.includes('OrThrow'),
          )
          .map(
            (field) =>
              new ExtendedDMMFSchemaField(
                this.generatorConfig,
                field,
                datamodel,
              ),
          )
      );
    }

    if (fieldCategory === 'OTHER') {
      return fields
        .filter(
          (field) =>
            !PRISMA_ACTION_ARRAY.find((elem) => field.name.includes(elem)) &&
            !field.name.includes('OrThrow'),
        )
        .map(
          (field) =>
            new ExtendedDMMFSchemaField(this.generatorConfig, field, datamodel),
        );
    }

    return fields.map((field) => {
      return new ExtendedDMMFSchemaField(
        this.generatorConfig,
        field,
        datamodel,
      );
    });
  }
}
