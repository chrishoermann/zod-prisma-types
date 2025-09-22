import {
  writeDecimalJsLike,
  // writeDecimalJsLikeList,
  writeInputJsonValue,
  writeIsValidDecimalInput,
  writeJsonValue,
  writeNullableJsonValue,
  writeTransformJsonNull,
} from '.';
import { type WriteStatements } from '../types';
import { writeRemoveUndefined } from './contentWriters/writeRemoveUndefined';
import { getConfig } from '../config';
import { getExtendedDMMF } from '../classes';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeSingleFileHelperStatements: WriteStatements = (
  fileWriter,
) => {
  const dmmf = getExtendedDMMF();

  fileWriter.writer.blankLine();
  fileWriter.writeHeading('HELPER FUNCTIONS', 'FAT');
  fileWriter.writer.blankLine();

  // EXACT OPTIONAL PROPERTY TYPES
  // ------------------------------------------------------------

  if (getConfig().useExactOptionalPropertyTypes) {
    fileWriter.writeHeading(`EXACT OPTIONAL PROPERTY TYPES`, 'SLIM');

    writeRemoveUndefined({ fileWriter });

    fileWriter.writer.newLine();
  }

  // JSON
  // ------------------------------------------------------------

  if (dmmf.schema.hasJsonTypes) {
    fileWriter.writeHeading(`JSON`, 'SLIM');

    writeTransformJsonNull({ fileWriter });
    writeJsonValue({ fileWriter });
    writeNullableJsonValue({ fileWriter });
    writeInputJsonValue({ fileWriter });

    fileWriter.writer.newLine();
  }

  // DECIMAL
  // ------------------------------------------------------------

  if (dmmf.schema.hasDecimalTypes) {
    fileWriter.writeHeading(`DECIMAL`, 'SLIM');

    writeDecimalJsLike({ fileWriter });
    // writeDecimalJsLikeList({ fileWriter, dmmf });
    writeIsValidDecimalInput({ fileWriter });

    fileWriter.writer.newLine();
  }
};
