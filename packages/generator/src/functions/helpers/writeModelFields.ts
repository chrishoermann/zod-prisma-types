import { writeJsDoc } from '../../utils';
import { ExtendedWriteFieldOptions } from '../../types';
import {
  writeBytes,
  writeCustomValidator,
  writeDecimal,
  writeDecimalInstance,
  writeEnum,
  writeJson,
  writeScalar,
} from '.';

export const writeModelFields = (options: ExtendedWriteFieldOptions) => {
  if (options.field.clearedDocumentation) {
    writeJsDoc(options.writer, options.field.clearedDocumentation);
  }

  if (options.field.zodCustomValidatorString) {
    return writeCustomValidator(options);
  }

  if (options.field.kind === 'enum') {
    return writeEnum(options);
  }

  if (options.field.isJsonType) {
    return writeJson(options);
  }

  if (options.field.isBytesType) {
    return writeBytes(options);
  }

  if (options.field.isDecimalType && !options.dmmf.useInstanceOfForDecimal()) {
    return writeDecimal(options);
  }

  if (options.field.isDecimalType && options.dmmf.useInstanceOfForDecimal()) {
    return writeDecimalInstance(options);
  }

  return writeScalar(options);
};
