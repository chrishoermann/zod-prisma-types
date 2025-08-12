import { CreateFileOptions } from 'src/classes/fileWriter';

/**
 * Zod v4 compatibility helpers for generated output.
 * Centralize all Zod string fragments to make version updates low-impact.
 */

export type ZodScalarPrimitiveType =
  | 'string'
  | 'number'
  | 'bigint'
  | 'boolean'
  | 'date';

/**
 * Write the canonical Zod import using the provided writeImport function.
 */
export function writeZodImport(
  writeImport: CreateFileOptions['writeImport'],
): void {
  writeImport('{ z }', 'zod');
}

/**
 * Create a scalar Zod schema constructor expression (including parentheses).
 * Example: createScalarSchema('string') => "z.string()"
 */
export function createScalarSchema(
  type: ZodScalarPrimitiveType,
  customErrors?: string,
): string {
  const args = customErrors ? customErrors : '';
  return `z.${type}(${args})`;
}

/**
 * Create a coerced scalar Zod schema constructor expression (including parentheses).
 * Example: createCoercedScalarSchema('date') => "z.coerce.date()"
 */
export function createCoercedScalarSchema(
  type: Extract<
    ZodScalarPrimitiveType,
    'date' | 'string' | 'number' | 'bigint' | 'boolean'
  >,
  customErrors?: string,
): string {
  const args = customErrors ? customErrors : '';
  return `z.coerce.${type}(${args})`;
}

/**
 * Build the options literal for z.object(shape, options) in Zod v4.
 * Returns an empty string if no options are provided.
 */
export function buildObjectOptions(options: {
  required_error?: string;
  invalid_type_error?: string;
  description?: string;
}): string {
  const parts: string[] = [];
  if (options.required_error !== undefined) {
    parts.push(`required_error: ${options.required_error}`);
  }
  if (options.invalid_type_error !== undefined) {
    parts.push(`invalid_type_error: ${options.invalid_type_error}`);
  }
  if (options.description !== undefined) {
    parts.push(`description: ${options.description}`);
  }
  if (parts.length === 0) return '';
  return `{ ${parts.join(', ')} }`;
}

/**
 * Build a validator chain segment like .min(3) or .email({ message: 'x' }).
 * Returned string starts with a dot.
 */
export function buildValidatorCall(
  _kind: 'string' | 'number' | 'bigint' | 'date' | 'array' | 'object',
  key: string,
  args: string,
): string {
  // Pass-through for v4. If option naming changes (e.g., message->error), adapt here.
  return `.${key}(${args})`;
}

/**
 * Combine two object schemas using merge (overwrite) or and (intersection).
 */
export function combineObjectSchemas(
  leftSchemaExpr: string,
  rightSchemaExpr: string,
  mode: 'merge' | 'and',
): string {
  if (mode === 'merge') return `${leftSchemaExpr}.merge(${rightSchemaExpr})`;
  return `${leftSchemaExpr}.and(${rightSchemaExpr})`;
}

/**
 * Identity wrapper to keep a single place to add z.ZodType<T> annotations if required.
 * Call sites can do: `const S: z.ZodType<T> = ${wrapAsRecursiveZodType(expr)}` if needed.
 */
export function wrapAsRecursiveZodType<T>(schemaExpr: string): string {
  return schemaExpr;
}
