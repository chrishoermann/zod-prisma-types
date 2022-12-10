import { DMMF } from '@prisma/generator-helper';

import {
  GeneratorConfig,
  ExtendedDMMFDatamodel,
  ExtendedDMMFInputType,
  ExtendedDMMFOutputType,
  ExtendedDMMFSchemaEnum,
} from '.';

export interface ExtendedDMMFSchemaOptions {
  schema: DMMF.Schema;
  datamodel: ExtendedDMMFDatamodel;
  generatorConfig: GeneratorConfig;
}

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFSchema implements DMMF.Schema {
  readonly rootQueryType?: DMMF.Schema['rootQueryType'];
  readonly rootMutationType?: DMMF.Schema['rootMutationType'];
  readonly inputObjectTypes: {
    readonly model?: DMMF.InputType[];
    // Contains information about the prisma where, orderBy, and other input types.
    readonly prisma: ExtendedDMMFInputType[];
  };
  readonly outputObjectTypes: {
    // Contains information about the prisma select, include and so on types.
    // TODO: Merge in the datamodel information.
    readonly model: ExtendedDMMFOutputType[];
    // Contains information about the prisma args, aggregate, count, groupBy and so on types.
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

  constructor(
    readonly generatorConfig: GeneratorConfig,
    schema: DMMF.Schema,
    datamodel: ExtendedDMMFDatamodel,
  ) {
    console.log();
    this.generatorConfig = generatorConfig;

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

    this.outputObjectTypes.model.forEach((type) => {
      if (type.name === 'User') {
        console.log(type.name, type.linkedModel?.name);

        // type.fields.forEach((field) => {
        //   console.log(field.name, field);
        // });
      }
    });
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

        return new ExtendedDMMFInputType(
          this.generatorConfig,
          type,
          matchingDatamodel,
        );
      }),
    };
  }

  private _setExtendedOutputObjectTypes(
    schema: DMMF.Schema,
    datamodel: ExtendedDMMFDatamodel,
  ) {
    return {
      model: schema.outputObjectTypes.model.map((type) => {
        return new ExtendedDMMFOutputType(
          this.generatorConfig,
          type,
          datamodel,
        );
      }),
      prisma: schema.outputObjectTypes.prisma.map((type) => {
        return new ExtendedDMMFOutputType(
          this.generatorConfig,
          type,
          datamodel,
        );
      }),
    };
  }

  private _setExtendedEnumTypes(schema: DMMF.Schema) {
    return {
      ...schema.enumTypes,
      prisma: schema.enumTypes.prisma.map(
        (type) => new ExtendedDMMFSchemaEnum(this.generatorConfig, type),
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
