import { DMMF } from '@prisma/generator-helper';

import { PRISMA_TYPE_MAP } from '../constants/objectMaps';
import { ZodPrismaScalarType } from '../types';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFSchemaArgInputType implements DMMF.SchemaArgInputType {
  isList: DMMF.SchemaArgInputType['isList'];
  type: DMMF.SchemaArgInputType['type'];
  location: DMMF.SchemaArgInputType['location'];
  namespace?: DMMF.SchemaArgInputType['namespace'];

  constructor(arg: DMMF.SchemaArgInputType) {
    this.isList = arg.isList;
    this.type = arg.type;
    this.location = arg.location;
    this.namespace = arg.namespace;
  }

  /**
   * Checks if the type is a scalar type and returns the corresponding zod scalar
   * e.g. String -> string, Int -> number, etc.
   * @returns zodScalarType or undefined
   */
  getZodScalarType = () => {
    if (!this.isStringType()) return;
    const zodType = PRISMA_TYPE_MAP[this.type as ZodPrismaScalarType];
    if (!zodType) return;
    return zodType;
  };

  /**
   * Checks if the type is a nont scalar type and returns the generated zod type
   * @returns true if the type is a non scalar type (e.g. User, Post, etc.)
   */
  getZodNonScalarType = () => {
    if (!this.isStringType()) return;
    const zodType = PRISMA_TYPE_MAP[this.type as ZodPrismaScalarType];
    if (zodType || this.type === 'Null') return;
    return this.type;
  };

  /**
   * Checks if the type is a null type and returns the corresponding zod null type string
   * @returns zodNullType or undefined
   */
  getZodNullType = () => {
    if (!this.isStringType()) return;
    if (!(this.type === 'Null')) return;
    return 'null';
  };

  /**
   * Type guard to check if the type is a string
   * @param type the type of SchameArgInputType - defaults to this.type
   * @returns true if the type is a string
   */
  isStringType = (type: DMMF.ArgType = this.type): type is string => {
    return typeof type === 'string';
  };

  /**
   * Type guard to check if the type is a DMMF.SchemaEnum
   * @param type type of SchameArgInputType - defaults to this.type
   * @returns true if type is DMMF.SchemaEnum
   */
  isSchemaEnum = (type: DMMF.ArgType = this.type): type is DMMF.SchemaEnum => {
    return (type as DMMF.SchemaEnum).values !== undefined;
  };

  /**
   * Type guard to check if the type is a DMMF.InputType
   * @param type type of SchameArgInputType - defaults to this.type
   * @returns true if type is DMMF.InputType
   */
  isInputType = (type: DMMF.ArgType = this.type): type is DMMF.InputType => {
    return (type as DMMF.InputType).fields !== undefined;
  };
}
