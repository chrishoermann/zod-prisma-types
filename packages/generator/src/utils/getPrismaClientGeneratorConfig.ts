import { GeneratorOptions } from '@prisma/generator-helper';
import path from 'path';

export const getPrismaClientGeneratorConfig = (options: GeneratorOptions) => {
  // find the prisma client config
  const prismaClientOptions = options.otherGenerators.find(
    (g) =>
      g.provider.value === 'prisma-client-js' ||
      g.provider.value === 'prisma-client',
  );

  const isPrismaClientGenerator =
    prismaClientOptions?.provider.value === 'prisma-client';

  const prismaLibraryPath = prismaClientOptions?.previewFeatures.includes(
    'queryCompiler',
  )
    ? '@prisma/client/runtime/client'
    : '@prisma/client/runtime/library';

  const baseOptions = {
    isPrismaClientGenerator,
    prismaLibraryPath,
  };

  // check if custom output is used on generator or prisma client
  if (
    !options.generator.output?.value ||
    !prismaClientOptions?.isCustomOutput ||
    !prismaClientOptions?.output?.value
  )
    return baseOptions;

  // check if the prisma client path is already set in the generator config
  // if so this path is used instead of the automatically located path

  if (options.generator.config?.['prismaClientPath']) {
    return {
      ...baseOptions,
      prismaClientPath: options.generator.config?.['prismaClientPath'],
    };
  }

  // get the relative path to the prisma schema
  const prismaClientPath = path
    .relative(options.generator.output.value, prismaClientOptions.output.value)
    .replace(/\\/g, '/');

  if (!prismaClientPath) return baseOptions;

  // if multiple files are used the path needs to add one level up
  // because the schemas are generated in subfolders of the output path
  if (options.generator.config?.['useMultipleFiles']) {
    return {
      ...baseOptions,
      prismaClientPath: `../${prismaClientPath}`,
    };
  }

  // return path to be spread into the generator config
  return { ...baseOptions, prismaClientPath };
};
