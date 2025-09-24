import type DMMF from '@prisma/dmmf';

import { PRISMA_TO_ZOD_TYPE_MAP } from '../constants/objectMaps';
import { ZodPrismaScalarType } from '../types';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

type SchemaArgInputType = DMMF.TypeRef<
  'scalar' | 'inputObjectTypes' | 'enumTypes' | 'fieldRefTypes'
>;

/**
 * The category of the schema arg input type.
 * @description Scalar types are the basic types like string, number, boolean, etc.
 * @description Non scalar types are the types that are not scalar like enums, objects, etc.
 * @description Special types are the types that are special like Json, Bytes, Decimal, etc.
 */
export type SchemaArgTypeCategory = 'scalar' | 'nonScalar' | 'special';

export class ExtendedDMMFSchemaArgInputType implements SchemaArgInputType {
  readonly isJsonType: boolean;
  readonly isBytesType: boolean;
  readonly isDecimalType: boolean;
  readonly isNullType: boolean;
  readonly isList: SchemaArgInputType['isList'];
  readonly type: SchemaArgInputType['type'];
  readonly location: SchemaArgInputType['location'];
  readonly namespace?: SchemaArgInputType['namespace'];
  readonly category: SchemaArgTypeCategory;

  constructor(arg: SchemaArgInputType) {
    this.isJsonType = this._setIsJsonType(arg);
    this.isBytesType = this._setIsBytesType(arg);
    this.isDecimalType = this._setIsDecimalType(arg);
    this.isNullType = this._setIsNullType(arg);
    this.isList = arg.isList;
    this.type = arg.type;
    this.location = arg.location;
    this.namespace = arg.namespace;
    this.category = this._setCategory();
  }

  private _setCategory() {
    if (this.getZodScalarType()) return 'scalar';
    if (this.getZodNonScalarType()) return 'nonScalar';
    return 'special';
  }

  private _setIsJsonType(arg: SchemaArgInputType) {
    return arg.type === 'Json';
  }

  private _setIsBytesType(arg: SchemaArgInputType) {
    return arg.type === 'Bytes';
  }

  private _setIsDecimalType(arg: SchemaArgInputType) {
    return arg.type === 'Decimal';
  }

  private _setIsNullType(arg: SchemaArgInputType) {
    return arg.type === 'Null';
  }

  /**
   * Checks if the type is a scalar type and returns the corresponding zod scalar type
   * e.g. String -> string, Int -> number, etc.
   * @returns zodScalarType or undefined
   */
  getZodScalarType = () => {
    const zodType = PRISMA_TO_ZOD_TYPE_MAP[this.type as ZodPrismaScalarType];
    if (!zodType) return;
    return zodType;
  };

  /**
   * Checks if the type is a nont scalar type and returns the generated zod type
   * @returns non scalar type (e.g. `User`, `Post`, `UserWhereInput`, etc.)
   */
  getZodNonScalarType = () => {
    const zodScalarType =
      PRISMA_TO_ZOD_TYPE_MAP[this.type as ZodPrismaScalarType];
    if (zodScalarType || this.isSpecialType()) return;
    return this.type;
  };

  /**
   * Checks if the type is a null type and returns the corresponding zod null type string
   * @deprecated This method is deprecated and is currently not used anywhere
   * @returns zodNullType or undefined
   */
  getZodNullType = () => {
    if (!(this.type === 'Null')) return;
    return 'null';
  };

  isSpecialType = () => {
    return (
      this.isJsonType ||
      this.isBytesType ||
      this.isNullType ||
      this.isDecimalType
    );
  };
}
