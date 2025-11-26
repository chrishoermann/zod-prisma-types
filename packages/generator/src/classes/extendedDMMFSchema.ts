import type DMMF from '@prisma/dmmf';
import type { ReadonlyDeep } from '@prisma/dmmf/dist/util';

import {
  ExtendedDMMFDatamodel,
  ExtendedDMMFInputType,
  ExtendedDMMFOutputType,
  ExtendedDMMFSchemaEnum,
  ExtendedDMMFSchemaField,
} from '.';

export interface ExtendedDMMFSchemaOptions {
  schema: DMMF.Schema;
  datamodel: ExtendedDMMFDatamodel;
}

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFSchema implements DMMF.Schema {
  readonly rootQueryType?: DMMF.Schema['rootQueryType'];
  readonly rootMutationType?: DMMF.Schema['rootMutationType'];
  readonly inputObjectTypes: {
    readonly model?: ReadonlyDeep<DMMF.InputType[]>;
    /**
     * Contains information about the prisma where, orderBy, and other input types.
     */
    readonly prisma: ExtendedDMMFInputType[];
  };
  readonly outputObjectTypes: {
    /**
     * Contains information about the prisma select, include and so on types.
     */
    readonly model: ExtendedDMMFOutputType[];
    /**
     * Contains information about the prisma args, aggregate, count, groupBy and so on types.
     */
    readonly prisma: ExtendedDMMFOutputType[];
    /**
     * Contains information about the prisma  aggregate and count types.
     */
    readonly aggregateAndCountTypes: ExtendedDMMFOutputType[];
    /**
     * Contains information about the prisma args, groupBy and so on types.
     */
    readonly argTypes: ExtendedDMMFOutputType[];
  };
  readonly enumTypes: {
    readonly model?: ReadonlyDeep<DMMF.DatamodelSchemaEnum[]>;
    readonly prisma: ExtendedDMMFSchemaEnum[];
  };
  readonly fieldRefTypes: {
    readonly prisma?: ReadonlyDeep<DMMF.FieldRefType[]>;
  };
  readonly hasJsonTypes: boolean;
  readonly hasBytesTypes: boolean;
  readonly hasDecimalTypes: boolean;

  constructor(schema: DMMF.Schema, datamodel: ExtendedDMMFDatamodel) {
    this.rootQueryType = schema.rootQueryType;
    this.rootMutationType = schema.rootMutationType;
    this.enumTypes = this._setExtendedEnumTypes(schema);
    this.inputObjectTypes = this._setExtendedInputObjectTypes(
      schema,
      datamodel,
    );
    this.outputObjectTypes = this._setExtendedOutputObjectTypes(
      schema,
      datamodel,
    );
    this.fieldRefTypes = schema.fieldRefTypes;
    this.hasJsonTypes = this._setHasJsonTypes();
    this.hasBytesTypes = this._setHasBytesTypes();
    this.hasDecimalTypes = this._setHasDecimalTypes();
  }

  private _setExtendedInputObjectTypes(
    schema: ReadonlyDeep<DMMF.Schema>,
    datamodel: ExtendedDMMFDatamodel,
  ) {
    return {
      ...schema.inputObjectTypes,
      prisma:
        schema.inputObjectTypes.prisma?.map(
          (type) => new ExtendedDMMFInputType(type, datamodel),
        ) ?? [],
    };
  }

  private _setExtendedOutputObjectTypes(
    schema: ReadonlyDeep<DMMF.Schema>,
    datamodel: ExtendedDMMFDatamodel,
  ) {
    // The models where the name contains "CreateMany[modelName]AndReturn" must not be included!
    // Since then additional schemas would be generated that are not used anywhere
    // and that would not have a corresponding prisma type
    const modelWithoutCreateManyAndReturn = schema.outputObjectTypes.model
      // .filter((type) => !type.name.includes('createManyAndReturn'))
      // .filter((type) => !type.name.includes('updateManyAndReturn'))
      // since 6.3.0 the it should only be exclude everything wiht "AndReturn" and not only "CreateManyAndReturn"
      .filter((type) => !type.name.includes('AndReturn'))
      .map((type) => {
        return new ExtendedDMMFOutputType(type, datamodel);
      });

    return {
      model: modelWithoutCreateManyAndReturn,
      prisma: modelWithoutCreateManyAndReturn,
      aggregateAndCountTypes: schema.outputObjectTypes.prisma
        .filter(
          (type) =>
            type.name !== 'Query' &&
            type.name !== 'Mutation' &&
            !type.name.includes('AffectedRows') &&
            !type.name.includes('RawAggregate'),
        )
        .map((type) => new ExtendedDMMFOutputType(type, datamodel)),
      argTypes: schema.outputObjectTypes.prisma
        .filter((type) => type.name === 'Query' || type.name === 'Mutation')
        .map((type) => new ExtendedDMMFOutputType(type, datamodel)),
    };
  }

  private _setExtendedEnumTypes(schema: ReadonlyDeep<DMMF.Schema>) {
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

  /**
   * Checks if `include` and `select` args should be added to the field
   * @param field ExtendedDMMFSchemaField that the model should be found for
   * @returns ExtendedDMMFOutputType if a matching field is found, otherwise undefined
   */
  getModelWithIncludeAndSelect(field: ExtendedDMMFSchemaField) {
    return this.outputObjectTypes.model.find(
      (model) =>
        field.modelType === model.name && field.writeSelectAndIncludeArgs,
    );
  }
}
