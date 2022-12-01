import { DMMF } from '@prisma/generator-helper';

import {
  ExtendedDatamodel,
  ExtendedDMMFInputType,
  ExtendedDMMFOutputType,
  ExtendedDMMFSchemaEnum,
} from '.';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFSchema implements DMMF.Schema {
  rootQueryType?: DMMF.Schema['rootQueryType'];
  rootMutationType?: DMMF.Schema['rootMutationType'];
  inputObjectTypes: {
    model?: DMMF.InputType[];
    prisma: ExtendedDMMFInputType[];
  };
  outputObjectTypes: {
    model: DMMF.OutputType[];
    prisma: ExtendedDMMFOutputType[];
  };
  enumTypes: {
    model?: DMMF.SchemaEnum[];
    prisma: ExtendedDMMFSchemaEnum[];
  };
  fieldRefTypes: {
    prisma?: DMMF.FieldRefType[];
  };
  hasJsonTypes: boolean;
  hasBytesTypes: boolean;

  constructor(schema: DMMF.Schema, datamodel: ExtendedDatamodel) {
    this.rootQueryType = schema.rootQueryType;
    this.rootMutationType = schema.rootMutationType;
    this.inputObjectTypes = this._setExtendedInputObjectTypes(
      schema,
      datamodel,
    );
    this.outputObjectTypes = this._setExtendedOutputObjectTypes(schema);
    this.enumTypes = this._setExtendedEnumTypes(schema);
    this.fieldRefTypes = schema.fieldRefTypes;
    this.hasJsonTypes = this._setHasJsonTypes();
    this.hasBytesTypes = this._setHasBytesTypes();
  }

  private _setExtendedInputObjectTypes(
    schema: DMMF.Schema,
    datamodel: ExtendedDatamodel,
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

  private _setExtendedOutputObjectTypes(schema: DMMF.Schema) {
    return {
      ...schema.outputObjectTypes,
      prisma: schema.outputObjectTypes.prisma.map((type) => {
        return new ExtendedDMMFOutputType(type);
      }),
    };
  }

  private _setExtendedEnumTypes(schema: DMMF.Schema) {
    return {
      ...schema.enumTypes,
      prisma: schema.enumTypes.prisma.map((type) => {
        return new ExtendedDMMFSchemaEnum(type);
      }),
    };
  }

  // check if any of the types in the schema are of type Json
  // if so, the "InputJsonValue" helper type needs to be created
  private _setHasJsonTypes() {
    return this.inputObjectTypes.prisma.some((type) => {
      return type.isJsonField;
    });
  }

  private _setHasBytesTypes() {
    return this.inputObjectTypes.prisma.some((type) => {
      return type.isBytesField;
    });
  }
}
