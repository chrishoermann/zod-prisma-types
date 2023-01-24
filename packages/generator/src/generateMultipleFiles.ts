import { FileWriter } from './classes';
import { CreateOptions } from './types';
import {
  writeArgTypeFiles,
  writeInputTypeFiles,
  writeModelFiles,
} from './functions';

export const generateMultipleFiles = ({ dmmf, outputPath }: CreateOptions) => {
  const indexFileWriter = new FileWriter();

  // Create the path specified in the generator output
  indexFileWriter.createPath(`${outputPath}`);

  // Create the index file
  indexFileWriter.createFile(`${outputPath}/index.ts`, ({ writer }) => {
    writer.writeLine(`export * from './modelSchema'`);
    writer.writeLine(`export * from './${dmmf.generatorConfig.inputTypePath}'`);
    writer.writeLine(
      `export * from './${dmmf.generatorConfig.outputTypePath}'`,
    );
  });

  // Create the model files
  writeModelFiles({ outputPath, dmmf: dmmf });

  // Create the input type files
  writeInputTypeFiles({ outputPath, dmmf: dmmf });

  // Create the arg type files
  writeArgTypeFiles({ outputPath, dmmf: dmmf });
};
