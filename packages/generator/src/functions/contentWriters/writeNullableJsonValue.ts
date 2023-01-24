import { type ContentWriterOptions } from '../../types';

export const writeNullableJsonValue = ({
  fileWriter: { writer, writeImport },
  dmmf,
}: ContentWriterOptions) => {
  const { useMultipleFiles } = dmmf.generatorConfig;

  if (useMultipleFiles) {
    writeImport('{ z }', 'zod');
    writeImport('transformJsonNull', './transformJsonNull');
    writeImport('JsonValue', './JsonValue');
  }

  writer
    .blankLine()
    .writeLine(`export const NullableJsonValue = z`)
    .withIndentationLevel(1, () => {
      writer
        .writeLine(
          `.union([JsonValue, z.literal('DbNull'), z.literal('JsonNull')])`,
        )
        .writeLine('.nullable()')
        .writeLine(`.transform((v) => transformJsonNull(v));`);
    });

  if (useMultipleFiles) {
    writer.blankLine().writeLine(`export default NullableJsonValue;`);
  }
};
