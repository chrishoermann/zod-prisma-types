import { GeneratorOptions } from '@prisma/generator-helper';
import path from 'path';

// currently a bit hacky but does the job

export const getPrismaClientOutputPath = (options: GeneratorOptions) => {
  // find the prisma client config
  const prismaClientOptions = options.otherGenerators.find(
    (g) => g.provider.value === 'prisma-client-js',
  );
  // check if custom output is used on generator or prisma client
  if (
    !options.generator.output?.value ||
    !prismaClientOptions?.isCustomOutput ||
    !prismaClientOptions?.output?.value
  )
    return undefined;

  // check if the prisma client path is already set in the generator config
  // if so this path is used instead of the automatically located path

  if (options.generator.config?.['prismaClientPath']) {
    const clientPath: string[] = [process.cwd()];

    // if the prisma schema is located in the prisma folder
    // the path needs to be adjusted
    if (prismaClientOptions.output.value.includes('prisma')) {
      clientPath.push('prisma');
    }

    clientPath.push(options.generator.config?.['prismaClientPath']);

    const customPrismaClientPath = path
      .relative(options.generator.output.value, path.join(...clientPath))
      .replace(/\\/g, '/');

    if (options.generator.config?.['useMultipleFiles']) {
      return { prismaClientPath: `../${customPrismaClientPath}` };
    }

    return { prismaClientPath: customPrismaClientPath };
  }

  // get the relative path to the prisma schema
  const prismaClientPath = path
    .relative(options.generator.output.value, prismaClientOptions.output.value)
    .replace(/\\/g, '/');

  if (!prismaClientPath) return undefined;

  // if multiple files are used the path needs to add one level up
  // because the schemas are generated in subfolders of the output path
  if (options.generator.config?.['useMultipleFiles']) {
    return { prismaClientPath: `../${prismaClientPath}` };
  }

  // return path to be spread into the generator config
  return { prismaClientPath };
};
