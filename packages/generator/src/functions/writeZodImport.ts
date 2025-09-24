import { CreateFileOptions } from '../classes/fileWriter';
import { getConfig } from '../config';

/**
 * Currently this function writes the same import for zod v3 and v4
 * A special import from v4/core, as stated in the zod docs, should not be necessary
 * because the generator handles the differences between the two versions in the writer functions
 * or the preperations of the content in the extended dmmf classes.
 *
 * IF some changes to this behaviour are mandatory, they can be implemented here.
 *
 * @param writeImport writer function to write the import to the file
 */

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
