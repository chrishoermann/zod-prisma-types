import { FileWriter } from './classes';
import {
  writeSingleFileEnumStatements,
  writeSingleFileHelperStatements,
  writeSingleFileImportStatements,
  writeSingleFileModelStatements,
  writeSingleFileTypeStatements,
  writeSingleFileIncludeSelectStatements,
  writeSingleFileInputTypeStatements,
  writeSingleFileArgTypeStatements,
} from './functions';
import { CreateOptions } from './types';

export const generateSingleFile = ({ dmmf, path }: CreateOptions) => {
  new FileWriter(dmmf.generatorConfig).createFile(
    `${path}/index.ts`,
    (fileWriter) => {
      writeSingleFileImportStatements(dmmf, fileWriter);
      writeSingleFileHelperStatements(dmmf, fileWriter);
      writeSingleFileEnumStatements(dmmf, fileWriter);
      writeSingleFileModelStatements(dmmf, fileWriter);
      writeSingleFileTypeStatements(dmmf, fileWriter);
      writeSingleFileIncludeSelectStatements(dmmf, fileWriter);
      writeSingleFileInputTypeStatements(dmmf, fileWriter);
      writeSingleFileArgTypeStatements(dmmf, fileWriter);
    },
  );
};
