import type { GeneratorOptions } from '@prisma/generator-helper';

import { getPrismaClientGeneratorConfig } from './getPrismaClientGeneratorConfig';
import { getPrismaClientProvider } from './getPrismaDbProvider';
import { configSchema } from '../schemas';
import { getDecimalJSInstalled } from './getDecimalJSInstalled';
import { getPackageVersion } from './getPackageVersion';

export const parseGeneratorConfig = (generatorOptions: GeneratorOptions) => {
  // Merge the generator config with the prisma client output path
  // The prisma client output path is automatically located

  return configSchema.parse({
    ...generatorOptions.generator.config,
    ...getPrismaClientGeneratorConfig(generatorOptions),
    ...getPrismaClientProvider(generatorOptions),
    prismaVersion: getPackageVersion('@prisma/client'),
    zodVersion: getPackageVersion('zod'),
    decimalJSInstalled: getDecimalJSInstalled(),
    outputPath: generatorOptions.generator.output,
  });
};
