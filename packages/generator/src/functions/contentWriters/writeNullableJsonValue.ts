import { type ContentWriterOptions } from '../../types';

export const writeNullableJsonValue = ({
  fileWriter: { writer, writeImports },
  dmmf,
  getSingleFileContent = false,
}: ContentWriterOptions) => {
  const { useMultipleFiles } = dmmf.generatorConfig;

  if (useMultipleFiles && !getSingleFileContent) {
    writeImports([
      { name: 'z', path: 'zod' },
      { name: 'transformJsonNull', path: './transformJsonNull' },
      { name: 'JsonValueSchema', path: './JsonValueSchema' },
    ]);
  }

  writer
    .blankLine()
    .writeLine(`export const NullableJsonValue = z`)
    .withIndentationLevel(1, () => {
      writer
        .writeLine(
          `.union([JsonValueSchema, z.literal('DbNull'), z.literal('JsonNull')])`,
        )
        .writeLine('.nullable()')
        .writeLine(`.transform((v) => transformJsonNull(v));`);
    })
    .blankLine()
    .writeLine(
      `export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;`,
    );

  if (useMultipleFiles && !getSingleFileContent) {
    writer.blankLine().writeLine(`export default NullableJsonValue;`);
  }
};
