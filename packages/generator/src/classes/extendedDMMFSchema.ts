import { DMMF } from '@prisma/generator-helper';

import { ExtendedDatamodel, ExtendedDMMFInputObjectType } from '.';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFSchema implements DMMF.Schema {
  rootQueryType?: DMMF.Schema['rootQueryType'];
  rootMutationType?: DMMF.Schema['rootMutationType'];
  inputObjectTypes: {
    model?: DMMF.InputType[];
    prisma: ExtendedDMMFInputObjectType[];
  };
  outputObjectTypes: {
    model: DMMF.OutputType[];
    prisma: DMMF.OutputType[];
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
    this.outputObjectTypes = schema.outputObjectTypes;
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
        const matchingDatamodel = datamodel.models.find((model) => {
          return type.name.match(model.name);
        });

        return new ExtendedDMMFInputObjectType(type, matchingDatamodel);
      }),
    };
  }
}
