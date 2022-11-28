import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'value',
  'intTwo',
  'int',
  'floatOpt',
  'float',
  'decimal',
  'decimalOpt',
  'bigInt',
  'bigIntOpt',
]);
