import { generatorHandler } from '@prisma/generator-helper';

import { generator } from './generator';

generatorHandler({
  onManifest: () => {
    return {
      defaultOutput: './generated/zod',
      prettyName: 'Zod Prisma Types',
    };
  },
  onGenerate: async ({ generator: { output, config }, dmmf }) =>
    generator({ output, config, dmmf }),
});
