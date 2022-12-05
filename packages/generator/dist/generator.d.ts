import { GeneratorOptions } from '@prisma/generator-helper';
export interface GeneratorConfig {
    output: GeneratorOptions['generator']['output'];
    config: GeneratorOptions['generator']['config'];
    dmmf: GeneratorOptions['dmmf'];
}
export declare const generator: ({ output, config, dmmf }: GeneratorConfig) => Promise<void>;
//# sourceMappingURL=generator.d.ts.map