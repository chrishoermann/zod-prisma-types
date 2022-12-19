import { generatorHandler } from '@prisma/generator-helper';

import { generator } from './generator';
import { getPrismaClientOutputPath } from './utils';

generatorHandler({
  onManifest: () => {
    return {
      defaultOutput: './generated/zod',
      prettyName: 'Zod Prisma Types',
    };
  },
  onGenerate: async (generatorOptions) => {
    return generator({
      output: generatorOptions.generator.output,
      config: {
        ...generatorOptions.generator.config,
        ...getPrismaClientOutputPath(generatorOptions),
      },
      dmmf: generatorOptions.dmmf,
    });
  },
});
