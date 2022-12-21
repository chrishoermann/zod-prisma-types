import { GeneratorOptions } from '@prisma/generator-helper';
import path from 'path';

export const getPrismaClientOutputPath = (options: GeneratorOptions) => {
  // find the prisma client config
  const prismaClientOptions = options.otherGenerators.find(
    (g) => g.provider.value === 'prisma-client-js',
  );

  // check if custom output is used
  if (
    !options.generator.output?.value ||
    !prismaClientOptions?.isCustomOutput ||
    !prismaClientOptions?.output?.value
  )
    return undefined;

  // get the relative path to the prisma schema
  const prismaClientPath = path
    .relative(options.generator.output.value, prismaClientOptions.output.value)
    .replace(/\\/g, '/');

  if (!prismaClientPath) return undefined;

  // return path to be spread into the generator config
  return { prismaClientPath };
};
