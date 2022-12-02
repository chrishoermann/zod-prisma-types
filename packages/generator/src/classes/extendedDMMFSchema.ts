import { DMMF } from '@prisma/generator-helper';

import {
  ExtendedDMMFDatamodel,
  ExtendedDMMFInputType,
  ExtendedDMMFOutputType,
  ExtendedDMMFSchemaEnum,
} from '.';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFSchema implements DMMF.Schema {
  readonly rootQueryType?: DMMF.Schema['rootQueryType'];
  readonly rootMutationType?: DMMF.Schema['rootMutationType'];
  readonly inputObjectTypes: {
    readonly model?: DMMF.InputType[];
    readonly prisma: ExtendedDMMFInputType[];
  };
  readonly outputObjectTypes: {
    readonly model: DMMF.OutputType[];
    readonly prisma: ExtendedDMMFOutputType[];
  };
  readonly enumTypes: {
    readonly model?: DMMF.SchemaEnum[];
    readonly prisma: ExtendedDMMFSchemaEnum[];
  };
  readonly fieldRefTypes: {
    readonly prisma?: DMMF.FieldRefType[];
  };
  readonly hasJsonTypes: boolean;
  readonly hasBytesTypes: boolean;
  readonly hasDecimalTypes: boolean;

  constructor(schema: DMMF.Schema, datamodel: ExtendedDMMFDatamodel) {
    this.rootQueryType = schema.rootQueryType;
    this.rootMutationType = schema.rootMutationType;
    this.inputObjectTypes = this._setExtendedInputObjectTypes(
      schema,
      datamodel,
    );
    this.outputObjectTypes = this._setExtendedOutputObjectTypes(
      schema,
      datamodel,
    );
    this.enumTypes = this._setExtendedEnumTypes(schema);
    this.fieldRefTypes = schema.fieldRefTypes;
    this.hasJsonTypes = this._setHasJsonTypes();
    this.hasBytesTypes = this._setHasBytesTypes();
    this.hasDecimalTypes = this._setHasDecimalTypes();
  }

  private _setExtendedInputObjectTypes(
    schema: DMMF.Schema,
    datamodel: ExtendedDMMFDatamodel,
  ) {
    return {
      ...schema.inputObjectTypes,
      prisma: schema.inputObjectTypes.prisma.map((type) => {
        // find the datamodel that matches the input type.
        // This way the documentation and the validator strings
        // from the datamodel can be added to the input types.
        const matchingDatamodel = datamodel.models.find((model) => {
          return type.name.match(model.name);
        });

        return new ExtendedDMMFInputType(type, matchingDatamodel);
      }),
    };
  }

  private _setExtendedOutputObjectTypes(
    schema: DMMF.Schema,
    datamodel: ExtendedDMMFDatamodel,
  ) {
    return {
      ...schema.outputObjectTypes,
      prisma: schema.outputObjectTypes.prisma.map(
        (type) => new ExtendedDMMFOutputType(type, datamodel),
      ),
    };
  }

  private _setExtendedEnumTypes(schema: DMMF.Schema) {
    return {
      ...schema.enumTypes,
      prisma: schema.enumTypes.prisma.map(
        (type) => new ExtendedDMMFSchemaEnum(type),
      ),
    };
  }

  private _setHasJsonTypes() {
    return this.inputObjectTypes.prisma.some((type) => type.isJsonField);
  }

  private _setHasBytesTypes() {
    return this.inputObjectTypes.prisma.some((type) => type.isBytesField);
  }

  private _setHasDecimalTypes() {
    return this.inputObjectTypes.prisma.some((type) => type.isDecimalField);
  }
}
