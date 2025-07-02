import { FileWriter } from './classes';
import {
  writeArgTypeFiles,
  writeInputTypeFiles,
  writeModelFiles,
} from './functions';
import { CreateOptions } from './types';

export const generateMultipleFiles = ({ dmmf, path }: CreateOptions) => {
  const { createModelTypes, createInputTypes, writeBarrelFiles } =
    dmmf.generatorConfig;

  // Create the index file
  if (writeBarrelFiles) {
    new FileWriter(dmmf.generatorConfig).createFile(
      `${path}/index.ts`,
      ({ writeExport }) => {
        const shouldUseExtensionForRelativeImports = [
          'node16',
          'nodenext',
        ].includes(dmmf.generatorConfig.moduleResolution);
        const moduleSuffix = shouldUseExtensionForRelativeImports
          ? '/index.js'
          : '';
        if (createModelTypes) {
          writeExport('*', './modelSchema' + moduleSuffix);
        }

        writeExport(
          '*',
          `./${dmmf.generatorConfig.inputTypePath + moduleSuffix}`,
        );

        if (createInputTypes) {
          writeExport(
            '*',
            `./${dmmf.generatorConfig.outputTypePath + moduleSuffix}`,
          );
        }
      },
    );
  }

  writeModelFiles({ path, dmmf });
  writeInputTypeFiles({ path, dmmf });
  writeArgTypeFiles({ path, dmmf });
};
