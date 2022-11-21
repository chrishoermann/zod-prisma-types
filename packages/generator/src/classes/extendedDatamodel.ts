/* eslint-disable @typescript-eslint/no-explicit-any */
import { DMMF } from '@prisma/generator-helper';

import { ExtendedDMMFEnum } from './extendedDMMFEnum';
import { ExtendedDMMFModel } from './extendedDMMFModel';

import { KeyValueMap, PrismaScalarType } from '@/types';

/////////////////////////////////////////////////
// TYPES  INTERFACE
/////////////////////////////////////////////////

export interface ObejctWithName {
  name: string;
  [key: string]: any;
}

export interface FilterTypes {
  /**
   * Deterime if the standard filter should be generated
   */
  standard: boolean;

  /**
   * Deterime if a nullable filter should be generated
   */
  nullable: boolean;

  /**
   * Deterime if an aggregate filter should be generated
   */
  aggregate: boolean;
}

export type WriteBaseFilters = KeyValueMap<PrismaScalarType, FilterTypes>;

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDatamodel {
  readonly enums: ExtendedDMMFEnum[];
  readonly models: ExtendedDMMFModel[];
  readonly types: DMMF.Model[];

  /**
   * used to detrmine if a base filter should be generated for a given type
   */
  readonly baseFilters: WriteBaseFilters;

  constructor(datamodel: DMMF.Datamodel) {
    this.enums = this.getExtendedEnums(datamodel.enums);
    this.models = this.getExtendedModels(datamodel.models);
    this.types = datamodel.types;

    this.baseFilters = this.setBaseFilters();
  }

  private setBaseFilters(): WriteBaseFilters {
    return {
      String: this.writeBaseFilter('String'),
      Boolean: this.writeBaseFilter('Boolean'),
      Int: this.writeBaseFilter('Int'),
      BigInt: this.writeBaseFilter('BigInt'),
      Float: this.writeBaseFilter('Float'),
      Decimal: this.writeBaseFilter('Decimal'),
      DateTime: this.writeBaseFilter('DateTime'),
      Json: this.writeBaseFilter('Json'),
      Bytes: this.writeBaseFilter('Bytes'),
    };
  }

  private writeBaseFilter(type: PrismaScalarType) {
    const fields = this.models.map((model) => model.scalarFields[type]).flat();
    const hasRequiredFields = fields.some((field) => field.isRequired);
    return {
      standard: hasRequiredFields,
      nullable: !hasRequiredFields,
      aggregate: fields.some((field) => field.isList),
    };
  }

  private getExtendedModels(models: DMMF.Model[]) {
    return models.map((model) => {
      return new ExtendedDMMFModel(model);
    });
  }

  private getExtendedEnums(enums: DMMF.DatamodelEnum[]) {
    const enumFields = enums.map((elem) => {
      return new ExtendedDMMFEnum(elem);
    });

    return this.sortObjectsByName(enumFields);
  }

  sortObjectsByName<T extends ObejctWithName>(objects: T[]): T[] {
    return objects.sort((a: T, b: T) =>
      a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1,
    );
  }

  hasEnum() {
    return this.enums.length !== 0;
  }
}
