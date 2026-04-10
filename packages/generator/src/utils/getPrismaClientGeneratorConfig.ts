import type { GeneratorOptions } from '@prisma/generator-helper';
import path from 'path';
import { getPackageVersion } from './getPackageVersion';

const getPrismaClientPath = (
  prismaClientPath: string | string[] | undefined,
) => {
  if (typeof prismaClientPath === 'string') {
    return prismaClientPath;
  }

  return prismaClientPath?.join('/');
};

export const getPrismaClientGeneratorConfig = (options: GeneratorOptions) => {
  const prismaVersion = getPackageVersion('@prisma/client');

  // find the prisma client config
  const prismaClientOptions = options.otherGenerators.find(
    (g) =>
      g.provider.value === 'prisma-client-js' ||
      g.provider.value === 'prisma-client',
  );

  const isPrismaClientGenerator =
    prismaClientOptions?.provider.value === 'prisma-client';

  let prismaLibraryPath = '';

  if (
    prismaClientOptions?.previewFeatures.includes('queryCompiler') ||
    (prismaVersion?.major ?? 0) >= 7
  ) {
    prismaLibraryPath = '@prisma/client/runtime/client';
  } else {
    prismaLibraryPath = '@prisma/client/runtime/library';
  }

  const baseOptions = {
    isPrismaClientGenerator,
    prismaLibraryPath,
    prismaVersion,
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
    const prismaClientPath = getPrismaClientPath(
      options.generator.config?.['prismaClientPath'],
    );

    if (prismaClientPath && (prismaVersion?.major ?? 0) >= 7) {
      return {
        ...baseOptions,
        prismaClientPath: prismaClientPath.concat('/client'),
      };
    }

    return {
      ...baseOptions,
      prismaClientPath,
    };
  }

  // get the relative path to the prisma schema
  const prismaClientPath = path
    .relative(options.generator.output.value, prismaClientOptions.output.value)
    .replace(/\\/g, '/')
    .concat('/client');

  prismaLibraryPath = path
    .relative(options.generator.output.value, prismaClientOptions.output.value)
    .replace(/\\/g, '/')
    .concat('/internal/prismaNamespace');

  if (!prismaClientPath) return { ...baseOptions, prismaLibraryPath };

  // if multiple files are used the path needs to add one level up
  // because the schemas are generated in subfolders of the output path
  if (options.generator.config?.['useMultipleFiles']) {
    return {
      ...baseOptions,
      prismaClientPath: `../${prismaClientPath}`,
      prismaLibraryPath: `../${prismaLibraryPath}`,
    };
  }

  // return path to be spread into the generator config
  return { ...baseOptions, prismaClientPath };
};
