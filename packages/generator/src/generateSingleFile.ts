import { FileWriter } from './classes';
import {
  writeSingleFileEnumStatements,
  writeSingleFileHelperStatements,
  writeSingleFileImportStatements,
  writeSingleFileModelStatements,
  writeSingleFileIncludeSelectStatements,
  writeSingleFileInputTypeStatements,
  writeSingleFileArgTypeStatements,
} from './functions';
import { CreateOptions } from './types';

export const generateSingleFile = ({ dmmf, outputPath }: CreateOptions) => {
  const fileWriter = new FileWriter();

  const path = fileWriter.createPath(outputPath);

  fileWriter.createFile(`${path}/index.ts`, (createFileOptions) => {
    writeSingleFileImportStatements(dmmf, createFileOptions);
    writeSingleFileHelperStatements(dmmf, createFileOptions);
    writeSingleFileEnumStatements(dmmf, createFileOptions);
    writeSingleFileModelStatements(dmmf, createFileOptions);
    writeSingleFileIncludeSelectStatements(dmmf, createFileOptions);
    writeSingleFileInputTypeStatements(dmmf, createFileOptions);
    writeSingleFileArgTypeStatements(dmmf, createFileOptions);
  });
};
