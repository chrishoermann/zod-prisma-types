import { CreateFileOptions } from '../classes/fileWriter';
import { getConfig } from '../config';

export const writeZodImport = (
  writeImport: CreateFileOptions['writeImport'],
) => {
  const { zodVersion } = getConfig();

  if (zodVersion?.major === 4) {
    return writeImport('{ z }', 'zod');
  }

  if (zodVersion?.major === 3) {
    return writeImport('{ z }', 'zod');
  }
};
