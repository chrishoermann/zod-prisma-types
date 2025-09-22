import { generatorHandler } from '@prisma/generator-helper';
import { z } from 'zod';

import { DirectoryHelper, ExtendedDMMF } from './classes';
import { generateMultipleFiles } from './generateMultipleFiles';
import { generateSingleFile } from './generateSingleFile';
import { skipGenerator } from './utils';
import { parseGeneratorConfig } from './utils/parseGeneratorConfig';
import { globalConfig } from './config/globalConfig';

/////////////////////////////////////////
// SCHEMAS
/////////////////////////////////////////

const outputSchema = z.object({
  fromEnvVar: z.string().nullable(),
  value: z.string({ message: 'No output path specified' }),
});

/////////////////////////////////////////
// GENERATOR
/////////////////////////////////////////

generatorHandler({
  onManifest: () => {
    return {
      defaultOutput: './generated/zod',
      prettyName: 'Zod Prisma Types',
    };
  },
  // eslint-disable-next-line @typescript-eslint/require-await
  onGenerate: async (generatorOptions) => {
    if (skipGenerator()) return;

    // get all config options from schema.prisma
    const config = parseGeneratorConfig(generatorOptions);

    // Initialize global config so it can be accessed anywhere
    globalConfig.initialize(config);

    // validate that the output path is present
    const output = outputSchema.parse(generatorOptions.generator.output);

    // extend the DMMF with custom functionality - see "classes" folder
    const extendedDMMF = new ExtendedDMMF(generatorOptions.dmmf);

    // If data is present in the output directory, delete it.
    DirectoryHelper.removeDir(output.value);

    // Create the output directory
    DirectoryHelper.createDir(output.value);

    // generate single or multiple files
    if (globalConfig.getConfig().useMultipleFiles) {
      return generateMultipleFiles({
        dmmf: extendedDMMF,
        path: output.value,
      });
    }

    return generateSingleFile({
      dmmf: extendedDMMF,
      path: output.value,
    });
  },
});
