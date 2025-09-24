import { generatorHandler } from '@prisma/generator-helper';

import { DirectoryHelper, ExtendedDMMFSingleton } from './classes';
import { generateMultipleFiles } from './generateMultipleFiles';
import { generateSingleFile } from './generateSingleFile';
import { skipGenerator } from './utils';
import { globalConfig } from './config/globalConfig';

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

    // Initialize global config so it can be accessed anywhere
    const { outputPath, useMultipleFiles } =
      globalConfig.initialize(generatorOptions);

    // initialize the ExtendedDMMF singleton to be able to access it anywhere
    ExtendedDMMFSingleton.initialize(generatorOptions.dmmf);

    // If data is present in the output directory, delete it.
    DirectoryHelper.removeDir(outputPath);

    // Create the output directory
    DirectoryHelper.createDir(outputPath);

    // generate single or multiple files
    if (useMultipleFiles) {
      return generateMultipleFiles();
    }

    return generateSingleFile();
  },
});
