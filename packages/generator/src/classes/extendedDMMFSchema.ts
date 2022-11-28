import { DMMF } from '@prisma/generator-helper';

import {
  ExtendedDatamodel,
  ExtendedDMMFInputType,
  ExtendedDMMFOutputType,
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
    prisma: DMMF.SchemaEnum[];
  };
  fieldRefTypes: {
    prisma?: DMMF.FieldRefType[];
  };

  constructor(schema: DMMF.Schema, datamodel: ExtendedDatamodel) {
    this.rootQueryType = schema.rootQueryType;
    this.rootMutationType = schema.rootMutationType;
    this.inputObjectTypes = this.setExtendedInputObjectTypes(schema, datamodel);
    this.outputObjectTypes = this.setExtendedOutputObjectTypes(schema);
    this.enumTypes = schema.enumTypes;
    this.fieldRefTypes = schema.fieldRefTypes;
  }

  private setExtendedInputObjectTypes(
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

  private setExtendedOutputObjectTypes(schema: DMMF.Schema) {
    return {
      ...schema.outputObjectTypes,
      prisma: schema.outputObjectTypes.prisma.map((type) => {
        return new ExtendedDMMFOutputType(type);
      }),
    };
  }
}
