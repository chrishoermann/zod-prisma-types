import { DMMF } from '@prisma/generator-helper';
import { Dictionary } from '@prisma/internals';
import z from 'zod';
import { ExtendedDMMFDatamodel } from './extendedDMMFDatamodel';
import { ExtendedDMMFSchema } from './extendedDMMFSchema';
export declare const configSchema: z.ZodObject<
  {
    useValidatorJs: z.ZodOptional<
      z.ZodEffects<z.ZodDefault<z.ZodString>, boolean, string | undefined>
    >;
    useDecimalJs: z.ZodOptional<
      z.ZodEffects<z.ZodDefault<z.ZodString>, boolean, string | undefined>
    >;
    imports: z.ZodOptional<z.ZodEffects<z.ZodString, string[], string>>;
    createInputTypes: z.ZodOptional<
      z.ZodEffects<z.ZodDefault<z.ZodString>, boolean, string | undefined>
    >;
    addInputTypeValidation: z.ZodOptional<
      z.ZodEffects<z.ZodDefault<z.ZodString>, boolean, string | undefined>
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    useValidatorJs?: boolean | undefined;
    useDecimalJs?: boolean | undefined;
    imports?: string[] | undefined;
    createInputTypes?: boolean | undefined;
    addInputTypeValidation?: boolean | undefined;
  },
  {
    useValidatorJs?: string | undefined;
    useDecimalJs?: string | undefined;
    imports?: string | undefined;
    createInputTypes?: string | undefined;
    addInputTypeValidation?: string | undefined;
  }
>;
export type ConfigSchema = z.infer<NonNullable<typeof configSchema>>;
export declare class ExtendedDMMF implements DMMF.Document {
  readonly datamodel: ExtendedDMMFDatamodel;
  readonly schema: ExtendedDMMFSchema;
  readonly mappings: DMMF.Mappings;
  readonly config: ConfigSchema;
  constructor(dmmf: DMMF.Document, config: Dictionary<string>);
  private _getExtendedDatamodel;
  private _getExtendedSchema;
  private _getExtendedMappings;
  private _getExtendedConfig;
  useValidatorJs(): boolean;
  useDecimalJs(): boolean;
  createInputTypes(): boolean;
  addInputTypeValidation(): boolean;
  hasCustomImports(): boolean;
}
//# sourceMappingURL=extendedDMMF.d.ts.map
