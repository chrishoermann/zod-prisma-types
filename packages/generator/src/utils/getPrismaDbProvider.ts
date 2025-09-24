import type { GeneratorOptions } from '@prisma/generator-helper';
import { z } from 'zod';

export const getPrismaClientProvider = (options: GeneratorOptions) => {
  const provider = z.string().parse(options.datasources[0].provider);
  if (provider === 'mongodb') {
    return {
      provider,
      isMongoDb: 'true',
    };
  }
  return { provider, isMongoDb: 'false' };
};
