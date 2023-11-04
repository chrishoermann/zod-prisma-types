import { GeneratorOptions } from '@prisma/generator-helper';

import { getPrismaClientOutputPath } from './getPrismaClientOutputPath';
import { getPrismaClientProvider } from './getPrismaDbProvider';
import { configSchema } from '../schemas';
import { getPrismaVersion } from './getPrismaVersion';
import { getDecimalJSInstalled } from './getDecimalJSInstalled';

export const parseGeneratorConfig = (generatorOptions: GeneratorOptions) => {
  // Merge the generator config with the prisma client output path
  // The prisma client output path is automatically located

  return configSchema.parse({
    ...generatorOptions.generator.config,
    ...getPrismaClientOutputPath(generatorOptions),
    ...getPrismaClientProvider(generatorOptions),
    prismaVersion: getPrismaVersion(),
    decimalJSInstalled: getDecimalJSInstalled(),
  });
};
